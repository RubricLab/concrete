---
name: concrete-design
description: Use this skill to generate well-branded interfaces and assets for Concrete (Rubric Labs' in-house design system), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping. Concrete is ink-first, flat, terminal-adjacent; one accent (sky), three signals (terminal/ultra/error).
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Key files:
- `colors_and_type.css` — the single source of truth for tokens. Always `@import` this rather than hand-rolling hex values.
- `preview/` — one HTML per primitive showing canonical usage. Open a few before building anything new.
- `ui_kits/concrete/` — a composed app shell (Sidebar + Header + Message turn + Composer) demonstrating how primitives plug together.
- `assets/icons/` — 80 Lucide SVGs at 1.5 stroke, 24×24. Color inherits from `currentColor`.

Non-negotiables:
- Ink ramp before color. Sky is the only accent. Terminal / Ultra / Error are the only signals.
- No gradients. No double borders. No donut rings. No emoji. No bounces.
- Plus Jakarta Sans for UI, Fraunces for display (earn it), JetBrains Mono for hex / metadata / kbd.
- Density as a feature — 28px buttons, 6px radii on atoms, 10px on cards.
