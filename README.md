# Intrinsic

Intrinsic is a visual-first CFA Level 2 study notes app built with Next.js, Clerk, Supabase, and MDX. The product direction is warm, editorial, and diagram-heavy rather than quiz-first or dashboard-first.

## Current State

- Overall completion is roughly 70–75%.
- The core app loop exists: auth, chapter access, MDX rendering, dashboard aggregation, progress tracking, email capture persistence, and checkout/webhook scaffolding.
- The main missing work is chapter content volume, production polish, and deployment configuration with real Lemon variant IDs.

## Key Paths

- [app](./app) for routes, layouts, and API handlers
- [components](./components) for feature-grouped UI
- [content/chapters](./content/chapters) for MDX chapter sources
- [lib](./lib) for data access, MDX loading, shared types, constants, and validation
- [docs](./docs) for internal project documentation

## Local Setup

1. Install dependencies with `npm install`.
2. Copy [.env.example](./.env.example) to `.env.local` and fill in the required values.
3. Apply [supabase-schema.sql](./supabase-schema.sql) to your Supabase project.
4. Start the app with `npm run dev`.

## Required Services

- Clerk for authentication
- Supabase for users, chapters, purchases, and progress
- Vercel for deployment
- Lemon Squeezy for per-chapter checkout

## Documentation

- [docs/INDEX.md](./docs/INDEX.md)
- [docs/PRODUCT_RULES.md](./docs/PRODUCT_RULES.md)
- [docs/TECH_STACK.md](./docs/TECH_STACK.md)
- [docs/STRUCTURE.md](./docs/STRUCTURE.md)
- [docs/CONTENT_GUIDE.md](./docs/CONTENT_GUIDE.md)
- [docs/BUILD_STATUS.md](./docs/BUILD_STATUS.md)

## Known Gaps

- Only [content/chapters/ethics.mdx](./content/chapters/ethics.mdx) exists today.
- Checkout and webhook flows now exist, but they require Lemon Squeezy environment variables and real variant IDs in the `chapters.lemon_product_id` column.
- Paid chapter previews only show teaser content when the MDX file includes the `<!-- paid-content -->` marker.
- Content volume is still the main missing deliverable.
