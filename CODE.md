# Concrete Code

This file is the senior engineering guide for Concrete. It is the durable source of truth for how we structure the package, docs app, tests, styles, and long-running refactors. Read it before any structural work.

Concrete should feel like a small schema-first compiler for UI, not a pile of component files. Every foundation, primitive, and component owns one typed item bundle. Docs, previews, playgrounds, render routes, screenshot routes, tests, and registries consume that bundle.

The target code style is close to Rubric Labs `actions`, `blocks`, `events`, `chains`, and `agents`: small concepts, direct factory calls, Zod truth at the boundary, typed transformation flows, and very little local ceremony.

## North Star

Concrete is the design system for AI-native software: product surfaces, editorial research, generated interfaces, agent workflows, and educational explainers built from one shared visual language.

The codebase has to support that breadth without becoming bespoke. The package should expose a compact set of foundations, primitives, and components that compose into higher density surfaces. The docs app should demonstrate and test those items without becoming a second source of truth.

When a file is opened, it should be obvious why that file exists, what it owns, and where the adjacent concern lives. There should be no second place in the codebase quietly addressing the same thing.

## Hard Invariants

- Preserve the public `@rubriclab/concrete` API and package subpath exports unless a release explicitly opts into a breaking change.
- Keep Zod/v4 as the source of truth for every serializable item boundary.
- Keep pressure modes as metadata and composition guidance. They are not universal component props.
- Keep docs imports on public `@rubriclab/concrete` surfaces only.
- Keep package dependency direction one-way: foundations feed primitives, primitives feed components, registry projects item definitions, docs consume public registry data.
- Keep `@rubriclab/concrete/styles.css` as the required public stylesheet export.
- Prefer generated controls from schemas. Do not hand-author partial playground switchboards.
- Prefer typed example recipes over arbitrary React examples.
- Avoid `any`, hidden flows, and untyped escape hatches.
- Treat LOC as a signal, not an architecture rule. Splitting one complete concern only to reduce line count makes the codebase worse.

## Current Checkpoint

- Foundations, primitives, and components are folder-owned item bundles.
- Public registries are derived from item definitions.
- Docs detail, render, playground, and catalog flows consume registry definitions.
- `factories/` owns item, control, and example creation.
- `utilities/` owns shared pure algorithms, render helpers, schema input helpers, and temporary shared engines.
- `components/` root is a public barrel only. Shared component engines do not live there.
- Shared JSX used by components lives in private `primitives/internal/*` folders until it becomes a public primitive or collapses back into one owner.
- Component `component.tsx` files must not import sibling component folders.
- Active CSS remains centralized for auditability. Item `styles.css` files mark ownership and style debt until a visual QA pass moves selectors safely.
- Composer remains whole. Do not split one interactive component file only to satisfy a LOC budget.

## Package Shape

```txt
packages/concrete/src/
  components/   public component item folders and the component barrel
  factories/    createControls, createExamples, createItems, and barrel only
  foundations/  foundation item folders and foundation exports
  icons/        public icon subpath export
  primitives/   public primitive item folders plus private internal primitives
  registry/     public registry projection over item definitions
  schemas/      public schema subpath export
  styles/       public stylesheet inputs, selector contract, and manifest
  utilities/    shared pure algorithms and temporary shared render engines
  styles.css    required public root stylesheet input
  index.ts      root public package export
```

`icons/` and `schemas/` remain top-level because they are stable package subpath exports. They may be internally backed by foundations or registry later, but the public surface should not churn casually.

## Item Manifest

Public foundations own:

```txt
foundations/<slug>/
  examples.tsx
  index.tsx
  meta.ts
  schema.ts
  styles.css
```

Public primitives and components own:

```txt
primitives/<slug>/
  component.tsx
  examples.tsx
  index.tsx
  meta.ts
  schema.ts
  styles.css

components/<slug>/
  component.tsx
  examples.tsx
  index.tsx
  meta.ts
  schema.ts
  styles.css
```

Private internal primitives own only:

```txt
primitives/internal/<name>/
  component.tsx
  index.ts
```

Item files are intentionally boring:

- `component.tsx` authors one runtime component export.
- `schema.ts` authors one runtime schema export and directly related input/output types.
- `examples.tsx` authors one runtime examples export.
- `meta.ts` authors one runtime metadata export.
- `index.tsx` authors one runtime item bundle export and public re-exports.
- `styles.css` contains selectors or ownership comments for that item only.

Type exports are allowed beside their owning runtime export. Barrels may expose multiple public values to preserve compatibility, but they must not introduce behavior.

## Item Contract

Every item exports one canonical item bundle through `createFoundation`, `createPrimitive`, or `createComponent`.

```ts
export const buttonPrimitive = createPrimitive({
	component: Button,
	examples: buttonExamples,
	meta: buttonMeta,
	schema: buttonSchema
})
```

The factory result is what the registry consumes. The component is only one field of the item contract.

Required concepts:

- `slug`: stable public identifier, inferred or explicit.
- `kind`: `foundation`, `primitive`, or `component`.
- `schema`: Zod schema for serializable inspectable input.
- `seed`: valid default input derived from schema and overrides.
- `component`: exported React implementation.
- `renderInput`: serializable input adapter used by docs/playground/render routes.
- `examples`: typed example recipes.
- `meta`: light catalog metadata.

The implementation may hide generated fields behind factories, but the concept must remain true: item definitions are the one source of truth for docs, examples, seeds, controls, render routes, and tests.

## Single Concern Policy

One concern belongs in one place.

Do this:

- Keep an interactive component whole when the file owns one complete controller, event, and render flow.
- Promote genuinely reusable JSX to a primitive or component.
- Promote genuinely reusable algorithms to `utilities/`.
- Keep single-use local transformations inside the owning file.
- Use data maps instead of tiny local helper functions when they remove branching noise.

Do not do this:

- Split one component into extra files only because it crossed a LOC threshold.
- Create item-local helper files for one-off formatting.
- Put shared render engines in `components/` root.
- Import sibling component implementations from a component `component.tsx`.
- Add docs-side slug switches for item rendering.
- Duplicate prop metadata in docs fixtures.

Large files are migration targets only when they contain multiple concerns. A large file that cleanly owns one concern is allowed.

## Factories And Utilities

`factories/` is deliberately narrow:

```txt
factories/
  createControls.ts
  createExamples.tsx
  createItems.ts
  index.ts
```

If a file does not create item definitions, controls, or examples, it does not belong in `factories/`.

`utilities/` is for shared pure algorithms, schema input helpers, render-route helpers, and temporary shared engines. Utilities must stay general. If a utility becomes item-specific, move it into the item. If a utility renders reusable UI, promote it to a primitive or fold it into the component that owns the behavior.

Utilities are not a junk drawer. Every utility should be easier to explain than the duplication it removed.

## Components

Components assemble primitives, schemas, foundations, and utilities. They should not build a private design system inside themselves.

Component implementation rules:

- `components/<slug>/component.tsx` may import primitives, foundations, schemas, icons, utilities, and its own local schema/types.
- It must not import from `components/<other-slug>`.
- If two components need the same JSX, promote the JSX to a primitive or private internal primitive.
- If two components need the same calculation, promote the calculation to `utilities/`.
- If the reuse is fake or only exists for docs convenience, delete the abstraction and keep the JSX with the owner.

Components should rarely need new CSS. When a component needs layout styling, first ask whether the layout should be a primitive. If component CSS remains, leave a `DX-TODO(component-name)` comment in the active style file explaining the structural debt.

## Foundations And Primitives

Foundations should import only schemas, factory helpers, and narrow constants. They define the design language.

Primitives can import foundations, icons, schemas, utilities, and factory helpers. They are the reusable HTML-level vocabulary for product, editorial, generative UI, and educational compositions.

Primitives should be small but not starved. A primitive can own enough JSX to make the HTML concern complete. If it needs controller state or complex orchestration, ask whether it is actually a component.

## Registry And Schemas

The registry projects item definitions into public catalog data. It should not own component behavior, docs examples, or visual decisions.

Ordering belongs in registry item assembly. Registry projection files should be boring transformations.

Schemas stay public because `@rubriclab/concrete/schemas` is a package boundary. Item schemas may re-export central schemas when that preserves compatibility, but new serializable item input should be owned beside the item whenever possible.

## Docs App

Docs routes own page-level UX. Do not create a route whose only job is `return <SomePage />`.

Docs generic renderers belong in `apps/docs/src` when they are genuinely shared. Each docs component file should have a single runtime export. Route files can be larger than a tiny proxy when the page-level layout is the concern being owned.

Docs must import only public `@rubriclab/concrete` surfaces.

Current raw HTML and class-heavy docs pages are transition debt. Future UX work should rebuild docs surfaces from Concrete primitives rather than expanding bespoke markup. Leave `DX-TODO(docs)` comments when preserving HTML/classes during structural work.

Docs should not own:

- item-specific render switchboards
- item-specific playground switchboards
- primitive role label maps
- component preview fixture maps
- duplicated prop metadata
- route-local demo components for package items

Docs should own:

- page composition
- navigation shell
- generic catalog/detail/playground renderers
- query parsing for playground URLs
- package usage narrative

## Schema, Seeds, And Controls

The playground input is the item schema, not a manually curated controls list.

Controls are generated from Zod:

- `z.string()` becomes a text input.
- `z.number()` becomes a number input.
- `z.boolean()` becomes a switch.
- `z.enum()` becomes a select.
- `z.literal()` becomes a fixed display.
- `z.array()` becomes a repeater and JSON editor.
- `z.object()` becomes a nested fieldset and JSON editor.
- `z.union()` becomes a JSON editor unless discriminated.
- `z.discriminatedUnion()` becomes a discriminator select plus nested controls.
- `z.custom()` is unsupported until annotated.

Every playground must also expose an exhaustive JSON editor for the full schema. Friendly controls are an ergonomic projection; JSON is the complete contract.

Seeds are valid default inputs. They are generated by walking the schema and can be overridden by the item:

- `string` seeds to `"Text"`.
- `number` seeds to `0`.
- `boolean` seeds to `false`.
- `enum` seeds to the first option.
- `literal` seeds to the literal value.
- `array` seeds to `[]`.
- `object` seeds recursively.

Do not make product-required props optional only to satisfy docs defaults. Required runtime props stay required; seeds provide docs/runtime examples.

## Examples

Examples are typed recipes, not arbitrary JSX by default.

```ts
export const buttonExamples = createExamples(buttonSchema, {
	default: {
		description: 'Default command.',
		props: { label: 'Continue', variant: 'secondary' }
	},
	signal: {
		description: 'High-intent and destructive actions.',
		items: [
			{ label: 'Upgrade', leadingIcon: 'sparkles', variant: 'ultra' },
			{ label: 'Delete', leadingIcon: 'trash-2', variant: 'danger' }
		],
		layout: 'inline'
	}
})
```

The renderer owns layout. The item owns valid props. Raw React examples are an escape hatch for rare compositions and must be visually justified.

Example recipes drive:

- catalog previews
- detail-page example cards
- render routes
- screenshot routes
- static render tests
- visual QA samples

Do not rely on object insertion order for authored examples. Biome may sort keys, so semantic order must be explicit or derived by a factory-level ordering rule.

## Metadata

Metadata stays light and catalog-only.

```ts
export const buttonMeta = {
	category: 'control',
	description: 'Short command control.',
	name: 'Button',
	pressure: ['product', 'generative']
} as const
```

Do not put implementation rules, prose essays, or duplicate prop tables in metadata. Prop documentation should come from schema annotations or narrow item doc hints if needed.

## CSS Decision

The public contract favors stable global classes and a single public stylesheet export.

Target CSS model:

- Item-owned `styles.css` files for locality.
- A build step concatenates or imports item CSS into public bundle outputs.
- Public consumers still import `@rubriclab/concrete/styles.css`.
- Selectors remain stable global Concrete selectors, not hashed CSS module names.

Reasoning:

- Global classes make public styling, debugging, docs inspection, screenshot comparison, and tests stable.
- Item-owned CSS gives locality without changing the public stylesheet contract.
- CSS modules reduce selector collision risk, but hashed names fight public docs, screenshot inspection, and stable class-name tests.

Hard CSS rules:

- No raw colors outside foundation token definitions.
- No raw shadows outside elevation tokens.
- No arbitrary radii outside radius tokens.
- No item-specific magic spacing values when a token exists.
- No selectors outside the item namespace in item CSS.
- No nested card-in-card visual compositions unless the component semantically requires a framed repeated item.
- Do not add CSS modules unless the architecture decision changes and stable public aliases are enforced.

Current implementation note: active selectors still live in shared CSS files for auditability. Item-local `styles.css` files mark ownership and style debt. Do not move selectors into item CSS until the public stylesheet path and visual QA coverage make that move safe.

Class-name implementation note: `styles/class-names.ts` owns deterministic selector derivation and the runtime selector contract. Prefer runtime contract tests for selector coverage over recursive mapped types that create TypeScript union-complexity failures at JSX scale.

## Structural Refactor And Visual Debt

Structural DX work is not a visual redesign pass.

During item migration:

- Preserve existing JSX semantics and active CSS behavior unless a structural change requires a minimal adjustment.
- Do not clean up a primitive or component's visual details if the cleanup would require a new visual QA batch.
- Move source ownership aggressively, but leave questionable styling values in place with `DX-TODO(...)` comments when changing them could alter pixels.
- Add debt comments in the style file that currently owns the active selectors.
- Prefer comments that name the concrete concern: raw value, token mismatch, component CSS that should become primitive/layout composition, selector namespace issue, or visual inconsistency.
- Keep structural gates green first. Batch visual polish behind a separate screenshot/inspection ticket.

Example:

```css
/* DX-TODO(button): Raw shadow values predate token enforcement.
   Leave unchanged during structural migration; replace with foundation tokens in a visual QA pass. */
```

## React Node Closure Path

Today, arbitrary `ReactNode` is not fully serializable. The inspectable schema should model serializable own props, and `renderInput` adapts those props into JSX.

If we want to fully close the playground loop later, introduce a recursive Concrete node language inspired by `blocks` and `chains`.

```ts
const concreteNodeSchema = z.discriminatedUnion('type', [
	z.object({ type: z.literal('text'), value: z.string() }),
	z.object({ name: iconNameSchema, type: z.literal('icon') }),
	z.object({
		children: z.array(z.lazy(() => concreteNodeSchema)),
		props: z.record(z.string(), z.unknown()).default({}),
		type: z.literal('element'),
		value: concreteElementNameSchema
	})
])
```

Then item schemas can use branded/custom node slots:

```ts
children: concreteNodeSlot('ButtonChildren')
leading: concreteNodeSlot('ButtonLeadingSlot').optional()
```

This would make children, slots, nested examples, query params, JSON editing, render routes, and generated interfaces fully serializable. Do not start here. First finish the item contract and schema-derived controls for serializable props.

## LOC Guidance

LOC budgets are warnings, not goals.

- Item `index.tsx`: target under 160 LOC, warning at 220 LOC.
- Item `schema.ts`: target under 80 LOC, warning at 140 LOC.
- Item `styles.css`: target under 180 LOC, warning at 260 LOC.
- Factory files: target under 220 LOC, warning at 300 LOC.
- Docs generic renderer files: target under 120 LOC, warning at 180 LOC.
- Docs route files: target under 80 LOC unless the route owns real page UX.
- Package files over 300 LOC should have a clear ownership reason.

If a file is large because it owns exactly one complete concern, keep it whole. If it is large because multiple concerns are tangled, split by ownership, not by line count.

## Minimal Test Surface

Keep tests narrow and contract-level:

- every item slug is unique
- every item seed parses against its schema
- every example parses and renders static markup
- every generated control can parse and serialize its seed value
- every public export and subpath resolves
- docs imports only public package surfaces
- package source does not import CSS modules unless the CSS decision changes
- styles contain no banned raw values outside token files
- component implementations do not import sibling components
- item folders keep the exact manifest
- public stylesheet manifests include every item stylesheet

Tests should guard architecture contracts and public behavior, not snapshot private implementation trivia.

## Code Conventions

Do this:

- Use `createPrimitive`, `createComponent`, and `createFoundation` for every item.
- Keep item definitions declarative.
- Let schemas drive parsing, controls, seeds, examples, tests, and docs.
- Use discriminated unions for complex structured input.
- Use data maps instead of local `getVariantClass` helpers when possible.
- Promote reusable JSX to primitives/components.
- Promote reusable algorithms to shared utilities.
- Keep docs generic and registry-driven.
- Prefer named functions when behavior has a name.
- Prefer descriptive generic names over single-letter generics.

Do not do this:

- Do not add docs-side slug switches for item rendering.
- Do not hand-author partial playground controls.
- Do not duplicate prop metadata in docs fixtures.
- Do not add item-local helper files for one-off formatting.
- Do not hide untyped input behind `unknown` or `any`.
- Do not loosen schemas to make examples easier.
- Do not add CSS values that bypass tokens.
- Do not add tests that lock incidental implementation details.
- Do not move code into `utilities/` simply because placement is uncomfortable.

## Completion Queue

Work in this order unless a gate failure forces a different repair:

1. Pay down component-to-component transition exceptions without adding duplicate JSX.
2. Decide whether chart shared render engines should become primitives or collapse into chart components.
3. Move active CSS selectors into item-owned style files only with visual QA coverage.
4. Add nested object, array, and discriminated-union controls over the existing root `Props JSON` boundary.
5. Consider the recursive Concrete node schema only after serializable props and controls are complete.
6. Harden public export compatibility, raw CSS value policy, and browser/screenshot smoke coverage.

## Long-Run Protocol

Before a long run:

1. Read this file first.
2. Read `REFACTOR_RUNBOOK.md` for history, active gates, and the current chunk.
3. Run `git status -sb`.
4. Pick one vertical slice or one cleanup cluster.
5. Update the todo list before editing.
6. Convert the slice fully before broad migration.
7. Run the narrow gate, then the full gate when the cluster is done.
8. Update `REFACTOR_RUNBOOK.md` with what changed, what passed, what failed, and the next chunk.
9. Repeat.

The todo list is the live operating memory. The runbook is the continuity anchor across context compaction. This file is the architecture contract.

Do not continue broad migration if a slice makes the item contract feel worse. Stop, revise the factory surface, then proceed.
