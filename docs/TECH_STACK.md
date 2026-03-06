# Tech Stack

## Current Versions

- Next.js `16.1.6`
- React `19.2.3`
- TypeScript `5.9.3`
- Tailwind CSS `v4`
- Clerk for auth
- Supabase for app data
- Framer Motion for animation
- `next-mdx-remote` for MDX chapter rendering

## Next.js Notes

- `params` and `searchParams` must be awaited in App Router pages.
- `headers()` and `cookies()` are async APIs.
- The repository currently uses [middleware.ts](../middleware.ts) for Clerk protection. Keep that implementation stable unless there is a specific migration reason.

## React Notes

- React Compiler is available through React 19.
- Do not add `useMemo` or `useCallback` by default unless profiling or an existing pattern justifies it.

## Tailwind Notes

- This repo uses Tailwind v4.
- Theme customization belongs in [app/globals.css](../app/globals.css) via CSS theme tokens rather than a `tailwind.config.ts` file.

## Rendering Model

- Server Components are the default.
- Use client components only for browser-only state, effects, animations, or interactions.
- Chapter content is rendered from MDX and hydrated with a small set of custom components.

## Data and Auth Flow

- Clerk owns authentication.
- `syncUser()` in [lib/supabase/syncUser.ts](../lib/supabase/syncUser.ts) performs just-in-time user creation in Supabase.
- Chapter access decisions are made server-side in [lib/chapters.ts](../lib/chapters.ts).
- Progress writes are handled by [app/api/progress/route.ts](../app/api/progress/route.ts).

## Known Implementation Gaps

- Lemon Squeezy checkout and webhook routes are implemented, but they still require real deployment configuration.
- Content authoring is the remaining bottleneck.
- Production polish such as error boundaries and explicit success states still needs a final pass.