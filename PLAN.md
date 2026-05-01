# Concrete Plan

`CODE.md` is the rulebook. `PLAN.md` is the active queue, audit ledger, enforcement ledger, and migration memory. Do not add another internal Markdown runbook.

## Current Baseline

- Audit date: 2026-05-01.
- Current public package inventory: 12 foundations, 111 primitives, 33 components.
- Current private primitive inventory: 0 internal primitive folders.
- Main is synced through `release: concrete v0.0.14`.
- Foundations, primitives, and components are folder-owned item bundles.
- Public registry, docs, examples, playgrounds, render routes, and screenshot routes are item-definition driven.
- Components are structurally closed: component implementations assemble primitives/utilities, do not own active CSS, and do not style raw DOM under the current contract tests.
- Foundation and primitive ontology is structurally closed, and Phase 10 visual grammar polish is now closed enough for component-level aesthetic passes.
- The quality benchmark is `Composer` plus `Button`: compact, tactile, useful, dense, soft, and visibly stateful.
- `container`, `page-section`, `scale-frame`, `tilt-frame`, `nav`, and `footer` remain retained. `row`, `toolbar`, `form-shell`, and `feature-card` remain retired.

## Active Work

- [x] Phase 10A: audit foundations/primitives against the composer/button quality benchmark.
- [x] Phase 10B: define the foundation-level control material grammar.
- [x] Phase 10C: polish native form controls and picker/search controls.
- [x] Phase 10D: polish choice controls, option rows, listboxes, and menus.
- [x] Phase 10E: polish compact surfaces, feedback primitives, and data display primitives.
- [x] Phase 10F: upgrade primitive examples so default, active, disabled, error, selected, open, dense, and composed states reveal quality.
- [x] Phase 10G: run visual smoke, catalog audit, and full gates; then mark primitive/foundation polish ready for component-level aesthetic passes.
- [x] Phase 10H: add a registry guard that locks the polished primitive example state matrix.
- [ ] Phase 11A: audit component aesthetics against the polished foundation/primitive grammar before making component-level visual changes.

## Phase 10 Audit

Composer and Button work because they share a strong material and state ladder:

- compact sizing around 22-34px controls;
- strong 12-14px product typography;
- small radii;
- visible hover/focus/pressed states;
- subtle shadows and inset highlights;
- icon/kbd affordances that feel functional, not decorative;
- state changes that are enough to notice but not loud.

Current gaps:

- `input`, `select`, and `textarea` are technically tokenized but feel flatter than `Button` and `Composer`. They need a shared control material ladder, not isolated selector tweaks.
- `select` and `textarea` inherit most behavior from `input` but their item styles have almost no explicit state expression, which makes them easy to overlook and under-document.
- `SearchInput` and `PickerButton` are closer to the composer standard, but they use adjacent material decisions instead of a single foundation grammar shared with native controls.
- `OptionRow` has a stronger active/selected story than native select controls. Use it as a menu/listbox benchmark.
- `Field` and `FieldRow` have useful hierarchy but can feel more spaced and lower-touch than dense product surfaces when composed with weak controls.
- Many zero-interaction-score primitives are correctly static. Zero interaction score is only a problem for interactive primitives.
- Docs pages currently hide primitive quality problems by centering one tiny default example in a large frame. Phase 10F must improve examples, not docs UX.

## Phase 10B-10D Checkpoint

Implemented in the first polish sprint:

- Added a foundation-level `control-*` color, sizing, and elevation grammar in `colors`, `sizing`, and `elevation`.
- Exposed the new control tokens through foundation schemas so docs can explain the material system instead of only rendering hidden CSS variables.
- Rebased native form controls on the shared grammar: `input`, `select`, `textarea`, `field`, and `field-row`.
- Rebased query/picker controls on the same grammar: `search-input`, `picker-button`, `picker-surface`, `stepper`, `slider`, and `range`.
- Rebased choice/menu controls on the same grammar: `checkbox`, `radio`, `switch`, `option-row`, `listbox`, `menu-surface`, `menu-group`, `calendar-grid`, `time-list`, and `toolbar-control`.
- Regenerated public CSS for visual QA because docs consume `@rubriclab/concrete/styles.css` through package exports.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/import-boundaries.test.ts` passed.
- Public-stylesheet visual smoke passed for `input`, `select`, `textarea`, `search-input`, `picker-button`, `checkbox`, `switch`, `stepper`, `slider`, `range`, and `calendar-grid`.

Next:

- Phase 10E should start with `surface`, `panel`, `card`, `data-surface`, `frame`, `alert`, `validation-list`, `empty-state`, `stat`, `delta`, and progress primitives.
- Phase 10F should improve examples after surface/feedback polish, because the current docs preview frames still make many primitives look smaller and quieter than they feel in product composition.

## Phase 10E Checkpoint

Implemented in the surface/data/feedback polish sprint:

- Added foundation-level `surface-*`, `feedback-*`, and `data-*` color tokens in `colors`.
- Added `surface`, `feedback`, and `data` elevation aliases in `elevation`.
- Added semantic surface/data/feedback sizing aliases in `sizing`.
- Rebased passive surface primitives on the surface grammar: `surface`, `card`, `data-surface`, and `frame`.
- Rebased feedback primitives on feedback tokens: `alert` and `validation-list`.
- Rebased data display primitives on data tokens: `stat`, `delta`, `progress`, `progress-ring`, and `segmented-progress`.
- Kept `panel` as a pure layout primitive. It did not need material styling.
- Regenerated `SKILL.md` after foundation schema changes because it is a derived package artifact.
- Restored `apps/docs/next-env.d.ts` after Next-generated type churn.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun run visual:smoke` passed.
- `bun test` passed.
- `bun run check:skill` initially caught stale generated `SKILL.md`; `bun run build:skill` regenerated it, then `bun run check:skill` passed.
- `bun run typecheck` passed.
- `bun run check` passed.
- `bun run build` passed.
- `bun run catalog:audit` passed across 495 render routes.

Next:

- Phase 10F should upgrade touched primitive examples so the docs catalog reveals compact, active, disabled, selected, error, dense, and composed states.
- Keep the docs route UX stable. The next pass should edit item examples, not invent docs-side preview switchboards.

## Phase 10F-10H Checkpoint

Implemented in the example, audit, and guard sprint:

- Upgraded item-owned examples for polished control, choice, menu, surface, data, and feedback primitives.
- Added missing state registrations for new examples so docs catalogs, detail pages, render routes, screenshots, and static render tests all see the richer states.
- Removed callback-shaped example behavior from `time-list`; item examples stay serializable and server-renderable.
- Added a registry-level guard for the polished primitive state matrix so future example contraction or missed state registration fails loudly.
- Ran a manual desktop/mobile screenshot audit for composer, button, input, select, textarea, search input, picker button, option row, checkbox, switch, and components index routes.
- Deleted temporary screenshot artifacts after inspection.
- Killed stale Next dev server PID 27298 after visual smoke found the hanging process on port 3001.
- Restored `apps/docs/next-env.d.ts` after build/catalog audit type churn.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun test` passed.
- `bun run check:skill` passed.
- `bun run typecheck` passed.
- `bun run check` passed.
- `bun run build` passed.
- `bun run visual:smoke` initially exposed the stale dev server, then passed after killing PID 27298.
- `bun run catalog:audit` passed across 510 render routes.

Next:

- Start Phase 11A with a component-level aesthetic audit, using Composer and the polished primitive examples as the benchmark.
- Keep component changes assembled from primitives and foundation tokens. Do not add active component CSS unless it documents a real primitive gap.

## Phase 10B: Foundation Control Material

Goal: one reusable material grammar for controls, fields, query surfaces, picker triggers, choice controls, and option rows.

Actions:

1. Add or refine foundation tokens for control surfaces:
   - rest background;
   - hover background;
   - active/open background;
   - disabled background;
   - selected background;
   - error/success background when needed.
2. Add or refine foundation tokens for control borders:
   - rest;
   - hover;
   - focus;
   - active/open;
   - disabled;
   - error/success.
3. Add or refine foundation tokens for control elevation:
   - compact raised control shadow;
   - inset field shadow;
   - pressed shadow/filter;
   - selected shadow;
   - focus ring variants.
4. Add or refine foundation tokens for control typography and sizing:
   - compact field height;
   - standard field height;
   - tiny icon/kbd affordance sizes;
   - dense label/meta type roles.
5. Keep token names generic: `control`, `field`, `query`, `picker`, `option`, `choice`, `menu`, `surface`, `focus`, `selected`, `disabled`. Do not add component names.

Done when:

- primitives can consume the grammar without raw visual values;
- import-boundary raw value tests pass;
- the material can explain buttons, inputs, picker buttons, search inputs, option rows, and choice controls.

## Phase 10C: Form And Picker Controls

Scope:

- `primitives/input`
- `primitives/select`
- `primitives/textarea`
- `primitives/search-input`
- `primitives/picker-button`
- `primitives/stepper`
- `primitives/slider`
- `primitives/range`

Actions:

1. Unify base control material around Phase 10B tokens.
2. Make hover, focus, disabled, error, open, active, and pressed states explicit where the primitive supports them.
3. Make native `Select` feel like a first-class Concrete disclosure control while preserving native semantics.
4. Make `Textarea` feel like the multi-line sibling of `Input`, not a token-painted browser default.
5. Make `SearchInput` and `PickerButton` align with the same control height, border, focus, icon, shortcut, and surface grammar.
6. Keep examples compact and state-rich.

Done when:

- these controls look credible beside `Button` and inside `Composer`;
- no item adds bespoke raw values;
- static render tests and visual smoke pass.

## Phase 10D: Choice, Menu, And Selection

Scope:

- `primitives/checkbox`
- `primitives/radio`
- `primitives/switch`
- `primitives/option-row`
- `primitives/listbox`
- `primitives/menu-surface`
- `primitives/menu-group`
- `primitives/control-group`
- `primitives/toolbar-control`

Actions:

1. Align choice controls with the same control/selected/focus grammar.
2. Make switch/checkbox/radio hover and focus states as deliberate as button states.
3. Make option rows the canonical active/selected menu row material.
4. Keep listbox/menu surfaces compact, raised, and scannable.
5. Ensure destructive and selected menu states are readable without becoming loud.

Done when:

- picker/menu/listbox workflows feel like a system with buttons and composer;
- keyboard/focus-visible states remain strong;
- examples show active, selected, disabled, and destructive rows.

## Phase 10E: Compact Surfaces And Feedback

Scope:

- `primitives/surface`
- `primitives/panel`
- `primitives/card`
- `primitives/data-surface`
- `primitives/frame`
- `primitives/alert`
- `primitives/validation-list`
- `primitives/empty-state`
- `primitives/stat`
- `primitives/delta`
- `primitives/progress`
- `primitives/progress-ring`
- `primitives/segmented-progress`

Actions:

1. Separate passive surfaces from interactive controls in material strength.
2. Tighten product-density padding and hierarchy where surfaces feel overly spacious.
3. Ensure data/feedback primitives use enough depth, type weight, and state color to feel finished.
4. Avoid turning surfaces into decorative cards. Cards frame repeated items only.

Done when:

- product surfaces feel dense and finished without component-specific CSS;
- data and feedback primitives feel as polished as controls.

## Phase 10F: Examples And Visual Audit

Actions:

1. Upgrade examples for every touched primitive.
2. Prefer examples that show actual product use: dense forms, command rows, settings rows, token/search contexts, and validation feedback.
3. Keep docs route UX stable. Do not turn this into a docs redesign.
4. Capture representative desktop and mobile screenshots:
   - `/components/composer`
   - `/primitives/button`
   - `/primitives/input`
   - `/primitives/select`
   - `/primitives/textarea`
   - `/primitives/search-input`
   - `/primitives/picker-button`
   - `/primitives/option-row`
   - `/primitives/checkbox`
   - `/primitives/switch`
   - `/components`

Done when:

- screenshots show controls and surfaces matching the composer quality bar;
- `bun run visual:smoke` and `bun run catalog:audit` pass.

## Phase 10H: Polished Primitive Example Guard

Status: done. `packages/concrete/src/tests/registry.test.ts` owns the required state matrix for Phase 10-polished primitives.

The guard exists because richer examples are part of the public docs/render contract. If a primitive loses `disabled`, `error`, `selected`, `open`, `dense`, or composed examples, the registry test should fail before docs quality silently regresses.

## Phase 7A: Foundation Perfection

Status: done. Foundations own design-language values and schemas. Foundation token names must describe reusable roles/domains, not component names.

Allowed foundation domain nouns include `control`, `control-strip`, `surface`, `panel`, `section`, `overlay`, `overlay-tip`, `field`, `menu`, `query`, `picker`, `rail`, `dock`, `track`, `interval`, `step-control`, `viewport`, `feedback`, `status`, `intent`, `tone`, `density`, `hierarchy`, `focus`, `hit-target`, `media`, `editor`, `trace`, `data`, `chart`, `table`, `diagram`, `message`, and `tool`.

## Phase 7B: Primitive Scope Closure

Status: done. Primitives are reusable public Concrete vocabulary, not component parts disguised as primitives. `ProgressRing` and `SegmentedProgress` are standalone. `TimeList` composes `Listbox` and `OptionRow`. `row` is retired. Diagram primitives are generic diagram vocabulary. `ToolCallPanel` keeps its documented item-owned anatomy exception.

## Phase 7C: Primitive Family Consistency

Status: done. Label, control, form, surface, layout, menu, data, chart, diagram, message, media, brand, editorial, and education primitive families have been audited for scope and schema vocabulary.

## Phase 7D: Enforcement

Active enforcement contracts:

- docs import only public package surfaces;
- package item folders keep the exact atomic manifest;
- retired public item slugs stay deleted;
- primitive schemas avoid raw visual override props;
- components do not import sibling implementations except documented tier exceptions;
- components do not own active CSS, `concreteClassNames`, or styled raw DOM;
- public stylesheet manifests cover every item stylesheet;
- foundation token names reject component-shaped vocabulary;
- token consumer styles reject raw visual values outside foundation files;
- media query thresholds stay documented.

## Phase 7D Gates

Run narrow gates after implementation chunks:

```sh
bun run format
bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts
bun run typecheck
bun run check
```

Run full gates before marking Phase 10 complete:

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

## Component Tier Ledger

| Component | May import implementation from | Rationale |
| --- | --- | --- |
| `reasoning-message` | `message` | Reasoning output is a specialized message surface and inherits the lower-tier message workflow shell. |
| `tool-call-message` | `message` | Tool-call output is a specialized message surface and inherits the lower-tier message workflow shell. |

## Component Demo Composition Ledger

These files may compose sibling components because they are examples or serializable render adapters, not implementation dependencies.

| File | May compose | Rationale |
| --- | --- | --- |
| `packages/concrete/src/components/form-dialog/examples.tsx` | `date-range-picker` | Rich form example showing dialog composition with picker workflow. |
| `packages/concrete/src/components/form-dialog/examples.tsx` | `file-upload` | Rich form example showing dialog composition with upload workflow. |
| `packages/concrete/src/components/form-dialog/examples.tsx` | `multi-select` | Rich form example showing dialog composition with multi-value selection workflow. |
| `packages/concrete/src/components/form-dialog/examples.tsx` | `validation-summary` | Rich form example showing validation feedback inside dialog composition. |
| `packages/concrete/src/components/form-dialog/index.tsx` | `date-range-picker` | Serializable renderInput adapter for a representative dialog form. |
| `packages/concrete/src/components/form-drawer/examples.tsx` | `date-picker` | Rich form example showing drawer composition with picker workflow. |
| `packages/concrete/src/components/form-drawer/examples.tsx` | `number-stepper` | Rich form example showing drawer composition with numeric control workflow. |
| `packages/concrete/src/components/form-drawer/examples.tsx` | `validation-summary` | Rich form example showing validation feedback inside drawer composition. |
| `packages/concrete/src/components/form-drawer/index.tsx` | `number-stepper` | Serializable renderInput adapter for a representative drawer form. |
| `packages/concrete/src/components/search-bar/examples.tsx` | `command-menu` | Rich search example showing command result menu composition. |
| `packages/concrete/src/components/search-bar/index.tsx` | `command-menu` | Serializable renderInput adapter for a representative search menu. |
| `packages/concrete/src/components/settings-panel/examples.tsx` | `number-stepper` | Rich settings example showing numeric control composition. |
| `packages/concrete/src/components/settings-panel/index.tsx` | `number-stepper` | Serializable renderInput adapter for representative settings rows. |

## Runtime Subpart Ledger

These primitive component files intentionally export more than one runtime JSX part. Every other primitive `component.tsx` must export one runtime component only.

| Primitive | Allowed runtime exports |
| --- | --- |
| `axis` | `ChartAxis`, `ChartBaseline`, `ChartTickLabel`, `ChartAxisLabel`, `ChartRowLabel`, `ChartValueLabel`, `ChartEndLabel` |
| `chart-frame` | `ChartFrame`, `ChartMessage` |
| `chart-grid` | `ChartGrid`, `ChartPlotBackground` |
| `checkbox` | `Checkbox`, `ChoiceRow` |
| `code` | `CodeBlock`, `InlineCode` |
| `composer-surface` | `ComposerSurface`, `ComposerEditor`, `ComposerFooter`, `ComposerToolbar`, `ComposerMenuLayer`, `ComposerSubmitDock`, `ComposerSendButton` |
| `diagram-edge` | `DiagramEdges`, `DiagramEdgePath` |
| `diagram-viewport` | `DiagramShell`, `DiagramHeader`, `DiagramViewport`, `DiagramStage`, `DiagramElement`, `DiagramElementButton`, `DiagramFooter`, `DiagramSvg` |
| `donut-ring` | `DonutPlot`, `DonutCenter`, `DonutTrack`, `DonutSegment` |
| `heatmap-grid` | `HeatmapGrid`, `HeatmapCorner`, `HeatmapColumnLabel`, `HeatmapRowLabel`, `HeatmapCell` |
| `input` | `Input`, `InputControl` |
| `legend` | `Legend`, `LegendItem` |
| `pagination` | `Pagination`, `PaginationButton` |
| `range` | `Range`, `RangeTrack`, `RangeInput`, `RangeValues` |
| `series-bar` | `ChartBar`, `ChartBarTrack`, `ChartBarComparison`, `ChartStackSegment` |
| `series-line` | `ChartArea`, `ChartLine` |
| `series-point` | `ChartPoint`, `ChartEndpoint` |
| `stepper` | `Stepper`, `StepperAction`, `StepperInput` |
| `table` | `TableViewport`, `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell`, `TableSelectionHeaderCell`, `TableSelectionCell`, `TableSelectionInput`, `TableSortButton`, `TableEmpty`, `TableEmptyCell` |
| `token-rail` | `TokenRail`, `TokenRailItem` |
| `tool-call-panel` | `ToolCallPanel`, `ToolCallStatusChip`, `ToolCallBody`, `ToolOutput`, `ToolCodeBlock` |
| `toolbar-control` | `ToolbarControl`, `ToolbarControlGroup`, `ToolbarControlSeparator`, `ToolbarControlButton`, `ToolbarFormatGlyph` |
| `trace-panel` | `TracePanel`, `TraceSteps`, `TraceStep` |
| `transcript-item` | `TranscriptItem`, `TranscriptPlain`, `TranscriptMetaItem` |

## Retired Public Names

Retired primitive slugs must stay deleted from public folders, barrels, registry, styles, tests, docs smoke targets, class-name maps, and foundation token names:

`bubble`, `calendar-panel`, `chart-legend`, `chart-surface`, `composer-rail`, `data-card-header`, `data-table-control`, `data-table-pagination`, `data-table-shell`, `feedback-panel`, `focus-ring`, `form-layout`, `form-overlay`, `menu-shell`, `message-shell`, `metric-shell`, `picker-control`, `picker-shell`, `preview-stage`, `range-control`, `reasoning-panel`, `row`, `search-field`, `search-token`, `select-control`, `select-menu`, `stepper-control`, `suggestion-menu`, `texture`.

Retired component slugs must stay deleted:

`feature-card`, `form-shell`, `toolbar`.

Deferred primitive names should not be added until a second workflow proves them:

`attachment-item`, `spacer`, `thumbnail`, `toolbar-button`, `toolbar-surface`, `trace-step`.

## Recent Gate Log

- 2026-05-01 Phase 10A audit/prep: ran docs/style audit and rewrote `CODE.md` plus `PLAN.md` around foundation/primitive polish. Local docs screenshots captured under `/tmp/concrete-polish-audit`.
- 2026-05-01 Phase 9 docs visual polish passed: format, tests, skill check, typecheck, check, build, visual smoke, catalog audit, GitHub CI, and Release Package passed. Catalog audit passed 495 render routes.
- 2026-05-01 Phase 8 component structural closure passed: component contract harness, component topology cleanup, demo composition ledger, renderInput adapter tightening, full gates, visual smoke, and catalog audit passed.
- 2026-05-01 Phase 7 foundation/primitive structural closure passed: foundation noun policy, primitive scope closure, primitive family consistency, runtime subpart contracts, full gates, visual smoke, and catalog audit passed.

## Per-Item Audit Template

```md
### <item>

- Current folder:
- Status:
- Visual issue:
- Foundation tokens needed:
- Primitive CSS action:
- Schema/action state needed:
- Example/docs action:
- Tests:
- Visual check:
- Done when:
```
