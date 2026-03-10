import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import Callout from "@/components/chapter/Callout";
import FormulaBlock from "@/components/chapter/FormulaBlock";
import ComparisonTable, {
    ComparisonColumn,
} from "@/components/chapter/ComparisonTable";
import WorkedExample from "@/components/chapter/WorkedExample";
import QuizCard from "@/components/chapter/QuizCard";
import PlayableFormula from "@/components/chapter/PlayableFormula";
import DCFDiagram from "@/components/chapter/diagrams/DCFDiagram";
import BondPricePlayable from "@/components/chapter/BondPricePlayable";
import YieldCurveChart from "@/components/charts/YieldCurveChart";
import { chapterFrontmatterSchema } from "@/lib/schemas";
import type {
    ChapterFrontmatter,
    ChapterMDXResult,
    TOCHeading,
} from "@/lib/types";

const PAYWALL_MARKER = "<!-- paid-content -->";
const SUPPORTED_MDX_COMPONENTS = new Set([
    "Callout",
    "FormulaBlock",
    "ComparisonTable",
    "ComparisonColumn",
    "WorkedExample",
    "QuizCard",
    "PlayableFormula",
    "DCFDiagram",
    "BondPricePlayable",
    "YieldCurveChart",
]);

// ── Custom MDX Components ──────────────────────────────────
const mdxComponents = {
    Callout,
    FormulaBlock,
    ComparisonTable,
    ComparisonColumn,
    WorkedExample,
    QuizCard,
    PlayableFormula,
    DCFDiagram,
    BondPricePlayable,
    YieldCurveChart,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            id={slugify(String(props.children))}
            className="font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26] mt-12 mb-4"
            {...props}
        />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            id={slugify(String(props.children))}
            className="font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26] mt-8 mb-3"
            {...props}
        />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className="font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-8"
            {...props}
        />
    ),
    a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
            className="font-[family-name:var(--font-sans)] text-[#E8694A] underline decoration-[#E8694A]/35 underline-offset-4 transition-colors hover:text-[#D45E40]"
            target={props.href?.startsWith("http") ? "_blank" : undefined}
            rel={props.href?.startsWith("http") ? "noreferrer" : undefined}
            {...props}
        />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className="font-semibold text-[#2D2A26]" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside space-y-2 text-[#6B6560]" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside space-y-2 text-[#6B6560]" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="font-[family-name:var(--font-sans)] text-base leading-8" {...props} />
    ),
    hr: () => <hr className="border-t border-[#2D2A26]/[0.08] my-12" />,
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code
            className="font-[family-name:var(--font-mono)] text-[#E8694A] bg-[#EDE8DF] rounded px-2 py-1 text-sm"
            {...props}
        />
    ),
    blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
        <blockquote
            className="border-l-4 border-[#2D2A26]/10 pl-5 italic text-[#6B6560] my-6"
            {...props}
        />
    ),
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="table-wrapper overflow-x-auto my-8 rounded-2xl border border-[#2D2A26]/10 bg-[#FFFDF9] shadow-[0_2px_12px_rgba(45,42,38,0.04)]">
            <table className="w-full border-collapse font-[family-name:var(--font-sans)] text-sm" {...props} />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead {...props} />
    ),
    tbody: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <tbody {...props} />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="even:bg-[#F5F1EA]/80" {...props} />
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className="bg-[#2D2A26] px-4 py-3 text-left font-[family-name:var(--font-mono)] text-[11px] font-medium uppercase tracking-[0.18em] text-[#FAF8F5]"
            {...props}
        />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className="border-b border-[#2D2A26]/8 px-4 py-3 align-top text-[#2D2A26]"
            {...props}
        />
    ),
};

// ── Helpers ────────────────────────────────────────────────

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function validateSupportedMdxComponents(source: string, slug: string) {
    const matches = source.matchAll(/<([A-Z][A-Za-z0-9]*)\b/g);
    const unsupported = new Set<string>();

    for (const match of matches) {
        const componentName = match[1];
        if (!SUPPORTED_MDX_COMPONENTS.has(componentName)) {
            unsupported.add(componentName);
        }
    }

    if (unsupported.size > 0) {
        throw new Error(
            `Unsupported MDX component(s) in content/chapters/${slug}.mdx: ${[...unsupported].join(", ")}`
        );
    }
}

/**
 * Extract headings (## and ###) from raw MDX source for the Table of Contents.
 */
function extractHeadings(source: string): TOCHeading[] {
    const headings: TOCHeading[] = [];
    const lines = source.split("\n");

    for (const line of lines) {
        const match = line.match(/^(#{2,3})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const text = match[2].trim();
            headings.push({
                id: slugify(text),
                text,
                level,
            });
        }
    }

    return headings;
}

async function compileChapterSource(source: string) {
    return compileMDX<ChapterFrontmatter>({
        source,
        components: mdxComponents,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeKatex],
            },
        },
    });
}

async function parseChapterFrontmatter(
    source: string,
    slug: string
): Promise<ChapterFrontmatter> {
    const { data } = matter(source);
    const parsed = chapterFrontmatterSchema.safeParse(data);

    if (parsed.success) {
        return parsed.data;
    }

    // Fallback: full compileMDX (slower but handles complex YAML)
    const { frontmatter } = await compileMDX<ChapterFrontmatter>({
        source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkMath],
                rehypePlugins: [rehypeKatex],
            },
        },
    });
    const parsedFrontmatter = chapterFrontmatterSchema.safeParse(frontmatter);

    if (!parsedFrontmatter.success) {
        throw new Error(
            `Invalid frontmatter in content/chapters/${slug}.mdx: ${parsedFrontmatter.error.message}`
        );
    }

    return parsedFrontmatter.data;
}

// ── Main Export ────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "chapters");

function getChapterFilePath(slug: string) {
    return path.join(CONTENT_DIR, `${slug}.mdx`);
}

function stripFrontmatter(source: string) {
    return matter(source).content;
}

export async function getAllLocalChapterFrontmatters(): Promise<
    ChapterFrontmatter[]
> {
    const entries = fs.readdirSync(CONTENT_DIR, { withFileTypes: true });
    const chapterFiles = entries.filter(
        (entry) =>
            entry.isFile() &&
            entry.name.endsWith(".mdx") &&
            !entry.name.startsWith("_")
    );

    const frontmatters = await Promise.all(
        chapterFiles.map(async (entry) => {
            const slug = entry.name.replace(/\.mdx$/, "");
            const filePath = path.join(CONTENT_DIR, entry.name);
            const source = fs.readFileSync(filePath, "utf-8");
            return parseChapterFrontmatter(source, slug);
        })
    );

    return frontmatters.sort((left, right) => {
        const leftOrder = left.order ?? Number.MAX_SAFE_INTEGER;
        const rightOrder = right.order ?? Number.MAX_SAFE_INTEGER;
        return leftOrder - rightOrder;
    });
}

export async function getLocalChapterFrontmatter(
    slug: string
): Promise<ChapterFrontmatter | null> {
    const filePath = getChapterFilePath(slug);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");
    return parseChapterFrontmatter(source, slug);
}

export function getChapterRawContent(slug: string): {
    fullSource: string;
    previewSource: string | null;
    headings: TOCHeading[];
    previewHeadings: TOCHeading[];
    hasPaywallMarker: boolean;
} | null {
    const filePath = getChapterFilePath(slug);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const contentSource = stripFrontmatter(source);
    const hasPaywallMarker = contentSource.includes(PAYWALL_MARKER);
    const previewSource = hasPaywallMarker
        ? contentSource.split(PAYWALL_MARKER)[0]
        : null;

    return {
        fullSource: contentSource.replace(PAYWALL_MARKER, ""),
        previewSource,
        headings: extractHeadings(contentSource.replace(PAYWALL_MARKER, "")),
        previewHeadings: previewSource ? extractHeadings(previewSource) : [],
        hasPaywallMarker,
    };
}

/**
 * Load and compile an MDX chapter file from content/chapters/[slug].mdx
 * Returns the rendered content, parsed frontmatter, and extracted headings.
 */
export async function getChapterContent(
    slug: string
): Promise<ChapterMDXResult | null> {
    const filePath = getChapterFilePath(slug);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");
    const hasPaywallMarker = source.includes(PAYWALL_MARKER);
    const previewSource = hasPaywallMarker
        ? source.split(PAYWALL_MARKER)[0]
        : source;

    validateSupportedMdxComponents(source, slug);

    const { content } = await compileChapterSource(source);
    const parsedFrontmatter = await parseChapterFrontmatter(source, slug);

    const previewContent = hasPaywallMarker
        ? (await compileChapterSource(previewSource)).content
        : null;
    const headings = extractHeadings(source.replace(PAYWALL_MARKER, ""));
    const previewHeadings = hasPaywallMarker
        ? extractHeadings(previewSource)
        : [];

    return {
        content,
        previewContent,
        frontmatter: parsedFrontmatter,
        headings,
        previewHeadings,
        hasPaywallMarker,
    };
}
