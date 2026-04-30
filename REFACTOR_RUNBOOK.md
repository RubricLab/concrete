# Refactor Runbook

This file is a continuity tool for long runs with context compaction. It is not the architecture source of truth. Read `CODE.md` first.

## Start Protocol

Every meaningful implementation session starts here:

1. Read `CODE.md`.
2. Read `ITEM_SCOPE.md`.
3. Read `MIGRATION_QUEUE.md`.
4. Read this runbook.
5. Run `git status -sb`.
6. Pull the active chunk or first unblocked backlog item into a concrete todo list.
7. Before stopping, update `ITEM_SCOPE.md`, `MIGRATION_QUEUE.md`, and this runbook.

## Active Goal

Run the full catalog example and docs accuracy pass after the structural CSS migration:

- docs pages project public foundation, primitive, and component definitions instead of maintaining stale item inventories
- every public item has a strong default example and meaningful state examples that showcase current Concrete vocabulary
- examples and render inputs stay serializable and server-renderable
- primitive and component examples compose Concrete primitives instead of owning visual styling
- foundations are represented in docs, render, screenshot, and audit surfaces wherever the route concept applies
- `MIGRATION_QUEUE.md` always contains the next runnable chunk and backlog
- every chunk updates `ITEM_SCOPE.md` when item scope, example role, docs coverage, or exclusions change
- catalog audit, visual smoke, and package checks stay green

## Current Checkpoint

- Folder-per-item migration is complete for foundations, primitives, and components.
- Docs playground/render/detail flows consume registry item definitions.
- `CODE.md` replaced the temporary architecture document and carries the durable DX policy.
- `components/` root has been cleaned down to the public barrel; shared engines now live in `utilities/`.
- Shared component implementations used by other components now live in private `primitives/internal/*` folders.
- Component `component.tsx` files no longer import sibling component folders.
- The previous LOC-first composer split was rejected. Composer remains whole unless a future change deletes code or creates a real reusable boundary.
- Central active selector layers are selector-free and token-consuming CSS is scanner-checked for raw visual values outside foundations.
- `bun run visual:smoke` provides browser-rendered smoke coverage for the migrated primitive layer and representative data compositions.
- Component style sources are empty; component implementations are guarded against owning Concrete class-name helpers.
- `CODE.md` now defines strict foundation, primitive, component, promotion, and CSS ownership law.
- `CODE.md` now defines docs/example accuracy law: registry-led docs, serializable examples, no preview-only callbacks, and no visual styling in primitive/component examples.
- `ITEM_SCOPE.md` is the migration ledger and must cover every public foundation, primitive, and component.
- `MIGRATION_QUEUE.md` is the autonomous queue. Completed chunks must leave the next chunk's todo list ready.
- The example/docs substrate is in place: foundations have registry-led docs/render/detail coverage and `bun run catalog:audit` exercises the full public render catalog before broad example polish.
- Foundation docs/examples are accurate as of 2026-04-30: each public foundation has multi-state examples, the docs foundation header names only public foundation bundles, and home radius/typography/icon data no longer carries known stale static values.
- Primitive control/product examples are accurate as of 2026-04-30: base controls use product copy and primitive-owned/intrinsic width discipline, menu/search examples render real slots, and generated menu input has an explicit empty-state switch.
- Primitive data/chart/table examples are accurate as of 2026-04-30: data atoms, chart surfaces, metric shells, and table primitives expose realistic generated-output states, richer defaults, and pagination/table render inputs that prove disabled/frozen/empty anatomy.
- Primitive diagram/message/agent examples are accurate as of 2026-04-30: diagram, educational, transcript, reasoning, tool-call, composer, suggestion, and code primitives expose viewport-safe render inputs plus selected/muted/error/queued/disabled states.
- Component forms/navigation/control/media examples are accurate as of 2026-04-30: form, overlay, settings, validation, upload, password, menu/search/picker, toolbar, stepper, and range components expose realistic workflow states without server-only callbacks or misleading client-owned snapshots.
- Component data/chart/table/diagram examples are accurate as of 2026-04-30: metric, meter, chart-family, data table, and graph components expose distinct density, data-state, pagination, and selected/unselected fixture coverage.
- Component message/agent/composer examples are accurate as of 2026-04-30: transcript, reasoning, tool-call, and composer components expose grouped/status, pending/error, queued/success/error, and custom suggestion states.
- Final catalog/docs QA is accurate as of 2026-04-30: docs counts derive from registries, all seven foundations are exposed through docs/detail/render routes, `bun run catalog:audit` passed 414 routes, and `bun run visual:smoke` passed.
- Example preview de-framing is accurate as of 2026-04-30: primitive/component examples do not use `Frame`, `Card`, `PreviewStage`, custom pass-through stage helpers, inline visual styles, raw wrapper classes, or docs-like preview chrome outside the primitives documenting those ideas.

## Active Todo

- [x] Convert the CSS ownership vision into durable `CODE.md` law.
- [x] Create `ITEM_SCOPE.md` as the live item scope and migration ledger.
- [x] Add a contract test that keeps `ITEM_SCOPE.md` aligned with actual item folders.
- [x] Create `MIGRATION_QUEUE.md` as the autonomous chunk queue.
- [x] Add a contract test that keeps the autonomous queue present and structured.
- [x] Active queue chunk: style bundle substrate.
- [x] Migrate primitive seed cluster: `divider` and `kbd`.
- [x] Active queue chunk: label/status primitive cluster.
- [x] Active queue chunk: icon/control primitive cluster.
- [x] Active queue chunk: surface primitive cluster.
- [x] Active queue chunk: form field primitive cluster.
- [x] Active queue chunk: first component cleanup.
- [x] Active queue chunk: upload/media cluster.
- [x] Active queue chunk: menu/search cluster.
- [x] Active queue chunk: message/agent cluster.
- [x] Active queue chunk: data atom cluster.
- [x] Active queue chunk: chart cluster.
- [x] Active queue chunk: table/data surface cluster.
- [x] Active queue chunk: diagram/educational cluster.
- [x] Active queue chunk: control/form leftovers cluster.
- [x] Active queue chunk: form-control primitive extraction cluster.
- [x] Active queue chunk: form shell/settings/validation cluster.
- [x] Active queue chunk: upload field/media preview primitive extraction.
- [x] Active queue chunk: menu/search picker-token slice.
- [x] Active queue chunk: menu/search primitive promotion second pass.
- [x] Active queue chunk: message and agent primitive promotion.
- [x] Active queue chunk: composer/editor/toolbar cleanup.
- [x] Active queue chunk: metric shell primitive extraction.
- [x] Active queue chunk: chart surface primitive promotion.
- [x] Active queue chunk: data table primitive promotion.
- [x] Active queue chunk: diagram viewport/edge/legend primitive promotion.
- [x] Active queue chunk: scalar control primitive promotion.
- [x] Active queue chunk: foundation extraction.
- [x] Active queue chunk: raw value enforcement.
- [x] Active queue chunk: component CSS deletion sweep.
- [x] Active queue chunk: button primitive migration.
- [x] Active queue chunk: remaining central primitive layer migration.
- [x] Active queue chunk: foundation semantic token tightening.
- [x] Active queue chunk: visual QA pass.
- [x] Active queue chunk: final component CSS debt elimination.
- [x] Active queue chunk: inline example stage cleanup.
- [x] Active queue chunk: chart renderer boundary audit.
- [x] Active queue chunk: schema controls depth.
- [x] Active queue chunk: recursive Concrete node schema scoping.
- [x] Active queue chunk: final hardening pass.
- [x] After each chunk, create the next chunk's todo list before stopping.
- [x] Active queue chunk: server-rendered catalog callback hardening.
- [x] Set up the full catalog example/docs accuracy queue.
- [x] Active queue chunk: example/docs accuracy substrate.
- [x] Add or extend full-catalog audit coverage before polishing item examples.
- [x] Promote foundation docs coverage to registry-led item data.
- [x] Active queue chunk: foundation docs/examples accuracy.
- [x] Active queue chunk: primitive examples control/product cluster.
- [x] Active queue chunk: primitive examples data/chart/table cluster.
- [x] Active queue chunk: primitive examples diagram/message/agent cluster.
- [x] Active queue chunk: component examples forms/navigation/control/media cluster.
- [x] Active queue chunk: component examples data/chart/table/diagram cluster.
- [x] Active queue chunk: component examples message/agent/composer cluster.
- [x] Active queue chunk: final catalog visual QA and docs copy pass.
- [x] Active queue chunk: example preview de-framing cleanup.

## Next Chunks

- Use `MIGRATION_QUEUE.md` as the source of truth for active chunk and backlog.
- Current implementation chunk: none.
- Expected next implementation chunk: none unless a new backlog item is added.
- Expected verification path: focused docs/catalog tests, full catalog audit once added, `bun run check`, and `CONCRETE_VISUAL_SMOKE_ORIGIN=http://localhost:3000 bun run visual:smoke` for runtime docs/example changes.

## Chunk Log

- 2026-04-29: Captured the initial durable DX policy and reduced this runbook to a reusable long-run tracker.
- 2026-04-29: Moved docs page UI into App Router page files and deleted the temporary one-line page proxy modules.
- 2026-04-29: Replaced `packages/concrete/src/create` with `packages/concrete/src/factories` plus shared schema/render utilities.
- 2026-04-29: Moved loose shared engines/render helpers out of `packages/concrete/src/components` into `packages/concrete/src/utilities`.
- 2026-04-29: Promoted shared message, toolbar, form-shell, and file-upload implementations into private internal primitive folders so component implementations import primitives instead of siblings.
- 2026-04-29: Gates passed: `bun run format`, `bun run lint`, `bun test`, `bun run typecheck`, and `bun run build`.
- 2026-04-29: Committed `fdfaf66 Refine Concrete DX architecture` and pushed it to `origin/main`.
- 2026-04-29: Renamed the durable guide to `CODE.md`, restored the old DX architecture doctrine into it, updated README/runbook/test references, and kept `CODEBASE_POLICIES.md`/`DX_ARCHITECTURE.md` absent.
- 2026-04-29: Gates passed: `bun run format`, `bun run lint`, `bun test`, `bun run typecheck`, `bun run build`, and `bun run --cwd packages/concrete verify:publish`.
- 2026-04-29: Rebasing on `origin/main` picked up auto-release commit `2e7d605 release: concrete v0.0.5`; current-head gates passed again with `bun run check`, `bun run build`, and `bun run --cwd packages/concrete verify:publish`.
- 2026-04-29: Started the aggressive CSS/component standardization run: added strict ownership law to `CODE.md`, created `ITEM_SCOPE.md`, and planned a ledger drift test.
- 2026-04-29: Added `MIGRATION_QUEUE.md` as the autonomous todo queue and set the first active chunk to style bundle substrate.
- 2026-04-29: Completed style bundle substrate and primitive seed cluster. `bun run check` passed after moving `divider` and `kbd` to token-only item CSS.
- 2026-04-29: Completed label/status primitive cluster. Focused tests and style build passed after moving `badge`, `pill`, `tag`, `chip`, and `indicator` to token-only item CSS.
- 2026-04-29: Completed icon/control primitive cluster. Focused tests and style build passed after moving `icon`, `caret`, and `spinner` to token-only item CSS.
- 2026-04-29: Completed surface primitive cluster. Focused tests and style build passed after moving `card`, `frame`, `bubble`, `empty-state`, and `texture` to token-only item CSS.
- 2026-04-29: Completed form field primitive cluster. Focused tests and style build passed after moving `field`, `input`, `select`, `textarea`, `checkbox`, `radio`, `switch`, and `slider` to token-only item CSS.
- 2026-04-29: Completed first component cleanup slice. `password-input` active form-control selectors moved into the input primitive; `number-stepper` and `range-slider` remain queued for new control/layout vocabulary.
- 2026-04-29: Completed upload/media cluster. `avatar`, `dropzone`, and `upload-item` active selectors moved to token-only local CSS; file/image upload centralized selectors moved to explicit local wrapper debt.
- 2026-04-29: Completed menu/search cluster. Command/search/multi-select/date/time picker centralized selectors moved to token-only local component debt while preserving explicit primitive-promotion targets. `bun run check` passed.
- 2026-04-29: Completed message/agent cluster. `code` selectors moved to owned token-only primitive CSS; message, reasoning, tool-call, and composer suggestion menu selectors moved to token-only local component debt. `bun run check` passed.
- 2026-04-29: Completed data atom cluster. `stat`, `delta`, `progress`, `distribution`, and `sparkline` selectors moved to owned token-only primitive CSS; metric-card and meter selectors moved to token-only local component debt. Focused style build, import-boundary tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed chart cluster. Shared chart renderer selectors moved to token-only chart-family local component debt; donut and heatmap own specialized local component CSS; dead horizontal/stacked DOM chart selectors were removed from active CSS. Focused style build, data/import tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed table/data surface cluster. DataTable selectors moved to token-only local component debt; shared data-tone classes moved to the colors foundation utility layer. Focused style build, data/import tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed diagram/educational cluster. Concept frame/connector and diagram node/item selectors moved to owned token-only primitive CSS; diagram-canvas and flow-diagram selectors moved to token-only local component debt; diagram-tone classes moved to the colors foundation utility layer. Focused style build, diagram/import tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed control/form leftovers cluster. NumberStepper and RangeSlider selectors moved from the central component layer to token-only local component debt; scalar primitive promotion is queued for a later stepper/range vocabulary pass. Focused style build, registry/import tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed form-control primitive extraction cluster. `InputControl` now owns the password action-slot DOM, `ChoiceRow` now owns checkbox/radio row DOM, and PasswordInput no longer imports `concreteClassNames`. Focused registry/import tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed form shell/settings/validation cluster. Form shell, overlay/dialog/drawer, settings row vocabulary, and validation summary selectors moved from the central component layer into explicit token-only local debt; form row and validation alert primitive promotion remain queued.
- 2026-04-29: Completed upload field/media preview primitive extraction. Added `upload-field` as the upload stack/width primitive, moved file/image upload wrapper sizing out of component CSS, and left media-preview deferred until standalone preview/cropping behavior exists.
- 2026-04-29: Completed menu/search picker-token slice. Added `picker-control`, `calendar-panel`, `time-list`, and `search-token`; DateRangePicker now has no active local selectors and calendar utilities are pure date math/formatting.
- 2026-04-29: Completed menu/search primitive promotion second pass. Added `picker-shell`, `menu-shell`, `option-row`, `search-field`, `select-control`, and `select-menu`; localized `row`; CommandMenu, SearchBar, MultiSelect, DatePicker, DateRangePicker, and TimePicker now have no active component selectors. `bun run check` passed.
- 2026-04-29: Completed message and agent primitive promotion. Added `message-shell`, `reasoning-panel`, `tool-call-panel`, and `suggestion-menu`; Message, ReasoningMessage, ToolCallMessage, and Composer suggestion menu styling now have no active component selectors. `bun run check` passed.
- 2026-04-29: Completed composer/editor/toolbar cleanup. Added `composer-shell`, `composer-rail`, and `toolbar-control`; Composer and Toolbar now assemble primitive-owned editor, rail, footer, token, and toolbar control surfaces. Focused import/registry tests, package typecheck, style build, and `bun run check` passed.
- 2026-04-29: Completed metric shell primitive extraction. Added `metric-shell`; MetricCard and Meter now assemble primitive-owned scalar card shell, header/value, caption, sparkline slot, footer, and ring-card alignment surfaces. Focused data/registry/import tests, package typecheck, style build, and `bun run check` passed.
- 2026-04-29: Completed chart surface primitive promotion. Added `chart-surface`, `data-card-header`, and `chart-legend`; chart-family components now assemble primitive-owned shell/header/surface/message/SVG/donut/heatmap/legend styling, and FlowDiagram no longer borrows chart-local header/legend selectors. Focused registry/import tests, package typecheck, style build, and `bun run check` passed.
- 2026-04-29: Completed data table primitive promotion. Added `data-table-shell`, `data-table-control`, and `data-table-pagination`; DataTable now assembles primitive-owned card/scroll/table/cell/sort/selection/empty, toolbar/search/filter/action, and pagination styling while retaining state and data logic. Focused registry/import tests, package typecheck, style build, and `bun run check` passed.
- 2026-04-29: Completed diagram viewport/edge/legend primitive promotion. Added `diagram-viewport`, `diagram-controls`, `diagram-rail`, `diagram-edge`, `diagram-minimap`, `diagram-legend`, and `flow-node`; DiagramCanvas and FlowDiagram now assemble primitive-owned shell/header/viewport/control/rail/edge/minimap/legend/flow-node styling while retaining graph state and routing logic. Focused registry/import/diagram tests, package typecheck, style build, and `bun run check` passed.
- 2026-04-29: Completed scalar control primitive promotion. Added `stepper-control` and `range-control`; NumberStepper and RangeSlider now assemble primitive-owned numeric stepper and two-thumb range styling while retaining value state, clamping, and form-field behavior. Focused registry/import tests, package typecheck, style build, and `bun run check` passed.
- 2026-04-29: Completed foundation extraction. Moved Concrete custom property declarations out of `src/styles.css` and into colors, elevation, motion, radii, spacing, textures, and typography foundation stylesheets while keeping font loading/reset/base substrate in root. Focused style build, import-boundary tests, registry tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed raw value enforcement. Added an import-boundary scanner for raw visual values outside foundations, documented CSS-language exceptions in `CODE.md`, and tokenized the remaining central primitive-layer literals for button/link/tooltip/skeleton/brand surfaces. Focused style build, import-boundary tests, registry tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed component CSS deletion sweep. Made component stylesheets optional, deleted comment-only component stylesheets, and narrowed `componentStyleSources` to `form-shell` plus `validation-summary` active local debt. Focused style build, import-boundary tests, registry tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed button primitive migration. Moved `.concrete-button*` selectors from the central primitive layer into `primitives/button/styles.css`, kept loading spinner class composition stable, and left `.concrete-focus-target` for the remaining central utility decision. Focused style build, import-boundary tests, registry tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed remaining central primitive layer migration. Moved link, tooltip, skeleton, brand-mark, wordmark, and focus-ring preview selectors into token-only primitive CSS; moved root, visually-hidden, and focus-target utilities into foundations; added a central-layer no-selector boundary test. Focused style build, import-boundary tests, registry tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed foundation semantic token tightening. Renamed scalar control foundation tokens from component-era `number-stepper`/`range-slider` vocabulary to promoted primitive `stepper-control`/`range-control` vocabulary, updated primitive consumers, and added an import-boundary guard against retired scalar component token names. Focused style build, import-boundary tests, registry tests, package typecheck, and `bun run check` passed.
- 2026-04-29: Completed visual QA pass. Added `bun run visual:smoke`, browser-checked migrated primitive routes plus DataTable/Chart compositions, scoped assertions to render fixtures, bounded server/browser waits, and added a default chart example so `/render/component/chart` is nonblank. `bun run visual:smoke` passed.
- 2026-04-29: Completed final component CSS debt elimination. Added `form-layout`, `form-overlay`, and `feedback-panel` primitives; deleted final component stylesheets and private form-shell implementation; made form/validation components primitive assembly; expanded visual smoke; added a guard against component-owned Concrete class names. Focused tests, `bun run visual:smoke`, and `bun run check` passed.
- 2026-04-29: Completed inline example stage cleanup. Added `preview-stage`, moved repeated example constraints and texture preview sizing into token-owned primitive CSS, replaced primitive preview-only inline styles, and added import-boundary guards for examples/render inputs and dynamic primitive inline-style adapters. Focused tests, package typecheck, and `bun run visual:smoke` passed.
- 2026-04-29: Completed chart renderer boundary audit. Kept chart utilities as algorithmic geometry/render engines, moved chart SVG selector application behind chart-surface primitive subparts, and added an import-boundary guard so chart render utilities cannot own Concrete class-name helpers. Focused data/registry/import tests, package typecheck, and `bun run visual:smoke` passed.
- 2026-04-29: Completed schema controls depth. Generated controls now include nested object leaf paths, exact-path array JSON controls, and top-level string-const discriminated unions; query parsing applies dotted controls back through runtime schemas while keeping root `Props JSON` fallback. Focused registry tests, package typecheck, and `bun run visual:smoke` passed.
- 2026-04-29: Completed recursive Concrete node schema scoping. Added public recursive node/tree schemas plus registry-aware validation helpers that enforce known primitive/component references and item prop schemas without rendering. Focused registry/import/data tests and package typecheck passed.
- 2026-04-29: Completed final hardening pass. Added package export/build-entrypoint guards, local custom-property alias and media-query threshold policy tests, and direct screenshot-route coverage in `visual:smoke`. Gates passed: focused import/registry tests, package/docs typecheck, `bun run visual:smoke`, and `bun run check`.
- 2026-04-30: Fixed Next RSC event-handler failures in server-rendered docs catalogs by removing preview-only callbacks from examples/render inputs, making interactive primitive callbacks optional, adding a catalog-serialization boundary test, and letting `visual:smoke` reuse an existing docs server. Gates passed: `CONCRETE_VISUAL_SMOKE_ORIGIN=http://localhost:3000 bun run visual:smoke` and `bun run check`.
- 2026-04-30: Set up the next autonomous phase for full catalog example/docs accuracy. Added docs/example accuracy law to `CODE.md`, seeded `MIGRATION_QUEUE.md` with the substrate chunk plus breadth backlog, and pointed this runbook at foundation-led docs coverage and catalog audit hardening.
- 2026-04-30: Completed the example/docs accuracy substrate. Added `foundationRegistry`, foundation detail/render route support, full-catalog route audit, docs foundation catalog coverage, and fixed default/collapsed examples exposed by the audit. Gates passed: focused registry/import tests, `bun run typecheck`, and `CONCRETE_CATALOG_AUDIT_ORIGIN=http://localhost:3000 bun run catalog:audit`.
- 2026-04-30: Completed foundation docs/examples accuracy. Rebuilt foundation examples with multi-state token specimens, corrected home/foundation docs drift against exported token data, and moved the queue to primitive control/product examples. Gates passed: registry tests, `bun run typecheck`, and `CONCRETE_CATALOG_AUDIT_ORIGIN=http://localhost:3000 bun run catalog:audit`.
- 2026-04-30: Completed primitive examples control/product cluster. Polished text/select/choice/search/menu/picker/scalar examples, added button/field/slider states, removed function-prop time-list examples, fixed menu-shell generated input state, and moved the queue to data/chart/table primitives. Gates passed: focused registry/import tests, `bun run typecheck`, and `CONCRETE_CATALOG_AUDIT_ORIGIN=http://localhost:3000 bun run catalog:audit`.
- 2026-04-30: Completed primitive examples data/chart/table cluster. Polished stat/delta/progress/distribution/sparkline/chart/table/metric primitives, added richer state coverage, derived table pagination disabled states in render input, and moved the queue to diagram/message/agent primitives. Gates passed: focused registry/import tests, `bun run typecheck`, and `CONCRETE_CATALOG_AUDIT_ORIGIN=http://localhost:3000 bun run catalog:audit`.
- 2026-04-30: Completed primitive examples diagram/message/agent cluster. Polished concept/diagram/message/reasoning/tool/composer/suggestion/code primitives, added viewport-safe edge/menu render inputs plus selected/muted/error/queued/disabled coverage, and moved the queue to component form/control/media examples. Gates passed: focused registry/import tests, `bun run typecheck`, and `CONCRETE_CATALOG_AUDIT_ORIGIN=http://localhost:3000 bun run catalog:audit`.
- 2026-04-30: Completed component examples forms/navigation/control/media cluster. Polished form, overlay, settings, validation, upload, password, command/search/picker, toolbar, number-stepper, and range-slider examples; exposed media queue, scalar disabled/error, and workflow states while avoiding server-only interaction snapshots. Gates passed: focused registry/import tests, `bun run typecheck`, and `CONCRETE_CATALOG_AUDIT_ORIGIN=http://localhost:3000 bun run catalog:audit`.
- 2026-04-30: Completed component examples data/chart/table/diagram cluster. Polished metric, meter, chart-family, data-table, diagram-canvas, and flow-diagram examples; added specialized chart loading/empty/error states, distinct meter density/variant states, table pagination coverage, and neutral graph fixtures for default versus selected states. Gates passed: focused registry/import tests, `bun run typecheck`, and `CONCRETE_CATALOG_AUDIT_ORIGIN=http://localhost:3000 bun run catalog:audit`.
- 2026-04-30: Completed component examples message/agent/composer cluster. Polished message, reasoning-message, tool-call-message, and composer examples; added grouped/status transcript states, explicit pending/error reasoning steps, queued/open-error tool calls, and custom disabled composer suggestions. Gates passed: focused registry/import tests, `bun run typecheck`, and `bun run catalog:audit`.
- 2026-04-30: Completed final catalog visual QA and docs copy pass. Verified docs home/foundation surfaces derive public counts and foundation cards from registry data, confirmed current breadth is 7 foundations / 82 primitives / 33 components, and passed final gates: focused registry/import tests, `bun run typecheck`, `bun run catalog:audit` across 414 render routes, and `bun run visual:smoke`.
- 2026-04-30: Completed example preview de-framing cleanup. Removed generic preview chrome from primitive/component examples, stripped pass-through stage helpers, moved docs preview shells to layout-only treatment, added a boundary test against `Frame`/`Card`/`PreviewStage` wrappers in examples, and fixed exposed intrinsic sizing/placement gaps in `CalendarPanel`, `TimeList`, `RangeControl`, and `FormOverlayRoot`. Gates passed: focused registry/import tests, `bun run lint`, `bun run typecheck`, `CONCRETE_CATALOG_AUDIT_ORIGIN=http://127.0.0.1:3000 bun run catalog:audit` across 414 render routes, and `CONCRETE_VISUAL_SMOKE_ORIGIN=http://127.0.0.1:3000 bun run visual:smoke`.
