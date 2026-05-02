# Concrete Plan

`CODE.md` is the rulebook. `PLAN.md` is the active queue, audit ledger, enforcement ledger, and migration memory. Do not add another internal Markdown runbook.

## Current Baseline

- Audit date: 2026-05-01.
- Current public package inventory: 12 foundations, 111 primitives, 33 components.
- Current private primitive inventory: 0 internal primitive folders.
- Main is synced through `9962bff polish concrete primitive grammar`.
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
- [x] Phase 11A: audit component aesthetics against the polished foundation/primitive grammar before making component-level visual changes.
- [x] Phase 11B: polish form and picker component examples and any primitive gaps they expose.
- [x] Phase 11C: polish upload components through `dropzone`, `upload-field`, and `upload-item` primitives before touching component composition.
- [x] Phase 11D: polish `data-table` readability, responsive preview behavior, and table-state examples.
- [x] Phase 11E: polish workflow shells: `settings-panel`, `form-dialog`, and `form-drawer`.
- [x] Phase 11F: add a component state coverage guard and rerun full gates.
- [x] Phase 12A: audit remaining component families for aesthetic polish after the guarded component foundation pass.
- [x] Phase 12B: polish chart and metric components through chart/data primitives and state-rich examples.
- [x] Phase 12C: polish diagram components through diagram primitives and responsive render-state checks.
- [x] Phase 12D: polish agent/message workflow components through message, trace, and tool-call primitives.
- [x] Phase 12E: polish shell/navigation components through existing menu, composer, nav, footer, and brand primitives.
- [x] Phase 12F: run full gates and final component-polish audit before declaring the component aesthetic pass ready.

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

## Phase 11A Component Audit Checkpoint

Read this section before starting Phase 11B.

Structural findings:

- Component inventory is 33 public component folders.
- Component implementation LOC is 4098 total.
- Component example LOC is 2183 total.
- Component stylesheets are 0. This is correct: components should assemble primitives and should not own active CSS.
- `main` was committed and pushed at `9962bff polish concrete primitive grammar` before this audit.
- A stale Next process on port 3000 was killed and a fresh docs server was started at `http://127.0.0.1:3000`.
- Representative component browser audit produced no console warnings or errors.

Strong components:

- `composer`: still the benchmark for compact, tactile, dense, useful, soft product UI.
- `command-menu`: strong menu material, keyboard affordance story, and density.
- `message`, `reasoning-message`, and `tool-call-message`: clean composition and coherent agent-workflow surfaces.
- Chart family: good state breadth with loading, empty, error, and chart-kind examples.

Weak spots:

- Form picker components (`multi-select`, `date-picker`, `date-range-picker`, `time-picker`) have good primitive anatomy but default examples are too closed/static. Their open and dense states need to be more visible in docs and render routes.
- Upload components (`file-upload`, `image-upload`) feel flatter and larger than the new control grammar. Fix the underlying upload primitives first: `dropzone`, `upload-field`, and `upload-item`.
- `data-table` is powerful but heavy and can clip or feel cramped in narrow docs preview frames. It needs a focused table/readability/responsive-preview pass.
- Workflow shells (`settings-panel`, `form-dialog`, `form-drawer`) are architecturally clean but need denser, more polished examples assembled from the improved primitives.
- Several components have only 3 states. Phase 11F should enforce state breadth for key component families the same way Phase 10H enforces polished primitive state coverage.

Large component files:

- `composer/component.tsx`: 636 LOC. Keep as a documented benchmark exception unless a future pass deletes real duplication.
- `data-table/component.tsx`: 465 LOC. Primary structural target if a component file needs contraction.
- `command-menu/component.tsx`: 282 LOC. Acceptable for now; do not split unless behavior becomes reusable.
- `diagram-canvas/component.tsx`: 249 LOC. Watch only.

## Phase 11 Rules

- Do not add component CSS unless `PLAN.md` records a temporary exception and the change exposes a real primitive gap.
- Prefer primitive polish over component compensation. If upload, picker, or table material is weak, fix the primitive.
- Do not redesign docs routes. Improve item-owned examples and registered states.
- Preserve schema-first boundaries. New examples must parse and render through item definitions.
- Keep the component examples product-real: dense forms, open pickers, validation, selected rows, upload queues, agent messages, and chart/table states.
- After each phase, update this section with completed work, gate logs, and the next runnable row.

## Phase 11B: Form And Picker Components

Scope:

- `components/multi-select`
- `components/date-picker`
- `components/date-range-picker`
- `components/time-picker`
- `components/number-stepper`
- `components/range-slider`
- `components/password-input`
- `components/search-bar`

Actions:

1. Upgrade examples so default states show compact product context, not isolated controls floating in a large docs frame.
2. Make open states first-class where the component is picker-like: visible menus, selected rows, disabled options, bounded dates, dense time lists, and validation.
3. Fix primitive gaps only in primitives. Likely primitives: `picker-surface`, `calendar-grid`, `time-list`, `field`, `field-row`, `range`, and `search-input`.
4. Register every new state in each component `index.tsx`.
5. Avoid callbacks in examples unless the component interaction contract requires them for a realistic state. Prefer static controlled values.

Done when:

- picker/form component pages look credible beside `composer` and `command-menu`;
- `bun run format` passes;
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passes;
- representative browser pages show no console warnings or obvious clipping.

## Phase 11B Checkpoint

Implemented in the form/picker polish sprint:

- Upgraded default examples for `multi-select`, `date-picker`, `date-range-picker`, `time-picker`, `number-stepper`, `range-slider`, `password-input`, and `search-bar` so catalog previews show compact product context instead of isolated controls.
- Added or promoted registered states for picker/form breadth: open pickers, bounded date ranges, success states, disabled states, max-selection states, stepped ranges, and wrapped token search.
- Kept examples server-renderable and callback-free under the current example/import-boundary contracts.
- Fixed primitive gaps exposed by render routes:
  - `search-input` wrapping is now opt-in through `wrap`;
  - `range` values have enough bottom spacing before field help;
  - `frame` showcase mode allows floating picker surfaces to render outside the preview frame;
  - `calendar-grid` floating placement centers under the trigger using existing sizing/motion tokens.
- Tightened date-range labels so same-year ranges avoid repeated years and do not truncate in picker buttons.
- Killed the stale `de13` docs server that was also bound to port 3000; this worktree is now the only listener at `127.0.0.1:3000`.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun run typecheck` passed, including package build and docs app typecheck.
- Browser visual checks passed for the Phase 11B component pages and render-state routes:
  - `/components/multi-select`
  - `/components/date-picker`
  - `/components/date-range-picker`
  - `/components/time-picker`
  - `/components/number-stepper`
  - `/components/range-slider`
  - `/components/password-input`
  - `/components/search-bar`
  - `/render/component/search-bar?state=wrapped`
  - `/render/component/date-picker?state=open`
  - `/render/component/date-range-picker?state=open`
  - `/render/component/time-picker?state=open`
  - `/render/component/multi-select?state=open`

Notes:

- Browser dev logs still retain historical Next module-resolution errors from before the package rebuild. The current rebuilt pages render correctly after `bun run typecheck`.
- Phase 11C should start with upload primitives, not upload components. Make `dropzone`, `upload-field`, and `upload-item` feel compact/tactile first, then upgrade `file-upload` and `image-upload` examples.

## Phase 11C: Upload Components

Scope:

- `components/file-upload`
- `components/image-upload`
- primitives first: `dropzone`, `upload-field`, `upload-item`

Actions:

1. Rebase upload primitive material on the polished control/surface grammar.
2. Make drag, success, error, progress, empty, single, grid, and avatar states feel compact and tactile.
3. Keep upload components focused on queue/value behavior and field composition.
4. Upgrade examples after primitive polish so docs reveal the better material.

Done when:

- upload pages no longer feel flatter or larger than the control system;
- no component CSS is introduced;
- narrow gates pass.

## Phase 11C Checkpoint

Implemented in the upload polish sprint:

- Rebased `dropzone` on the shared control material grammar: rest, hover, active, disabled, focus, icon, and action states now use `control-*` color/elevation tokens.
- Moved upload list layout ownership to `upload-field`, including grid sizing and compact card action placement.
- Rebased `upload-item` on surface/control/data/feedback tokens with explicit idle, uploading, success, error, image, progress, and action treatments.
- Upgraded primitive examples for `dropzone`, `upload-field`, and `upload-item` so docs/render routes show active, grid, avatar, success, uploading, image, disabled, and error states.
- Expanded `file-upload` and `image-upload` schemas and render inputs with richer inspectable queues and layout controls:
  - `file-upload` now supports `mixed`, `uploading`, `success`, `empty`, `error`, stack/grid display, and upload field kind.
  - `image-upload` now supports `mixed`, `uploading`, `success`, `empty`, `error`, kind, max size, and multiple.
- Upgraded component examples so default upload previews show mixed completed/active queues instead of one flat row.
- Kept upload behavior component-owned and introduced no component CSS.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun run typecheck` passed, including package build and docs app typecheck.
- Browser visual checks passed for upload pages and render-state routes:
  - `/primitives/dropzone`
  - `/primitives/upload-field`
  - `/primitives/upload-item`
  - `/components/file-upload`
  - `/components/image-upload`
  - `/render/primitive/dropzone?state=active`
  - `/render/primitive/upload-field?state=grid`
  - `/render/primitive/upload-item?state=uploading`
  - `/render/component/file-upload?state=grid`
  - `/render/component/image-upload?state=grid`

Notes:

- Browser dev logs still retain historical Next module-resolution errors from earlier package-build states. Current checked pages render correctly after the rebuilt package stylesheet.
- Phase 11D should focus on `data-table` readability and responsive behavior. Fix table primitive gaps before touching component composition.

## Phase 11D: Data Table

Scope:

- `components/data-table`
- table primitives if needed: `table`, `pagination`, `data-surface`, `progress`, `delta`, `sparkline`, `indicator`

Actions:

1. Improve narrow preview behavior without adding docs-only switchboards.
2. Tighten toolbar/search/filter layout using primitives.
3. Audit `data-table/component.tsx` for real reusable algorithms that can move to utilities; do not split JSX only for LOC.
4. Upgrade examples for selected, filtered, paginated, empty, dense, and mobile-risk states.

Done when:

- default table is readable in the docs frame;
- registered states cover the table workflow breadth;
- narrow gates pass.

## Phase 11D Checkpoint

Implemented in the data-table polish sprint:

- Rebased table readability on primitive/foundation fixes instead of component compensation.
- Changed the table min-width token to resolve to full width, then made the table viewport, data surface, and control groups own bounded width and wrapping behavior.
- Tightened table cell density, header color, row hover/selected states, sort affordances, selection inputs, empty copy, pagination buttons, and data-surface headers with existing `control-*`, `surface-*`, and `data-*` tokens.
- Made `DataTable` pass its parsed `compact` setting into `DataSurface`, so compact examples stay dense across the shell and table.
- Added `dataTablePreviewColumns` for the default compact preview and registered a `wide` state for the full data table.
- Upgraded `data-table` examples/states for default, wide, selected, filtered, paginated, and empty workflows without adding component CSS or docs-side switches.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun run typecheck` passed, including package build and docs app typecheck.
- Browser visual checks passed for data-table pages and render-state routes:
  - `/components/data-table`
  - `/render/component/data-table`
  - `/render/component/data-table?state=wide`
  - `/render/component/data-table?state=selected`
  - `/render/component/data-table?state=filtered`

Notes:

- The generic docs detail hero still crops complex lower preview content in some frames. The render routes are contained, and docs UX/layout polish should stay a separate ticket.
- Phase 11E should rebuild workflow shell examples from polished primitives/components only: no component CSS, no raw DOM styling, no docs-specific demo scaffolding.

## Phase 11E: Workflow Shells

Scope:

- `components/settings-panel`
- `components/form-dialog`
- `components/form-drawer`
- supporting examples that compose form/picker/upload components

Actions:

1. Use polished form, picker, and upload components to rebuild richer examples.
2. Keep shells as layout/workflow composition only.
3. Avoid component CSS and raw DOM styling.
4. Ensure default examples show dense real workflows rather than minimal placeholders.

Done when:

- workflow shell pages feel like product UI built from Concrete, not demo scaffolds;
- narrow gates pass.

## Phase 11E Checkpoint

Implemented in the workflow-shell polish sprint:

- Kept shell implementations structurally clean: `settings-panel`, `form-dialog`, and `form-drawer` still assemble primitives and own no component CSS.
- Exposed existing `compact` shell behavior through `form-dialog` and `form-drawer` schemas, seeds, controls, render inputs, and registered states.
- Upgraded `settings-panel` examples/render input with denser runtime/context rows, badges, header actions, footer actions, success state, and richer control variety.
- Upgraded `form-dialog` examples/render input with compact, wide, error, and success workflows assembled from input, textarea, date-range picker, multi-select, file upload, grid, and validation summary.
- Upgraded `form-drawer` examples/render input with compact, left, review, and success workflows assembled from sections, field rows, select, switch, date picker, number stepper, multi-select, file upload, and validation summary.
- Extended the documented demo-composition ledger and import-boundary guard for the intentional render-adapter/example sibling component compositions.
- Fixed a primitive gap in `header`: header metadata and actions now wrap in narrow frames using foundation tokens, preventing workflow-shell actions from clipping in docs render frames.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun run typecheck` passed, including package build and docs app typecheck.
- Browser visual checks passed for workflow shell pages and render-state routes:
  - `/components/settings-panel`
  - `/render/component/settings-panel?state=success`
  - `/components/form-dialog`
  - `/render/component/form-dialog?state=compact`
  - `/render/component/form-dialog?state=wide`
  - `/render/component/form-dialog?state=success`
  - `/components/form-drawer`
  - `/render/component/form-drawer?state=compact`
  - `/render/component/form-drawer?state=left`
  - `/render/component/form-drawer?state=success`

Notes:

- Dialog wide state intentionally renders closed pickers inside the shell; picker-open behavior remains covered by picker component routes so shell examples do not stack floating surfaces in narrow docs frames.
- Phase 11F should add the component state coverage guard for the polished Phase 11B-11E component set, then run the full gate stack.

## Phase 11F: Component Coverage Guard And Gates

Actions:

1. Add a registry-level component state coverage guard for the components improved in Phase 11B-11E.
2. Run full gates:

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

3. Restore `apps/docs/next-env.d.ts` after Next build or catalog audit if needed.
4. Update `PLAN.md` with final Phase 11 checkpoint and the next active row.

Done when:

- component polish is guarded by tests;
- full gates pass;
- `PLAN.md` can hand off the next workstream without conversation memory.

## Phase 11F Checkpoint

Implemented in the component coverage and gate sprint:

- Added a registry-level component state coverage guard for the polished Phase 11B-11E component set:
  - form/picker controls: `multi-select`, `date-picker`, `date-range-picker`, `time-picker`, `number-stepper`, `range-slider`, `password-input`, and `search-bar`;
  - upload/data/workflow components: `file-upload`, `image-upload`, `data-table`, `settings-panel`, `form-dialog`, `form-drawer`, and `validation-summary`.
- The guard locks registered state order and breadth so future contractions fail in `packages/concrete/src/tests/registry.test.ts`.
- Cleared stale local Next PID 58942 after `visual:smoke` detected an already-running dev server for this worktree.

Validation:

- `bun run format` passed.
- `bun test` passed.
- `bun run check:skill` passed.
- `bun run typecheck` passed.
- `bun run check` passed.
- `bun run build` passed, including the docs production build.
- `bun run visual:smoke` initially failed on stale local Next PID 58942, then passed after killing that process.
- `bun run catalog:audit` passed across 528 render routes.

Next:

- Phase 12A should start with a fresh component-family audit. The guarded foundation/form/upload/data/workflow layer is now strong enough that the next work should focus on remaining aesthetic polish by family, not structural churn.

## Phase 12A Remaining Component Audit

Read this section before continuing Phase 12.

Remaining unpolished families after Phase 11:

- Chart/data display: `chart`, `line-chart`, `area-chart`, `bar-chart`, `stacked-bar-chart`, `donut-chart`, `heatmap`, `meter`, and `metric-card`.
- Diagram/dataflow: `diagram-canvas` and `flow-diagram`.
- Agent/message workflow: `message`, `reasoning-message`, and `tool-call-message`.
- Shell/navigation: `command-menu`, `composer`, `nav`, and `footer`.

Current judgment:

- `composer` and `command-menu` are still quality references. Do not churn them unless a concrete defect appears.
- Chart components had decent state breadth but weaker compact/generated-output states. The `compact` schema prop existed across chart schemas but was not wired into chart `DataSurface` shells.
- `heatmap-grid` exposed a primitive-level layout bug: CSS `repeat(var(--heatmap-column-count), ...)` fell back to one column in browser render routes, which collapsed compact heatmap labels.
- `metric-card` and `meter` needed stronger negative/critical examples and tighter value semantics.
- Diagrams should be next because they are visual, complex, and likely to expose responsive primitive gaps.

## Phase 12B Chart And Metric Checkpoint

Implemented in the chart/data polish sprint:

- Wired chart `compact` props into every chart component `DataSurface`: `chart`, `line-chart`, `area-chart`, `bar-chart`, `stacked-bar-chart`, `donut-chart`, and `heatmap`.
- Kept chart shell JSX inside component files after import-boundary tests rejected utility-proxied shell rendering. This matches the current policy that component files eat their runtime JSX scope.
- Added compact generated-output states across chart components without adding component CSS.
- Added stronger `metric-card` states for `critical` and `trendless` dashboards.
- Added a `meter` danger state, made ring meters respect compact density, and formatted target values with their unit.
- Fixed `heatmap-grid` at the primitive level by computing the dynamic grid template in its existing allowed inline-style adapter, while still using foundation tokens.
- Tightened the heatmap axis sizing token from the old wide axis track to a compact axis track that fits row labels in generated/chart frames.
- Extended the component state coverage guard so chart/metric states cannot silently regress.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun run typecheck` passed, including package build and docs app typecheck.
- Browser visual checks passed for:
  - `/render/component/chart?state=compact`;
  - `/components/metric-card`;
  - `/render/component/metric-card?state=critical`;
  - `/render/component/meter?state=danger`;
  - `/components/line-chart`;
  - `/render/component/line-chart?state=compact`;
  - `/render/component/heatmap?state=compact`.

Next:

- Phase 12C should take the diagram family end to end: `diagram-canvas`, `flow-diagram`, and the diagram primitives they expose. Start with render routes for default/selected/interactive/compact states, fix primitive-level layout or density gaps only, then add registry guards if state breadth changes.

## Phase 12C Diagram Checkpoint

Implemented in the diagram polish sprint:

- Replaced desktop-sized default diagram examples with compact item-owned graph recipes that read inside narrow render frames.
- Kept full desktop diagram breadth as explicit `wide` states instead of forcing wide graphs into every preview and render route.
- Tightened `flow-diagram` compact and wide fixtures so selected/default/interactive states have legible nodes and labels in the docs frame.
- Fixed `diagram-viewport` at the primitive level by moving the stage centering transform into the primitive selector. The previous root alias could disappear in the docs dev CSS path, leaving the canvas stage uncentered.
- Retired the now-unused `--concrete-template-diagram-stage` foundation alias so layout foundations do not carry dead component-shaped vocabulary.
- Made `diagram-canvas` use its existing `controls` prop for the tool rail as well as zoom controls, so non-interactive/default states stay quiet and centered.
- Updated diagram descriptions and state registrations to match the actual examples.
- Extended the component state coverage guard for `diagram-canvas` and `flow-diagram`.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun run typecheck` passed, including package build and docs app typecheck.
- Browser visual checks passed for:
  - `/render/component/diagram-canvas?state=default`;
  - `/render/component/diagram-canvas?state=interactive`;
  - `/render/component/diagram-canvas?state=selected`;
  - `/render/component/flow-diagram?state=selected`;
  - `/render/component/flow-diagram?state=wide`;
  - `/components/diagram-canvas`;
  - `/components/flow-diagram`.

Notes:

- Browser dev logs still retain historical Next module-resolution errors from package rebuild moments, but the current rebuilt pages render correctly.
- `apps/docs/next-env.d.ts` was restored to the required single import after typecheck.

Next:

- Phase 12D should take the agent/message workflow family end to end: `message`, `reasoning-message`, and `tool-call-message`. Start with render routes and detail pages, compare them to the composer benchmark, and only adjust primitives/utilities when the gap is reusable across the family.

## Phase 12D Message Workflow Checkpoint

Implemented in the agent/message workflow polish sprint:

- Rebased message workflow material on primitives instead of component CSS: `message-bubble`, `trace-panel`, `tool-call-panel`, and `transcript-item`.
- Made assistant message bubbles feel closer to the composer benchmark with raised surface depth and tighter default copy.
- Made trace/reasoning panels read as compact tactile cards with visible open/collapsed material, shorter step labels, and less clipping risk in narrow render frames.
- Made tool-call panels use the same surface/depth grammar, tighter summary spacing, compact status labels, and a tokenized minimum tool-call measure for message-stack contexts.
- Upgraded `message`, `reasoning-message`, and `tool-call-message` examples/states with shorter product-real copy, running/success/error/queued tool-call states, and callback-free server-renderable examples.
- Extended the component state coverage guard for the message workflow family.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun run build:package` passed.
- `bun run typecheck` passed, including package build and docs app typecheck.
- Browser visual checks passed for:
  - `/render/component/message?state=default`;
  - `/render/component/message?state=statuses`;
  - `/render/component/reasoning-message?state=default`;
  - `/render/component/reasoning-message?state=collapsed`;
  - `/render/component/tool-call-message?state=queued`;
  - `/render/component/tool-call-message?state=running`;
  - `/render/component/tool-call-message?state=success`.

Notes:

- Closed tool-call panels intentionally allow long tool names to ellipsize in very compact frames. The queued example now uses a realistic short tool label so the default visual state demonstrates the intended compact grammar.
- `apps/docs/next-env.d.ts` remains on the required single import after typecheck.

Next:

- Phase 12E should close the shell/navigation family: `command-menu`, `composer`, `nav`, and `footer`. Treat `composer` and `command-menu` as benchmarks unless a concrete defect appears. Focus on `nav` and `footer` examples/states, then add coverage guards only for meaningful new states.

## Phase 12E Shell And Navigation Checkpoint

Implemented in the shell/navigation polish sprint:

- Kept `composer` and `command-menu` unchanged after audit because they remain the benchmark surfaces and showed no concrete structural or visual defect in render routes.
- Rebased `TextLink` navigation purpose on the shared control material grammar: compact padding, small radius, hover wash, and current-link wash now make nav links feel like Concrete controls instead of plain text.
- Tightened `Footer` aside composition by passing the parent density into its supporting `Surface`, so command asides stay compact inside render frames.
- Upgraded `nav` examples so action states include both npm and GitHub links.
- Upgraded `footer` examples and schema defaults with sharper Concrete copy, a shorter install command, npm/GitHub actions, and a new minimal footer state.
- Extended the component state coverage guard for `nav`, `footer`, `command-menu`, and `composer`.

Validation:

- `bun run format` passed.
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts` passed.
- `bun run build:package` passed.
- `bun run typecheck` passed, including package build and docs app typecheck.
- Browser visual checks passed for:
  - `/render/component/nav?state=default`;
  - `/render/component/nav?state=actions`;
  - `/render/component/footer?state=default`;
  - `/render/component/footer?state=command`;
  - `/render/component/footer?state=minimal`;
  - `/components/nav`;
  - `/components/footer`.

Notes:

- `composer` and `command-menu` should not be churned further in the component polish track unless a specific defect appears.
- The docs app shell footer still uses the longer `npm install @rubriclab/concrete` copy; that is app content, not the package `Footer` example state.
- `apps/docs/next-env.d.ts` remains on the required single import after typecheck.

Next:

- Phase 12F should run the full gate stack and do one final component-polish audit. If the gates are clean, the component aesthetic pass can move from active polish into ready-for-review status.

## Phase 12F Gate Checkpoint

The component aesthetic pass is ready for review.

Validation:

- `bun run format` passed.
- `bun test` passed.
- `bun run check:skill` passed.
- `bun run check` passed.
- `bun run build` passed, including package build and docs production build.
- `bun run visual:smoke` passed after stopping the active port-3000 dev server so the smoke script could own its isolated Next dev instance.
- `bun run catalog:audit` passed 541 render routes. The first attempt hit a transient Playwright `ERR_NETWORK_IO_SUSPENDED` on `primitive/inline:between`; the immediate rerun passed the full catalog with no route failures.

Notes:

- `apps/docs/next-env.d.ts` was restored to the required single import after the Next build and catalog audit.
- The docs dev server should be restarted on `127.0.0.1:3000` after this checkpoint if local browser inspection continues.

Next:

- Move into review mode for the Phase 10-12 foundation, primitive, and component aesthetic pass.
- If another implementation wave is greenlit, start with a fresh visual QA audit rather than changing structure: open catalog detail pages and render states, compare them against `Composer` and `Button`, and only touch foundation/primitive grammar when multiple items expose the same gap.

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
| `packages/concrete/src/components/form-dialog/index.tsx` | `file-upload` | Serializable renderInput adapter for representative dialog upload evidence. |
| `packages/concrete/src/components/form-dialog/index.tsx` | `multi-select` | Serializable renderInput adapter for representative dialog tag selection. |
| `packages/concrete/src/components/form-dialog/index.tsx` | `validation-summary` | Serializable renderInput adapter for representative dialog validation states. |
| `packages/concrete/src/components/form-drawer/examples.tsx` | `date-picker` | Rich form example showing drawer composition with picker workflow. |
| `packages/concrete/src/components/form-drawer/examples.tsx` | `file-upload` | Rich form example showing drawer composition with evidence upload workflow. |
| `packages/concrete/src/components/form-drawer/examples.tsx` | `multi-select` | Rich form example showing drawer composition with owner selection workflow. |
| `packages/concrete/src/components/form-drawer/examples.tsx` | `number-stepper` | Rich form example showing drawer composition with numeric control workflow. |
| `packages/concrete/src/components/form-drawer/examples.tsx` | `validation-summary` | Rich form example showing validation feedback inside drawer composition. |
| `packages/concrete/src/components/form-drawer/index.tsx` | `date-picker` | Serializable renderInput adapter for representative drawer date review. |
| `packages/concrete/src/components/form-drawer/index.tsx` | `file-upload` | Serializable renderInput adapter for representative drawer evidence upload. |
| `packages/concrete/src/components/form-drawer/index.tsx` | `multi-select` | Serializable renderInput adapter for representative drawer owner selection. |
| `packages/concrete/src/components/form-drawer/index.tsx` | `number-stepper` | Serializable renderInput adapter for a representative drawer form. |
| `packages/concrete/src/components/form-drawer/index.tsx` | `validation-summary` | Serializable renderInput adapter for representative drawer validation states. |
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

- 2026-05-01 Phase 12F component aesthetic pass ready: format, tests, skill check, check, build, visual smoke, and catalog audit passed. Catalog audit passed 541 render routes.
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
