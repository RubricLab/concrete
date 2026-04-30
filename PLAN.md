# Concrete Plan

This is the only actionable internal plan document for Concrete DX work.

`CODE.md` is the rulebook. `PLAN.md` is the todo list, target inventory, current audit, and migration memory. Do not add another Markdown runbook, queue, proposal, or scope ledger.

## Read Order

1. `CODE.md`
2. `PLAN.md`
3. Current source files for the active row

## Current Baseline

- Audit date: 2026-04-30.
- Current public package inventory: 12 foundations, 106 primitives, 33 components.
- Current private primitive inventory: 2 internal primitive folders.
- Folder-per-item architecture exists.
- Public registry and docs are item-definition driven.
- Active component CSS debt should remain zero. Any new component `styles.css` is a regression unless this file records a temporary exception.
- Central primitive/component CSS layers are compatibility bundle substrate only. Active selectors belong in foundation or primitive item styles.
- The primitive ontology correction pass is complete. The next phase is primitive prop tightening and component assembly hardening.

## Operating Loop

1. Read `CODE.md`, then this file.
2. Run `git status -sb`.
3. Pull the first unchecked row from `## Active Work`.
4. Execute vertically: foundation tokens/schemas, primitive folder, component usage, examples/docs, tests.
5. Preserve public API only when the current row says compatibility matters. Primitive vocabulary cleanup may be breaking when this file records a delete/demote decision.
6. Preserve visual behavior unless the row explicitly says visual polish is in scope.
7. Update this file before stopping: row status, discoveries, gates, and next runnable row.
8. Update `CODE.md` only if the rules change.

## Status Legend

- `keep`: correct concept; only tighten tokens, schemas, examples, or tests.
- `refine`: correct folder exists; scope or props need tightening.
- `add`: target concept does not exist yet.
- `rename`: current folder exists under a migration-era or less correct name; add the target name and delete the old primitive in the same breaking wave when feasible.
- `split`: current folder owns multiple target concepts.
- `merge`: current folder should collapse into a broader primitive/foundation.
- `demote`: current public item is docs-only, specimen-only, or migration-only; remove it from primitive registry/exports when the owning row is in scope.
- `compat`: public component stays as compatibility/API surface while delegating to better primitives/components.
- `audit`: source-level inspection is required before implementation.

## Active Work

- [x] Audit current foundation, primitive, component, and internal primitive folders.
- [x] Collapse DX planning harness to `CODE.md` plus `PLAN.md`.
- [x] Phase 1A: add foundation `state` and move shared tone/status/hierarchy/density schemas there.
- [x] Phase 1B: split `spacing` into `spacing`, `sizing`, and `layout` without changing public CSS output.
- [x] Phase 1C: add `iconography` and `accessibility` foundation concepts while preserving `icons` and current utility exports.
- [x] Foundation registry entries expose validated token records for docs and catalog explanation.
- [x] Phase 2A: add layout primitives `Stack`, `Inline`, `Cluster`, `Grid`, `Split`, `ScrollArea`, `Dock`, and generic `Rail`.
- [x] Phase 2B: add surface/typography/control primitives `Surface`, `Panel`, `Section`, `Header`, `Text`, `Heading`, `Label`, `IconButton`, and `ControlGroup`.
- [x] Phase 3A: add target primitives for form, picker, menu, overlay, search, token, and feedback vocabulary.
- [x] Phase 3A follow-up: delete legacy form, picker, menu, search, select, token, and feedback primitives after migrating consumers to target primitives.
- [x] Phase 3B: rename/split data, table, chart, diagram, and agent migration primitives.
- [ ] Phase 4: tighten public primitive prop schemas against role/state/density/hierarchy and remove visual override APIs where compatibility allows.
- [ ] Phase 5: make component implementations assemble only target primitives, schemas, and utilities; keep component files whole when they own one controller.
- [ ] Phase 6: add/adjust tests for target folder presence, demoted public registry entries, foundation noun policy, primitive prop policy, and component assembly boundaries.

## Gate Log

- 2026-04-30 Phase 1A passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts`, `bun test packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun run check`.
- 2026-04-30 Phase 1B/1C plus foundation registry token interface passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts`, `bun test packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun run check`, `bun run build`.
- 2026-04-30 Phase 2A layout primitives passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts`, `bun test packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun test`, `bun run check`, `bun run build`, `bun run visual:smoke`, `bun run catalog:audit`. First `catalog:audit` attempt collided with the simultaneous temporary visual-smoke Next server; isolated rerun passed 449 render routes.
- 2026-04-30 Phase 2B surface/text/control primitives passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts`, `bun test packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun test`, `bun run check`, `bun run build`, `bun run visual:smoke`, `bun run catalog:audit`. Catalog audit passed 475 render routes.
- 2026-04-30 Phase 3A target primitive vocabulary passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts`, `bun test packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun test`, `bun run check`, `bun run build`, `bun run visual:smoke`, `bun run catalog:audit`. Catalog audit passed 517 render routes. `Overlay` fixed mode and `PickerSurface` floating mode remain semantic/layout-safe primitives; components own actual viewport and popover positioning.
- 2026-04-30 Phase 3A destructive contraction passed: removed public primitive folders `form-layout`, `form-overlay`, `picker-control`, `picker-shell`, `menu-shell`, `search-field`, `search-token`, `select-control`, `select-menu`, and `feedback-panel`; migrated form, picker, menu, search, select, token, and feedback component consumers to target primitives; pruned stale selector keys and renamed deleted-noun foundation tokens. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts`, `bun test packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun test`, `bun run check`, `bun run build`, `bun run visual:smoke`, `bun run catalog:audit`. Catalog audit passed 490 render routes.
- 2026-04-30 Phase 3B data-surface contraction passed: added `data-surface`, deleted public `metric-shell` and `data-card-header`, and migrated metric, meter, data-table, chart, and flow-diagram consumers to `DataSurface`/`Header`. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun run check`, `bun run build`, `bun run visual:smoke`, `bun run catalog:audit`. Catalog audit passed 485 render routes.
- 2026-04-30 Phase 3B final primitive correction passed: renamed/demoted migration-era message, table, range, stepper, composer, calendar, texture, preview, and suggestion primitives; split chart anatomy into `ChartFrame`, `Plot`, `ChartGrid`, `Axis`, `TargetLine`, `SeriesLine`, `SeriesPoint`, `SeriesBar`, `DonutRing`, and `HeatmapGrid`; kept trace steps inside `TracePanel` instead of adding a premature public `trace-step`; deferred attachment/thumbnail until upload slices need them. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun test`, `bun run check`, `bun run build`, `bun run visual:smoke`, `bun run catalog:audit`. Catalog audit passed 480 render routes.

## Global Completion Definition

- Every target foundation folder exists or has a documented compatibility reason.
- Every primitive is public vocabulary, private internal implementation, or future-breaking demotion debt.
- Every public primitive schema exposes semantic props, not raw visual overrides.
- Every component assembles primitives and approved lower-tier components; it does not own CSS or styled raw DOM.
- Foundation tokens contain no component nouns unless the noun is a documented cross-system domain concept.
- Public registry, docs, examples, controls, render routes, screenshot routes, catalog audit, visual smoke, and package exports all resolve from item definitions.

## Foundation Folders

Foundations own value systems, shared schema constants, reset-level utilities, and raw design tokens. They do not render product UI.

| Folder | Status | Owns | Specific todo |
| --- | --- | --- | --- |
| `foundations/colors` | `refine` | Palette, foreground/background/border roles, inverse roles, accents, status tones, data tones, diagram tones. | Audit component-named aliases; keep domain-wide `data`, `chart`, `diagram`, `message`, and `tool` concepts only when they are reused across layers. |
| `foundations/typography` | `refine` | Font stacks, type scale, line heights, weights, text roles, mono/display/numeric recipes. | Move primitive-specific type aliases into generic roles such as `body`, `meta`, `label`, `heading`, `display`, `code`, and `number`. |
| `foundations/spacing` | `refine` | Raw space scale and semantic gaps/insets/stacks only. | Split completed. Continue removing migration-era semantic gaps only when the consuming primitive row changes. |
| `foundations/sizing` | `refine` | Control heights, icon sizes, avatar sizes, track sizes, rail sizes, hit targets, measure widths, viewport dimensions. | Added as public foundation. Size-like tokens moved from `spacing`; continue renaming component-sized aliases into generic roles as primitives migrate. |
| `foundations/layout` | `refine` | Stack, inline, cluster, grid, split, rail, dock, scroll, overlay recipes, breakpoints, z-index layers. | Added as public foundation. Layout recipes/templates/z-index values moved from `spacing`; replace component-named templates as layout primitives land. |
| `foundations/radii` | `refine` | Radius scale and shape roles. | Ensure primitives consume role aliases such as `control`, `surface`, `panel`, `overlay`, `token`, and `glyph`, not raw radius values. |
| `foundations/elevation` | `refine` | Borders, shadows, focus rings, inset treatment, depth recipes. | Replace component-named effects with role effects such as `control`, `surface`, `overlay`, `focus`, `trace`, and `data`. |
| `foundations/motion` | `refine` | Durations, easings, transitions, opacity roles, transforms, reduced-motion behavior. | Rename chart/table/composer-specific opacity and transform aliases into generic emphasis, reveal, drag, pressed, and visibility roles. |
| `foundations/textures` | `refine` | Dot, lattice, line, grid grounds, stroke/dash patterns, educational/editorial texture recipes. | Keep pattern values here; move rendered texture specimens out of public primitive vocabulary if they are docs-only. |
| `foundations/iconography` | `refine` | Icon names, aliases, semantic icon roles, icon sizes, stroke policy. | Added as public foundation while preserving top-level `icons` subpath; make `Icon` a stricter renderer over this foundation during the icon primitive row. |
| `foundations/state` | `refine` | Shared statuses, tones, hierarchy, density, pressure metadata, data-attribute vocabulary. | Added as public foundation. Shared data, command, field, upload, message, tool-call, hierarchy, and density schemas now live here; continue migrating primitive-local tone/variant enums when their target primitive rows are touched. |
| `foundations/accessibility` | `refine` | Visually hidden utility, focus target utility, hit-target minimums, reduced motion, forced colors. | Added as public foundation. `.concrete-visually-hidden` and `.concrete-focus-target` live here; continue demoting `focus-ring` from product primitive vocabulary unless it stays only as a docs specimen. |

## Primitive Folders

Primitives own reusable HTML/UI vocabulary: DOM anatomy, ARIA, data attributes, stable classes, schemas, examples, metadata, render input, and local styles. They do not own workflow orchestration or arbitrary visual overrides.

### Primitive Migration Ledger

| Source/current folder | Status | Target | Specific todo |
| --- | --- | --- | --- |
| `primitives/alert` | `keep` | `alert` | Added in Phase 3A. Inline or panel-level status message; use before feedback-specific wrappers. |
| `primitives/avatar` | `keep` | `avatar` | Align sizes with `sizing`; keep identity-only scope. |
| `primitives/badge` | `refine` | `badge` over `label` | Build on future `Label`; source tones/status from `state`. |
| `primitives/brand-mark` | `keep` | `brand-mark` | Keep brand renderer; move icon/stroke semantics toward `iconography`. |
| `primitives/bubble` | `rename` | `message-bubble` | Rename/generalize as conversation content surface; preserve export compatibility. |
| `primitives/button` | `refine` | `button` plus optional `icon-button` | Replace open `variant` thinking with hierarchy/intent/state; decide whether icon-only mode becomes `IconButton`. |
| `primitives/calendar-panel` | `rename` | `calendar-grid` plus `picker-surface` | Keep day-grid anatomy; move popover/panel chrome to picker/overlay primitives. |
| `primitives/card` | `refine` | `card` over `surface` | Keep repeated-item card scope; delegate base chrome to `Surface`. |
| `primitives/caret` | `keep` | `caret` | Align size/direction states with `iconography` and `state`. |
| `primitives/chart-legend` | `rename` | `legend` | Generalize beyond charts; preserve chart-specific examples as states. |
| `primitives/chart-surface` | `split` | `chart-frame`, `plot`, `chart-grid`, `axis`, `series-*`, `donut-ring`, `heatmap-grid` | Split SVG/class vocabulary into chart atom primitives; keep geometry in utilities/components. |
| `primitives/checkbox` | `refine` | `checkbox` plus `field-row`/`option-row` | Keep binary input atom; move row shell debt into `FieldRow` or `OptionRow`. |
| `primitives/chip` | `refine` | `chip` | Keep selectable inline filter; source selected/tone schemas from `state`. |
| `primitives/cluster` | `keep` | `cluster` | Added in Phase 2A. Wrapping inline group for chips, tags, actions, tokens, and compact tool sets. |
| `primitives/code` | `refine` | `code` | Keep inline/block code; audit syntax tokens against `colors` and `typography`. |
| `primitives/composer-rail` | `split` | `token-rail`, `attachment-item` | Generalize rail tokens; keep composer-specific behavior in `Composer`. |
| `primitives/composer-shell` | `rename` | `composer-surface` | Keep editor shell anatomy; move dock/footer patterns to `Dock` where generic. |
| `primitives/concept-connector` | `keep` | `concept-connector` | Keep educational relation glyph; source stroke/texture from foundations. |
| `primitives/concept-frame` | `keep` | `concept-frame` | Keep educational frame; do not use as generic preview chrome. |
| `primitives/control-group` | `keep` | `control-group` | Added in Phase 2B. Grouped control primitive for segmented commands and compact tool sets. |
| `primitives/data-surface` | `keep` | `data-surface` | Added in Phase 3B. Data and generated-output surface for metrics, meters, charts, tables, and compact data panels. |
| `primitives/data-table-control` | `rename` | `table-toolbar` or `control-group` | Move table search/filter/action shell to generic control/table primitives. |
| `primitives/data-table-pagination` | `rename` | `pagination` | Generalize page navigation footer. |
| `primitives/data-table-shell` | `split` | `table`, `data-surface`, `scroll-area` | Split card/surface, scroll, table, row, cell, selection, and sort anatomy. |
| `primitives/delta` | `keep` | `delta` | Source positive/negative/neutral tones from `state`; keep numeric change scope. |
| `primitives/dialog-surface` | `keep` | `dialog-surface` | Added in Phase 3A. Dialog sizing and semantics inside `Overlay`; behavior stays in components. |
| `primitives/diagram-controls` | `refine` | `diagram-controls` over `control-group`/`icon-button` | Keep diagram-specific command set only after generic control primitives exist. |
| `primitives/diagram-edge` | `refine` | `diagram-edge` | Keep SVG edge primitive; split flow/canvas differences only if they diverge. |
| `primitives/diagram-item` | `keep` | `diagram-item` | Align item kind/tone schemas with `state`. |
| `primitives/diagram-legend` | `audit` | `legend` or `diagram-legend` | Merge into generic `Legend` unless edge/node marks require domain-specific anatomy. |
| `primitives/diagram-minimap` | `keep` | `diagram-minimap` | Align dimensions with `sizing`; keep passive minimap scope. |
| `primitives/diagram-node` | `keep` | `diagram-node` | Align role/tone schemas with `state` and `colors`. |
| `primitives/diagram-rail` | `audit` | `rail` or `diagram-rail` | Collapse into generic `Rail` unless diagram tools require unique anatomy. |
| `primitives/diagram-viewport` | `refine` | `diagram-viewport` | Keep pan/zoom surface shell; remove flow/canvas component naming where generic viewport covers it. |
| `primitives/distribution` | `keep` | `distribution` | Keep part-to-whole rows; source color/tone mapping from foundations. |
| `primitives/divider` | `keep` | `divider` | Align with `layout` spacing and border-width tokens. |
| `primitives/disclosure-panel` | `keep` | `disclosure-panel` | Added in Phase 3A. Generic details/summary panel for trace and inspection content. |
| `primitives/dock` | `keep` | `dock` | Added in Phase 2A. Attached action/footer dock for panels, overlays, and composer-like surfaces. |
| `primitives/drawer-surface` | `keep` | `drawer-surface` | Added in Phase 3A. Drawer sizing and semantics inside `Overlay`; behavior stays in components. |
| `primitives/dropzone` | `keep` | `dropzone` | Keep upload target; align target dimensions with `sizing`. |
| `primitives/empty-state` | `keep` | `empty-state` | Build on `Surface`, `Stack`, `Icon`, and `Text` once those exist. |
| `primitives/field` | `keep` | `field` | Keep label/description/message/count chrome; source status from `state`. |
| `primitives/field-row` | `keep` | `field-row` | Added in Phase 3A. Dense setting/form row with label, description, meta, and control slots. |
| `primitives/flow-node` | `keep` | `flow-node` | Keep SVG flow node; align tone schemas with diagram state. |
| `primitives/focus-ring` | `demote` | `accessibility` specimen | Move real focus language to `accessibility`/`elevation`; keep public export only as compatibility/docs specimen until breaking release. |
| `primitives/frame` | `keep` | `frame` | Keep educational/editorial specimen frame; prevent use as generic item preview chrome. |
| `primitives/grid` | `keep` | `grid` | Added in Phase 2A. Tokenized responsive grid for repeated content and dense product layouts. |
| `primitives/header` | `keep` | `header` | Added in Phase 2B. Title, description, meta, and action header anatomy. |
| `primitives/heading` | `keep` | `heading` | Added in Phase 2B. Semantic heading primitive with Concrete size roles. |
| `primitives/icon` | `refine` | `icon` | Make renderer depend on `iconography` foundation; keep currentColor policy. |
| `primitives/icon-button` | `keep` | `icon-button` | Added in Phase 2B. Square icon command backed by Button semantics. |
| `primitives/indicator` | `keep` | `indicator` | Source tone/status schemas from `state` and `colors`. |
| `primitives/inline` | `keep` | `inline` | Added in Phase 2A. One-line alignment primitive for labels, metadata, controls, and compact actions. |
| `primitives/input` | `refine` | `input` | Keep text input/control wrapper; reduce legacy wrapper naming after `FieldRow` and `IconButton` exist. |
| `primitives/kbd` | `keep` | `kbd` | Source size/tone from `sizing` and `state`. |
| `primitives/label` | `keep` | `label` | Added in Phase 2B. Passive label grammar for compact metadata, field labels, and status text. |
| `primitives/link` | `refine` | `link` | Align `tone`/`variant` with hierarchy and navigation state vocabulary. |
| `primitives/listbox` | `keep` | `listbox` | Added in Phase 3A. Selectable option region for picker, select, menu, and generated control workflows. |
| `primitives/menu-group` | `keep` | `menu-group` | Added in Phase 3A. Labeled menu/listbox grouping region. |
| `primitives/menu-surface` | `keep` | `menu-surface` | Added in Phase 3A. Generic command, suggestion, and option menu shell. |
| `primitives/message-shell` | `rename` | `transcript-item` | Make role-aware transcript row generic; keep role/status mapping in `Message`. |
| `primitives/option-row` | `refine` | `option-row` | Keep selectable row; remove command-specific assumptions and source state from `state`. |
| `primitives/overlay` | `keep` | `overlay` | Added in Phase 3A. Generic overlay stack, placement, and scrim primitive. |
| `primitives/panel` | `keep` | `panel` | Added in Phase 2B. Grouped surface with header, body, and footer anatomy. |
| `primitives/picker-button` | `keep` | `picker-button` | Added in Phase 3A. Generic disclosure button for picker workflows. |
| `primitives/picker-surface` | `keep` | `picker-surface` | Added in Phase 3A. Relative or floating picker content surface. |
| `primitives/pill` | `refine` | `pill` over `label` | Build on `Label`; source tone/status from `state`. |
| `primitives/preview-stage` | `demote` | docs-only preview renderer | Remove from public primitive registry when compatibility allows; docs should own preview constraints. |
| `primitives/progress` | `refine` | `progress` plus possible `progress-ring` | Decide whether circular ring should become separate public primitive or stay a subpart. |
| `primitives/radio` | `refine` | `radio` plus `field-row`/`option-row` | Keep exclusive input atom; stop sharing checkbox row internals once row primitive exists. |
| `primitives/range-control` | `rename` | `range` | Rename two-thumb range anatomy; keep `RangeSlider` workflow in component. |
| `primitives/rail` | `keep` | `rail` | Added in Phase 2A. Generic vertical or horizontal rail for scoped tools, navigation, and compact status. |
| `primitives/reasoning-panel` | `split` | `trace-panel`, `trace-step` | Extract generic trace disclosure and step anatomy. |
| `primitives/row` | `audit` | `field-row`, `option-row`, or `stack`/`inline` | Decide if generic row is real vocabulary; otherwise merge into more specific primitives. |
| `primitives/search-input` | `keep` | `search-input` | Added in Phase 3A. Search input chrome with icon, token, shortcut, action, and trailing slots. |
| `primitives/section` | `keep` | `section` | Added in Phase 2B. Titled grouping primitive inside panels, pages, and docs. |
| `primitives/select` | `keep` | `select` | Keep native select control; align with input/field anatomy. |
| `primitives/scroll-area` | `keep` | `scroll-area` | Added in Phase 2A. Tokenized overflow primitive for tables, menus, uploads, and transcript regions. |
| `primitives/skeleton` | `keep` | `skeleton` | Align animation with `motion`; keep loading placeholder scope. |
| `primitives/slider` | `keep` | `slider` | Align native scalar track/thumb tokens with `sizing` and `elevation`. |
| `primitives/sparkline` | `keep` | `sparkline` | Keep tiny trend SVG; keep geometry data-driven. |
| `primitives/spinner` | `keep` | `spinner` | Align size/tone with `sizing` and `state`. |
| `primitives/split` | `keep` | `split` | Added in Phase 2A. Body/aside layout primitive for inspectors, actions, and side metadata. |
| `primitives/stack` | `keep` | `stack` | Added in Phase 2A. Vertical rhythm primitive with density, role, divided, and gap semantics. |
| `primitives/stat` | `refine` | `stat` | Align size/tone/variant schemas with `typography` and `state`. |
| `primitives/stepper-control` | `rename` | `stepper` | Rename numeric decrement/input/increment anatomy; keep clamping in component. |
| `primitives/suggestion-menu` | `audit` | `suggestion-menu` or internal `menu-surface` use | Keep public only if broader than Composer; otherwise demote/internalize later. |
| `primitives/surface` | `keep` | `surface` | Added in Phase 2B. Base surface primitive with depth, tone, density, and state. |
| `primitives/switch` | `keep` | `switch` | Align hit target, disabled, and status states with foundations. |
| `primitives/tag` | `refine` | `tag` plus `token` | Keep metadata/entity tag; move removable value-token cases to `Token`. |
| `primitives/textarea` | `keep` | `textarea` | Share text-control policy with `Input`. |
| `primitives/text` | `keep` | `text` | Added in Phase 2B. Body, meta, caption, mono, numeric, and prose text roles. |
| `primitives/texture` | `demote` | `textures` foundation specimen | Keep rendered texture examples in docs/foundation examples unless product UI truly consumes `Texture`. |
| `primitives/time-list` | `refine` | `time-list` over `listbox` | Keep time-specific option formatting; align list behavior with `Listbox`. |
| `primitives/token` | `keep` | `token` | Added in Phase 3A. Generic selected value, scope, mention, and attachment token. |
| `primitives/tool-call-panel` | `refine` | `tool-call-panel` over `trace-panel` | Keep AI-native tool disclosure only if it builds on generic trace primitives. |
| `primitives/toolbar-control` | `split` | `toolbar-surface`, `toolbar-button`, `control-group` | Keep toolbar component behavior; split stateless toolbar anatomy. |
| `primitives/tooltip` | `keep` | `tooltip` | Align placement/open/disabled states with `state`. |
| `primitives/upload-field` | `refine` | `upload-field` plus `scroll-area`/`thumbnail` | Keep upload stack only if reusable; extract thumbnail/scroll behaviors. |
| `primitives/upload-item` | `refine` | `upload-item` plus `thumbnail` | Keep queue row; extract shared preview tile to `Thumbnail`. |
| `primitives/validation-list` | `keep` | `validation-list` | Added in Phase 3A. Validation issue list anatomy for forms, settings, and generated workflows. |
| `primitives/wordmark` | `keep` | `wordmark` | Keep brand typography; source sizing/type roles from foundations. |

### Missing Target Primitive Add Queue

These are target folders with no current public folder. Add them only when a component slice needs them or when they replace a migration-era primitive.

| Target folder | Priority | Specific todo |
| --- | --- | --- |
| `primitives/stack` | done | Added in Phase 2A; migrate layout wrappers to this primitive when touching their owning rows. |
| `primitives/inline` | done | Added in Phase 2A; migrate one-line label/action/meta layouts to this primitive when touching their owning rows. |
| `primitives/cluster` | done | Added in Phase 2A; migrate wrapping chip/tag/action/token groups to this primitive when touching their owning rows. |
| `primitives/grid` | done | Added in Phase 2A; migrate form/data repeated layouts to this primitive when touching their owning rows. |
| `primitives/split` | done | Added in Phase 2A; migrate body/aside and title/action layouts to this primitive when touching their owning rows. |
| `primitives/rail` | done | Added in Phase 2A; use it to audit `diagram-rail` and `composer-rail` futures. |
| `primitives/dock` | done | Added in Phase 2A; use it to audit composer, overlay, drawer, and panel footer shells. |
| `primitives/scroll-area` | done | Added in Phase 2A; use it to audit table, menu, upload, and transcript overflow. |
| `primitives/spacer` | defer | Do not add unless real gaps remain after `Stack`, `Inline`, and `Cluster` adoption. |
| `primitives/surface` | done | Added in Phase 2B; migrate shell/chrome wrappers to this primitive when touching their owning rows. |
| `primitives/panel` | done | Added in Phase 2B; migrate form/settings/panel shells to this primitive when touching their owning rows. |
| `primitives/section` | done | Added in Phase 2B; migrate titled grouping anatomy to this primitive when touching their owning rows. |
| `primitives/header` | done | Added in Phase 2B; migrate data-card/form/metric headers to this primitive when touching their owning rows. |
| `primitives/text` | done | Added in Phase 2B; migrate raw type recipes to this primitive when touching their owning rows. |
| `primitives/heading` | done | Added in Phase 2B; migrate raw heading recipes to this primitive when touching their owning rows. |
| `primitives/label` | done | Added in Phase 2B; migrate passive label grammar under badge, pill, tag, and form labels when touching their owning rows. |
| `primitives/icon-button` | done | Added in Phase 2B; migrate icon-only Button and toolbar actions to this primitive when touching their owning rows. |
| `primitives/control-group` | done | Added in Phase 2B; migrate segmented and adjacent control shells to this primitive when touching their owning rows. |
| `primitives/toolbar-surface` | defer | Add only if `toolbar-control` cannot collapse onto `ControlGroup`, `Dock`, and `IconButton`. |
| `primitives/toolbar-button` | defer | Add only if `IconButton` and `Button` do not cover dense toolbar command semantics. |
| `primitives/field-row` | done | Added in Phase 3A; migrate settings and form rows away from `form-layout` when touching components. |
| `primitives/token` | done | Added in Phase 3A; migrate search, select, composer, mention, and attachment chips toward this primitive. |
| `primitives/listbox` | done | Added in Phase 3A; migrate select/menu option regions toward this primitive. |
| `primitives/overlay` | done | Added in Phase 3A; migrate form dialogs/drawers and future popovers through this stack primitive. |
| `primitives/dialog-surface` | done | Added in Phase 3A; migrate dialog panel sizing out of form-specific primitives. |
| `primitives/drawer-surface` | done | Added in Phase 3A; migrate drawer panel sizing out of form-specific primitives. |
| `primitives/menu-group` | done | Added in Phase 3A; migrate command/menu group sections toward this primitive. |
| `primitives/alert` | done | Added in Phase 3A; migrate inline feedback and status callouts toward this primitive. |
| `primitives/validation-list` | done | Added in Phase 3A; migrate validation issue list anatomy toward this primitive. |
| `primitives/disclosure-panel` | done | Added in Phase 3A; use as generic details panel before adding trace-specific panels. |
| `primitives/data-surface` | done | Added in Phase 3B; `metric-shell` and `data-card-header` were deleted after consumers moved to `DataSurface` and `Header`. |
| `primitives/chart-frame` | done | Chart shell, state message, variant marker, and surface height contract. |
| `primitives/plot` | done | SVG plot root with accessibility title and Concrete sizing contract. |
| `primitives/chart-grid` | done | Gridline group and plot background primitive. |
| `primitives/axis` | done | Axis, baseline, tick, row, value, and endpoint label primitive. |
| `primitives/series-line` | done | Line and area path primitive only. |
| `primitives/series-bar` | done | Bar, track, comparison, and stack segment primitive. |
| `primitives/series-point` | done | Point and endpoint circle primitive. |
| `primitives/target-line` | done | Goal/threshold marker primitive. |
| `primitives/donut-ring` | done | Donut plot, track, segment, and center value primitive. |
| `primitives/heatmap-grid` | done | Heatmap label/cell grid primitive. |
| `primitives/trace-panel` | done | Generic agent trace disclosure primitive with summary and step anatomy. |
| `primitives/trace-step` | defer | Do not add until step anatomy is reused outside `TracePanel`; premature split would create fake vocabulary. |
| `primitives/token-rail` | done | Horizontal token rail for mentions, attachments, scopes, and selected values. |
| `primitives/attachment-item` | defer | Add only when upload/composer attachment rows need vocabulary beyond `Token`, `UploadItem`, or `TokenRail`. |
| `primitives/thumbnail` | defer | Add only when file/image preview tiles need reusable anatomy beyond `UploadItem` and existing media components. |

## Component Folders

Components own orchestration, controlled state, schema-bound behavior, data mapping, keyboard flow, and workflow semantics. Components should assemble primitives and approved lower-tier components. They should not own CSS or styled raw DOM.

| Current folder | Status | Must assemble | Specific todo |
| --- | --- | --- | --- |
| `components/area-chart` | `refine` | Chart primitives and geometry utilities. | Rebuild on split chart atoms; keep area geometry/scales in utilities. |
| `components/bar-chart` | `refine` | Chart primitives and geometry utilities. | Rebuild on `SeriesBar`, `Axis`, `ChartFrame`; keep categorical scaling in utilities. |
| `components/chart` | `compat` | Focused chart components. | Keep discriminated-union router for compatibility; do not add new chart behavior here. |
| `components/command-menu` | `refine` | `MenuSurface`, `MenuGroup`, `SearchInput`, `OptionRow`, `Kbd`, `EmptyState`, `Spinner`. | Keep filtering/keyboard behavior; remove command assumptions from primitives. |
| `components/composer` | `refine` | `ComposerSurface`, `TokenRail`, `Toolbar`, `SuggestionMenu`, `AttachmentItem`, `Button`. | Keep file whole while it owns one editor/controller flow; replace composer-specific primitive anatomy with generic token/dock/surface vocabulary where possible. |
| `components/data-table` | `refine` | `DataSurface`, `Header`, `Table`, `TableToolbar`, `Pagination`, `Checkbox`, `Button`, `EmptyState`. | Keep sort/filter/pagination state and row data mapping; retire data-table-specific primitive names. |
| `components/date-picker` | `refine` | `Field`, `PickerButton`, `PickerSurface`, `CalendarGrid`, `Button`. | Keep date parsing/month behavior; rename picker/calendar primitives. |
| `components/date-range-picker` | `refine` | `Field`, `PickerButton`, `PickerSurface`, `CalendarGrid`, `Button`. | Keep range selection behavior; share calendar primitives with date picker. |
| `components/diagram-canvas` | `refine` | `DiagramViewport`, `DiagramNode`, `DiagramItem`, `DiagramEdge`, `Rail`, `DiagramControls`, `DiagramMinimap`, `Legend`. | Keep pan/zoom/fit/select behavior; remove remaining component nouns from foundation tokens. |
| `components/donut-chart` | `refine` | `ChartFrame`, `DonutRing`, `Legend`, `Stat`. | Keep arc math in utilities; split donut anatomy out of `chart-surface`. |
| `components/file-upload` | `refine` | `Field`, `Dropzone`, `UploadItem`, `Progress`, `Button`, `ScrollArea`, `Thumbnail`. | Keep queue/validation behavior; add scroll/thumbnail primitives when needed. |
| `components/flow-diagram` | `refine` | `DataSurface`, `Header`, `DiagramViewport`, `FlowNode`, `DiagramEdge`, `DiagramControls`, `Legend`. | Decide which diagram primitives stay domain-specific after generic surface/header/legend exist. |
| `components/form-dialog` | `refine` | `Overlay`, `DialogSurface`, `Panel`, `Header`, `Dock`, `Button`. | Replace form-specific overlay primitives with generic overlay/surface primitives. |
| `components/form-drawer` | `refine` | `Overlay`, `DrawerSurface`, `Panel`, `Header`, `Dock`, `Button`. | Replace form-specific drawer primitives with generic overlay/surface primitives. |
| `components/form-shell` | `audit` | `Panel`, `Header`, `Stack`, `Grid`, `Dock`. | Decide whether it remains a component or becomes compatibility wrapper over primitives. |
| `components/heatmap` | `refine` | `ChartFrame`, `HeatmapGrid`, `Legend`. | Keep intensity/data mapping in utilities; split heatmap anatomy. |
| `components/image-upload` | `refine` | `Field`, `Dropzone`, `Thumbnail`, `UploadItem`, `Avatar`, `Progress`. | Extract shared image/file preview tile into `Thumbnail`. |
| `components/line-chart` | `refine` | `ChartFrame`, `Plot`, `ChartGrid`, `Axis`, `SeriesLine`, `SeriesPoint`, `TargetLine`, `Legend`. | Keep geometry/scales in utilities; use chart atom primitives. |
| `components/message` | `refine` | `TranscriptItem`, `Avatar`, `MessageBubble`, `Inline`, `Button`, `Tooltip`. | Keep role/status/avatar mapping; rename message primitives. |
| `components/meter` | `refine` | `DataSurface`, `Progress`, `ProgressRing`, `Text`. | Now uses `DataSurface`; next pass should only tighten meter/ring visual semantics if visual QA is in scope. |
| `components/metric-card` | `refine` | `DataSurface`, `Stat`, `Delta`, `Sparkline`, `Indicator`, `Text`. | Now uses `DataSurface`; keep trend/status derivation in component. |
| `components/multi-select` | `refine` | `Field`, `PickerButton`, `PickerSurface`, `Token`, `Listbox`, `OptionRow`, `SearchInput`. | Keep selected/filter/max behavior; retire select-specific primitive names. |
| `components/number-stepper` | `refine` | `Field`, `Stepper`, `Input`, `ControlGroup`. | Keep controlled/uncontrolled value, clamping, min/max/step behavior. |
| `components/password-input` | `refine` | `Field`, `Input`, `IconButton`, `Tooltip`. | Keep visibility state; ensure action anatomy comes from primitives. |
| `components/range-slider` | `refine` | `Field`, `Range`, `Input`. | Keep tuple value ordering and clamping; rename range primitive. |
| `components/reasoning-message` | `refine` | `TranscriptItem`, `TracePanel`, `TraceStep`, `Spinner`. | Keep reasoning data mapping; split reasoning primitive into generic trace primitives. |
| `components/search-bar` | `refine` | `SearchInput`, `Token`, `Button`, `SuggestionMenu` or `MenuSurface`. | Keep query/tokens/submit/menu behavior; unify token primitive. |
| `components/settings-panel` | `refine` | `Panel`, `Section`, `FieldRow`, `Switch`, `Select`, `Input`, `Button`. | Replace form-layout anatomy with generic panel/section/field-row primitives. |
| `components/stacked-bar-chart` | `refine` | `ChartFrame`, `Plot`, `Axis`, `SeriesBar`, `Legend`. | Keep stack normalization in utilities; use chart atom primitives. |
| `components/time-picker` | `refine` | `Field`, `PickerButton`, `PickerSurface`, `TimeList`, `Listbox`. | Keep interval generation; align `TimeList` with listbox behavior. |
| `components/tool-call-message` | `refine` | `TranscriptItem`, `TracePanel`, `ToolCallPanel`, `Code`, `FeedbackPanel`. | Keep tool-to-message status mapping; build on trace primitives. |
| `components/toolbar` | `refine` | `ToolbarSurface`, `ToolbarButton`, `ControlGroup`, `Tooltip`, `Kbd`, `Icon`. | Keep public API and keyboard behavior; split stateless toolbar anatomy. |
| `components/validation-summary` | `refine` | `FeedbackPanel`, `ValidationList`, `Alert`, `Button`. | Move issue-list anatomy into primitives; keep validation mapping here. |

## Internal Primitive Folders

| Folder | Status | Specific todo |
| --- | --- | --- |
| `primitives/internal/file-upload` | `keep` | Keep private workflow JSX until upload primitives fully cover file/image upload composition. Do not expose publicly without schema/examples/docs. |
| `primitives/internal/message` | `audit` | Collapse after `TranscriptItem` and `MessageBubble` exist, or keep private if it remains message workflow glue. |

## Implementation Phases

### Phase 1: Foundation Concept Split

- [x] Add `foundations/state`.
- [x] Move shared tone/status/hierarchy/density/intent schemas into `state`.
- [x] Add `foundations/sizing`.
- [x] Move dimensions/measures/hit-targets/tracks/controls from `spacing` into `sizing`.
- [x] Add `foundations/layout`.
- [x] Move layout recipes/templates/z-index/breakpoint policy from `spacing` into `layout`.
- [x] Add `foundations/iconography`.
- [x] Preserve `icons` subpath while making icon semantics foundation-backed.
- [x] Add `foundations/accessibility`.
- [x] Move visually-hidden/focus-target/reduced-motion/forced-colors policy there.
- [ ] Strengthen token-name tests for component noun bans beyond the current retired-token guard.

### Phase 2: Generic Layout, Surface, And Text Vocabulary

- [x] Build `Stack`, `Inline`, `Cluster`, `Grid`, `Split`, `Rail`, `Dock`, `ScrollArea`.
- [x] Build `Surface`, `Panel`, `Section`, `Header`.
- [x] Build `Text`, `Heading`, `Label`.
- [x] Build `IconButton` and `ControlGroup`.
- [ ] Convert one meaty vertical slice before broad migration: `settings-panel` or `data-table`.

### Phase 3: Rename And Split Migration-Era Primitives

- [x] Add target forms/overlays vocabulary: `FieldRow`, `Overlay`, `DialogSurface`, and `DrawerSurface`.
- [x] Add target picker/menu/select vocabulary: `PickerButton`, `PickerSurface`, `SearchInput`, `MenuSurface`, `MenuGroup`, and `Listbox`.
- [x] Add target feedback/token/disclosure vocabulary: `Alert`, `ValidationList`, `Token`, and `DisclosurePanel`.
- [x] Delete legacy forms/overlays primitives: `form-layout` and `form-overlay`.
- [x] Delete legacy picker/menu/search/select/token/feedback primitives: `picker-control`, `picker-shell`, `search-field`, `menu-shell`, `select-control`, `select-menu`, `search-token`, and `feedback-panel`.
- [x] Data surfaces: add `data-surface`, delete `metric-shell` and `data-card-header`, and migrate metric/meter/chart/table headers.
- [ ] Data/table/chart: split `data-table-*`, `chart-surface`, and `chart-legend`.
- [ ] Agent/composer/message: rename `message-shell`, `bubble`, `composer-shell`; split `reasoning-panel`, `composer-rail`, and `toolbar-control`.
- [ ] Docs/specimens: demote `preview-stage`, `focus-ring`, and `texture` from public primitive vocabulary when compatibility allows.

### Phase 4: Prop Discipline

- [ ] Audit every primitive schema for raw visual override props.
- [ ] Replace open visual `variant` props with role/hierarchy/intent/density/state where possible.
- [ ] Keep `className` root-only for compatibility.
- [ ] Ban arbitrary `style`, CSS variable bags, raw dimensions, raw colors, raw shadows, raw radii, and raw font values from public primitive schemas.

### Phase 5: Component Assembly

- [ ] Rebuild components touched by Phase 3 on target primitives.
- [ ] Keep state, parsing, data mapping, keyboard flow, and controlled/uncontrolled behavior in components.
- [ ] Do not split Composer only for LOC. Split only if a subpart becomes a real primitive or reusable algorithm.
- [ ] Keep sibling component imports banned unless `CODE.md` adds a component tier map and tests.

### Phase 6: Enforcement And Gates

- [ ] Add tests for target foundation folder presence.
- [ ] Add tests for public primitive classification/demotion policy.
- [ ] Add tests for foundation token noun policy.
- [ ] Add tests for primitive prop schema policy.
- [ ] Add tests for component assembly boundaries.
- [ ] Keep `bun run format`, `bun run check`, `bun run build`, `bun run catalog:audit`, `bun run visual:smoke`, and `bun run --cwd packages/concrete verify:publish` green after each cluster that changes runtime/package behavior.

## Per-Item Audit Template

Use this template before implementing any row above.

```md
### <item>

- Current folder:
- Target folder:
- Status:
- Public API risk:
- Current owners:
- Must own:
- Must not own:
- Foundation tokens/schemas needed:
- Primitive dependencies:
- Component dependencies:
- CSS action:
- Schema action:
- Example/docs action:
- Tests:
- Gate:
- Done when:
```
