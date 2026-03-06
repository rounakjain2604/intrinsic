# Repository Structure

## Current Layout

```text
app/           App Router pages, layouts, and API routes
components/    Reusable UI grouped by feature area
content/       MDX chapter source files
docs/          Internal project documentation
lib/           Data access, MDX loading, validation, utilities, shared types
public/        Static assets
```

## Folder Roles

### `app/`

- Route segments and layouts live here.
- Server-first logic should stay here when it is tied to page rendering or route handlers.

### `components/`

- `chapter/` contains reader-specific components and interactive study elements.
- `charts/` contains chart-only visuals.
- `dashboard/` contains chapter library UI.
- `landing/` contains marketing-page sections.
- `shared/` contains cross-app UI such as navigation and shared loading states.

### `content/chapters/`

- One MDX file per chapter.
- The filename should match the chapter slug.

### `lib/`

- `chapters.ts` owns chapter access and progress queries.
- `mdx.tsx` owns MDX compilation and chapter content loading.
- `schemas.ts` owns runtime validation.
- `types.ts` owns shared chapter/content-facing TypeScript types.
- `constants.ts` owns shared product constants.
- `supabase/` owns data clients and user sync helpers.

## Naming Guidance

- Keep route and feature groupings intact.
- Prefer singular-purpose files over overloaded utility files.
- Avoid creating a second source of truth for shared types or product constants.

## Low-Risk Next Cleanup

- If more schema or migration files are added, consider moving [supabase-schema.sql](../supabase-schema.sql) into a dedicated `supabase/` or `database/` folder.
- If the component naming around `PlayableFormula` and `BondPricePlayable` becomes confusing in practice, normalize it in one rename pass instead of mixing patterns gradually.