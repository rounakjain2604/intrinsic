# Raw Chapters

Place raw `.md` chapter files here. Then run the conversion pipeline:

```bash
npx tsx scripts/md-to-mdx.ts ./raw-chapters
```

## Options

- `--slug-prefix=<prefix>` — prepend a prefix to the generated slug (e.g., `--slug-prefix=equity-valuation`)
- `--order-start=<n>` — starting order index (default: 100)

## Format

Your `.md` files should use standard markdown:

- `# Heading` for the chapter title (becomes frontmatter `title`)
- `## Heading` for sections
- `**bold text**` for emphasis
- Tables, lists, code blocks all work
- Use `> **Exam Tip:** ...` for exam tips
- Use `> **Key Concept:** ...` for key concepts
- Use `> **Warning:** ...` for warnings
- Use ` ```formula Label ` code blocks for formula sections

All chapters are set to `is_free: true` by default.
