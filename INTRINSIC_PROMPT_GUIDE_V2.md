# INTRINSIC — PROMPT BY PROMPT BUILD GUIDE (V2)
### Restructured Roadmap — 8 Phases, Zero Dummy Data
> Read the rules below once. Then never deviate from the session structure.

---

## ⚠️ VERSION NOTES — READ FIRST

**This project runs Next.js 16, React 19, and Tailwind CSS v4.** Three things are different from older tutorials:

**Next.js 16:** In every page component that reads from the URL (like `app/chapters/[slug]/page.tsx`), `params` is a **strictly async Promise**. You must write `const { slug } = await params` at the top — never `params.slug` directly. Similarly, `headers()` and `cookies()` are async. `middleware.ts` is replaced by `proxy.ts`. Turbopack is the default bundler.

**React 19 + React Compiler:** React Compiler is stable. Automatic memoization means you should stop manually wrapping in `useMemo`/`useCallback` unless profiling shows a need.

**Tailwind CSS v4:** There is no `tailwind.config.ts` file. All custom colors and fonts live in the `@theme { }` block inside `globals.css`. If the AI ever tries to create a `tailwind.config.ts`, tell it: *"This is Tailwind v4 — use @theme in globals.css instead."*

---

## HOW TO USE THIS DOCUMENT

Every session follows the same three-step structure without exception:

**Step 1 — Open a new chat in Cursor or Antigravity**
**Step 2 — Paste the SESSION HEADER (below) + the specific prompt for that session**
**Step 3 — When it's done and working in the browser, push to GitHub (auto-deploys to trinsic.space)**

The SESSION HEADER is pasted at the start of EVERY prompt. Every single one. It replaces your SKILL.md in the coding environment because it's the condensed version the AI needs to write code.

**After every session:** Push to GitHub. Verify the change is live on trinsic.space. This catches deployment issues early instead of Phase 9.

---

## THE SESSION HEADER
### Copy this block and paste it before EVERY prompt below

```
PROJECT: Intrinsic — CFA Level 2 visual notes app at trinsic.space
STACK: Next.js 16 App Router, TypeScript, React 19, Tailwind CSS v4, Shadcn/ui, Clerk, Supabase, Lemon Squeezy, Vercel
FONTS: Lora (serif headings) + DM Sans (body) + DM Mono (code) via next/font/google
DESIGN: Warm cream aesthetic. Background #FAF8F5. Cards: bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl shadow-[0_2px_12px_rgba(45,42,38,0.06)]. Primary CTA color: coral #E8694A. Text: #2D2A26 primary, #6B6560 secondary. Hand-drawn SVG style with crayon colors for all diagrams.
RULES:
- Next.js 16: params and searchParams are strictly async Promises. ALWAYS write: const { slug } = await params
- Next.js 16: headers() and cookies() are async. ALWAYS write: const h = await headers()
- Next.js 16: proxy.ts replaces middleware.ts — NEVER create middleware.ts
- React Compiler is stable — do NOT manually use useMemo/useCallback unless profiling shows a need
- Tailwind v4: NO tailwind.config.ts file. All theme customization is in @theme block in globals.css
- One component per file, always in /components
- Server Components by default. Only use 'use client' for useState, useEffect, or event handlers
- Never use <img> — always Next.js <Image>
- Access control is always server-side, never client-side
- Fix only what is asked. Do not refactor working code.
- Never suggest paid tools or services outside the current stack
CURRENT TASK:
```

---

## ROADMAP OVERVIEW

| Phase | Goal | Sessions | Status |
|---|---|---|---|
| **1** | Foundation + First Deploy | 1.1 – 1.2 | ✅ DONE |
| **2** | Shared UI + Landing Page | 2.1 – 2.6 | 🔄 IN PROGRESS |
| **3** | Auth + Database + Progress | 3.1 – 3.5 | ⬜ |
| **4** | Chapter Reader + Real Access | 4.1 – 4.6 | ⬜ |
| **5** | Diagrams + Charts + Interactive | 5.1 – 5.4 | ⬜ |
| **6** | Payments + Full Access Bundle | 6.1 – 6.5 | ⬜ |
| **7** | Content Sprint | 7.1 – 7.5 | ⬜ |
| **8** | SEO + Analytics + Responsive Polish | 8.1 – 8.4 | ⬜ |

**Total sessions: ~34. Total hours: 28–38.**

---

---

# PHASE 1 — FOUNDATION + FIRST DEPLOY
## ✅ COMPLETED
### What was done:
- Next.js 16 project initialized with TypeScript, Tailwind v4, App Router
- Shadcn/ui installed and configured
- Fonts loaded: Lora (serif), DM Sans (body), DM Mono (code) via next/font/google
- Color tokens and animations added to globals.css with @theme block
- Warm paper atmosphere (radial gradient + noise texture) added to layout.tsx
- Navbar component built (sticky, Intrinsic logo, nav links, Sign In / Get Started buttons)
- Footer component built (legal disclaimer, CFA Institute notice)
- Code pushed to GitHub, linked to Vercel, hosting at trinsic.space

---

---

# PHASE 2 — SHARED UI + LANDING PAGE
## Goal: Full landing page deployed at trinsic.space, looking polished.

---

### Session 2.1 — Badge Component

**Paste this (after SESSION HEADER):**
```
Build components/shared/Badge.tsx — a reusable badge for chapter access states.

It accepts a "variant" prop with four options: "free" | "premium" | "locked" | "standard"

Styles for each variant (all use DM Sans, text-xs, font-semibold, rounded-full, px-3 py-1):
- free: text-[#5B9E6F] bg-[#5B9E6F]/10 border border-[#5B9E6F]/25 — label: "FREE"
- premium: text-[#D4882A] bg-[#D4882A]/10 border border-[#D4882A]/25 — label: "PREMIUM · $14.99"
- standard: text-[#4A7FC1] bg-[#4A7FC1]/10 border border-[#4A7FC1]/25 — label: "$9.99"
- locked: text-[#A09890] bg-[#2D2A26]/5 border border-[#2D2A26]/10 — label: "LOCKED"

Also build components/shared/Skeleton.tsx — loading placeholder components:
1. SkeletonCard — a card-shaped skeleton matching our chapter card dimensions (rounded-2xl, ~280px height)
2. SkeletonText — a text line skeleton, accepts a "width" prop like "w-3/4" or "w-full"
3. SkeletonGrid — renders 6 SkeletonCard components in a responsive grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3)

All skeletons use: bg-[#EDE8DF] animate-pulse rounded-xl

Show me both complete files with proper TypeScript types.
```

**Commit message:** `phase-2: add Badge and Skeleton components`

---

### Session 2.2 — Hero Section

**Paste this (after SESSION HEADER):**
```
Build components/landing/Hero.tsx — the landing page hero section.

This is the most important component. It must look exceptional.

Layout: full viewport height on desktop, centered content, max-w-4xl mx-auto.

Content top to bottom:
1. Small eyebrow label: "CFA Level 2 · Visual Notes" in text-xs DM Sans uppercase tracking-widest text-[#A09890]

2. Main headline in Lora serif, text-5xl md:text-6xl font-bold text-[#2D2A26] leading-tight:
   "Finally understand CFA Level 2."
   
3. Subheadline in DM Sans text-xl text-[#6B6560] leading-relaxed max-w-2xl:
   "Visual notes built from real study sessions. Hand-drawn diagrams. Crayon-color concepts. 5 chapters free, forever."

4. Two buttons side by side:
   - Primary: "Start Learning Free" in coral filled style (bg-[#E8694A] text-[#FAF8F5] px-8 py-4 rounded-xl font-semibold text-base shadow-[0_2px_8px_rgba(232,105,74,0.25)] hover:bg-[#D45E40])
   - Secondary: "See all chapters" in outline style (border border-[#2D2A26]/20 text-[#2D2A26] px-8 py-4 rounded-xl font-medium text-base hover:border-[#2D2A26]/40)

5. Below buttons: small social proof line in text-sm text-[#A09890]:
   "Join students studying smarter for CFA Level 2"

Animation: each element fades up with staggered delays using the animate-fade-up and delay-X classes from globals.css.

This is a Server Component. No 'use client' needed.
Show me the complete component.
```

**Commit message:** `phase-2: add Hero section component`

---

### Session 2.3 — Chapter Preview Cards

**Paste this (after SESSION HEADER):**
```
Build components/landing/ChapterPreview.tsx — a section showing 3 free chapter preview cards.

Section heading in Lora serif: "Start with these. Free forever."
Subheading in DM Sans: "No account needed. Just open and read."

Below: a responsive grid (grid-cols-1 md:grid-cols-3 gap-6) showing 3 hardcoded chapter cards.

Each card uses our standard card style: bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)] hover:shadow-[0_4px_20px_rgba(45,42,38,0.10)] transition-all duration-200

Each card contains:
- Badge component with variant="free" at the top
- Chapter title in DM Sans font-semibold text-[#2D2A26]
- Short description in text-sm text-[#6B6560]
- A small decorative icon (use a simple SVG — a book, chart, or scale depending on chapter)
- "Read Chapter →" link in text-sm text-[#E8694A] font-medium at the bottom

The 3 chapters to show:
1. "Ethics and Professional Standards" — "The foundation of CFA. The code, the standards, and how to apply them under exam pressure."
2. "Equity Valuation: Concepts and Basics" — "DCF, multiples, and how to think about what a company is actually worth."  
3. "Economics: Macro and Monetary Policy" — "Interest rates, currency effects, and what central banks actually do to markets."

Server Component. Show me the complete file.
```

**Commit message:** `phase-2: add ChapterPreview section`

---

### Session 2.4 — Pricing Section

**Paste this (after SESSION HEADER):**
```
Build components/landing/PricingSection.tsx — the pricing explanation section.

Heading in Lora serif: "Pay for what you need. Nothing else."
Subheading: "No subscriptions. No bundles. Buy a chapter, keep it forever."

Show two side-by-side cards (max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6):

Card 1 — Free tier:
- Title: "Free Forever"
- Price: "$0"
- Feature list (5 items): 5 full chapters, No account required to read, Visual diagrams included, Exam callout boxes, Progress tracking with account
- CTA button: "Start Reading Free" (coral filled)
- Card style: standard card

Card 2 — Per Chapter:
- Title: "Per Chapter"  
- Price: "From $9.99"
- Subtitle: "$14.99 for advanced chapters"
- Feature list: Everything in free, Full chapter content unlocked, Practice questions, Lifetime access, All future updates to that chapter
- CTA button: "Browse All Chapters" (coral outlined)
- Card style: featured card with coral border: bg-[#F5F1EA] border border-[#E8694A]/30 rounded-2xl p-6 shadow-[0_2px_12px_rgba(232,105,74,0.08)]

Below both cards in small text text-xs text-[#A09890] centered:
"Secure checkout via Lemon Squeezy. One-time payment. Instant access."

Server Component. Show me the complete file.
```

**Commit message:** `phase-2: add Pricing section`

---

### Session 2.5 — Email Capture

**Paste this (after SESSION HEADER):**
```
Build components/landing/EmailCapture.tsx — an email signup section for visitors who don't buy yet.

This goes below PricingSection on the landing page.

Layout: max-w-xl mx-auto, centered text, warm card background.

Content:
- Heading in Lora serif text-2xl: "Not ready to start? Get free study tips."
- Subtext in DM Sans text-sm text-[#6B6560]: "One email per week. CFA insights. No spam, ever."
- Horizontal form: email input + submit button side by side
  - Input: rounded-xl border border-[#2D2A26]/10 bg-white/60 px-4 py-3 text-sm placeholder "your@email.com"
  - Button: "Subscribe" coral filled, rounded-xl px-6 py-3

For now, just log the email to console on submit. We will connect to Supabase email_subscribers table in Phase 3.

Use 'use client' for form handling. Show me the complete component.
```

**Commit message:** `phase-2: add EmailCapture component`

---

### Session 2.6 — Assemble Landing Page

**Paste this (after SESSION HEADER):**
```
Update app/page.tsx to assemble the full landing page using the components we built.

Import and render in this order:
1. Hero
2. ChapterPreview (add section padding py-24)
3. PricingSection (add section padding py-24)
4. EmailCapture (add section padding py-24 with bg-[#F5F1EA] full-width background)

Add a subtle horizontal divider between sections: <hr className="border-t border-[#2D2A26]/6 max-w-5xl mx-auto" />

The overall page should have no horizontal overflow. Everything should be contained.

Also add a generateMetadata export at the top:
- title: "Intrinsic — CFA Level 2 Visual Notes"
- description: "Visual CFA Level 2 study notes with hand-drawn diagrams. 5 chapters free forever."

Show me the complete updated app/page.tsx.
```

**What success looks like:** Full landing page visible at trinsic.space with Hero, chapter previews, pricing, and email capture. Coral CTA buttons have warm shadows. Cards feel paper-like.

**Commit message:** `phase-2: assemble full landing page`

---

---

# PHASE 3 — AUTH + DATABASE + PROGRESS TRACKING
## Goal: Login works. Database is live. Progress is tracked. No dummy data anywhere.

> **Why this order matters:** The old guide built auth with dummy data, then replaced it with Supabase 3 phases later. This version sets up both together so you never write code twice.

---

### Session 3.1 — Install Clerk + Configure proxy.ts

**Paste this (after SESSION HEADER):**
```
Help me install and configure Clerk authentication in this Next.js 16 App Router project.

1. Install: npm install @clerk/nextjs

2. Create app/proxy.ts (NOT middleware.ts — Next.js 16 uses proxy.ts instead) that protects /dashboard and /chapters routes. Public routes are: /, /sign-in, /sign-up, and anything starting with /api/webhook.

   If Clerk's Next.js 16 API doesn't support proxy.ts yet, use their recommended alternative. The intent is: protect everything except the public routes listed.

3. Wrap the app in ClerkProvider in app/layout.tsx. The ClerkProvider wraps everything inside the body.

4. Create app/(auth)/sign-in/[[...sign-in]]/page.tsx — a centered sign-in page using Clerk's <SignIn /> component. Style the page with our cream background #FAF8F5 and centered content.

5. Create app/(auth)/sign-up/[[...sign-up]]/page.tsx — same pattern with <SignUp />.

6. Tell me exactly which environment variables I need to create in a .env.local file and where to get them from (Clerk dashboard).

Do not touch any existing components. Show me each new file in full.
```

**Commit message:** `phase-3: install Clerk and configure route protection`

---

### Session 3.2 — Supabase Setup + Schema

**Paste this (after SESSION HEADER):**
```
Help me connect Supabase to this Next.js 16 project.

1. Install: npm install @supabase/supabase-js

2. Create lib/supabase/server.ts — a Supabase client for use in Server Components:
   Uses SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars. Export as createServerClient()

3. Create lib/supabase/client.ts — a Supabase client for use in Client Components:
   Uses NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY env vars. Export as createBrowserClient()

4. Show me the exact SQL to run in Supabase's SQL editor to create these tables:

   Table 1: users
   - id: uuid primary key default gen_random_uuid()
   - clerk_id: text unique not null
   - email: text not null
   - created_at: timestamptz default now()
   - updated_at: timestamptz default now()

   Table 2: chapters
   - id: uuid primary key default gen_random_uuid()
   - slug: text unique not null
   - title: text not null
   - description: text
   - order_index: integer
   - is_free: boolean default false
   - price_tier: text check (price_tier in ('free','standard','premium'))
   - price_usd: decimal(5,2)
   - lemon_product_id: text
   - published: boolean default false
   - created_at: timestamptz default now()
   - updated_at: timestamptz default now()

   Table 3: purchases
   - id: uuid primary key default gen_random_uuid()
   - user_id: uuid references users(id)
   - chapter_id: uuid references chapters(id)
   - lemon_order_id: text unique
   - purchased_at: timestamptz default now()
   - unique(user_id, chapter_id)

   Table 4: email_subscribers
   - id: uuid primary key default gen_random_uuid()
   - email: text unique not null
   - created_at: timestamptz default now()

   Also add auto-update triggers for updated_at on users and chapters tables.

5. Give me the SQL INSERT statements to seed the chapters table with these 8 chapters:
   - Ethics (free), Quant Methods (free), Economics (free), Equity Basics (free), Fixed Income Overview (free)
   - Financial Statement Analysis (standard, $9.99)
   - Derivatives (premium, $14.99)
   - Alternative Investments (premium, $14.99)
   Set published=true for all.

6. Tell me the 4 environment variables I need to add to .env.local.

Show me each file in full and the complete SQL.
```

**Commit message:** `phase-3: add Supabase client setup, schema SQL, and seed data`

---

### Session 3.3 — JIT User Sync + Chapter Access Logic

**Paste this (after SESSION HEADER):**
```
Build two critical files:

FILE 1: lib/supabase/syncUser.ts — the Just-in-Time user sync function.

This ensures a user always exists in Supabase even if the Clerk webhook failed.

import { currentUser } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/server'

Export an async function syncUser() that:
1. Gets the current Clerk user with currentUser()
2. If no user, returns null
3. Queries Supabase users table for a row where clerk_id = clerkUser.id
4. If found, returns the Supabase user's id (uuid)
5. If NOT found, inserts a new row with clerk_id and email, returns the new id
6. Uses try/catch and logs any errors without throwing

This function must be called at the top of every server page and API route that needs user identity.

FILE 2: lib/chapters.ts — chapter data and access logic (using real Supabase, no dummy data).

Export these functions:
1. getAllChapters() — fetches all published chapters from Supabase ordered by order_index. Returns the chapter array.
2. getChapterBySlug(slug: string) — fetches a single chapter by slug. Returns the chapter or null.
3. hasChapterAccess(userId: string | null, chapterId: string): Promise<boolean>
   - If userId is null, only return true for is_free chapters
   - If chapter.is_free is true, return true immediately
   - Otherwise query purchases table for a row matching user_id AND chapter_id
   - Return true if purchase row exists, false otherwise
4. getUserPurchasedChapterIds(userId: string): Promise<string[]>
   - Returns an array of chapter IDs the user has purchased

All functions use createServerClient() from lib/supabase/server.ts.
Show me both complete files.
```

**Commit message:** `phase-3: add JIT user sync and chapter access logic`

---

### Session 3.4 — Dashboard with Real Data

**Paste this (after SESSION HEADER):**
```
Build the dashboard page and chapter card component using REAL Supabase data (no dummy data).

FILE 1: components/dashboard/ChapterCard.tsx — a card showing a single chapter.

Props:
- title: string
- description: string  
- slug: string
- accessState: "free" | "purchased" | "locked"
- priceTier: "free" | "standard" | "premium"
- priceUsd: number

Card style: bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)] hover:shadow-[0_4px_20px_rgba(45,42,38,0.10)] transition-all duration-200

Card content top to bottom:
1. Top row: Badge component (use accessState for variant) floated right
2. Chapter title: DM Sans font-semibold text-[#2D2A26] text-lg
3. Description: text-sm text-[#6B6560] leading-relaxed (2 lines max, overflow hidden)
4. Bottom: conditional button based on accessState:
   - free: coral filled "Read Chapter →" as a Next.js Link to /chapters/[slug]
   - purchased: coral outlined "Read Chapter →" as a Link
   - locked: shows the price ("$9.99" or "$14.99") and an "Unlock Chapter" button (ghost style)

If accessState is "locked", add a subtle lock icon (simple SVG padlock, 16px, color #A09890) next to the title.

FILE 2: app/dashboard/page.tsx — the protected dashboard page.

This is a server component. Steps:
1. Call syncUser() to get the Supabase userId. If null, redirect to /sign-in.
2. Call getAllChapters() to get real chapter data from Supabase.
3. Call getUserPurchasedChapterIds(userId) to get what the user has bought.
4. Derive accessState for each chapter: 'free' if is_free, 'purchased' if in purchasedIds, 'locked' otherwise.
5. Render a responsive grid of ChapterCards with real data.

Page heading in Lora serif: "Your Chapters"
Subheading in DM Sans: "5 chapters free forever. Unlock more as you go."
Grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6

Show me both complete files.
```

**What success looks like:** Sign in at trinsic.space → redirected to /dashboard → see 8 chapter cards with real data from Supabase. Free chapters show "FREE" badge. Locked chapters show price.

**Commit message:** `phase-3: add dashboard page with real Supabase data`

---

### Session 3.5 — Progress Tracking ("Mark as Mastered")

**Paste this (after SESSION HEADER):**
```
Add chapter progress tracking so users can mark chapters as mastered.

STEP 1: Run this SQL in Supabase to create the user_progress table:

CREATE TABLE user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) NOT NULL,
  chapter_id UUID REFERENCES chapters(id) NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, chapter_id)
);

STEP 2: Add two functions to lib/chapters.ts:

1. toggleChapterComplete(userId: string, chapterId: string): Promise<boolean>
   - Checks if a row exists in user_progress for this user+chapter
   - If exists: DELETE the row, return false (unmarked)
   - If not exists: INSERT a row, return true (marked complete)

2. getUserProgress(userId: string): Promise<{ chapterId: string, completedAt: string }[]>
   - Returns all completed chapters for this user from user_progress table

STEP 3: Create app/api/progress/route.ts — a POST API route:
   - Reads { chapterId } from request body
   - Calls syncUser() to get userId
   - Calls toggleChapterComplete(userId, chapterId)
   - Returns { completed: boolean } as JSON

STEP 4: Build components/chapter/MarkAsMastered.tsx — a 'use client' component:
   - Props: chapterId (string), initialCompleted (boolean)
   - Renders a button at the bottom of the chapter:
     - If not completed: "Mark Chapter as Mastered" with a subtle green outline style (border border-[#5B9E6F] text-[#5B9E6F] rounded-xl px-6 py-3)
     - If completed: "✓ Mastered" with filled green style (bg-[#5B9E6F] text-[#FAF8F5] rounded-xl px-6 py-3) and a subtle checkmark animation
   - On click: calls POST /api/progress with chapterId, toggles state optimistically
   - Add a satisfying scale + opacity micro-animation on state change

STEP 5: Update app/dashboard/page.tsx:
   - Call getUserProgress(userId) to get completed chapter IDs
   - Above the chapter grid, add a progress bar:
     - Label: "[X] / [total] Chapters Mastered" in DM Sans text-sm text-[#6B6560]
     - Bar: rounded-full h-2 bg-[#EDE8DF] with inner fill bg-[#5B9E6F] transition-all duration-500
     - Width of green fill = (completed / total) * 100%
   - Pass completed state to each ChapterCard as a prop

Show me all new and updated files.
```

**What success looks like:** Dashboard shows "3 / 8 Chapters Mastered" with a green progress bar. Each chapter has a "Mark as Mastered" button at the bottom. Clicking it toggles with a satisfying animation.

**Commit message:** `phase-3: add progress tracking with mark-as-mastered`

---

---

# PHASE 4 — CHAPTER READER + REAL ACCESS
## Goal: Reading a chapter feels premium. Free chapters open, paid chapters blurred.

---

### Session 4.1 — Install MDX + Zod Validation + Chapter Helper

**Paste this (after SESSION HEADER):**
```
Help me set up MDX support in this Next.js 16 App Router project using next-mdx-remote, plus Zod validation for chapter frontmatter.

1. Install: npm install next-mdx-remote zod

2. Create lib/schemas.ts — a Zod schema for chapter MDX frontmatter:
   Use z.object with these fields:
   - title: z.string()
   - slug: z.string()
   - description: z.string().optional()
   - is_free: z.boolean()
   - price_tier: z.enum(["free", "standard", "premium"])
   - price_usd: z.number()
   - order: z.number().optional()
   Export as chapterFrontmatterSchema.

3. Update lib/chapters.ts to add a function:
   getChapterMDX(slug: string) — reads the MDX file from /content/chapters/[slug].mdx, returns the raw MDX string. If file not found, returns null.
   After reading the file, parse the frontmatter using gray-matter (npm install gray-matter) and validate it against chapterFrontmatterSchema using .safeParse().
   If validation fails, log a clear error: "[MDX] Invalid frontmatter in [slug].mdx: [error details]" and return null.
   This catches typos in frontmatter during development instead of crashing in production.

4. Create the /content/chapters/ directory and add one sample MDX file: ethics.mdx
   Frontmatter: title, slug, description, is_free: true, price_tier: free, price_usd: 0
   Body: 3 sections of realistic CFA Ethics content (not lorem ipsum):
   - Overview (what ethics means in CFA)
   - Key Concepts with 3 sub-sections
   - A formula-like structure: "Standard IV(A): Loyalty, Prudence and Care"

5. Show me lib/schemas.ts, the updated lib/chapters.ts, and the sample ethics.mdx file.
```

**Commit message:** `phase-4: install MDX + Zod validation and create ethics chapter`

---

### Session 4.2 — Custom MDX Components

**Paste this (after SESSION HEADER):**
```
Build two custom MDX components:

FILE 1: components/chapter/Callout.tsx
Accepts type ("exam-tip" | "key-concept") and children.
- exam-tip: border-l-4 border-[#E8694A] bg-[#E8694A]/6 rounded-r-xl p-5. Label "Exam Tip" in text-xs font-semibold text-[#E8694A] uppercase.
- key-concept: border-l-4 border-[#5B9E6F] bg-[#5B9E6F]/6 rounded-r-xl p-5. Label "Key Concept" in text-xs font-semibold text-[#5B9E6F] uppercase.
Content in text-sm text-[#2D2A26] leading-relaxed.

FILE 2: components/chapter/FormulaBlock.tsx
Accepts label (string) and children.
Renders: bg-[#EDE8DF] rounded-2xl p-6 font-mono text-[#2D2A26] border border-[#2D2A26]/8.
Label shown above formula in text-xs text-[#6B6560] uppercase tracking-wide font-semibold mb-2.
Content in text-sm leading-relaxed overflow-x-auto.

Show me both complete components. Server Components — no 'use client' needed.
```

**Commit message:** `phase-4: add Callout and FormulaBlock MDX components`

---

### Session 4.3 — Table of Contents

**Paste this (after SESSION HEADER):**
```
Build components/chapter/TableOfContents.tsx.

This component accepts a "headings" prop — an array of { id: string, text: string, level: number }.

It renders a sticky sidebar navigation showing chapter sections. Style:
- Sticky at top-24 on desktop
- Width: w-64
- Each heading is a link that scrolls to the section (href="#[id]")
- Active section highlighted with coral text-[#E8694A] and a left border-l-2 border-[#E8694A]
- Inactive: text-sm text-[#6B6560] hover:text-[#2D2A26]
- H2s are normal size. H3s are slightly indented (pl-3) and text-xs.

Use 'use client' and IntersectionObserver to track which section is currently visible and highlight it.

Show me the complete component.
```

**Commit message:** `phase-4: add TableOfContents with scroll tracking`

---

### Session 4.4 — Locked Section Component

**Paste this (after SESSION HEADER):**
```
Build components/chapter/LockedSection.tsx.

This wraps any content that should be paywalled on a paid chapter.

Props:
- children: React.ReactNode (the actual content to gate)
- chapterTitle: string
- priceUsd: number
- lemonCheckoutUrl: string (the Lemon Squeezy checkout URL)
- isUnlocked: boolean (if true, render children normally with no blur)

When isUnlocked is false:
- Render the children but apply: blur-sm select-none pointer-events-none overflow-hidden max-h-40
- Over the blurred content, position an absolute centered overlay card with:
  - A simple lock SVG icon in #A09890
  - Text: "Unlock [chapterTitle]" in Lora serif font-semibold text-[#2D2A26]
  - Price text: "$[priceUsd] · One-time · Lifetime access" in text-sm text-[#6B6560]
  - A coral CTA button: "Unlock This Chapter" that links to lemonCheckoutUrl (opens in same tab)
  - Below button: text-xs text-[#A09890]: "Secure checkout via Lemon Squeezy"
- The parent container is relative with overflow-hidden

When isUnlocked is true: render children with no modifications.

Use 'use client'. Show me the complete file.
```

**Commit message:** `phase-4: add LockedSection paywall component`

---

### Session 4.5 — Chapter Reader Layout

**Paste this (after SESSION HEADER):**
```
Build components/chapter/ChapterReader.tsx — the main reading layout wrapper.

This is a 'use client' component that wraps the chapter reading experience.

Props:
- title: string
- children: React.ReactNode (the rendered MDX content)
- headings: { id: string, text: string, level: number }[] (for the TOC)

Layout (desktop):
- Two column: left column is the TableOfContents (w-64 sticky), right column is the content (flex-1)
- Max width: max-w-5xl mx-auto
- Gap between columns: gap-16

Content column:
- Max width: max-w-2xl (readable line length)
- Chapter title: Lora serif text-4xl font-bold text-[#2D2A26] mb-8
- Content area prose-like styling:
  - All p tags: text-[#6B6560] leading-8 mb-6
  - All h2 tags: Lora serif text-2xl font-semibold text-[#2D2A26] mt-12 mb-4
  - All h3 tags: DM Sans text-xl font-semibold text-[#2D2A26] mt-8 mb-3
  - All code tags: DM Mono text-[#E8694A] bg-[#EDE8DF] px-2 py-0.5 rounded text-sm

Mobile: hide TableOfContents, show only content column full width.

Show me the complete component.
```

**Commit message:** `phase-4: add ChapterReader layout with TOC`

---

### Session 4.6 — Chapter Page Route (with Real Access Control)

**Paste this (after SESSION HEADER):**
```
Build app/chapters/[slug]/page.tsx — the chapter reading page with REAL access control from Supabase.

This is a server component. Steps:
1. IMPORTANT: Next.js 16 makes params a Promise. Start with: const { slug } = await params — do not use params.slug directly.
2. Call syncUser() to get the Supabase userId
3. Call getChapterBySlug(slug) to get the chapter from Supabase
4. If chapter not found, call notFound()
5. Call hasChapterAccess(userId, chapter.id) to check real access
6. Call getChapterMDX(slug) to read the MDX file
7. Parse the MDX using next-mdx-remote/rsc's compileMDX function
8. Pass custom components (Callout, FormulaBlock) to the MDX renderer
9. Extract headings from the MDX content for the TableOfContents
10. Render ChapterReader with the compiled content
11. If the chapter is NOT free AND not unlocked, wrap content in LockedSection (use a placeholder Lemon Squeezy URL for now: "#upgrade")

Also add generateMetadata export:
- title: "[Chapter Title] — CFA Level 2 | Intrinsic"
- description: chapter.description from Supabase

Show me the complete page file.
```

**What success looks like:** Navigate to /chapters/ethics → see it fully readable with TOC sidebar. Navigate to /chapters/derivatives → see content blurred with "Unlock" CTA. All data comes from Supabase.

**Commit message:** `phase-4: add chapter page with real Supabase access control`

---

---

# PHASE 5 — DIAGRAMS + CHARTS + INTERACTIVE
## Goal: One hand-drawn SVG diagram, one Recharts chart, and one interactive formula — all working beautifully.

---

### Session 5.1 — DCF Diagram

**Paste this (after SESSION HEADER):**
```
Build components/chapter/diagrams/DCFDiagram.tsx — a hand-drawn style SVG diagram showing how DCF valuation works.

The diagram should show a flow from top to bottom:
- Top: "Future Cash Flows" box (years 1-5 shown as 5 small boxes)
- Arrow down with label "Discount Rate (WACC)"
- Middle: "Present Value of Cash Flows" box
- Plus sign and "Terminal Value" box to the right
- Arrow down
- Bottom: "Enterprise Value = PV of FCFs + Terminal Value" in a highlighted box

Visual style — hand-drawn effect:
1. Add this SVG filter inside <defs>:
   <filter id="sketch">
     <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise"/>
     <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5"/>
   </filter>
2. Apply filter="url(#sketch)" to all rect and path elements
3. All boxes: fill="#FFFDF9" stroke="#2D2A26" strokeWidth="1.5" rx="8"
4. Bottom highlighted box: fill="#E8694A" fillOpacity="0.10" stroke="#E8694A" strokeWidth="2"
5. Arrows: stroke="#2D2A26" strokeOpacity="0.4" strokeWidth="1.5" with arrowhead marker
6. All text: fill="#2D2A26" fontFamily="DM Sans" fontSize="13"
7. Formula text in bottom box: fill="#E8694A" fontFamily="DM Mono" fontSize="12"

Props: { animated?: boolean, className?: string }
viewBox="0 0 560 380" width="100%"
Animate strokeDashoffset on connecting arrows when diagram enters viewport using IntersectionObserver.

Use 'use client'. Show me the complete component.
```

**Commit message:** `phase-5: add hand-drawn DCF valuation SVG diagram`

---

### Session 5.2 — PlayableFormula Interactive Component

**Paste this (after SESSION HEADER):**
```
Build components/chapter/PlayableFormula.tsx — an interactive formula component where users drag sliders and see outputs change in real-time.

Install Shadcn Slider first: npx shadcn@latest add slider

This is the component that makes Intrinsic impossible to replicate in a PDF.

Props:
- formulaName: string (displayed as title)
- inputs: Array<{ label: string, min: number, max: number, step: number, defaultValue: number, unit?: string }>
- calculateOutput: (values: Record<string, number>) => { label: string, value: string }[]
- chartData?: (values: Record<string, number>) => Array<{ x: number, y: number }>
- chartConfig?: { xLabel: string, yLabel: string, color: string }

Layout:
- Outer container: bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-6 shadow-[0_2px_12px_rgba(45,42,38,0.06)]
- Title: DM Sans text-sm font-semibold text-[#2D2A26] uppercase tracking-wide mb-4
- Left side (or top on mobile): Slider controls
  - Each slider has a label in text-xs text-[#6B6560] and current value in DM Mono text-sm text-[#E8694A] font-semibold
  - Use Shadcn Slider component with coral accent color
- Right side (or bottom on mobile): Results
  - Output values shown in DM Mono text-xl font-bold text-[#2D2A26]
  - If chartData is provided, render a small Recharts LineChart (h-[200px]) that updates reactively
  - Chart uses the same warm theme from globals.css

Create a demo instance alongside the component: BondPricePlayable.tsx
- Formula: Bond Price = C × [(1 - (1+r)^-n) / r] + FV / (1+r)^n
- Inputs: Coupon Rate (1-10%, step 0.25), Yield/Discount Rate (1-15%, step 0.25), Years to Maturity (1-30, step 1), Face Value (fixed 1000)
- Output: Bond Price, and whether it’s trading at Premium/Par/Discount
- Chart: Plot bond price vs. discount rate as user drags the rate slider (shows the inverse relationship visually)

Use 'use client'. Show me PlayableFormula.tsx and BondPricePlayable.tsx.
```

**Commit message:** `phase-5: add PlayableFormula interactive component with bond pricing demo`

---

### Session 5.3 — Yield Curve Chart

**Paste this (after SESSION HEADER):**
```
Build components/charts/YieldCurveChart.tsx — a Recharts line chart showing yield curves.

Install recharts first: npm install recharts

The chart shows three yield curves on the same chart:
- Normal curve (upward sloping): coral #E8694A
- Inverted curve (downward sloping): blue #4A7FC1  
- Flat curve (horizontal): amber #D4882A

Dummy data (X axis: maturity in years 0.25, 0.5, 1, 2, 3, 5, 7, 10, 20, 30):
Normal:  [3.2, 3.4, 3.8, 4.0, 4.1, 4.3, 4.5, 4.7, 4.9, 5.0]
Inverted:[5.5, 5.4, 5.2, 5.0, 4.8, 4.5, 4.3, 4.1, 3.9, 3.8]
Flat:    [4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2, 4.2]

Chart styling:
- Background: transparent
- Grid lines: stroke rgba(45,42,38,0.08) strokeDasharray="3 3"
- Axes: no axisLine, no tickLine, tick fill #A09890 fontSize 11 fontFamily DM Mono
- Tooltip: backgroundColor #F5F1EA, border 1px solid rgba(45,42,38,0.12), borderRadius 12px, color #2D2A26, fontFamily DM Sans
- Legend: below the chart, DM Sans text-sm
- Line strokeWidth 2, dot false, animationDuration 1000

Container: must be wrapped in a div with w-full h-[300px] to prevent layout shift.
Use 'use client'. Show me the complete file.
```

**Commit message:** `phase-5: add YieldCurveChart Recharts component`

---

### Session 5.4 — Embed Diagram, Chart, and PlayableFormula in Ethics Chapter

**Paste this (after SESSION HEADER):**
```
Update content/chapters/ethics.mdx to include one diagram, one chart, and one interactive formula.

1. After the first section, embed the DCFDiagram component with a caption below it: "Figure 1: How discounted cash flow analysis works — a core concept in equity valuation ethics cases."
2. After the second section, add a Callout with type="exam-tip" explaining what CFA specifically tests about Ethics standards.
3. Add a FormulaBlock showing: Standard IV(A) Loyalty, Prudence and Care requirements.
4. At the end, embed the BondPricePlayable component with a caption: "Interactive: Drag the sliders to see how coupon rates and discount rates affect bond pricing."

Also update the chapter page to register DCFDiagram, YieldCurveChart, BondPricePlayable, Callout, and FormulaBlock as custom MDX components so they render properly.

Show me the updated ethics.mdx and the updated chapter page component registration.
```

**What success looks like:** Open /chapters/ethics → see the DCF diagram animate on scroll, callout boxes in coral/green, formula blocks with warm styling, and a working interactive bond pricing calculator with sliders.

**Commit message:** `phase-5: embed diagram, chart, interactive formula, and custom components in ethics chapter`

---

---

# PHASE 6 — PAYMENTS + FULL ACCESS BUNDLE
## Goal: Click Unlock → Lemon Squeezy checkout → webhook fires → chapter unlocked. Bundle option available.

---

### Session 6.1 — Lemon Squeezy Helpers

**Paste this (after SESSION HEADER):**
```
Create lib/lemon.ts — helpers for Lemon Squeezy integration.

Export two functions:

1. buildCheckoutUrl({ productId, userId, chapterId }: { productId: string, userId: string, chapterId: string }): string
   Returns: https://[STORE].lemonsqueezy.com/checkout/buy/[productId]?checkout[custom][user_id]=[userId]&checkout[custom][chapter_id]=[chapterId]
   The store name comes from env NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID.

2. verifyWebhookSignature(rawBody: string, signature: string, secret: string): boolean
   Uses crypto.createHmac('sha256', secret) to create HMAC of rawBody, compares to signature using timingSafeEqual.

Show me the complete file.
```

**Commit message:** `phase-6: add Lemon Squeezy URL builder and signature verifier`

---

### Session 6.2 — Upgrade Modal

**Paste this (after SESSION HEADER):**
```
Build components/shared/UpgradeModal.tsx — the purchase CTA modal.

Install Shadcn Dialog first: npx shadcn@latest add dialog

This is a 'use client' component using Shadcn's Dialog.

Props:
- isOpen: boolean
- onClose: () => void
- chapterTitle: string
- priceUsd: number
- lemonCheckoutUrl: string

Modal content:
- Lock SVG icon in #A09890
- Heading in Lora serif: "Unlock [chapterTitle]"
- Description: "One-time payment. Lifetime access. Instant unlock."
- Large price: "$[priceUsd]" in Lora serif text-3xl font-bold text-[#2D2A26]
- 3 bullet points: Full chapter content, Practice questions, All future updates
- Primary button: "Unlock Now — $[priceUsd]" coral filled, navigates to lemonCheckoutUrl
- Secondary: "Maybe later" text button, calls onClose
- Below: text-xs text-[#A09890]: "Secure checkout powered by Lemon Squeezy"

Modal: bg-[#FAF8F5] rounded-2xl. Overlay: bg-[#2D2A26]/40 backdrop-blur-sm.

Show me the complete component.
```

**Commit message:** `phase-6: add UpgradeModal component`

---

### Session 6.3 — Full Access Bundle

**Paste this (after SESSION HEADER):**
```
Add a "Full Access Pass" that unlocks all chapters (current and future) for a one-time $49 payment.

STEP 1: Update the Supabase users table — run this SQL:

ALTER TABLE users ADD COLUMN has_full_access BOOLEAN DEFAULT FALSE;

STEP 2: Update lib/chapters.ts:
   - Modify hasChapterAccess() to check users.has_full_access FIRST.
     If has_full_access is true, return true immediately (skip purchase check).
     Only fall through to individual purchase check if has_full_access is false.
   - Add a new function: grantFullAccess(userId: string) — sets has_full_access = true on the user row.

STEP 3: Update app/api/webhook/route.ts:
   - Check event.meta.custom_data for a "bundle" key.
   - If custom_data.bundle === "full_access", call grantFullAccess(user_id) instead of upserting a single purchase.
   - Otherwise continue with the existing per-chapter purchase logic.

STEP 4: Update lib/lemon.ts:
   - Add buildBundleCheckoutUrl({ userId }: { userId: string }): string
   - URL format: https://[STORE].lemonsqueezy.com/checkout/buy/[BUNDLE_PRODUCT_ID]?checkout[custom][user_id]=[userId]&checkout[custom][bundle]=full_access
   - BUNDLE_PRODUCT_ID comes from env NEXT_PUBLIC_LEMON_BUNDLE_PRODUCT_ID

STEP 5: Update components/landing/PricingSection.tsx:
   - Add a third pricing column (or make it a highlighted banner below the existing two):
     - Title: "Full Access Pass" in Lora serif
     - Price: "$49" with a strikethrough showing "Save $100+ vs. buying individually"
     - Feature list: All current chapters, All future chapters, All future updates, Lifetime access, Priority support
     - CTA: "Unlock Everything" coral filled button
     - Card style: featured with coral border: bg-[#F5F1EA] border-2 border-[#E8694A]/40 rounded-2xl p-6 shadow-[0_4px_20px_rgba(232,105,74,0.12)]
     - Small badge in corner: "BEST VALUE" in coral

STEP 6: Update components/shared/UpgradeModal.tsx:
   - Below the per-chapter "Unlock Now" button, add a divider and a secondary CTA:
     - Text: "Or get everything:" in text-sm text-[#6B6560]
     - Button: "Full Access Pass — $49" in coral outlined style
     - Below: "Unlock all chapters forever. One payment." in text-xs text-[#A09890]
   - UpgradeModal needs a new prop: bundleCheckoutUrl (string)

Show me all updated files.
```

**Commit message:** `phase-6: add Full Access Bundle with $49 all-chapters pass`

---

### Session 6.4 — Webhook Route

**Paste this (after SESSION HEADER):**
```
Build app/api/webhook/route.ts — the Lemon Squeezy webhook handler.

Export a POST function. Logic:
1. Read raw body: const rawBody = await req.text()
2. Get x-signature header: const headerStore = await headers() (Next.js 16: headers() is async)
3. Verify signature using verifyWebhookSignature from lib/lemon.ts and LEMON_SQUEEZY_WEBHOOK_SECRET env var
4. If invalid: return 401 "Unauthorized"
5. Parse body as JSON
6. If event.meta.event_name !== "order_created": return 200 "OK" (ignore other events)
7. Extract user_id and chapter_id from event.meta.custom_data
8. Extract lemon_order_id from event.data.id
9. If user_id or chapter_id missing: return 400 "Bad Request"
10. Upsert into purchases table: { user_id, chapter_id, lemon_order_id } using createServerClient()
    Use upsert with onConflict: 'user_id,chapter_id' for idempotency (Lemon Squeezy retries failed webhooks)
11. Return 200 "OK"

Add console.log at each step for debugging.
Show me the complete file.
```

**Commit message:** `phase-6: add Lemon Squeezy webhook handler`

---

### Session 6.5 — Connect Unlock Flow End-to-End

**Paste this (after SESSION HEADER):**
```
Wire the unlock flow together:

1. Update ChapterCard.tsx:
   - Add 'use client' and state for isModalOpen
   - "Unlock Chapter" button opens UpgradeModal
   - lemonCheckoutUrl constructed using buildCheckoutUrl from lib/lemon.ts
   - ChapterCard needs userId and lemonProductId as additional props

2. Update app/dashboard/page.tsx:
   - Pass userId and each chapter's lemon_product_id to ChapterCard

3. Update LockedSection.tsx:
   - Replace the direct link with UpgradeModal opening

4. Update app/chapters/[slug]/page.tsx:
   - Construct real lemonCheckoutUrl using buildCheckoutUrl and pass to LockedSection

Show me all updated files.
```

**What success looks like:** Dashboard → click "Unlock" on a locked chapter → modal appears with per-chapter price AND full access bundle option → click "Unlock Now" → redirected to Lemon Squeezy checkout → (in test mode) complete purchase → webhook fires → chapter unlocked on refresh. Full Access Pass grants access to all chapters.

**Commit message:** `phase-6: connect unlock flow end-to-end with Lemon Squeezy`

---

---

# PHASE 7 — CONTENT SPRINT
## Goal: All 5 free chapters written with diagrams. This is the product.

> **Why this has its own phase:** Content IS the product. Without all 5 free chapters, you have no marketing funnel and nothing worth sharing in r/CFA.

---

### Session 7.1 — Derivatives Chapter (Paid Sample)

**Paste this (after SESSION HEADER):**
```
Create content/chapters/derivatives.mdx — a premium chapter that demonstrates the paywall.

Frontmatter: title "Derivatives: Options, Futures & Swaps", slug "derivatives", is_free: false, price_tier: "premium", price_usd: 14.99

Content structure:
1. Overview (2 paragraphs of realistic CFA Derivatives content)
2. Key Concepts: Options Basics, Futures Contracts, Swap Mechanics (3 sub-sections)
3. Core Formulas: Black-Scholes inputs and put-call parity (plain text math)
4. Practice Questions: 3 CFA-style multiple choice questions — mark this section with <!-- LOCKED_SECTION_START --> and <!-- LOCKED_SECTION_END --> comments

Write realistic CFA-quality content, not placeholder text. This chapter demonstrates the paywall for paid chapters.
```

**Commit message:** `content: add derivatives chapter with paywall section`

---

### Session 7.2 — Quantitative Methods Chapter

**Paste this (after SESSION HEADER):**
```
Create content/chapters/quantitative-methods.mdx — a free chapter.

Frontmatter: title "Quantitative Methods", slug "quant", is_free: true, price_tier: "free", price_usd: 0

Write 3,000–4,000 words of realistic CFA Level 2 Quantitative Methods content. Structure:
1. Overview — what Quant Methods covers and why it matters
2. Key Concepts:
   - Time Series Analysis (explain AR models, random walks in plain English with analogies)
   - Multiple Regression (what it is, assumptions, how CFA tests it)
   - Hypothesis Testing (type I/II errors, explained like a tutor would)
3. Formulas: Include 3-4 FormulaBlock components for key equations
4. Exam Tips: Include 3 Callout type="exam-tip" boxes throughout
5. Key Concepts: Include 2 Callout type="key-concept" boxes

Use analogies freely. Bold key terms on first use. Make it feel like a brilliant tutor explaining to a friend.
```

**Commit message:** `content: add quantitative methods free chapter`

---

### Session 7.3 — Economics Chapter

**Paste this (after SESSION HEADER):**
```
Create content/chapters/economics.mdx — a free chapter.

Frontmatter: title "Economics: Macro and Monetary Policy", slug "economics", is_free: true, price_tier: "free", price_usd: 0

Write 3,000–4,000 words covering:
1. Overview — macro economics in the CFA context
2. Key Concepts:
   - Central Banks and Monetary Policy (what the Fed/ECB actually do, rate mechanisms)
   - Currency Exchange Rates (spot vs forward, interest rate parity, explained with real-world examples)
   - Business Cycles (expansion, peak, contraction, trough — with analogies)
   - Fiscal Policy Effects (government spending, taxation, and market impacts)
3. Formulas: Interest rate parity, Fisher equation, money multiplier
4. Exam Tips: 4 callout boxes on what CFA specifically tests
5. Key Concepts: 2 callout boxes on common misconceptions

Same quality bar: analogies, bold key terms, tutor voice.
```

**Commit message:** `content: add economics free chapter`

---

### Session 7.4 — Equity Valuation Chapter

**Paste this (after SESSION HEADER):**
```
Create content/chapters/equity-basics.mdx — a free chapter.

Frontmatter: title "Equity Valuation: Concepts and Basic Tools", slug "equity-basics", is_free: true, price_tier: "free", price_usd: 0

Write 3,000–4,000 words covering:
1. Overview — why valuation matters and the two main approaches
2. Key Concepts:
   - Intrinsic Value vs Market Price (what "intrinsic" actually means)
   - Discounted Cash Flow (DCF step by step, in plain English)
   - Relative Valuation / Multiples (P/E, EV/EBITDA, when to use each)
   - Dividend Discount Model (Gordon Growth Model explained with a real example)
3. Formulas: DCF formula, Gordon Growth Model, P/E calculation
4. Import and embed the DCFDiagram component after the DCF section
5. Exam Tips: 4 callout boxes
6. Key Concepts: 2 callout boxes

This chapter should be the showcase — it demonstrates the product's value proposition.
```

**Commit message:** `content: add equity valuation free chapter`

---

### Session 7.5 — Fixed Income Chapter

**Paste this (after SESSION HEADER):**
```
Create content/chapters/fixed-income-overview.mdx — the last free chapter.

Frontmatter: title "Fixed Income: Overview and Bond Markets", slug "fixed-income-overview", is_free: true, price_tier: "free", price_usd: 0

Write 3,000–4,000 words covering:
1. Overview — what fixed income is and why it's half the CFA curriculum
2. Key Concepts:
   - Bond Pricing Fundamentals (par, premium, discount bonds — with a "lending money" analogy)
   - Yield Measures (current yield, YTM, YTC — what each actually tells you)
   - Duration and Convexity (the "seesaw" analogy for duration)
   - Credit Risk and Spreads (default risk, credit spreads, rating agencies)
3. Formulas: Bond price formula, duration, convexity adjustment
4. Import and embed the YieldCurveChart component after the yield section
5. Exam Tips: 4 callout boxes
6. Key Concepts: 2 callout boxes
```

**What success looks like:** All 5 free chapters accessible at /chapters/[slug]. Each has 3,000+ words of real CFA content, diagrams or charts where relevant, and callout boxes. The derivatives chapter shows a working paywall.

**Commit message:** `content: add fixed income free chapter`

---

---

# PHASE 8 — SEO + ANALYTICS + RESPONSIVE POLISH
## Goal: Lighthouse 90+. Mobile-friendly. Google-indexable. Production-ready.

---

### Session 8.1 — SEO Files

**Paste this (after SESSION HEADER):**
```
Create three SEO files:

1. app/sitemap.ts — dynamic sitemap
   Fetches all published free chapters from Supabase (getAllChapters filtered to is_free=true).
   Returns entries for: / (priority 1.0) and each free chapter /chapters/[slug] (priority 0.8, changeFrequency 'monthly').
   Base URL: https://trinsic.space

2. app/robots.ts — robots configuration
   Allow all on /. Disallow: /dashboard/, /api/.
   Sitemap: https://trinsic.space/sitemap.xml

3. Update app/chapters/[slug]/page.tsx generateMetadata to include openGraph:
   - title, description, url, siteName: 'Intrinsic', type: 'article'

Show me all files in full.
```

**Commit message:** `phase-8: add sitemap, robots.txt, and chapter metadata`

---

### Session 8.2 — Loading + Error States

**Paste this (after SESSION HEADER):**
```
Add loading and error states:

1. app/dashboard/loading.tsx — renders SkeletonGrid with a heading placeholder above it.

2. app/chapters/[slug]/loading.tsx — two-column skeleton:
   Left: narrow column with 5 SkeletonText items (TOC placeholder)
   Right: wide column with SkeletonText items simulating chapter heading and paragraphs

3. app/dashboard/error.tsx — 'use client' error page: "Something went wrong loading your chapters." with a retry button that calls router.refresh()

4. app/chapters/[slug]/error.tsx — similar error page for chapter loading failures.

Show me all new files.
```

**Commit message:** `phase-8: add loading and error states`

---

### Session 8.3 — Mobile Responsive Pass

**Paste this (after SESSION HEADER):**
```
Make the app fully responsive for mobile browsers. CFA candidates will visit on phones.

1. Update components/shared/Navbar.tsx:
   - Add a hamburger menu icon (3 lines SVG) visible only on mobile (md:hidden)
   - On click, open a full-height slide-in panel from the right with nav links stacked vertically
   - Close button (X icon) at top right of panel
   - Panel bg-[#FAF8F5] with the same coral CTA button style
   - Desktop nav stays exactly the same (hidden on mobile, visible on md:)
   - Add 'use client' for the mobile menu toggle state

2. Verify these components are already responsive (fix if not):
   - Hero: text sizes should scale down on mobile (text-3xl on mobile, text-5xl md:text-6xl on desktop)
   - ChapterPreview: grid should be single column on mobile
   - PricingSection: cards should stack on mobile
   - ChapterReader: TOC should hide on mobile, content should be full width

Show me the updated Navbar and any fixes needed.
```

**Commit message:** `phase-8: add mobile responsive navbar and verify all pages`

---

### Session 8.4 — Analytics + Email Capture Backend + Final Polish

**Paste this (after SESSION HEADER):**
```
Three final tasks:

TASK 1: Add Vercel Analytics
- Install: npm install @vercel/analytics
- Add the Analytics component to app/layout.tsx

TASK 2: Wire up EmailCapture to Supabase
- Create an API route app/api/subscribe/route.ts that:
  1. Reads email from request body
  2. Validates it's a real email format
  3. Upserts into email_subscribers table in Supabase
  4. Returns success/error JSON response
- Update EmailCapture.tsx to call this API route on submit and show success/error states

TASK 3: Add skip-to-content link
- Add a "Skip to content" link as the first focusable element in app/layout.tsx
- Style: sr-only by default, visible on focus with a warm cream background

Show me all changed and new files.
```

**What success looks like:** Full site works on mobile. Email capture saves to Supabase. Vercel Analytics tracking. Lighthouse performance > 90. All 5 free chapters readable. Paywall works.

**Commit message:** `phase-8: add analytics, email capture backend, and accessibility`

---

---

# POST-LAUNCH — WHAT TO DO NEXT

After Phase 8, your product is live and functional. Here's the business side:

### Immediately
- [ ] Submit sitemap to Google Search Console (trinsic.space/sitemap.xml)
- [ ] Share your 5 free chapters in r/CFA and CFA study Discord servers
- [ ] Test a real Lemon Squeezy purchase end-to-end (use test mode first, then one real $9.99 purchase)

### Week 2-4
- [ ] Write 2-3 more paid chapters (FSA, Portfolio Management)
- [ ] Monitor Vercel Analytics: which chapters get read most?
- [ ] Send first email to subscribers (study tip + link to a free chapter)

### Month 2-3
- [ ] Target: 5 paid chapters available
- [ ] Track free→paid conversion rate (target: >5%)
- [ ] Add more diagrams to existing chapters

### Month 6-7
- [ ] Target: $500 MRR
- [ ] List on Acquire.com at ~25x MRR

---

---

# DEBUGGING REFERENCE
## Paste this when something breaks

### The Universal Debug Prompt
```
Something is broken in my Intrinsic project. 

ERROR:
[paste the exact error message from terminal or browser console here]

FILE WHERE ERROR OCCURS:
[paste the complete contents of the broken file here]

OTHER RELEVANT FILES:
[paste any other files that directly interact with the broken file]

RULES:
- Fix ONLY what is broken
- Do NOT refactor any working code
- Do NOT change component structure unless the structure itself is the bug
- Keep all fixes consistent with the design system (warm cream palette, DM Sans/Lora fonts)

[paste SESSION HEADER here]
```

---

### Common Errors and What They Mean

**"Module not found: @/components/..."**
The import path is wrong or the file doesn't exist yet. Check the exact filename matches the import.

**"Error: Clerk: auth() was called but Clerk can't find the req object"**
The page needs to be a Server Component and you might be calling auth() inside a Client Component. Remove 'use client' or move the auth() call to a parent server component.

**"TypeError: Cannot read properties of null (reading 'id')"**
The syncUser() function returned null — the user isn't logged in. Make sure the page is protected by Clerk's `proxy.ts`.

**"Error: Invalid src prop on next/image"**
You used `<img>` instead of Next.js `<Image>`, or you're loading an external image without adding the domain to next.config.js.

**Hydration error in browser console**
A Server Component is rendering something that differs from what the Client Component hydrates. Usually caused by dates or random values. Never use Math.random() or Date.now() in server components.

**"TypeError: params.slug is not defined" or similar params error**
In Next.js 16, params is a strictly async Promise. Add `const { slug } = await params` at the very top of your page component before using any param values. Never access `params.slug` directly.

**Supabase returns empty array when data should exist**
Check Row Level Security (RLS) in Supabase. If RLS is enabled with no policies, all queries return nothing. Either add policies or disable RLS on tables for now.

**"Creating middleware.ts" or "Creating tailwind.config.ts"**
The AI reverted to old patterns. Tell it: *"This project uses Next.js 16 (proxy.ts not middleware.ts) and Tailwind v4 (no config file, use @theme in globals.css)."*

---

### The Git Habit
After every working session:
```
git add .
git commit -m "[your commit message]"
git push
```
Never skip this. Verify on trinsic.space that the deploy succeeded.

---

### Environment Variables Checklist
```bash
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Lemon Squeezy
LEMON_SQUEEZY_API_KEY=
LEMON_SQUEEZY_WEBHOOK_SECRET=
NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID=
NEXT_PUBLIC_LEMON_BUNDLE_PRODUCT_ID=
```

Make sure ALL of these are also set in Vercel dashboard → Settings → Environment Variables.

---

*Total sessions: ~34. Total hours: 28–38 depending on content writing time.*
*Phases 1–2: Your landing page lives. Share it.*
*Phases 1–5: Your product lives. Share in r/CFA and LinkedIn.*
*Phases 1–8: Your business lives. List on Acquire.*
