# INTRINSIC — MASTER SKILL FILE
### trinsic.space | CFA Level 2 Visual Notes App
> **Single source of truth. Read the entire file before writing a single line of code.**
> Paste this at the start of every session. Every decision in here is final.

| Field | Value |
|---|---|
| **Last Updated** | 2026-02-20 |
| **Next.js** | 16.1.6 |
| **React** | 19.2.3 |
| **Tailwind** | v4 (CSS-based, no config file) |

---

## 0. WHO IS BUILDING THIS & WHY IT MATTERS

A solo founder, zero coding experience, vibe-coding a CFA Level 2 notes app as a side project. Content = AI study conversations stylized into beautiful visual chapters. Goal = $500 MRR in 6 months → sell on Acquire.com for ~$12,500.

**You (the AI) are the entire engineering team. Act accordingly.**
- Never suggest "hire a developer for this"
- Never suggest paid tools beyond what is listed in Section 3
- Never over-engineer. Ship > perfect.
- When something can be done in 20 lines, do not write 200.
- If a decision is already made in Section 18, do not re-debate it.

---

## 1. PRODUCT DEFINITION

**Name:** Intrinsic
**Domain:** trinsic.space
**Tagline:** *"See the market clearly."*
**Type:** Web-first only. No mobile app. No React Native. No Flutter.

### What It Is
A visual-first CFA Level 2 study notes platform. Users don't just read — they *experience* financial concepts through hand-drawn SVG diagrams, crayon-colored annotations, and warm editorial layouts that feel like studying with a brilliant friend's notes. The closest reference: "Anthropic's design language meets a professor's sketchbook."

### What It Is NOT
- Not a video platform
- Not a question bank / quiz app
- Not a subscription — one-time per-chapter purchases only
- Not affiliated with or endorsed by CFA Institute

---

## 2. BUSINESS LOGIC (ENFORCE IN EVERY SESSION — NON-NEGOTIABLE)

### Access Model

| Tier | Chapters | Price |
|---|---|---|
| Free Forever | 5 fixed chapters (listed below) | $0 |
| Standard | Any additional chapter | $9.99 one-time |
| Premium | Hard/long chapters (listed below) | $14.99 one-time |

### The 5 Hardcoded Free Chapters
These never change. They are the marketing funnel.
1. Ethics and Professional Standards
2. Quantitative Methods (Intro)
3. Economics: Macro and Monetary Policy
4. Equity Valuation: Concepts and Basic Tools
5. Fixed Income: Overview and Bond Markets

In the database: `is_free: true`. **Access is always checked server-side. Never trust client-side locks.**

### Premium ($14.99) Chapters
- Derivatives: Options, Futures, Swaps
- Derivatives: Risk Management Applications
- Fixed Income: Term Structure and Interest Rate Dynamics
- Alternative Investments
- Portfolio Management: Risk and Return
- Portfolio Management: Capital Market Expectations

All other non-free chapters are Standard ($9.99).

### Payment Rules
- No subscriptions. Per-chapter. One-time. Forever.
- Lemon Squeezy handles checkout. Free to use, % per sale only.
- Each chapter has its own `lemon_product_id` in the database.
- Webhook fires on `order_created` → upserts row in `purchases` table → instant access.

### Legal Defaults (Always Include)
- Footer: `"Not affiliated with or endorsed by CFA Institute."`
- Terms of Service must include: `"Intrinsic provides educational content for informational purposes only and does not guarantee exam results."`

---

## 3. TECH STACK (FINAL — NEVER SUGGEST ALTERNATIVES)

### Version Notes (CRITICAL — These Affect Every Line of Code)

**Next.js 16 Breaking Changes (vs 15):**
- `params` and `searchParams` are **strictly async Promises**. Always write `const { slug } = await params`. Synchronous access is fully removed — no fallback, no warning, just a crash.
- `headers()` and `cookies()` are **strictly async**. Always `const h = await headers()`.
- **`middleware.ts` is replaced by `proxy.ts`** — proxy functions run exclusively on Node.js runtime. Edge runtime is removed for this feature.
- **Turbopack is the default bundler.** No need to pass `--turbo` flag.
- **React Compiler is stable.** Automatic memoization — stop manually wrapping in `useMemo`/`useCallback` unless profiling shows a need.
- Minimum Node.js: 20.9+. Minimum TypeScript: 5.1+.

**Tailwind CSS v4:**
- There is **no `tailwind.config.ts` file**. All custom colors, fonts, and theme extensions live inside an `@theme { }` block in `globals.css`.
- When initializing Shadcn, it will detect Tailwind v4 and configure itself using the CSS-based theme approach automatically.

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16 App Router | Server components default. `params` is a Promise — always await it. `proxy.ts` replaces `middleware.ts`. |
| Language | TypeScript | Strict mode |
| Styling | Tailwind CSS v4 only | No tailwind.config.ts — all theme config lives in `@theme` block inside `globals.css` |
| UI Components | Shadcn/ui | Never edit `/components/ui` directly |
| Charts | Recharts | For data visualization only |
| Diagrams | Custom SVG React components | Never use images for concept diagrams |
| Auth | Clerk (free tier) | Protects `/dashboard` and `/chapters/[slug]` via `proxy.ts` |
| Database | Supabase (free tier) | Stores users, chapters, purchases |
| Payments | Lemon Squeezy | Per-chapter checkout + webhook |
| Hosting | Vercel (free tier) | Auto-deploys from GitHub. Free tier has limited serverless invocations — monitor usage. |
| Fonts | Lora + DM Sans + DM Mono | Loaded via `next/font/google` — Lora for headings (serif warmth), DM Sans for body, DM Mono for code |
| Animation | Framer Motion | Landing page scroll-triggered animations, staggered reveals. All animated landing components are `'use client'`. |
| Smooth Scroll | Lenis | Premium scroll feel. Wraps entire layout in `SmoothScroll` component. |
| Utilities | clsx + tailwind-merge | Classname merging utilities |
| Content | MDX via next-mdx-remote | Chapter content lives in `/content/chapters/` |
| Analytics | Vercel Analytics (free tier) | Track page views, chapter engagement, free→paid conversion |
| Email | Loops or Resend (free tier) | Landing page email capture for visitors who don't buy |

**Monthly infrastructure cost: $0**

### Free Tool Stack (What the Builder Uses)
- **Google Antigravity** — autonomous multi-file agentic tasks. ALWAYS push to GitHub before using. It has deleted entire codebases before.
- **GitHub Copilot Student** — in-editor autocomplete
- **Claude.ai free tier** — planning, architecture, debugging
- **v0.dev free tier** — UI component generation from descriptions

---

## 4. THE DESIGN SYSTEM (THE VISUAL DNA — READ BEFORE TOUCHING ANY UI)

Intrinsic's aesthetic is: **"Anthropic warmth meets hand-drawn classroom."** Think a brilliant professor's perfectly organized notebook — warm cream pages, hand-sketched diagrams, crayon-colored annotations, and a design language that makes 300 hours of studying feel approachable instead of punishing.

### The Aesthetic Direction
- **Tone:** Warm minimalism. Organic. Human. Editorial without being stuffy.
- **Inspired by:** Anthropic's product design — cream backgrounds, warm ink tones, generous whitespace, serif/sans font pairing — combined with hand-drawn crayon illustration style for all diagrams.
- **NOT:** Dark mode. Neon glows. Bloomberg terminal. Crypto aesthetic. Pure white harsh backgrounds. Generic purple-gradient SaaS.
- **The one thing users remember:** Every diagram looks hand-sketched by someone who truly understood the concept — like a tutor drew it just for you.
- **Why warm over dark:** CFA candidates study 300+ hours per level. Warm cream backgrounds cause dramatically less eye strain during multi-hour sessions. Every competitor is dark or harsh white. Intrinsic is neither.

### Color Tokens
```css
:root {
  /* Backgrounds — warm, layered, paper-like */
  --bg-base: #FAF8F5;              /* Warm cream — main page background */
  --bg-surface: #F5F1EA;           /* Slightly darker cream — cards, panels */
  --bg-elevated: #EDE8DF;          /* Toasts, modals, dropdowns */
  --bg-ink: #2D2A26;               /* Near-black with warmth — replaces pure #000 */

  /* Borders — warm, not clinical grey */
  --border-default: rgba(45, 42, 38, 0.10);
  --border-strong: rgba(45, 42, 38, 0.20);

  /* Crayon accent palette — the signature */
  --crayon-coral: #E8694A;         /* Primary CTA — Anthropic-inspired terracotta */
  --crayon-blue: #4A7FC1;          /* Data, links, secondary info */
  --crayon-green: #5B9E6F;         /* Free chapter badges, success states */
  --crayon-amber: #D4882A;         /* Premium badges, warnings */
  --crayon-purple: #7B6BAE;        /* Accent, variety in diagrams */
  --crayon-red: #C94F3A;           /* Errors only */

  /* Text hierarchy — warm, not cold grey */
  --text-primary: #2D2A26;
  --text-secondary: #6B6560;
  --text-muted: #A09890;
  --text-inverse: #FAF8F5;         /* Text on coral buttons */

  /* Diagram-specific */
  --stroke-primary: #2D2A26;       /* Main outlines */
  --stroke-light: rgba(45, 42, 38, 0.25);
  --fill-paper: #FFFDF9;           /* Inside diagram shapes */
}
```

### The Intrinsic Card (Use Everywhere — No Exceptions)
```tsx
// Standard card — warm paper feel, never clinical white
<div className="bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-6
     shadow-[0_2px_12px_rgba(45,42,38,0.06)]">

// Card with hover state
<div className="bg-[#F5F1EA] border border-[#2D2A26]/10 rounded-2xl p-6
     shadow-[0_2px_12px_rgba(45,42,38,0.06)]
     hover:shadow-[0_4px_20px_rgba(45,42,38,0.10)] hover:border-[#2D2A26]/20
     transition-all duration-200">

// Featured / free chapter card — coral accent
<div className="bg-[#F5F1EA] border border-[#E8694A]/30 rounded-2xl p-6
     shadow-[0_2px_12px_rgba(232,105,74,0.08)]">
```

### Typography Scale

**Font pairing (Anthropic-style):**
- **Display/Headings:** `Lora` (elegant serif — warmth and authority)
- **Body/UI:** `DM Sans` (friendly, readable, not sterile)
- **Code/Formulas:** `DM Mono` (matches the DM family)

Load all three via `next/font/google`. All are free.

```tsx
// Hero — landing page only
<h1 className="font-serif text-5xl font-bold tracking-tight text-[#2D2A26] leading-tight">

// Section headings
<h2 className="font-serif text-3xl font-semibold text-[#2D2A26]">

// Card titles
<h3 className="font-sans text-xl font-semibold text-[#2D2A26]">

// Body text
<p className="font-sans text-base text-[#6B6560] leading-relaxed">

// Labels / eyebrow text
<span className="font-sans text-xs text-[#A09890] uppercase tracking-widest font-medium">

// Formulas / code (DM Mono)
<code className="font-mono text-[#E8694A] bg-[#EDE8DF] rounded px-2 py-1 text-sm">
```

### Chapter Content Typography (The Reading Experience)
```tsx
// Reading container — max width for comfortable line length
<article className="max-w-2xl mx-auto space-y-8 font-sans text-[#6B6560] leading-8">

// Section breaks inside chapters
<hr className="border-t border-[#2D2A26]/8 my-12" />

// Exam tip callout (coral)
<div className="border-l-4 border-[#E8694A] bg-[#E8694A]/6 rounded-r-xl p-5 my-6">
  <p className="font-sans text-xs font-semibold text-[#E8694A] mb-1 uppercase tracking-wide">Exam Tip</p>
  <p className="font-sans text-[#2D2A26] text-sm leading-relaxed">[content]</p>
</div>

// Key concept callout (green)
<div className="border-l-4 border-[#5B9E6F] bg-[#5B9E6F]/6 rounded-r-xl p-5 my-6">

// Formula blocks
<div className="bg-[#EDE8DF] rounded-2xl p-6 font-mono text-[#2D2A26] my-6
     border border-[#2D2A26]/8 overflow-x-auto text-sm leading-relaxed">
```

### Badge Components
```tsx
// Free chapter badge
<span className="font-sans text-xs font-semibold text-[#5B9E6F]
      bg-[#5B9E6F]/10 border border-[#5B9E6F]/25 rounded-full px-3 py-1">FREE</span>

// Premium badge
<span className="font-sans text-xs font-semibold text-[#D4882A]
      bg-[#D4882A]/10 border border-[#D4882A]/25 rounded-full px-3 py-1">PREMIUM</span>

// Locked badge
<span className="font-sans text-xs font-semibold text-[#A09890]
      bg-[#2D2A26]/5 border border-[#2D2A26]/10 rounded-full px-3 py-1">LOCKED</span>
```

### Button System
```tsx
// Primary CTA — warm coral, Anthropic-inspired
<button className="font-sans font-semibold bg-[#E8694A] text-[#FAF8F5] px-6 py-3
         rounded-xl shadow-[0_2px_8px_rgba(232,105,74,0.25)]
         hover:bg-[#D45E40] hover:shadow-[0_4px_16px_rgba(232,105,74,0.35)]
         transition-all duration-200">

// Secondary — outlined coral
<button className="font-sans font-medium border-2 border-[#E8694A] text-[#E8694A]
         px-6 py-3 rounded-xl hover:bg-[#E8694A]/8 transition-all duration-200">

// Neutral — warm ghost
<button className="font-sans font-medium border border-[#2D2A26]/15 text-[#6B6560]
         px-6 py-3 rounded-xl hover:border-[#2D2A26]/30 hover:text-[#2D2A26]
         transition-all duration-200">
```

### Motion & Animation Principles
- **Page load:** Gentle staggered fade-up. Warm and unhurried — not snappy or aggressive.
- **Hover states:** Soft shadow deepening + border darkening. Never abrupt scale jumps.
- **Diagram reveals:** Paths draw themselves in on scroll using `strokeDashoffset`.
- **Loading states:** Warm skeleton screens (`bg-[#EDE8DF] animate-pulse`). Never blank.
- **Chart entry:** `animationDuration={1000}` — slightly slower for a calm, considered feel.

```css
/* globals.css */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.animate-fade-up { animation: fadeUp 0.5s ease-out both; }
.animate-fade-in { animation: fadeIn 0.4s ease-out both; }
.delay-75  { animation-delay: 75ms; }
.delay-150 { animation-delay: 150ms; }
.delay-300 { animation-delay: 300ms; }
```

### Visual Atmosphere Details
These details make it feel crafted, not templated:
- **Paper noise texture** on background (warm noise filter, 2% opacity)
- **Warm radial gradient** from top-center — `rgba(232,105,74,0.04)` — like sunlight through a window
- **No harsh drop shadows.** All shadows use warm ink `rgba(45,42,38,X)` not grey
- **Rounded corners are generous.** `rounded-2xl` minimum everywhere. Cards feel held.
- **Small hand-drawn SVG flourishes** in section corners on landing page (decorative, subtle)

```tsx
// Warm paper atmosphere — in root layout, behind all content
<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(232,105,74,0.05),transparent)]" />
  <div className="absolute inset-0 opacity-[0.02]" style={{
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize: '200px 200px'
  }} />
</div>
```

---

## 5. SVG DIAGRAM SYSTEM (THE PRODUCT'S CORE VALUE)

Custom SVG diagrams are what make Intrinsic worth $9.99 over a PDF. Every diagram must be a React component in `/components/chapter/diagrams/`.

### SVG Component Rules
```tsx
// Every diagram follows this template
interface DiagramProps {
  width?: number
  animated?: boolean
  className?: string
}

export function DCFDiagram({ width = 600, animated = true, className }: DiagramProps) {
  return (
    <svg
      viewBox="0 0 600 400"        // ALWAYS fixed viewBox — never auto-size
      width="100%"                  // Responsive via CSS
      style={{ maxWidth: width }}
      className={className}
      role="img"
      aria-label="DCF Valuation Flow Diagram"
    >
      {/* diagram content */}
    </svg>
  )
}
```

### Hand-Drawn SVG Style Rules

The defining visual of Intrinsic. Every diagram should feel like a smart tutor sketched it on paper. The key techniques:

**Stroke style — the "hand-drawn" effect:**
```tsx
// Apply this SVG filter to every diagram for the sketch feel
<defs>
  <filter id="sketch" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" result="noise" />
    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
  </filter>
</defs>
// Then apply to paths: <path filter="url(#sketch)" ... />
// Scale 1.5 = subtle wobble. Don't go above 2.5 or it looks broken.
```

**Color rules — crayon palette:**
- **Boxes/nodes background:** `fill="#FFFDF9"` (warm paper white) with `stroke="#2D2A26" strokeWidth="1.5"`
- **Highlighted / active nodes:** `fill="#E8694A" fillOpacity="0.12"` with `stroke="#E8694A" strokeWidth="2"`
- **Secondary highlighted nodes:** `fill="#4A7FC1" fillOpacity="0.12"` with `stroke="#4A7FC1" strokeWidth="2"`
- **Arrows/connectors:** `stroke="#2D2A26" strokeOpacity="0.4" strokeWidth="1.5"` with rounded endcaps
- **Labels primary:** `fill="#2D2A26"` in DM Sans
- **Labels secondary:** `fill="#6B6560"` in DM Sans
- **Values/numbers/formulas:** `fill="#E8694A"` in DM Mono — coral makes numbers pop
- **Background:** Always transparent — sits on the card's warm cream background

**Stroke width convention:**
- Main outlines: `strokeWidth="1.5"`
- Connectors/arrows: `strokeWidth="1.5"`
- Decorative/secondary: `strokeWidth="1"`
- Emphasized/active: `strokeWidth="2"`

**Never use:** Pure black `#000000`. Always use warm near-black `#2D2A26`. Never use flat grey fills. Never use neon colors like `#00FF88`.

### SVG Animation (Intersection Observer Pattern)
```tsx
// Animate SVG paths on scroll-into-view
'use client'
import { useEffect, useRef, useState } from 'react'

export function AnimatedDiagram() {
  const ref = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <svg ref={ref} viewBox="0 0 600 400" width="100%">
      <path
        d="M 50 200 L 550 200"
        stroke="#E8694A"
        strokeWidth="2"
        strokeDasharray="500"
        strokeDashoffset={visible ? 0 : 500}
        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
      />
    </svg>
  )
}
```

### Diagrams to Build (Priority Order)
1. `DCFDiagram.tsx` — Cash flow tree flowing into terminal value → enterprise value
2. `YieldCurveDiagram.tsx` — Three curve shapes (normal, inverted, flat) with labeled axes
3. `CapitalStructureDiagram.tsx` — Debt vs equity layers in a company's balance sheet
4. `PortersFiveDiagram.tsx` — Five forces with the firm in the center
5. `OptionPayoffDiagram.tsx` — Call and put payoff curves with breakeven labeled
6. `DuPontDiagram.tsx` — ROE decomposition tree

---

## 6. RECHARTS SYSTEM (DATA VISUALIZATION)

All charts go in `/components/charts/`. Every chart is a `'use client'` component (Recharts requires browser APIs).

### Chart Wrapper (Use on Every Chart)
```tsx
// Prevents layout shift — ALWAYS wrap charts in a fixed-height container
<div className="w-full h-[300px]">
  <ResponsiveContainer width="100%" height="100%">
    {/* chart */}
  </ResponsiveContainer>
</div>
```

### Chart Theme (Apply to Every Chart)
```tsx
const chartTheme = {
  backgroundColor: 'transparent',
  stroke: 'rgba(45,42,38,0.08)',       // Warm grid lines — not clinical grey
  tick: { fill: '#A09890', fontSize: 11, fontFamily: 'DM Mono' },
  tooltip: {
    contentStyle: {
      backgroundColor: '#F5F1EA',       // Warm cream tooltip
      border: '1px solid rgba(45,42,38,0.12)',
      borderRadius: '12px',
      color: '#2D2A26',
      fontSize: '12px',
      fontFamily: 'DM Sans',
      boxShadow: '0 4px 16px rgba(45,42,38,0.10)',
    }
  }
}

// Apply like this:
<CartesianGrid strokeDasharray="3 3" stroke={chartTheme.stroke} />
<XAxis tick={chartTheme.tick} axisLine={false} tickLine={false} />
<YAxis tick={chartTheme.tick} axisLine={false} tickLine={false} />
<Tooltip contentStyle={chartTheme.tooltip.contentStyle} />
```

### Primary Chart Colors (Crayon Palette)
```tsx
const CHART_COLORS = {
  primary: '#E8694A',    // Coral — main data series
  secondary: '#4A7FC1',  // Blue — second series
  tertiary: '#5B9E6F',   // Green — third series / positive
  quaternary: '#7B6BAE', // Purple — fourth series
  danger: '#C94F3A',     // Red — negative values
  muted: 'rgba(45,42,38,0.15)',
}
```

---

## 7. FOLDER STRUCTURE

```
intrinsic/
├── app/
│   ├── page.tsx                        ← Landing page (public, server component)
│   ├── layout.tsx                      ← Root layout (fonts, Clerk, noise bg)
│   ├── globals.css                     ← Color tokens, base styles, animations
│   ├── proxy.ts                        ← Route protection (replaces middleware.ts in Next.js 16)
│   ├── (auth)/
│   │   ├── sign-in/[[...sign-in]]/page.tsx
│   │   └── sign-up/[[...sign-up]]/page.tsx
│   ├── dashboard/
│   │   └── page.tsx                    ← Chapter library (protected)
│   ├── chapters/
│   │   └── [slug]/
│   │       └── page.tsx                ← Chapter reader (protected)
│   └── api/
│       └── webhook/
│           └── route.ts                ← Lemon Squeezy webhook
│
├── components/
│   ├── ui/                             ← Shadcn (never edit manually)
│   ├── landing/
│   │   ├── Hero.tsx                    ← Headline + CTA + atmosphere
│   │   ├── Features.tsx                ← "The Method" — 3 feature cards
│   │   ├── Process.tsx                 ← "How It Works" — 3 sticky stage cards with SVGs
│   │   ├── ChapterPreview.tsx          ← 3 free chapter cards
│   │   ├── Manifesto.tsx               ← Philosophy quote block
│   │   ├── PricingSection.tsx          ← Free vs per-chapter pricing
│   │   └── EmailCapture.tsx            ← Email signup for non-buyers
│   ├── dashboard/
│   │   ├── ChapterGrid.tsx
│   │   ├── ChapterCard.tsx             ← Shows free/locked/purchased state
│   │   └── SearchBar.tsx
│   ├── chapter/
│   │   ├── ChapterReader.tsx           ← Main reading layout
│   │   ├── TableOfContents.tsx
│   │   ├── LockedSection.tsx           ← Blur overlay + purchase CTA
│   │   └── diagrams/
│   │       ├── DCFDiagram.tsx
│   │       ├── YieldCurveDiagram.tsx
│   │       └── [other diagrams]
│   ├── charts/
│   │   ├── ValuationChart.tsx
│   │   └── YieldCurveChart.tsx
│   └── shared/
│       ├── Navbar.tsx
│       ├── Footer.tsx
│       ├── Badge.tsx
│       ├── SmoothScroll.tsx            ← Lenis smooth scroll wrapper
│       ├── UpgradeModal.tsx
│       └── Skeleton.tsx                ← Loading states for all components
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts                   ← Browser client
│   │   ├── server.ts                   ← Server client (for server components)
│   │   └── syncUser.ts                 ← JIT Clerk ↔ Supabase user sync
│   ├── lemon.ts                        ← Lemon Squeezy helpers + signature verify
│   ├── chapters.ts                     ← Chapter data + access check logic
│   └── utils.ts
│
├── content/
│   └── chapters/                       ← MDX files (the actual notes)
│       ├── ethics.mdx
│       ├── quantitative-methods.mdx
│       └── [other chapters].mdx
│
└── types/
    └── index.ts                        ← All shared TypeScript types
```

---

## 8. DATABASE SCHEMA (SUPABASE)

```sql
-- Users (synced from Clerk via JIT pattern — see Section 13)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  clerk_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Chapters master list
CREATE TABLE chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order_index INTEGER,
  is_free BOOLEAN DEFAULT FALSE,
  price_tier TEXT CHECK (price_tier IN ('free', 'standard', 'premium')),
  price_usd DECIMAL(5,2),             -- 0.00, 9.99, or 14.99
  lemon_product_id TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchases (one row per user per chapter — forever)
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  chapter_id UUID REFERENCES chapters(id),
  lemon_order_id TEXT UNIQUE,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, chapter_id)
);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER chapters_updated_at
  BEFORE UPDATE ON chapters FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Server-Side Access Check (Always Use This Pattern)
```typescript
// lib/chapters.ts — NEVER skip this check, NEVER do it client-side
async function hasChapterAccess(userId: string, chapterId: string): Promise<boolean> {
  const chapter = await getChapter(chapterId)
  if (!chapter) return false
  if (chapter.is_free) return true

  const { data } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId)
    .eq('chapter_id', chapterId)
    .single()

  return !!data
}
```

---

## 9. ROUTE PROTECTION (CLERK + PROXY.TS — NEXT.JS 16)

In Next.js 16, `middleware.ts` is replaced by `proxy.ts`. Proxy functions run on Node.js runtime only (Edge removed).

```typescript
// app/proxy.ts — protects /dashboard and /chapters routes
import { clerkProxy } from '@clerk/nextjs/server'

export default clerkProxy({
  publicRoutes: [
    '/',
    '/sign-in(.*)',
    '/sign-up(.*)',
    '/api/webhook(.*)',
  ],
  // All other routes require authentication
})
```

**Rules:**
- The landing page (`/`) is always public — it's the marketing funnel.
- `/api/webhook` must be public — Lemon Squeezy needs to reach it without auth.
- `/dashboard` and `/chapters/[slug]` are protected — Clerk redirects unauthenticated users to sign-in.
- If Clerk's Next.js 16 API differs from this snippet, check their docs for the exact `proxy.ts` pattern. The intent is: protect everything except the public routes listed above.

---

## 10. LEMON SQUEEZY INTEGRATION

### Checkout URL Structure
```
https://[your-store].lemonsqueezy.com/checkout/buy/[product-id]
  ?checkout[custom][user_id]=[clerk_user_id]
  &checkout[custom][chapter_id]=[chapter_uuid]
```

**Critical:** The `user_id` and `chapter_id` custom parameters are how the webhook knows who bought what. Without them, purchases cannot be attributed.

### Webhook Route (Idempotent + Error-Handled)
```typescript
// app/api/webhook/route.ts
import { headers } from 'next/headers'
import crypto from 'crypto'
import { createServerClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const body = await req.text()
  const headerStore = await headers() // Next.js 16: headers() is async
  const signature = headerStore.get('x-signature')
  const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET!

  // 1. Verify signature
  const hmac = crypto.createHmac('sha256', secret)
  const digest = hmac.update(body).digest('hex')
  if (digest !== signature) {
    console.error('[Webhook] Signature verification failed')
    return new Response('Unauthorized', { status: 401 })
  }

  // 2. Parse event
  const event = JSON.parse(body)
  if (event.meta.event_name !== 'order_created') {
    return new Response('OK') // Ignore non-purchase events
  }

  // 3. Extract custom data
  const { user_id, chapter_id } = event.meta.custom_data
  const lemon_order_id = String(event.data.id)

  if (!user_id || !chapter_id) {
    console.error('[Webhook] Missing user_id or chapter_id in custom_data', { lemon_order_id })
    return new Response('Bad Request', { status: 400 })
  }

  // 4. Upsert purchase row (idempotent — safe for Lemon Squeezy retries)
  const supabase = createServerClient()
  const { error } = await supabase
    .from('purchases')
    .upsert(
      { user_id, chapter_id, lemon_order_id },
      { onConflict: 'user_id,chapter_id' }
    )

  if (error) {
    console.error('[Webhook] Failed to upsert purchase', { error, user_id, chapter_id, lemon_order_id })
    return new Response('Internal Error', { status: 500 }) // Lemon Squeezy will retry
  }

  console.log('[Webhook] Purchase recorded', { user_id, chapter_id, lemon_order_id })
  return new Response('OK')
}
```

**Why `upsert` instead of `insert`:**
Lemon Squeezy retries failed webhooks. If the first attempt succeeded in the DB but the response timed out, the retry would fail on a `UNIQUE` constraint with `insert`. `upsert` makes it idempotent — retries are harmless.

---

## 11. PERFORMANCE RULES (LAG-FREE CHECKLIST)

Before shipping any component, verify:

| Rule | How |
|---|---|
| Data fetched server-side | `async` server component with `await` — not `useEffect` |
| No layout shift on charts | Recharts wrapped in fixed-height `div` always |
| No layout shift on SVGs | `viewBox` set, `width="100%"` on SVG element |
| Images use Next.js component | `<Image>` never `<img>` |
| Loading states exist | Skeleton components in every async boundary |
| `'use client'` is minimal | Only on components with `useState`, `useEffect`, or event handlers |
| Fonts load correctly | `next/font` only, no `@import` in CSS |
| No global state for simple things | Prop drilling for 1-2 levels is fine; don't over-abstract |
| `params` is awaited | `const { slug } = await params` — never `params.slug` |
| `headers()` is awaited | `const h = await headers()` — never `headers().get(...)` |

---

## 12. CHAPTER CONTENT STRUCTURE (MDX FORMAT)

Every chapter MDX file follows this exact structure:

```mdx
---
title: "Ethics and Professional Standards"
slug: "ethics"
description: "The foundation of everything in CFA — understand the code, standards, and how they apply."
order: 1
is_free: true
price_tier: "free"
---

import { FormulaBlock } from '@/components/chapter/FormulaBlock'
import { Callout } from '@/components/chapter/Callout'
import { DCFDiagram } from '@/components/chapter/diagrams/DCFDiagram'

## Overview

[Opening paragraph — what this chapter covers and why it matters for the exam]

---

## Key Concepts

### 1. [Concept Name]
[Your explanation in your own words — this is your AI study conversation, stylized]

<Callout type="exam-tip">
  [What the CFA exam specifically tests on this concept]
</Callout>

---

## Formulas

<FormulaBlock label="[Formula Name]">
  [Formula in LaTeX or plain text]
</FormulaBlock>

---

## Visual Diagram

<DCFDiagram animated={true} />

---

## Data Visualization

[Recharts component with dummy financial data]

---

## Practice Questions
[This section is wrapped in LockedSection for paid chapters]
```

---

## 13. THE CLERK ↔ SUPABASE SYNC GAP (READ BEFORE TOUCHING AUTH)

This is the #1 crash point for vibe-coded apps that use Clerk + Supabase together. Understand it before Phase 7.

### The Problem
Users live in two places: Clerk (authentication) and Supabase (your data). When a user signs up via Clerk, a webhook should fire to create them in Supabase. But webhooks fail silently in development, during cold starts, and occasionally in production. Result: the user exists in Clerk but not in Supabase. When they try to purchase a chapter, `user_id` is `null`, the foreign key constraint fails, and the app crashes. The user paid and can't access anything. You get a support email. You lose an hour debugging. Multiply by 10 users.

### The Fix: Just-in-Time (JIT) User Sync
Never assume the user exists in Supabase. Every time you touch the database on behalf of a user, silently create them if they don't exist yet.

```typescript
// lib/supabase/syncUser.ts
// Call this at the TOP of any server action or page that needs the user in Supabase
import { currentUser } from '@clerk/nextjs/server'
import { createServerClient } from '@/lib/supabase/server'

export async function syncUser() {
  const clerkUser = await currentUser()
  if (!clerkUser) return null

  const supabase = createServerClient()

  // Try to find existing user
  const { data: existing } = await supabase
    .from('users')
    .select('id')
    .eq('clerk_id', clerkUser.id)
    .single()

  if (existing) return existing.id

  // User missing from Supabase — create them silently right now
  const { data: created } = await supabase
    .from('users')
    .insert({
      clerk_id: clerkUser.id,
      email: clerkUser.emailAddresses[0].emailAddress,
    })
    .select('id')
    .single()

  return created?.id ?? null
}
```

### Where to Call It
```typescript
// app/dashboard/page.tsx — call at the top before any DB query
const userId = await syncUser()

// app/chapters/[slug]/page.tsx — call before hasChapterAccess
const userId = await syncUser()
const hasAccess = await hasChapterAccess(userId, chapter.id)

// app/api/webhook/route.ts — call before inserting purchase
const userId = await syncUser()
await supabase.from('purchases').upsert({ user_id: userId, ... })
```

### The Rule
**`syncUser()` is called before every single database operation that involves a user. No exceptions. This prevents 100% of "I paid but can't access" support emails.**

---

## 14. CONTENT CREATION STRATEGY

### How Chapters Get Written
1. **Source material:** Use Claude / NotebookLM conversations to explain CFA Level 2 topics. Have a real conversation — ask follow-up questions, request analogies, push for clarity.
2. **Stylize:** Rewrite the AI output in your own voice. The notes should feel like a tutor explaining to a friend, not a textbook.
3. **Structure:** Follow the MDX template in Section 12 exactly. Every chapter has: Overview → Key Concepts → Formulas → Diagram → Chart → Practice Questions.
4. **Diagrams:** For each chapter, identify the 1-2 concepts that are hardest to explain in text. Those become SVG diagrams.

### Quality Bar
| Metric | Target |
|---|---|
| **Word count per chapter** | 3,000–5,000 words (enough to justify $9.99) |
| **Diagrams per chapter** | 1–3 custom SVGs |
| **Charts per chapter** | 0–2 Recharts visualizations |
| **Reading time** | 15–25 minutes |
| **Exam tips per chapter** | 3–5 callouts |
| **Formula blocks** | Every formula the exam tests, with plain-English explanations |

### Content Principles
- **Never reproduce CFA Institute curriculum text.** Always original explanations.
- **Use analogies liberally.** "Duration is like a see-saw" > "Duration is the weighted average of cash flows."
- **Bold key terms** on first use.
- **Every formula gets a "why it works" paragraph** before the math.
- **Practice questions** are at the end — locked for paid chapters, visible for free ones.

### Production Order
Write the 5 free chapters first (they're your marketing). Then write premium chapters (highest price = highest priority). Standard chapters last.

---

## 15. SEO STRATEGY FOR FREE CHAPTERS

The 5 free chapters are not just generous — they are your entire organic growth engine. If Google can't index them, you have no top-of-funnel.

### What to Build in Phase 9

**1. Dynamic Sitemap**
```typescript
// app/sitemap.ts
import { createServerClient } from '@/lib/supabase/server'
import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createServerClient()

  // Only index published, free chapters — paid chapters should NOT be indexed
  // (no point ranking content users can't read)
  const { data: freeChapters } = await supabase
    .from('chapters')
    .select('slug, updated_at')
    .eq('is_free', true)
    .eq('published', true)

  const chapterUrls = (freeChapters ?? []).map((chapter) => ({
    url: `https://trinsic.space/chapters/${chapter.slug}`,
    lastModified: new Date(chapter.updated_at),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: 'https://trinsic.space',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    ...chapterUrls,
  ]
}
```

**2. robots.txt**
```typescript
// app/robots.ts
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/'],  // Never index user dashboards or API routes
    },
    sitemap: 'https://trinsic.space/sitemap.xml',
  }
}
```

**3. Per-Chapter Metadata (Add to Every Chapter Page)**
```typescript
// app/chapters/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params  // Next.js 16: params is a Promise
  const chapter = await getChapter(slug)
  return {
    title: `${chapter.title} — CFA Level 2 | Intrinsic`,
    description: chapter.description,
    openGraph: {
      title: chapter.title,
      description: chapter.description,
      url: `https://trinsic.space/chapters/${slug}`,
      siteName: 'Intrinsic',
      type: 'article',
    },
  }
}
```

### SEO Rules for Content
- **Free chapters:** Fully rendered server-side, fully crawlable. No client-side rendering.
- **Paid chapters:** The chapter title and description are public (for SEO). The content is gated. This means Google indexes "Derivatives: Options, Futures, Swaps — Intrinsic" and candidates find you when searching for CFA Derivatives notes.
- **Target keywords to naturally use in chapter content:**
  - "CFA Level 2 [topic] notes"
  - "CFA Level 2 [topic] explained"
  - "CFA [topic] visual guide"

### Phase 9 SEO Checklist
- [ ] `app/sitemap.ts` generates correctly (verify at `trinsic.space/sitemap.xml`)
- [ ] `app/robots.ts` blocks `/dashboard` and `/api`
- [ ] Every chapter page has unique `<title>` and `<meta description>`
- [ ] Free chapters are server-rendered (check: view page source, content is visible in HTML)
- [ ] Submit sitemap to Google Search Console after deploy

---

## 16. EMAIL CAPTURE & ANALYTICS

### Email Capture (Landing Page)
90% of visitors will leave without buying. Without email capture, they're gone forever.

**Implementation:**
- Add `EmailCapture.tsx` to the landing page below the chapter preview section.
- Simple form: email input + "Get free study tips" CTA.
- Backend: Loops.so or Resend free tier (both $0).
- Store emails in Supabase `email_subscribers` table (just `email` + `created_at`).
- Send a weekly 2-sentence email with a link to a free chapter. That's it. No spam.

```sql
-- Add to schema
CREATE TABLE email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Analytics
- **Vercel Analytics** (free tier): Page views, bounce rate, geography.
- **Track these events manually** (via a simple `/api/track` route or Vercel's Web Analytics):
  - `chapter_view` — which chapters get read
  - `unlock_click` — which chapters people try to buy
  - `purchase_complete` — which chapters actually sell
- **The metric that matters:** Free chapter → unlock click conversion rate. If it's below 5%, the content or CTA needs work.

---

## 17. BUILD PHASES (FOLLOW IN ORDER — NEVER SKIP)

> **Note:** These phases match the Prompt Guide's 8-phase structure exactly. When someone says "Phase 2 is done," both documents agree on what that means.

### Phase 1 — Foundation + First Deploy ✅
**Goal:** App runs locally and deployed to trinsic.space.
- `npx create-next-app@latest intrinsic --typescript --tailwind --app`
- Install Shadcn/ui (will auto-detect Tailwind v4)
- Set up fonts via `next/font/google`: Lora (serif headings), DM Sans (body), DM Mono (code)
- Create `globals.css` with all color token CSS variables from Section 4 inside `@theme { }` block
- Add noise texture + warm radial gradient overlay to root layout
- Install Framer Motion, Lenis, clsx, tailwind-merge
- Build Navbar, Footer, SmoothScroll
- Push to GitHub, link to Vercel, host at trinsic.space
- **Verify:** trinsic.space shows warm cream background, correct fonts, Navbar + Footer visible

### Phase 2 — Shared UI + Landing Page ✅
**Goal:** Full landing page deployed at trinsic.space, looking polished.
- `Badge.tsx` — free/premium/locked variants from Section 4
- `Skeleton.tsx` — loading states matching card dimensions
- `Hero.tsx` — headline (Lora), subheadline, coral CTA, framer-motion staggered reveals
- `Features.tsx` — "The Method" — 3 feature cards with illustrations
- `Process.tsx` — "How It Works" — 3 sticky stage cards with SVG diagrams
- `ChapterPreview.tsx` — 3 free chapter cards using Intrinsic Card pattern
- `Manifesto.tsx` — Philosophy quote block
- `PricingSection.tsx` — Free tier + per-chapter pricing
- `EmailCapture.tsx` — email signup form (console.log for now)
- Assemble all in `app/page.tsx`
- **Verify:** Full landing page at trinsic.space. Coral CTAs, warm shadows, paper-like cards.

### Phase 3 — Auth + Database + Progress Tracking
**Goal:** Login works. Database is live. Progress is tracked.
- Install and configure Clerk
- Create `proxy.ts` with Clerk route protection (see Section 9)
- Set up Supabase: schema, server/browser clients, seed data
- Create `syncUser.ts` (Section 13)
- Build dashboard with `ChapterCard.tsx` using real Supabase data
- Add progress tracking ("Mark as Mastered")
- **Verify:** Sign in → dashboard shows 8 real chapter cards. Progress bar works.

### Phase 4 — Chapter Reader + Real Access
**Goal:** Reading a chapter feels premium.
- Set up MDX with `next-mdx-remote` + Zod validation
- Build `ChapterReader.tsx` (sidebar TOC + max-w-2xl reading column)
- Build `TableOfContents.tsx`, `Callout.tsx`, `FormulaBlock.tsx`
- Build `LockedSection.tsx` (blur overlay + "Unlock Chapter" CTA)
- Create `app/chapters/[slug]/page.tsx` with real Supabase access control
- **Verify:** Free chapter fully readable. Paid chapter blurred at locked section.

### Phase 5 — Diagrams + Charts + Interactive
**Goal:** One SVG diagram + one Recharts chart + one interactive formula.
- Build `DCFDiagram.tsx` with scroll-triggered animation and sketch filter
- Build `PlayableFormula.tsx` + `BondPricePlayable.tsx`
- Build `YieldCurveChart.tsx` in Recharts with warm cream theme
- Embed all in ethics chapter
- **Verify:** Diagram animates on scroll. Chart loads without layout shift. Sliders work.

### Phase 6 — Payments + Full Access Bundle
**Goal:** Click Unlock → checkout → webhook → chapter unlocked.
- Build `lib/lemon.ts` helpers
- Build `UpgradeModal.tsx` with chapter info + price + purchase button
- Add Full Access Bundle ($49)
- Build webhook route (with `upsert` for idempotency)
- Wire unlock flow end-to-end
- **Verify:** Click "Unlock" → Lemon Squeezy → pay → webhook fires → chapter unlocked.

### Phase 7 — Content Sprint
**Goal:** All 5 free chapters written with diagrams. This is the product.
- Write Derivatives (paid sample), Quantitative Methods, Economics, Equity Basics, Fixed Income
- Each chapter: 3,000–5,000 words, 1–3 diagrams, callouts, formulas
- **Verify:** All 5 free chapters accessible. Derivatives shows paywall.

### Phase 8 — SEO + Analytics + Responsive Polish
**Goal:** Lighthouse 90+. Mobile-friendly. Google-indexable.
- Add `sitemap.ts`, `robots.ts`, per-chapter metadata
- Add loading and error states
- Add mobile responsive navbar
- Add Vercel Analytics, email capture backend, skip-to-content
- **Verify:** Mobile works. Email saves. Lighthouse > 90.

### Deployment Checklist (Phase 8)
```
[ ] All env vars set in Vercel dashboard
[ ] Lemon Squeezy webhook URL updated to production
[ ] Clerk production keys (not dev keys)
[ ] Supabase RLS policies reviewed
[ ] Custom domain connected and SSL active
[ ] sitemap.xml accessible
[ ] robots.txt accessible
[ ] Lighthouse performance > 90
[ ] Test a real purchase flow end-to-end
[ ] Error monitoring: check Vercel function logs
```

---

## 18. ENVIRONMENT VARIABLES NEEDED

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
```

---

## 19. GIT WORKFLOW

### Rules
- **Always push to GitHub before using Antigravity.** It has deleted entire codebases before. Git is your safety net.
- **Commit after every phase completes.** One commit per phase, not one commit per file.
- **Branch strategy:** Work on `main`. This is a solo project — branching adds overhead with no benefit until there's a team.

### Commit Convention
```
phase-1: foundation setup with fonts and color tokens
phase-2: shared components (navbar, footer, badges)
phase-3: landing page with hero, pricing, email capture
fix: webhook signature verification
content: add ethics chapter MDX
```

Keep messages lowercase, prefix with the phase or category. No emojis. No "WIP" commits.

---

## 20. ACCESSIBILITY BASELINE

Intrinsic doesn't need WCAG AAA, but these basics are non-negotiable:

| Rule | Implementation |
|---|---|
| Color contrast | All text passes WCAG AA (4.5:1 for body, 3:1 for large text). The warm palette was designed to pass. |
| Keyboard navigation | All interactive elements (buttons, links, cards) must be focusable and operable via keyboard |
| SVG accessibility | Every `<svg>` has `role="img"` and `aria-label="[description]"` |
| Alt text | Every `<Image>` has meaningful `alt` text |
| Focus styles | Visible focus ring on all interactive elements (use `focus-visible:ring-2 ring-[#E8694A]`) |
| Semantic HTML | Use `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` — not divs for everything |
| Skip link | Add a "Skip to content" link as the first focusable element in the layout |

---

## 21. SESSION WORKFLOW (START & END OF EVERY CODING SESSION)

### Start of Session
1. Pull latest from GitHub: `git pull origin main`
2. Paste this entire skill file into the AI
3. State which Phase you're working on and what specific task
4. Run `npm run dev` to verify the app still works before making changes

### End of Session
1. Verify: does the app still build? `npm run build`
2. Verify: does the app look correct in the browser?
3. Commit with a descriptive message (see Section 19)
4. Push to GitHub: `git push origin main`
5. Note in a scratchpad which Phase/task you stopped at

### If Something Breaks
1. Don't panic. Check the terminal error message.
2. If it's a Next.js 16 error about `params` or `headers`, you forgot to `await` them.
3. If it's a hydration error, you have a `'use client'` component rendering differently on server vs client.
4. If the whole app is broken beyond repair: `git stash` or `git checkout .` to reset to last commit.

---

## 22. COMMON MISTAKES (QUICK REFERENCE)

| Mistake | Fix |
|---|---|
| `params.slug` without `await` | `const { slug } = await params` |
| `headers().get(...)` without `await` | `const h = await headers(); h.get(...)` |
| Creating `tailwind.config.ts` | Delete it. Use `@theme { }` in `globals.css` |
| Creating `middleware.ts` | Use `proxy.ts` instead (Next.js 16) |
| Using `#000000` pure black | Use `#2D2A26` warm near-black |
| Using neon colors in SVGs | Use the crayon palette from Section 4 only |
| `useEffect` for data fetching | Use `async` server components with `await` |
| `<img>` tag | Use Next.js `<Image>` component |
| `@import` for fonts in CSS | Use `next/font/google` in layout |
| Editing files in `/components/ui/` | Never — those are Shadcn-managed |
| `insert` in webhook handler | Use `upsert` for idempotency |
| Assuming user exists in Supabase | Call `syncUser()` first — always |
| White backgrounds on cards | Use `#F5F1EA` warm cream |
| Grey shadows | Use `rgba(45,42,38,X)` warm shadows |

---

## 23. DECISIONS ALREADY MADE (DO NOT RE-DEBATE)

- ✅ Web-first. No mobile app.
- ✅ No subscriptions. Per-chapter one-time purchase.
- ✅ 5 hardcoded free chapters. Never randomized.
- ✅ Lemon Squeezy not Stripe (simpler for solo founder, no entity required)
- ✅ Clerk not NextAuth (better DX, webhook for user sync)
- ✅ Supabase not Prisma/PlanetScale (has storage + realtime if needed later)
- ✅ MDX not a headless CMS (content in repo = version controlled, free)
- ✅ Custom SVGs not stock images or screenshots
- ✅ Warm cream aesthetic, not dark mode
- ✅ Lora + DM Sans + DM Mono font triple
- ✅ Sell on Acquire.com at month 7-8 at ~25x MRR
- ✅ Content is AI explanations in founder's own words — not CFA Institute reproduction
- ✅ `proxy.ts` not `middleware.ts` (Next.js 16)
- ✅ `upsert` not `insert` in webhook (idempotent)

---

*Last updated: 2026-02-19. This file is the single source of truth. When in doubt, refer back here. Do not make architectural decisions that conflict with this document.*
