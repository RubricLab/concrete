---
name: concrete-system-intelligence
description: Implementation and usage guidance for the Concrete monorepo, including density modes, component rendering routes, and package boundaries.
user-invocable: true
---

Concrete is organized as a Bun workspace monorepo.

- `packages/tokens`: canonical foundations as CSS variables and typed density metadata.
- `packages/ui`: typed React primitives and composed components.
- `apps/site`: Next.js docs site and component rendering endpoints.

Density modes:
- `product`: highest information density
- `generative`: focused operational density
- `editorial`: most readable and spacious
- `educational`: low-fidelity instructional framing

Render routes:
- `/components/[name]`: interactive component state rendering from query params
- `/components/[name].jpg`: deterministic image rendering endpoint for snapshots

Workflow:
1. Add or adjust tokens in `@concrete/tokens` first.
2. Keep primitives in `@concrete/ui` narrow and deterministic.
3. Surface usage in `apps/site` examples.
4. Run `bun run check` before commits.
