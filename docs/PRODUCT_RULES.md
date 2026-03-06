# Product Rules

## Product Definition

- Product: Intrinsic
- Domain: `trinsic.space`
- Category: visual-first CFA Level 2 notes platform
- Delivery model: web-first only

## Access Model

| Tier | Access | Price |
| --- | --- | --- |
| Free | 5 fixed chapters | $0 |
| Standard | most paid chapters | $9.99 one-time |
| Premium | hardest or longest chapters | $14.99 one-time |

## Hardcoded Free Chapters

1. Ethics and Professional Standards
2. Quantitative Methods (Intro)
3. Economics: Macro and Monetary Policy
4. Equity Valuation: Concepts and Basic Tools
5. Fixed Income: Overview and Bond Markets

In persisted chapter data, these should resolve to `is_free: true` and `price_tier: "free"`.

## Premium Chapters

1. Derivatives: Options, Futures, Swaps
2. Derivatives: Risk Management Applications
3. Fixed Income: Term Structure and Interest Rate Dynamics
4. Alternative Investments
5. Portfolio Management: Risk and Return
6. Portfolio Management: Capital Market Expectations

All other paid chapters default to the standard tier.

## Payment Rules

- No subscriptions.
- Purchases are per chapter and permanent.
- Lemon Squeezy is the checkout provider.
- Each paid chapter should map to a `lemon_product_id` in Supabase.
- Access checks must remain server-side.
- The current checkout route expects `lemon_product_id` to store the Lemon variant ID used to create the checkout session.

## Legal Defaults

- Footer text: `Not affiliated with or endorsed by CFA Institute.`
- Terms language: `Intrinsic provides educational content for informational purposes only and does not guarantee exam results.`

## Current Gap Notes

- The purchase flow is scaffolded, but it still needs real Lemon Squeezy environment variables and live variant IDs.
- The content library is still the main missing product surface.