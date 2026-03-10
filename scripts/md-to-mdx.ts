/**
 * MD-to-MDX Pipeline Script
 * 
 * Converts raw Markdown chapter files into MDX format with proper frontmatter
 * and custom component transformations for the Intrinsic platform.
 * 
 * Usage:
 *   npx tsx scripts/md-to-mdx.ts <source-dir> [--slug-prefix=<prefix>]
 * 
 * Example:
 *   npx tsx scripts/md-to-mdx.ts ./raw-chapters --slug-prefix=equity-valuation
 * 
 * The script will:
 *   1. Read each .md file in the source directory
 *   2. Infer title from the first # heading or filename
 *   3. Generate frontmatter with is_free: true
 *   4. Convert markdown patterns to MDX components:
 *      - > **Exam Tip:** ... → <Callout type="exam-tip">
 *      - > **Key Concept:** ... → <Callout type="key-concept">
 *      - > **Warning:** ... → <Callout type="warning">
 *      - Lines starting with bold formulas in dedicated sections → <FormulaBlock>
 *   5. Output .mdx files to content/chapters/
 */

import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content", "chapters");

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

function inferTitle(source: string, filename: string): string {
    // Try first # heading
    const match = source.match(/^#\s+(.+)$/m);
    if (match) {
        return match[1].trim();
    }
    // Fallback to filename
    return filename
        .replace(/\.md$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function inferDescription(source: string): string {
    // Try first paragraph after the first heading
    const lines = source.split("\n");
    let foundHeading = false;
    for (const line of lines) {
        if (line.startsWith("#")) {
            foundHeading = true;
            continue;
        }
        if (foundHeading && line.trim().length > 0 && !line.startsWith("#") && !line.startsWith("-") && !line.startsWith(">")) {
            // Truncate to ~150 chars
            const desc = line.trim().replace(/\*\*/g, "");
            return desc.length > 150 ? desc.slice(0, 147) + "..." : desc;
        }
    }
    return "CFA Level 2 study notes.";
}

function convertCallouts(source: string): string {
    // Convert blockquotes with specific prefixes to Callout components
    const calloutPatterns: [RegExp, string][] = [
        [/^>\s*\*\*Exam Tip:\*\*\s*/im, "exam-tip"],
        [/^>\s*\*\*Key Concept:\*\*\s*/im, "key-concept"],
        [/^>\s*\*\*Warning:\*\*\s*/im, "warning"],
        [/^>\s*\*\*Note:\*\*\s*/im, "note"],
    ];

    let result = source;

    for (const [pattern, type] of calloutPatterns) {
        // Find blockquote blocks with these patterns
        result = result.replace(
            new RegExp(`(^>\\s*\\*\\*(?:Exam Tip|Key Concept|Warning|Note):\\*\\*\\s*)(.+(?:\\n>\\s*.+)*)`, "gim"),
            (_match, prefix: string, content: string) => {
                const prefixLower = prefix.toLowerCase();
                let calloutType = "note";
                if (prefixLower.includes("exam tip")) calloutType = "exam-tip";
                else if (prefixLower.includes("key concept")) calloutType = "key-concept";
                else if (prefixLower.includes("warning")) calloutType = "warning";

                const cleanContent = content
                    .split("\n")
                    .map((line: string) => line.replace(/^>\s*/, "").trim())
                    .join("\n")
                    .trim();

                return `<Callout type="${calloutType}">\n${cleanContent}\n</Callout>`;
            }
        );
    }

    return result;
}

function convertFormulaBlocks(source: string): string {
    // Convert code blocks with ```formula label to <FormulaBlock>
    return source.replace(
        /```formula\s*(.*?)\n([\s\S]*?)```/g,
        (_match, label: string, content: string) => {
            const trimmedLabel = label.trim() || "Formula";
            return `<FormulaBlock label="${trimmedLabel}">\n${content.trim()}\n</FormulaBlock>`;
        }
    );
}

function stripFirstHeading(source: string): string {
    // Remove the first # heading (it becomes the frontmatter title)
    return source.replace(/^#\s+.+\n*/m, "");
}

function processFile(
    filePath: string,
    slugPrefix: string | null,
    orderStart: number
): void {
    const filename = path.basename(filePath);
    const source = fs.readFileSync(filePath, "utf-8");

    const title = inferTitle(source, filename);
    const description = inferDescription(source);
    const baseSlug = slugify(filename.replace(/\.md$/, ""));
    const slug = slugPrefix ? `${slugPrefix}-${baseSlug}` : baseSlug;

    // Generate frontmatter
    const frontmatter = [
        "---",
        `title: "${title}"`,
        `slug: "${slug}"`,
        `description: "${description}"`,
        `order: ${orderStart}`,
        `is_free: true`,
        `price_tier: "free"`,
        `price_usd: 0`,
        "---",
        "",
    ].join("\n");

    // Process content
    let content = stripFirstHeading(source);
    content = convertCallouts(content);
    content = convertFormulaBlocks(content);

    const output = frontmatter + content;
    const outputPath = path.join(CONTENT_DIR, `${slug}.mdx`);

    fs.writeFileSync(outputPath, output, "utf-8");
    console.log(`✓ ${filename} → ${slug}.mdx`);
}

// ── CLI Entry Point ────────────────────────────────────────

const args = process.argv.slice(2);
const sourceDir = args.find((a) => !a.startsWith("--"));
const slugPrefixArg = args.find((a) => a.startsWith("--slug-prefix="));
const slugPrefix = slugPrefixArg ? slugPrefixArg.split("=")[1] : null;
const orderStartArg = args.find((a) => a.startsWith("--order-start="));
const orderStart = orderStartArg ? parseInt(orderStartArg.split("=")[1]) : 100;

if (!sourceDir) {
    console.error("Usage: npx tsx scripts/md-to-mdx.ts <source-dir> [--slug-prefix=<prefix>] [--order-start=<n>]");
    console.error("Example: npx tsx scripts/md-to-mdx.ts ./raw-chapters --slug-prefix=equity-valuation");
    process.exit(1);
}

const resolvedDir = path.resolve(sourceDir);
if (!fs.existsSync(resolvedDir)) {
    console.error(`Source directory not found: ${resolvedDir}`);
    process.exit(1);
}

// Ensure output dir exists
if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

const mdFiles = fs.readdirSync(resolvedDir).filter((f) => f.endsWith(".md") && f !== "README.md");

if (mdFiles.length === 0) {
    console.error(`No .md files found in ${resolvedDir}`);
    process.exit(1);
}

console.log(`\n📖 Converting ${mdFiles.length} chapters from ${resolvedDir}\n`);

mdFiles.forEach((file, idx) => {
    processFile(path.join(resolvedDir, file), slugPrefix, orderStart + idx);
});

console.log(`\n✅ Done! ${mdFiles.length} files written to content/chapters/\n`);
