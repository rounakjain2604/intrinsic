import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import Callout from "@/components/chapter/Callout";
import FormulaBlock from "@/components/chapter/FormulaBlock";
import WorkedExample from "@/components/chapter/WorkedExample";
import ComparisonTable, { ComparisonColumn } from "@/components/chapter/ComparisonTable";
import QuizCard from "@/components/chapter/QuizCard";
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

// ── Custom MDX Components ──────────────────────────────────
const mdxComponents = {
    Callout,
    FormulaBlock,
    WorkedExample,
    ComparisonTable,
    ComparisonColumn,
    QuizCard,
    DCFDiagram,
    BondPricePlayable,
    YieldCurveChart,
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            id={slugify(String(props.children))}
            className="font-['Candara','Calibri','Georgia',serif] text-2xl font-semibold text-[#1e1e1e] mt-12 mb-4"
            {...props}
        />
    ),
    h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h3
            id={slugify(String(props.children))}
            className="font-['Candara','Calibri','Georgia',serif] text-lg font-semibold text-[#1e1e1e] mt-8 mb-3"
            {...props}
        />
    ),
    p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
        <p
            className="font-['Candara','Calibri','Georgia',serif] text-base text-[#1e1e1e] leading-[1.75]"
            {...props}
        />
    ),
    strong: (props: React.HTMLAttributes<HTMLElement>) => (
        <strong className="font-semibold text-[#1e1e1e]" {...props} />
    ),
    ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
        <ul className="list-disc list-inside space-y-2 text-[#1e1e1e]" {...props} />
    ),
    ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
        <ol className="list-decimal list-inside space-y-2 text-[#1e1e1e]" {...props} />
    ),
    li: (props: React.HTMLAttributes<HTMLLIElement>) => (
        <li className="font-['Candara','Calibri','Georgia',serif] text-base leading-[1.75]" {...props} />
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
            className="border-l-4 border-[#c8a96e]/30 pl-5 italic text-[#6B6560] my-6"
            {...props}
        />
    ),
    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
        <div className="table-wrapper overflow-x-auto my-6 rounded-xl border border-[#2D2A26]/[0.08]">
            <table className="w-full border-collapse font-['Candara','Calibri','Georgia',serif] text-[0.9rem]" {...props} />
        </div>
    ),
    thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => (
        <thead {...props} />
    ),
    th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <th
            className="bg-[#c8a96e] text-white font-semibold text-left px-4 py-2.5 text-xs uppercase tracking-wide"
            {...props}
        />
    ),
    tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
        <tr className="even:bg-[#c8a96e]/[0.06]" {...props} />
    ),
    td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
        <td
            className="px-4 py-2.5 border-b border-[#2D2A26]/[0.08] text-[#1e1e1e]"
            {...props}
        />
    ),
};

// ── Helpers ────────────────────────────────────────────────

/** Strip UTF-8 BOM and normalise Windows (\r\n) line endings to \n. */
function normalizeSource(raw: string): string {
    return raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
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
                remarkPlugins: [remarkMath],
                rehypePlugins: [rehypeKatex as never],
            },
        },
    });
}

async function parseChapterFrontmatter(
    source: string,
    slug: string
): Promise<ChapterFrontmatter> {
    // Lightweight frontmatter extraction — avoids full compileMDX cost
    const fmMatch = source.match(/^---\n([\s\S]*?)\n---/);
    if (fmMatch) {
        const yamlBlock = fmMatch[1];
        const raw: Record<string, unknown> = {};
        for (const line of yamlBlock.split("\n")) {
            const m = line.match(/^(\w[\w_]*):\s*(.*)/);
            if (!m) continue;
            const [, key, val] = m;
            const trimmed = val.trim().replace(/^["']|["']$/g, "");
            if (trimmed === "true") raw[key] = true;
            else if (trimmed === "false") raw[key] = false;
            else if (/^-?\d+(\.\d+)?$/.test(trimmed)) raw[key] = Number(trimmed);
            else raw[key] = trimmed;
        }
        const parsed = chapterFrontmatterSchema.safeParse(raw);
        if (parsed.success) return parsed.data;
    }

    // Fallback: full compileMDX (slower but handles complex YAML)
    const { frontmatter } = await compileMDX<ChapterFrontmatter>({
        source,
        options: { parseFrontmatter: true },
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
    return source.replace(/^---\n[\s\S]*?\n---\n?/, "");
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
            const source = normalizeSource(fs.readFileSync(filePath, "utf-8"));
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

    const source = normalizeSource(fs.readFileSync(filePath, "utf-8"));
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

    const source = normalizeSource(fs.readFileSync(filePath, "utf-8"));
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

    const source = normalizeSource(fs.readFileSync(filePath, "utf-8"));
    // Strip paywall marker — everything is free during beta
    const cleanSource = source.replace(PAYWALL_MARKER, "");

    const { content } = await compileChapterSource(cleanSource);
    const parsedFrontmatter = await parseChapterFrontmatter(source, slug);
    const headings = extractHeadings(cleanSource);

    return {
        content,
        previewContent: null,
        frontmatter: parsedFrontmatter,
        headings,
        previewHeadings: [],
        hasPaywallMarker: false,
    };
}
