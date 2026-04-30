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
- Treat `PLAN.md` as the target item inventory and operating todo for ontology work. If the target changes, update that file before code.
- Foundations must exhaust the reusable design language that primitives consume. Do not add primitive CSS values to compensate for missing foundation concepts.
- Public primitives must be reusable UI vocabulary, not component selector buckets extracted to satisfy the component CSS rule.
- Primitive props must express role, hierarchy, intent, density, placement, slot, and state. They must not expose arbitrary visual overrides.
- Avoid `any`, hidden flows, and untyped escape hatches.
- Treat LOC as a signal, not an architecture rule. Splitting one complete concern only to reduce line count makes the codebase worse.
- Keep internal DX Markdown to two files: `CODE.md` for rules and `PLAN.md` for active work, target inventory, and migration memory.

## Ownership Law

Concrete has three item layers. The layers are architectural boundaries, not vibes.

Foundations define the language. They own actual values: color, typography, spacing, radii, elevation, motion, texture, reset rules, and tiny utility classes that are more primitive than any one item. Foundation CSS is the only place new raw visual values may be introduced. A value is raw when it is a pixel, hex, rgb/rgba, timing, easing, shadow, radius, percentage used as a size, or any other literal that encodes visual policy instead of referencing a Concrete token. Non-visual CSS language constants such as `0`, `none`, `auto`, `inherit`, `transparent`, `currentcolor`, string font feature names, `@font-face` descriptors, and `@media` thresholds are allowed only as documented scanner exceptions.

Primitives define the HTML vocabulary. They own DOM tags, ARIA, data attributes, stable Concrete class names, event affordances that are native to one atomic control, and one local `styles.css` file. Primitive CSS may use selectors, but declarations must resolve through foundation variables or foundation utilities. A primitive is allowed to compose other primitives only when the resulting idea is still a single HTML-level concept.

Components define workflows. They own orchestration, state, parsing, schema-bound behavior, data mapping, and composition of primitives. The target component implementation does not render raw HTML tags, does not import `concreteClassNames`, does not import CSS, and does not introduce bespoke styling. If a component needs a styled wrapper, row, header, toolbar, panel, field chrome, table part, chart frame, message part, or menu part, that vocabulary must first exist as a primitive or private internal primitive.

Registry and docs project item definitions. They never become a second component system.

## Ontology Law

The Concrete ontology is the layered contract for what belongs in foundations, primitives, and components. `PLAN.md` is the executable inventory and migration memory. During ontology work, the plan beats memory, previous migration convenience, and local naming inertia.

Foundations are exhaustive. If two primitives need the same visual concept, the concept belongs in a foundation first. Foundation token names should describe design language, not product objects. Prefer `control`, `surface`, `panel`, `overlay`, `rail`, `track`, `viewport`, `feedback`, `trace`, `data`, `diagram`, `status`, and `tone` vocabulary over component names like `form-shell`, `data-table`, `metric-card`, or `composer`. A domain noun is allowed only when the noun is a true design domain used across the system, such as `chart`, `table`, `diagram`, `message`, or `tool`.

Primitives are rigid grammar. A primitive should be the smallest named HTML concept that future components can assemble without inventing style. Good primitives are boring to use because the visual decisions are already encoded in foundations. A primitive may compose other primitives only when the result is still one reusable HTML-level concept, such as a field row, menu item, panel header, or trace panel.

Components are behavior. They parse schemas, own state, map data, respond to events, run keyboard flow, and compose primitives. A component may compose another component only after the dependency is declared in an acyclic component tier map and the import-boundary test allows that tier. Until that map exists, the current stricter rule remains active: component implementations do not import sibling component implementations.

Public primitive status is earned. A private internal primitive can become public only when its name, schema, examples, docs, and styles describe reusable Concrete vocabulary. Docs-only render helpers, preview constraints, and migration shims do not belong in the public primitive registry.

Primitive props are closed. Allowed prop categories are:

- `role`: semantic job inside the composition.
- `hierarchy`: primary, secondary, tertiary, ghost, or another shared hierarchy.
- `intent`: neutral, sky, terminal, ultra, danger, or another shared tone.
- `density`: compact, comfortable, editorial, or another shared density.
- `state`: open, selected, pressed, loading, disabled, error, success, pending.
- `placement`: top, right, bottom, left, inline, overlay, start, end.
- `slot`: typed React slots or serializable Concrete node slots.

Banned public primitive prop categories are:

- raw color
- raw spacing
- raw radius
- raw shadow
- raw font size
- raw width or height, except data-driven SVG geometry
- arbitrary `style`
- arbitrary CSS variable bags
- open-ended `variant` when it really means visual override

`className` may remain as a root placement escape hatch for compatibility. It must not become the styling API, and new internal structure should not depend on consumer class names.

## Promotion Rules

When a chunk exposes missing vocabulary, promote by the narrowest durable boundary:

- Add a foundation token when at least two items need the same visual value or when one item needs a value that clearly belongs to global Concrete language.
- Add a foundation utility only for behavior lower than an item, such as visually hidden content, focus targeting, reset-level layout, or typography rhythm that should be stable across many primitives.
- Add or expand a primitive when JSX, class names, ARIA, or scoped style can be named as one reusable HTML concept in the ontology.
- Add a private internal primitive when the concept is reusable inside the package but not ready to become public API.
- Promote an internal primitive to public only when docs, examples, schemas, and naming can defend it as product vocabulary.
- Keep logic in a component when the concern is orchestration, controlled state, schema parsing, data transformation, or multi-step workflow behavior.
- Move calculations to `utilities/` only when they are pure, reusable, and easier to explain than the duplication they remove.
- Re-scope foundations immediately when a migration needs a value that cannot be expressed with existing tokens. Do not hide the missing token in item CSS.

Do not create a new primitive for a single wrapper whose only purpose is to bypass the component styling rule. First ask whether an existing layout, surface, text, control, field, overlay, menu, feedback, data, chart, diagram, agent, or media primitive should grow.

## Current Checkpoint

- Foundations, primitives, and components are folder-owned item bundles.
- The public foundation set is now `colors`, `typography`, `spacing`, `sizing`, `layout`, `radii`, `elevation`, `motion`, `textures`, `iconography`, `state`, and `accessibility`.
- Public registries are derived from item definitions.
- Public foundation registry entries expose validated `tokens` so docs can explain foundation data without importing foundation-specific schema files.
- Generic layout primitives now exist for `Stack`, `Inline`, `Cluster`, `Grid`, `Split`, `ScrollArea`, `Dock`, and `Rail`. Use them as the first answer for layout vocabulary before adding domain-specific wrappers.
- Generic surface, typography, and command-group primitives now exist for `Surface`, `Panel`, `Section`, `Header`, `Text`, `Heading`, `Label`, `IconButton`, and `ControlGroup`. Use them before preserving migration-era shell/header/label/control names.
- Phase 3A target primitives now exist for form, picker, menu, overlay, search, token, feedback, and disclosure vocabulary: `FieldRow`, `Token`, `SearchInput`, `PickerButton`, `PickerSurface`, `MenuSurface`, `MenuGroup`, `Listbox`, `Overlay`, `DialogSurface`, `DrawerSurface`, `Alert`, `ValidationList`, and `DisclosurePanel`.
- `DataSurface` is the generic data/generative panel surface. Do not restore metric-specific or data-header wrapper primitives; use `DataSurface` plus `Header`, `Stat`, `Progress`, `Sparkline`, `Indicator`, and table/chart atoms.
- Phase 3B primitive correction is complete. Data, table, chart, calendar, range, stepper, composer, message, trace, texture, preview, and suggestion migration primitives have been renamed, split, or demoted. Chart anatomy is now explicit: `ChartFrame`, `Plot`, `ChartGrid`, `Axis`, `TargetLine`, `SeriesLine`, `SeriesPoint`, `SeriesBar`, `DonutRing`, and `HeatmapGrid`.
- Deferred public primitives are intentional, not missing work: `trace-step` stays inside `TracePanel` until reused outside it, and `attachment-item`/`thumbnail` wait for a file/upload slice that proves distinct vocabulary beyond `Token`, `TokenRail`, and `UploadItem`.
- Breaking primitive cleanup is allowed when `PLAN.md` records the delete/demote decision. Deleted primitive names must leave registry, exports, styles, tests, docs smoke targets, class-name maps, and foundation token names in the same wave.
- Docs detail, render, playground, and catalog flows consume registry definitions.
- `factories/` owns item, control, and example creation.
- `utilities/` owns shared pure algorithms, render helpers, schema input helpers, and temporary shared engines.
- `components/` root is a public barrel only. Shared component engines do not live there.
- Shared JSX used by components lives in private `primitives/internal/*` folders until it becomes a public primitive or collapses back into one owner.
- Component `component.tsx` files must not import sibling component folders.
- Remaining centralized CSS is explicit migration debt for deferred primitive slices. Item `styles.css` files either own active selectors or do not exist for that item.
- The next checkpoint is primitive prop tightening and component assembly hardening.
- `PLAN.md` is the live scope ledger, autonomous queue, and target foundation/primitive/component inventory. Every structural chunk must update it before stopping.
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
  styles.css  optional, only for ledger-recorded active component-local debt
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
- `styles.css` contains selectors for that item only. Comment-only component stylesheets are deleted instead of kept as placeholders.

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
- Future component-to-component imports require a declared acyclic tier map and a test that names the allowed dependency. Until that exists, compose shared UI through primitives and shared behavior through utilities.
- If two components need the same JSX, promote the JSX to a primitive or private internal primitive.
- If two components need the same calculation, promote the calculation to `utilities/`.
- If the reuse is fake or only exists for docs convenience, delete the abstraction and keep the JSX with the owner.
- Migrated components must not import `concreteClassNames`, use `className` for internal structure, render raw DOM tags for styled structure, or own active CSS.
- Components may pass `className` through to a primitive only when preserving public API requires it. They must not build new styling around that escape hatch.
- A component may keep raw semantic DOM only while it is an explicit migration exception in `PLAN.md`; the exception must name the primitive boundary that should absorb it.

Components should not need CSS in the current architecture. When a component appears to need layout styling, first ask which primitive is missing. A future component stylesheet is allowed only as a ledger-recorded migration exception with a `DX-TODO(component-name)` comment explaining the structural debt.

## Foundations And Primitives

Foundations should import only schemas, factory helpers, and narrow constants. They define the design language.

Primitives can import foundations, icons, schemas, utilities, and factory helpers. They are the reusable HTML-level vocabulary for product, editorial, generative UI, and educational compositions.

Primitives should be small but not starved. A primitive can own enough JSX to make the HTML concern complete. If it needs controller state or complex orchestration, ask whether it is actually a component.

Primitive implementation rules:

- Before adding or renaming a primitive, classify it in `PLAN.md`.
- Prefer generic primitives before domain primitives. Add `Surface`, `Panel`, `Header`, `Stack`, `Inline`, `Grid`, `Listbox`, `Token`, or `TracePanel` before adding another component-shaped shell.
- `primitives/<slug>/component.tsx` places stable Concrete classes on DOM through JSX.
- `primitives/<slug>/styles.css` is the only item-owned stylesheet allowed to define that primitive's selectors.
- Primitive selectors must stay in the primitive namespace unless styling a direct child slot that the primitive owns.
- Primitive CSS must not contain raw values. Missing values become foundation variables first.
- Primitive class names should come from the deterministic selector contract while migration is active; once a primitive is complete, its selector keys should be easy to map back to that primitive.
- Primitive schemas should import shared foundation/state enums when a prop is generic across items. Local enums are allowed only for item-specific semantic state, not visual override.
- A primitive may expose `className` only on the root element unless a public slot explicitly needs placement control.
- Public primitives must export one item bundle and may export local runtime helpers only when they are part of that primitive's public concept.

Foundation implementation rules:

- Before adding a foundation token, decide whether it belongs to colors, typography, spacing, sizing, layout, radii, elevation, motion, textures, iconography, state, or accessibility.
- Foundation CSS may define raw values, semantic aliases, global reset behavior, and foundation utilities.
- Foundation token names should be generic design language. Component names in foundation tokens require a written exception in `PLAN.md`.
- A foundation utility must be value-backed by foundation tokens or reset-level browser behavior.
- If a utility starts describing one reusable UI object, it is a primitive, not a foundation.
- Foundation examples demonstrate the token system; they do not introduce alternate styling policy.

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

## Docs And Example Accuracy Law

Docs and examples are part of the package contract. They are not disposable demos.

The docs app is a projection of public registry data. Public foundations, primitives, and components must be represented from their item bundles or foundation definitions, not from stale route-local fixture lists. A docs page may own page-level UX, navigation, copy, and generic grouping, but it must not become the source of truth for what the package contains.

Every public item must have a strong `default` example and meaningful additional states when the item has variants, tones, sizes, empty/loading/disabled/error states, dense data states, or educational states. The default should be the best representative showcase for the item, not the smallest possible prop object.

Examples must be serializable and server-renderable. `examples.tsx` props and item `renderInput` output must not require preview-only callbacks, browser-only objects, functions, promises, symbols, or ambient docs state. Interactive affordances should expose serializable state in examples and keep optional callbacks for consumer-supplied runtime interactivity.

Primitive and component examples must not own visual styling or generic preview chrome. They may compose Concrete primitives that are part of the showcased product anatomy, plus item-owned fixtures, but they must not wrap examples in `Frame`, `Card`, `PreviewStage`, bespoke wrapper class names, route-local preview chrome, or arbitrary DOM to make an item look correct. Generic spacing, centering, and width constraints belong to docs renderers or to the primitive under test, not to each example.

Foundation examples may demonstrate raw tokens because foundations own the language values. Even there, examples should consume exported foundation definitions, token maps, and foundation styles rather than duplicating docs-only values.

Docs routes for item detail, render, screenshot, playground, and catalog views must cover foundations as well as primitives and components when the route concept applies. If one layer cannot use a generic renderer, record the reason in this file or `PLAN.md` before adding a special path.

Visual smoke and catalog audit scripts are part of the item contract. A new public item, example state, or docs projection must either enter the generic audit surface or record a deliberate exclusion with a repair ticket in `PLAN.md`.

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

- Foundation-owned `styles.css` files emit variables, semantic aliases, reset rules, and allowed utilities.
- Primitive-owned `styles.css` files emit scoped primitive selectors only.
- Component-owned `styles.css` files should not exist in the migrated state. A component can keep one only while the ledger names why no primitive boundary exists yet.
- A build step concatenates root, foundation, primitive, and any ledger-recorded temporary component CSS into public bundle outputs.
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
- No raw typography sizes, weights, line heights, timings, easings, z-indexes, widths, heights, offsets, or opacity values in primitive/component CSS unless the value is represented by a foundation token first.
- The import-boundary raw-value scanner is the enforcement layer. If it fails, either add a foundation token, delete dead CSS, or document a true CSS-language exception before widening the allowlist.
- The central `src/styles/primitives.css` and `src/styles/components.css` files are public bundle substrate only; import-boundary tests reject active `.concrete-*` selectors there.
- Retired component-era foundation token names must stay retired once a primitive boundary exists; current guarded examples are `number-stepper` -> `stepper-control` and `range-slider` -> `range-control`.
- No selectors outside the item namespace in item CSS.
- No primitive-specific selectors in foundation CSS.
- No component selectors in primitive CSS unless the primitive is being created to absorb that component vocabulary and the ledger records the transition.
- No nested card-in-card visual compositions unless the component semantically requires a framed repeated item.
- Do not add CSS modules unless the architecture decision changes and stable public aliases are enforced.

Current implementation checkpoint: root custom properties live in foundation stylesheets, token-consuming CSS is scanner-checked for raw visual values, the shared primitive/component layer files own no active selectors, and `componentStyleSources` is empty. Keep the central layer files as compatibility bundle substrate only; new styling must enter through foundation or primitive item styles and update `PLAN.md`.

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

Arbitrary `ReactNode` is not fully serializable. The inspectable item schema still models serializable own props, and `renderInput` adapts those props into JSX for existing docs and render routes.

Concrete now also exposes a recursive, validation-only node language for generated interface descriptions:

- `concreteNodeSchema` accepts text nodes and item nodes.
- Item nodes reference a registry item with `{ kind: 'primitive' | 'component', slug }`.
- Item node `props` must be JSON-serializable through `ConcreteJsonValue`.
- Item node `children` and named `slots` recursively contain Concrete nodes.
- The base schema validates structure and serializability only.
- `validateConcreteNode` and `validateConcreteNodeTree` live in the registry layer because only the registry can validate item references and parse props through each referenced item schema.

This is not a renderer and must not become one. Node validation never calls `renderInput`, `renderExample`, React, or docs render routes. Pressure, viewport, and layout metadata are intentionally excluded from the node grammar for now because pressures are composition guidance, not universal props, and layout should be expressed by chosen primitives and their schemas.

Future closure work can add branded node slots to item schemas only when a component needs a real serializable slot boundary. Until then, keep item props as the default contract and use Concrete nodes only for external/generated tree validation.

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
- any future component-to-component import is declared in an acyclic component tier map
- foundation token names do not contain component slugs unless documented as domain vocabulary
- public primitive schemas do not expose raw visual override props
- public primitive registry does not contain docs-only or migration-only primitives
- examples and render-input definitions do not own inline visual style
- primitive runtime inline style is limited to documented dynamic adapters
- chart render utilities may own geometry and scaling, but chart selector vocabulary must be applied through chart-surface primitives
- item folders keep the exact manifest
- public stylesheet manifests include every item stylesheet
- visual smoke covers migrated primitives and at least one dense product/data composition

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

Current standardization checkpoint:

1. Component implementations are guarded against owned class names, styled raw DOM, and component stylesheets.
2. The recursive Concrete node schema is validation-only and registry-checked.
3. Public export compatibility, raw CSS value policy, media-query exceptions, and browser/screenshot smoke coverage are guarded by tests.
4. The foundation concept split, generic layout/surface/text/control vocabulary, first destructive primitive contraction, and data-surface cut are structurally complete. The next active phase is table/chart/diagram/agent primitive correction, primitive prop discipline, and component assembly over the target inventory in `PLAN.md`.

When new structural debt appears, add it to `PLAN.md` first, then pull the first unblocked item into `## Active Work`.

## Autonomous Long-Run Protocol

Before a long run:

1. Read this file first.
2. Read `PLAN.md` for the target inventory, current active work, and migration memory.
3. Run `git status -sb`.
4. Pull the first unblocked plan item into an explicit active todo list before editing.
5. Convert the slice fully before broad migration.
6. Run the narrow gate, then the full gate when the cluster is done.
7. Update `PLAN.md` with target changes, item boundary/status changes, discovered work, gate results, and the next runnable chunk.
8. Update this file only when the architecture rules change.
9. Repeat.

`PLAN.md` is the live operating memory across context compaction. This file is the architecture contract.

Do not continue broad migration if a slice makes the item contract feel worse. Stop, revise the factory surface, then proceed.
