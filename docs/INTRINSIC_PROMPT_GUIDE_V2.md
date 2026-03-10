# INTRINSIC — PROMPT GUIDE (V2)

This file is now a slim execution entry point rather than a long-lived duplicate of the project rules.

## Use This With

- [README.md](./README.md) for the project overview
- [docs/TECH_STACK.md](./docs/TECH_STACK.md) for framework constraints
- [docs/PRODUCT_RULES.md](./docs/PRODUCT_RULES.md) for access and pricing rules
- [docs/BUILD_STATUS.md](./docs/BUILD_STATUS.md) for the current state of the build

## Session Header Template

Use this short header when starting implementation work in a new chat:

```text
PROJECT: Intrinsic — CFA Level 2 visual notes app at trinsic.space
READ FIRST: README.md, docs/PRODUCT_RULES.md, docs/TECH_STACK.md, docs/BUILD_STATUS.md
CURRENT TASK:
```

## Execution Guidance

- Work from the current repo state, not the original aspirational roadmap.
- Prefer shipping documented gaps over expanding the docs again.
- Treat the completion report in [docs/BUILD_STATUS.md](./docs/BUILD_STATUS.md) as the current baseline.
- Update docs when the implementation materially changes.

## Next Workstreams

1. Payments and purchase webhooks
2. Chapter content expansion
3. Email capture backend
4. Dashboard and error-state polish