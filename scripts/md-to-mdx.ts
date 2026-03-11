/**
 * MD-to-MDX Pipeline Script
 * 
 * Converts raw Markdown chapter files into MDX format with proper frontmatter
 * and custom component transformations for the Intrinsic platform.
 * 
 * Usage:
 *   npx tsx scripts/md-to-mdx.ts <source-dir> [--slug-prefix=<prefix>]
 *   npx tsx scripts/md-to-mdx.ts --combine --slug=<slug> --title="<title>" --description="<desc>" --order=<n> <file1.md> <file2.md> ...
 * 
 * Example:
 *   npx tsx scripts/md-to-mdx.ts ./raw-chapters --slug-prefix=equity-valuation
 *   npx tsx scripts/md-to-mdx.ts --combine --slug=fsa-financial-institutions --title="Analysis of Financial Institutions" --description="Learning Module 4: banks, regulation, CAMELS, and insurance company analysis." --order=6.4 ./los1.md ./los2.md
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

interface CliOptions {
    combine: boolean;
    slugPrefix: string | null;
    orderStart: number;
    slug: string | null;
    title: string | null;
    description: string | null;
    order: number | null;
    positional: string[];
}

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
    return source.replace(
        new RegExp(
            `(^>\\s*\\*\\*(?:Exam Tip|Key Concept|Warning|Note):\\*\\*\\s*)(.+(?:\\n>\\s*.+)*)`,
            "gim"
        ),
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

function parseCliOptions(args: string[]): CliOptions {
    const positional: string[] = [];
    const options: CliOptions = {
        combine: false,
        slugPrefix: null,
        orderStart: 100,
        slug: null,
        title: null,
        description: null,
        order: null,
        positional,
    };

    for (const arg of args) {
        if (arg === "--combine") {
            options.combine = true;
            continue;
        }

        if (arg.startsWith("--slug-prefix=")) {
            options.slugPrefix = arg.split("=")[1] ?? null;
            continue;
        }

        if (arg.startsWith("--order-start=")) {
            const value = Number(arg.split("=")[1]);
            if (!Number.isNaN(value)) {
                options.orderStart = value;
            }
            continue;
        }

        if (arg.startsWith("--slug=")) {
            options.slug = arg.slice("--slug=".length);
            continue;
        }

        if (arg.startsWith("--title=")) {
            options.title = arg.slice("--title=".length);
            continue;
        }

        if (arg.startsWith("--description=")) {
            options.description = arg.slice("--description=".length);
            continue;
        }

        if (arg.startsWith("--order=")) {
            const value = Number(arg.slice("--order=".length));
            options.order = Number.isNaN(value) ? null : value;
            continue;
        }

        positional.push(arg);
    }

    return options;
}

function combineFilesIntoChapter(options: CliOptions): void {
    if (!options.slug || !options.title || !options.description || options.order === null) {
        console.error("Combine mode requires --slug, --title, --description, and --order.");
        process.exit(1);
    }

    if (options.positional.length === 0) {
        console.error("Combine mode requires at least one markdown file path.");
        process.exit(1);
    }

    const resolvedFiles = options.positional.map((filePath) => path.resolve(filePath));

    for (const filePath of resolvedFiles) {
        if (!fs.existsSync(filePath)) {
            console.error(`Source file not found: ${filePath}`);
            process.exit(1);
        }
    }

    const combinedSource = resolvedFiles
        .map((filePath) => fs.readFileSync(filePath, "utf-8").trim())
        .join("\n\n---\n\n");

    const frontmatter = [
        "---",
        `title: \"${options.title.replace(/\"/g, '\\\"')}\"`,
        `slug: \"${options.slug}\"`,
        `description: \"${options.description.replace(/\"/g, '\\\"')}\"`,
        `order: ${options.order}`,
        "is_free: true",
        'price_tier: "free"',
        "price_usd: 0",
        "---",
        "",
    ].join("\n");

    const outputPath = path.join(CONTENT_DIR, `${options.slug}.mdx`);
    fs.writeFileSync(outputPath, frontmatter + combinedSource + "\n", "utf-8");
    console.log(`✓ Combined ${resolvedFiles.length} files → ${options.slug}.mdx`);
}

// ── CLI Entry Point ────────────────────────────────────────

const args = process.argv.slice(2);
const options = parseCliOptions(args);

// Ensure output dir exists
if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

if (options.combine) {
    combineFilesIntoChapter(options);
    console.log("\n✅ Done! Combined chapter written to content/chapters/\n");
    process.exit(0);
}

const sourceDir = options.positional[0];

if (!sourceDir) {
    console.error("Usage: npx tsx scripts/md-to-mdx.ts <source-dir> [--slug-prefix=<prefix>] [--order-start=<n>]");
    console.error("Example: npx tsx scripts/md-to-mdx.ts ./raw-chapters --slug-prefix=equity-valuation");
    console.error("Combine: npx tsx scripts/md-to-mdx.ts --combine --slug=<slug> --title=\"<title>\" --description=\"<desc>\" --order=<n> <file1.md> <file2.md> ...");
    process.exit(1);
}

const resolvedDir = path.resolve(sourceDir);
if (!fs.existsSync(resolvedDir)) {
    console.error(`Source directory not found: ${resolvedDir}`);
    process.exit(1);
}

const mdFiles = fs.readdirSync(resolvedDir).filter((f) => f.endsWith(".md") && f !== "README.md");

if (mdFiles.length === 0) {
    console.error(`No .md files found in ${resolvedDir}`);
    process.exit(1);
}

console.log(`\n📖 Converting ${mdFiles.length} chapters from ${resolvedDir}\n`);

mdFiles.forEach((file, idx) => {
    processFile(path.join(resolvedDir, file), options.slugPrefix, options.orderStart + idx);
});

console.log(`\n✅ Done! ${mdFiles.length} files written to content/chapters/\n`);
