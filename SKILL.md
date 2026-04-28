---
name: concrete
description: Use this skill when building with the Concrete design system for Rubric Labs. Concrete is an ink-first React design system for agentic product surfaces, editorial research pages, generated UI, and educational mockups.
user-invocable: true
---

# Concrete

Concrete is Rubric Labs' design system for AI-native products and publishing. Use the package, registry, and render routes instead of inventing one-off interface language.

## Non-negotiables

- Use `@rubriclab/concrete/styles.css` before rendering package primitives.
- Use the ink ramp first. Sky is the only accent.
- Use exactly three signals: `terminal`, `ultra`, `error`.
- Do not add amber warning variants, decorative gradients, double borders, emoji, bouncy motion, or loose component APIs.
- Keep primitive props literal and narrow. Pressure is not a universal primitive prop.
- Prefer TypeScript plus Zod v4 schemas at every runtime boundary.
- Prefer CSS Modules for component internals and tokenized global CSS for foundations.

## Pressure Guidance

- `product`: dense, nested, scan-first surfaces with rows, tables, panes, filters, and agent state.
- `editorial`: spacious, readable, strong hierarchy, long-form copy, and rare display typography.
- `generative`: focused product output such as one generated chart, table, card, or answer surface.
- `educational`: low-fidelity product language for explainers, skeletons, diagrams, and OG assets.

Pressure is recorded in registry examples and composition guidance. Do not map pressure directly to automatic primitive styling.

## Package Interfaces

- `@rubriclab/concrete`: React primitives, schemas, registry, and icons.
- `@rubriclab/concrete/components`: React components that assemble primitives into product surfaces.
- `@rubriclab/concrete/primitives`: React primitives for controls, fields, surfaces, labels, feedback, typography, data atoms, and brand.
- `@rubriclab/concrete/styles.css`: foundation tokens and base rules.
- `@rubriclab/concrete/registry`: primitive and component metadata plus example renderers.
- `@rubriclab/concrete/icons`: typed icon and brand asset registry.
- `@rubriclab/concrete/schemas`: Zod schemas for render and registry boundaries.

## Components

- `Composer`: agentic message input with token chips, `@` mention and `/` command menus, attachment rail, formatting controls, keyboard shortcuts, and controlled or uncontrolled `ComposerValue` output.
- Composer owns reusable local behavior only: rich text shell, toolbar interactions, token insertion, menus, deterministic value shape, and keyboard submission.
- Product code owns persistence, uploads, remote suggestion data, slash-command execution, permissions, collaboration, analytics, and any domain-specific editor schema.

## Render Routes

- `/render/primitive/:slug?state=default&pressure=product&viewport=desktop`
- `/render/primitive/:slug.jpg?state=default&pressure=product&viewport=desktop&quality=92`
- `/render/component/:slug?state=default&pressure=product&viewport=desktop`
- `/render/component/:slug.jpg?state=default&pressure=product&viewport=desktop&quality=92`

The `.jpg` route captures the real DOM render with Playwright. Use it for screenshots and visual state matrices.

## Workflow

1. Add or edit primitives in `packages/concrete/src/primitives`.
2. Add or edit components in `packages/concrete/src/components`.
3. Register examples in `packages/concrete/src/registry`.
4. Validate query, prop, or metadata changes in `packages/concrete/src/schemas`.
5. Verify with `bun run check`.
6. Visually inspect docs and render routes through `bun run dev`.
