# Concrete Code

This is the senior engineering guide for Concrete. Read this file before structural or visual system work, then read `PLAN.md` for the active queue.

Concrete is Rubric Labs' design system for AI-native software: research writing, dense product surfaces, generated interfaces, agent workflows, and educational explainers. The system should feel dense, compact, powerful, and soft.

Dense means a screen can hold real work. Compact means every primitive earns its space. Powerful means interaction states are visible, tactile, and deterministic. Soft means the system stays calm: quiet surfaces, tight radii, restrained shadows, readable type, and no decorative noise.

## North Star

Concrete should feel like a schema-first compiler for UI, not a pile of component files.

Every foundation, primitive, and component owns one typed item bundle. Docs, previews, playgrounds, render routes, screenshot routes, tests, and registries consume that bundle. There should be one source of truth per item and no docs-side switchboard that secretly owns item behavior.

The implementation style follows Rubric Labs `actions`, `blocks`, `events`, `chains`, and `agents`: small concepts, direct factory calls, Zod truth at boundaries, typed transformation flow, low ceremony, and no hidden state.

## Hard Rules

- Preserve public package exports unless a release explicitly takes a breaking change.
- Use Zod/v4 for every serializable item boundary.
- Keep pressure modes as metadata and composition guidance, not universal props.
- Keep dependency flow one-way: foundations -> primitives -> components -> registry -> docs.
- Keep docs imports on public `@rubriclab/concrete` surfaces only.
- Keep `@rubriclab/concrete/styles.css` as the public stylesheet contract.
- Keep `CODE.md` and `PLAN.md` as the only internal DX harness docs.
- Use Bun for dependency/runtime commands and Biome for lint/format.
- Avoid `any`, untyped escape hatches, broad `unknown`, arbitrary `style`, and raw visual values outside foundations.
- Treat LOC as a signal. Do not split one complete concern only to reduce file length.

## Layer Law

Foundations define the design language. They own raw values, token records, reset-level utilities, schemas shared by many items, and CSS variables that primitives consume. If two primitives need the same visual concept, add or refine a foundation concept first.

Primitives define reusable HTML/UI grammar. They own DOM tags, ARIA, data attributes, stable `concrete-*` selectors, item CSS, and native atomic event affordances. Primitive props describe semantic role, hierarchy, density, intent, placement, state, depth, measure, extent, scale, or typed slots. They do not expose raw visual overrides.

Components define workflows. They own orchestration, state, parsing, keyboard flow, data mapping, async behavior, and composition of primitives. Components should not own CSS, `concreteClassNames`, styled raw DOM, or app-specific product chrome. If a component needs styled structure, promote that structure to a primitive or use existing layout/surface/control primitives.

Registry and docs project item definitions. They do not invent behavior, prop metadata, examples, or item-specific render branches.

## Item Shape

Public foundations own:

```txt
foundations/<slug>/
  examples.tsx
  index.tsx
  meta.ts
  schema.ts
  styles.css
```

Public primitives own:

```txt
primitives/<slug>/
  component.tsx
  examples.tsx
  index.tsx
  meta.ts
  schema.ts
  styles.css
```

Public components own:

```txt
components/<slug>/
  component.tsx
  examples.tsx
  index.tsx
  meta.ts
  schema.ts
  styles.css  optional, only for recorded active debt
```

Item files stay boring:

- `component.tsx` exports one runtime JSX implementation unless `PLAN.md` records a subpart exception.
- `schema.ts` exports one runtime schema and directly related public input/output types.
- `examples.tsx` exports one examples object.
- `meta.ts` exports one metadata object.
- `index.tsx` exports the item bundle and public re-exports.
- `styles.css` contains selectors for that item only.

## Item Contract

Every item is a factory-owned bundle:

```ts
export const buttonPrimitive = createPrimitive({
	component: Button,
	examples: buttonExamples,
	meta: buttonMeta,
	schema: buttonSchema
})
```

The bundle is what the registry consumes. The component is only one field.

Required concepts: stable slug, kind, schema, seed, component, render input adapter, examples, and metadata. Factories may generate fields, but the contract must remain true for docs, playgrounds, render routes, tests, screenshots, and registry projection.

## Visual Quality Law

The composer is the current quality benchmark. It feels right because it is compact, useful, material, and tactile without becoming loud. Interactive primitives should feel like they belong inside the composer.

Interactive primitive standard:

- Base state has a clear material: surface, border, radius, type weight, and subtle depth.
- Hover state changes border or surface enough to feel intentional.
- Focus state uses a tokenized ring and never shifts layout.
- Pressed/active/open/selected state has visible commitment: translate, stronger border, wash, inset, or selected surface.
- Disabled state is quiet and removes hover/press affordance.
- Motion is fast, small, and tokenized.
- Density is compact by default; larger modes are deliberate, not accidental.

Controls must align around one foundation grammar:

- Buttons, icon buttons, inputs, selects, textareas, picker buttons, search inputs, stepper actions, sliders, ranges, switches, checkboxes, radios, and toolbar controls must share the same control material ladder.
- Native form controls must not look like browser defaults with token paint on top.
- Selects and picker buttons should feel like related disclosure controls, even when one stays native.
- Text inputs and search inputs should feel like related query/control surfaces, even when their anatomy differs.
- Option rows and listbox/menu states should be as tactile as buttons: active, selected, disabled, and destructive states must be obvious.
- Label-only primitives may be static. Interactive-looking primitives must be interactive or clearly passive.

Softness rules:

- Prefer small radii and restrained shadows.
- Avoid flat white rectangles with only a hairline border when the primitive is interactive.
- Avoid oversized padding, loose rows, and low-contrast labels in product primitives.
- Avoid decorative gradients, orbs, bokeh, and one-off backgrounds.
- Do not add visual polish in components when the same issue exists in primitives or foundations.

## CSS Law

Public consumers import one stylesheet: `@rubriclab/concrete/styles.css`.

Item CSS is global and stable, not CSS modules. Selectors use `concrete-*` names and `data-*` state attributes. Item CSS may define local custom properties only as aliases to foundation tokens. Raw colors, sizes, shadows, radii, timing, easing, and filters belong in foundations.

Foundation CSS may introduce raw visual values. Primitive CSS consumes foundation variables. Component CSS should not exist unless `PLAN.md` records a temporary exception.

When a polish pass needs a new value, ask first:

1. Is this a reusable design token? Add it to foundations.
2. Is this reusable HTML anatomy? Add or refine a primitive.
3. Is this workflow behavior? Keep it in a component.
4. Is this one-off visual compensation? Do not add it.

## Schema And Controls

Schemas are the inspectable truth. Generated controls are a projection over schema, seed, and examples. JSON remains the exhaustive fallback for complex props.

Do not make runtime-required props optional for docs convenience. Do not loosen schemas to make examples easy. If a React slot cannot be serialized today, type it at runtime and adapt it in `renderInput`; the recursive Concrete node language remains a deliberate future pass.

## Examples

Examples are typed recipes. They drive catalog previews, detail cards, playground seeds, render routes, screenshots, and static render tests. Prefer arrays of valid props and factory renderers over arbitrary React demos. Raw React examples are allowed only for rich compositions that cannot yet be serialized.

Examples should show the component at its intended quality level. A primitive with only a tiny centered default state often hides problems; add compact, active, disabled, error, selected, loading, and dense-composition examples where those states exist.

## Promotion Rules

- Add a foundation token when a value is reusable or clarifies Concrete's visual language.
- Add a primitive when JSX, ARIA, class names, and scoped style name one reusable HTML concept.
- Add a component when behavior, state, data mapping, or multi-step workflow is the concern.
- Add a utility only for pure reusable algorithms or serialization/render helpers.
- Keep one-component JSX parts inside the owning component unless they become honest reusable vocabulary.
- Do not create a primitive just to bypass the component CSS ban.

## Long-Run Protocol

1. Read `CODE.md`.
2. Read `PLAN.md`.
3. Run `git status -sb`.
4. Pick one active row and execute vertically.
5. Update `PLAN.md` with status, findings, gates, and the next runnable row before stopping.
6. Run the relevant gates.
7. Reconcile with `main` before commit/push.

For long autonomous runs, keep a visible checklist and update it after each meaningful chunk. Do not rely on memory across context compactions; the next agent should be able to continue from `PLAN.md`.

## Gates

Use narrow gates during implementation:

```sh
bun run format
bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts
bun run typecheck
bun run check
```

Use full gates before publishing or marking a phase complete:

```sh
bun run format
bun test
bun run check:skill
bun run typecheck
bun run check
bun run build
bun run visual:smoke
bun run catalog:audit
```

After Next build or catalog audit, restore `apps/docs/next-env.d.ts` to:

```ts
import "./.next/types/routes.d.ts";
```
