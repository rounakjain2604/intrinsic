# Content Guide

## Chapter Source

Chapters live in [content/chapters](../content/chapters). The current reference implementation is [content/chapters/ethics.mdx](../content/chapters/ethics.mdx).

## File Rules

- One file per chapter.
- Use the chapter slug as the filename.
- Keep frontmatter at the top of the file.
- Prefer long-form teaching content over terse bullet dumps.
- Use the `<!-- paid-content -->` marker in paid chapters to split the public preview from the locked section.

## Required Frontmatter

```yaml
---
title: "Ethics and Professional Standards"
slug: "ethics"
description: "The foundation of everything in CFA — understand the code, standards, and how they apply under exam pressure."
order: 1
is_free: true
price_tier: "free"
price_usd: 0
---
```

## Supported Custom Components

- `<Callout />`
- `<FormulaBlock />`
- `<DCFDiagram />`
- `<BondPricePlayable />`
- `<YieldCurveChart />`

These are registered in [lib/mdx.tsx](../lib/mdx.tsx).

## Paywall Marker

For paid chapters, add this marker exactly once where the free preview should end:

```md
<!-- paid-content -->
```

Everything above the marker is compiled as the public teaser. Everything below it remains locked until the user has access. If the marker is missing, the chapter fails closed and shows no preview rather than leaking the full content.

## Heading Rules

- Use `##` and `###` headings for sections that should appear in the table of contents.
- Avoid skipping directly from `##` to `####`.
- Heading text becomes the generated anchor ID.

## Content Quality Notes

- Explain the why behind the concept, not only the definition.
- Use worked logic, frameworks, and scenario-based questions where possible.
- Keep diagrams and interactives tied to the concept being taught, not added decoratively.

## Current Content Status

- Only the ethics chapter exists today.
- Use [content/chapters/_chapter-template.mdx](../content/chapters/_chapter-template.mdx) as the starting point for new chapters.
- The MDX pipeline is ready for more chapters without structural changes.