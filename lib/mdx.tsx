import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Callout from "@/components/chapter/Callout";
import FormulaBlock from "@/components/chapter/FormulaBlock";
import type { TOCHeading } from "@/components/chapter/TableOfContents";

// ── Types ──────────────────────────────────────────────────
interface ChapterFrontmatter {
    title: string;
    slug: string;
    description: string;
    order: number;
    is_free: boolean;
    price_tier: "free" | "standard" | "premium";
}

interface ChapterMDXResult {
    content: React.ReactElement;
    frontmatter: ChapterFrontmatter;
    headings: TOCHeading[];
}

// ── Custom MDX Components ──────────────────────────────────
const mdxComponents = {
    Callout,
    FormulaBlock,
    // Map standard markdown elements to styled versions
    h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
        <h2
            id= { slugify(String(props.children))
}
className = "font-[family-name:var(--font-serif)] text-2xl font-semibold text-[#2D2A26] mt-12 mb-4"
{...props }
        />
    ),
h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
            id= { slugify(String(props.children))}
className = "font-[family-name:var(--font-sans)] text-lg font-semibold text-[#2D2A26] mt-8 mb-3"
{...props }
        />
    ),
p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
            className= "font-[family-name:var(--font-sans)] text-base text-[#6B6560] leading-8"
{...props }
        />
    ),
strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong className= "font-semibold text-[#2D2A26]" {...props } />
    ),
ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className= "list-disc list-inside space-y-2 text-[#6B6560]" {...props } />
    ),
ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className= "list-decimal list-inside space-y-2 text-[#6B6560]" {...props } />
    ),
hr: () => <hr className="border-t border-[#2D2A26]/[0.08] my-12" />,
    code: (props: React.HTMLAttributes<HTMLElement>) => (
        <code
            className= "font-[family-name:var(--font-mono)] text-[#E8694A] bg-[#EDE8DF] rounded px-2 py-1 text-sm"
{...props }
        />
    ),
blockquote: (props: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
            className= "border-l-4 border-[#2D2A26]/10 pl-5 italic text-[#6B6560] my-6"
{...props }
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

// ── Main Export ────────────────────────────────────────────

const CONTENT_DIR = path.join(process.cwd(), "content", "chapters");

/**
 * Load and compile an MDX chapter file from content/chapters/[slug].mdx
 * Returns the rendered content, parsed frontmatter, and extracted headings.
 */
export async function getChapterContent(
    slug: string
): Promise<ChapterMDXResult | null> {
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
        return null;
    }

    const source = fs.readFileSync(filePath, "utf-8");

    const { content, frontmatter } = await compileMDX<ChapterFrontmatter>({
        source,
        components: mdxComponents,
        options: { parseFrontmatter: true },
    });

    const headings = extractHeadings(source);

    return { content, frontmatter, headings };
}
