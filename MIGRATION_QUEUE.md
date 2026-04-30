# Concrete Migration Queue

This is the autonomous work queue for the Concrete standardization run. It is the live todo system. Read `CODE.md`, `ITEM_SCOPE.md`, this queue, then `REFACTOR_RUNBOOK.md` before every chunk.

The queue is allowed to change aggressively as chunks reveal better boundaries. The invariant is that every completed chunk leaves the next chunk ready to start.

## Operating Loop

1. Start by reading `CODE.md`, `ITEM_SCOPE.md`, `MIGRATION_QUEUE.md`, and `REFACTOR_RUNBOOK.md`.
2. Run `git status -sb`.
3. Pull the first unblocked item from `## Backlog` into `## Active Chunk`.
4. Write a focused todo list for that chunk before editing.
5. Execute the chunk vertically: audit, decide boundaries, add missing foundation tokens, migrate or create primitives, clean component usage, update tests, and run gates.
6. Update `ITEM_SCOPE.md` with each item touched.
7. Update this file before stopping: mark the chunk done or blocked, append discoveries, and create the next chunk's todo list.
8. Update `REFACTOR_RUNBOOK.md` with gate results and a one-line chunk log.
9. Repeat without waiting for a new high-level plan unless the boundary rules become contradictory.

## Completion Contract

A chunk is not complete until it leaves this queue in a runnable state:

- `## Active Chunk` either contains the next concrete chunk or says there is no active chunk.
- Completed items are moved to `## Completed`.
- New tasks discovered during implementation are added to `## Backlog` or `## Blocked`, not left in prose.
- `ITEM_SCOPE.md` records every item whose role, status, boundary, or debt changed.
- `REFACTOR_RUNBOOK.md` records what passed, what failed, and what should run next.
- Narrow gates pass, or the failure is recorded with an explicit repair chunk.

## Active Chunk

Status: `complete`

Chunk: no active chunk.

Goal: all queued docs/examples accuracy chunks are complete. Start a new chunk only after new product or QA findings are added to `## Backlog`.

Todo:

- [x] Read `CODE.md`, `ITEM_SCOPE.md`, this queue, and `REFACTOR_RUNBOOK.md`.
- [x] Run `git status -sb` and preserve unrelated dirty work.
- [x] Audit primitive/component examples for `Frame`, `Card`, `PreviewStage`, custom pass-through stage helpers, inline styles, raw wrapper classes, and raw wrapper DOM.
- [x] Move generic preview framing out of examples and keep docs preview shells layout-only.
- [x] Fix intrinsic primitive sizing exposed by wrapper removal instead of adding new example wrappers.
- [x] Add a boundary guard against generic preview chrome wrappers in examples.
- [x] Run focused registry/import tests, `bun run lint`, `bun run typecheck`, `bun run catalog:audit`, and `bun run visual:smoke`.
- [x] Update this queue and `REFACTOR_RUNBOOK.md` with final gate results.

## Backlog

Status keys: `ready`, `blocked`, `depends`.

- None.

## Blocked

- None.

## Completed

- `complete` Setup ownership law, item scope ledger, autonomous queue, and drift tests.
- `complete` Style bundle substrate: public bundles now include root, item CSS, and temporary centralized layers in deterministic cascade order.
- `complete` Primitive seed cluster: `divider` and `kbd` now own token-only local CSS.
- `complete` Label/status primitive cluster: `badge`, `pill`, `tag`, `chip`, and `indicator` now own token-only local CSS and indicator no longer emits progress tone classes.
- `complete` Icon/control primitive cluster: `icon`, `caret`, and `spinner` now own token-only local CSS and `IconPrimitive` now applies its owning class.
- `complete` Surface primitive cluster: `card`, `frame`, `bubble`, `empty-state`, and `texture` now own token-only local CSS.
- `complete` Form field primitive cluster: `field`, `input`, `select`, `textarea`, `checkbox`, `radio`, `switch`, and `slider` now own token-only local CSS.
- `complete` First component cleanup: `password-input` no longer owns active component CSS; form-control action selectors now belong to `input`.
- `complete` Upload/media cluster: `avatar`, `dropzone`, and `upload-item` now own token-only local CSS; file/image upload moved off centralized selectors with explicit local wrapper debt.
- `complete` Menu/search cluster: command menu, search bar, multi-select, date picker, date-range picker, and time picker moved off centralized selectors into token-only local component debt.
- `complete` Message/agent cluster: `code` now owns token-only local CSS; message, reasoning-message, tool-call-message, and composer suggestion menu moved off centralized selectors into local component debt.
- `complete` Data atom cluster: `stat`, `delta`, `progress`, `distribution`, and `sparkline` now own token-only local CSS; metric-card and meter moved off centralized selectors into explicit local component debt.
- `complete` Chart cluster: shared chart renderer selectors moved from the central component layer into chart-family local component debt; donut and heatmap own their specialized token-only local CSS.
- `complete` Table/data surface cluster: DataTable selectors moved off the central component layer into explicit token-only local component debt; shared data-tone classes moved into the colors foundation utility layer.
- `complete` Diagram/educational cluster: concept frame/connector and diagram node/item selectors moved to owned token-only primitive CSS; diagram-canvas and flow-diagram selectors moved into explicit token-only local component debt.
- `complete` Control/form leftovers cluster: number-stepper and range-slider selectors moved off the central component layer into explicit token-only local component debt.
- `complete` Form-control primitive extraction cluster: `InputControl` now owns input action-slot DOM for PasswordInput; `ChoiceRow` now owns the checkbox/radio row shell while staying checkbox-owned until a public row primitive exists.
- `complete` Form shell/settings/validation cluster: form shell, overlay/dialog/drawer, settings row vocabulary, and validation summary selectors moved off the central component layer into explicit local debt while form row and validation alert primitive boundaries stay queued.
- `complete` Upload field/media preview primitive extraction: new `upload-field` primitive owns file/image upload stack and width variants; file-upload and image-upload components now have no active component CSS.
- `complete` Menu/search picker-token slice: `picker-control`, `calendar-panel`, `time-list`, and `search-token` primitives now own shared picker/search token CSS and date utilities no longer render UI.
- `complete` Menu/search primitive promotion second pass: `picker-shell`, `menu-shell`, `option-row`, `search-field`, `select-control`, `select-menu`, and `row` now own the remaining command/search/select shell CSS; CommandMenu, SearchBar, MultiSelect, DatePicker, DateRangePicker, and TimePicker have no active component selectors.
- `complete` Message and agent primitive promotion: `message-shell`, `reasoning-panel`, `tool-call-panel`, and `suggestion-menu` own message, reasoning, tool-call, tool-output, status chip, and composer suggestion menu CSS; Message, ReasoningMessage, ToolCallMessage, and the local Composer stylesheet have no active selectors.
- `complete` Composer/editor/toolbar cleanup: `composer-shell`, `composer-rail`, and `toolbar-control` own composer root/editor/footer/rail/token and toolbar control CSS; Composer and Toolbar are component assembly over primitives.
- `complete` Metric shell primitive extraction: `metric-shell` owns metric/meter card shell, header/value, caption, sparkline slot, footer, and ring-card alignment CSS; MetricCard and Meter are component assembly over metric/data primitives.
- `complete` Chart surface primitive promotion: `chart-surface`, `data-card-header`, and `chart-legend` own chart shell, output surface, state message, SVG plot marks, donut, heatmap, shared data-card header, and legend CSS; chart-family components have no active component selectors and FlowDiagram no longer borrows chart-local header/legend classes.
- `complete` Data table primitive promotion: `data-table-shell`, `data-table-control`, and `data-table-pagination` own DataTable card, scroll/table/cell/sort/selection/empty, toolbar/search/filter/action, and pagination CSS; DataTable is component assembly over table primitives plus state/data utilities.
- `complete` Diagram viewport/edge/legend primitive promotion: `diagram-viewport`, `diagram-controls`, `diagram-rail`, `diagram-edge`, `diagram-minimap`, `diagram-legend`, and `flow-node` own diagram/flow shells, controls, rail, edge SVG, minimap, legend, and flow SVG node CSS; DiagramCanvas and FlowDiagram are component assembly over graph state and routing utilities.
- `complete` Scalar control primitive promotion: `stepper-control` and `range-control` own compact number-stepper and two-thumb range DOM/CSS; NumberStepper and RangeSlider are component assembly over Field, scalar primitives, and form-field math helpers.
- `complete` Foundation extraction: `src/styles.css` owns font loading, reset, and base element substrate only; all Concrete custom property declarations now live in the seven foundation stylesheets while public stylesheet cascade order stays unchanged.
- `complete` Raw value enforcement: import-boundary tests now scan token-consuming stylesheets for raw visual values outside foundations; root/base and central primitive-layer literals were replaced with foundation tokens or documented CSS-language exceptions.
- `complete` Component CSS deletion sweep: component `styles.css` files are now optional, comment-only component stylesheets were deleted, and the component style manifest includes only `form-shell` plus `validation-summary` active local debt.
- `complete` Button primitive migration: `.concrete-button*` selectors moved from `styles/primitives.css` into `primitives/button/styles.css`; the button primitive now owns variants, sizes, icon sizing, pressed/loading states, and shortcut keycap bridge styling.
- `complete` Remaining central primitive layer migration: `link`, `tooltip`, `skeleton`, `brand-mark`, `wordmark`, and `focus-ring` now own local token-only CSS; `.concrete-root`, `.concrete-visually-hidden`, and `.concrete-focus-target` moved into foundation utilities; central primitive/component layers are selector-free and test-guarded.
- `complete` Foundation semantic token tightening: scalar control foundation tokens were renamed from component-era `number-stepper`/`range-slider` vocabulary to promoted primitive `stepper-control`/`range-control` vocabulary, and import-boundary tests now guard those retired token names.
- `complete` Visual QA pass: added `bun run visual:smoke` for browser-rendered coverage of migrated primitive clusters plus data table and chart compositions; fixed the chart component default example so zero-query render routes are nonblank.
- `complete` Final component CSS debt elimination: `form-layout`, `form-overlay`, and `feedback-panel` now own the final form/validation selector debt; `componentStyleSources` is empty, form/validation components assemble primitives, and tests guard components against owning Concrete class names.
- `complete` Inline example stage cleanup: added `preview-stage`, moved repeated example width/grid wrappers and texture preview sizing into token-owned primitive/foundation vocabulary, replaced spinner inverse preview styling with existing primitives, and added boundary guards against inline visual styles in examples/render inputs.
- `complete` Chart renderer boundary audit: chart render utilities keep scaling/geometry/routing, but chart selector vocabulary now flows through exported `chart-surface` primitive subparts and import-boundary tests guard that split.
- `complete` Schema controls depth: generated controls now cover nested object paths, path-scoped array JSON, and top-level string-const discriminated unions while preserving root `Props JSON` fallback and strict schema parsing.
- `complete` Recursive Concrete node schema scoping: added a strict serializable node schema plus registry-aware validation helpers. Nodes can describe text, item references, JSON props, children, and named slots; registry validation catches unknown primitive/component references and parses props through the referenced item schema without rendering.
- `complete` Final hardening pass: import-boundary tests now guard package export keys, source barrels, build entrypoints, style subpath exports, token-only local custom-property aliases, and the documented media-query threshold allowlist; `visual:smoke` now exercises the screenshot route directly.
- `complete` Server-rendered catalog callback hardening: preview-only callbacks were removed from catalog example/render-input paths, interactive primitive callbacks are optional, and visual smoke can reuse an already running docs server.
- `complete` Example/docs accuracy substrate: foundations now have registry entries, detail pages, render/screenshot route support, home/foundation docs coverage, and `bun run catalog:audit` coverage across the full public render catalog.
- `complete` Foundation docs/examples accuracy: seven public foundation examples now have real registry states, the foundation overview header matches public foundation bundles, home typography/radius/icon data derives from exported token data where practical, and `catalog:audit` passed all 353 render routes.
- `complete` Primitive examples control/product cluster: base control examples now use product copy and primitive-owned/intrinsic width discipline, button/field/slider gained missing states, search-field renders a real inline command menu, menu-shell generated input no longer combines rows with empty state, and time-list examples no longer require function props. Gates passed: focused registry/import tests, `bun run typecheck`, and `catalog:audit` across 356 render routes.
- `complete` Primitive examples data/chart/table cluster: data, metric, chart, and table primitives now show realistic generated-output states, richer defaults, full signal/density coverage, and derived pagination disabled states. Gates passed: focused registry/import tests, `bun run typecheck`, and `catalog:audit` across 367 render routes.
- `complete` Primitive examples diagram/message/agent cluster: diagram, educational, transcript, reasoning, tool-call, composer, suggestion, and code primitives now show distinct agent workflow states, viewport-safe edge/menu render inputs, and richer selected/muted/error/disabled coverage. Gates passed: focused registry/import tests, `bun run typecheck`, and `catalog:audit` across 386 render routes.
- `complete` Component examples forms/navigation/control/media cluster: form, overlay, settings, validation, upload, password, menu/search/picker, toolbar, stepper, and range examples now expose realistic workflow states, media queue coverage, disabled/error scalar states, and no misleading server-only visibility state. Gates passed: focused registry/import tests, `bun run typecheck`, and `catalog:audit` across 391 render routes.
- `complete` Component examples data/chart/table/diagram cluster: metric, meter, chart-family, data-table, diagram-canvas, and flow-diagram examples now expose distinct density/data-state/pagination/selection coverage, chart-family loading/empty/error states, and unselected versus selected graph fixtures. Gates passed: focused registry/import tests, `bun run typecheck`, and `catalog:audit` across 408 render routes.
- `complete` Component examples message/agent/composer cluster: message, reasoning-message, tool-call-message, and composer examples now expose grouped/status transcript states, pending/error reasoning, queued/running/success/error tool calls, and custom composer suggestion coverage. Gates passed: focused registry/import tests, `bun run typecheck`, and `catalog:audit` across 414 render routes.
- `complete` Final catalog visual QA and docs copy pass: docs home and foundations surfaces are registry/count-driven for the public 7 foundations, 82 primitives, and 33 components; full catalog audit passed 414 render routes and browser visual smoke passed.
- `complete` Example preview de-framing cleanup: primitive/component examples no longer wrap showcase content in `Frame`, `Card`, `PreviewStage`, custom stage helpers, inline styles, raw wrapper classes, or docs-like preview chrome; docs preview shells are layout-only, `CalendarPanel`/`TimeList` gained inline placement modes for standalone render routes, and `RangeControl`/`FormOverlayRoot` gained intrinsic foundation-backed minimum sizing. Gates passed: focused registry/import tests, `bun run lint`, `bun run typecheck`, `CONCRETE_CATALOG_AUDIT_ORIGIN=http://127.0.0.1:3000 bun run catalog:audit` across 414 render routes, and `CONCRETE_VISUAL_SMOKE_ORIGIN=http://127.0.0.1:3000 bun run visual:smoke`.

## Discoveries

- `CONCRETE_CATALOG_AUDIT_ORIGIN` should only be used when the caller has verified the docs server is alive. If localhost is stale, run `bun run catalog:audit` without the origin so the script starts and owns a fresh docs server.
- Generic example wrappers hide real primitive sizing problems. Examples should not use `Frame`, `Card`, `PreviewStage`, or pass-through stage helpers as preview chrome; docs renderers own generic spacing/centering, and primitives must carry standalone inline placement or intrinsic measure tokens when they need to render outside owner contexts.
- The docs dev server consumes built package CSS. After changing package styles, run `bun run build:package` and restart the docs server before trusting browser visual checks against an existing `CONCRETE_*_ORIGIN`.
- Floating popover primitives need an inline placement mode when they are public standalone items. `CalendarPanel` and `TimeList` now match the existing `SelectMenu`/`SuggestionMenu` pattern: product components use floating placement, examples/render inputs use inline placement.
- Wrapper removal can expose shrink-wrap bugs in primitive roots. `RangeControl` and `FormOverlayRoot` now own foundation-backed minimum inline sizing instead of depending on preview-stage width.
- Transcript component examples should not duplicate default/role states without adding anatomy. Grouping and status metadata are the important extra coverage for `Message`.
- Reasoning examples need explicit step fixtures for complete/error states. Reusing default streaming steps under a complete panel makes the top-level state contradict the step list.
- Tool-call error examples should render open when claiming to showcase output; otherwise the failure body is hidden in the docs preview.
- Composer menu examples should include custom options with a disabled row so suggestion filtering proves consumer-supplied menu data, not just bundled defaults.
- Chart-family component examples should expose their own shared `loading`/`empty`/`error` state contract. The generic `Chart` wrapper covering those states is not enough because specialized component routes need to prove their direct schemas and renderInput paths.
- Fixture-level selected flags can collapse default and selected graph examples. Keep reusable graph fixtures neutral and set selected node/edge/item state only in selected examples or explicit props.
- Meter examples should not duplicate a default state under a named bar/ring state. Each metric state should defend a distinct variant, density, or signal role.
- Component example states should describe externally controllable serialized state, not internal client interaction snapshots. PasswordInput dropped the static `visible` state because reveal is client-owned and not deterministic in server-rendered examples.
- Media components had queue fixtures that were not exposed as states. If schema carries a named queue/state, the examples should usually expose it unless it is purely redundant.
- Overlay-like primitives need inline render-input wrappers even when product components use floating placement. SuggestionMenu and DiagramEdge now both keep standalone docs routes structurally visible.
- Canvas examples must use viewport-owned placement primitives when showing positioned children. Rendering raw diagram nodes inside a stage does not prove the stage/element contract.
- Agent primitive states should include failure/queued/streaming cases, not only the happy path, because those states are where compact transcript chrome earns its role.
- Data/table examples benefit from generated disabled-state derivation in render inputs, not separate boolean schema knobs. `DataTablePager` now derives previous/next disabled state from page boundaries for catalog playgrounds.
- Metric primitives should not duplicate a default state under a named state. When a state exists, it should defend a distinct density, tone, kind, or generated-output role.
- Table-shell examples need more than one row to prove selection, alignment, sorting, and frozen anatomy; single-row defaults hide layout regressions.
- Control/product examples exposed a policy gap that is broader than event handlers: server-rendered examples should not require function props for formatting. TimeList examples now use preformatted values and the same audit should be applied to later data/chart examples.
- Generated playground inputs can drift even when examples pass. MenuShell's generated input was rendering both populated rows and empty state at once; schema controls sometimes need an explicit serializable state flag rather than overloading copy props.
- Examples should showcase the item directly. If a preview needs generic spacing, centering, or width discipline, put that in docs renderers; if the item itself collapses without a wrapper, add a primitive-owned placement mode or foundation-backed intrinsic measure.
- Foundation examples are allowed to use foundation token values and inline specimen layout, but they must still be registry-led and render all states through the same catalog audit path.
- Home/docs static foundation displays drifted from package data: radius rows included a retired `2px` step and typography/icon summaries were hand-authored. The next docs polish should continue pulling from exported token arrays or registry entries before adding copy.
- Example/docs accuracy is now the next structural phase after CSS ownership cleanup. The target is not cosmetic polish first; it is registry-led docs coverage plus serializable, server-rendered examples for every public item.
- Current package breadth is seven public foundations plus the migrated primitive/component catalog. The docs app must prove that full breadth from registry/foundation definitions rather than maintaining hand-authored foundation inventories.
- Existing examples have already exposed one runtime class of failure: preview-only callbacks in catalog examples break Next server rendering. The next pass must treat serializability as a hard example invariant.
- The docs home and foundations surfaces are drift-prone if they keep bespoke item counts, foundation lists, or token descriptions. Prefer generated counts and shared foundation definition data before polishing copy.
- Full-catalog audit initially found public items without default states. Defaults were added for message-shell, metric-shell, option-row, upload-field, diagram viewport/control/edge primitives, picker primitives, sparkline, validation-summary, image-upload, meter, chart, message, reasoning-message, and tool-call-message.
- Full-catalog audit also exposed overlay primitives whose default examples collapsed outside their owner context. SelectMenu and SuggestionMenu now expose inline/floating placement, and DiagramEdge examples render inside a viewport shell.
- Central primitive and component layer files are retained only as public bundle substrate; import-boundary tests now reject active `.concrete-*` selectors in those central layer files.
- Item `styles.css` files already exist for every public item, so the migration can proceed without changing item manifests.
- The first implementation risk is style bundle cascade, not selector movement.
- The autonomous queue is now part of the import-boundary contract test, so it cannot silently disappear.
- Button-specific keycap sizing remains in centralized button CSS and should move with the button migration.
- Seed cluster introduced foundation tokens for hairline border width, micro typography, section tracking, compact spacing, fill sizing, and border shadow.
- Label/status cluster introduced foundation tokens for compact label sizing, control press motion, label shadows, inverse overlays, stroke widths, label icon/dot opacity, and tone-specific control hover colors.
- Shared `label-helpers.tsx` still emits `.concrete-label-*` class names for pill, chip, and tag, but styling is item-scoped through combined selectors in each primitive stylesheet.
- Icon/control cluster introduced foundation tokens for icon/caret/spinner dimensions, spin durations, linear easing, rotation angles, spinner opacity, spinner border width, and exact icon stroke width.
- Button still owns centralized descendant SVG sizing and keycap selectors; do not move those piecemeal outside the button migration.
- Button loading currently emits `.concrete-spinner` directly. The button migration should decide whether to compose `Spinner` or keep the CSS inline spinner class as an explicit spinner sub-primitive.
- Surface cluster introduced foundation tokens for compact surface spacing, empty-state measure/scale, display title size, compact prose line-height, surface meta tracking, exact mark icon strokes, texture dot fade size, and half-angle texture gradients.
- `.concrete-mark` is currently empty-state-owned legacy vocabulary. Promote a dedicated mark/tile primitive only if another primitive or component needs the same glyph tile without empty-state copy.
- Texture rendered selectors are item-owned, but root texture color variables remain centralized foundation debt until the foundation extraction chunk.
- Form cluster introduced foundation tokens for control height, disabled opacity, input inset/error rings, select caret geometry, choice controls, switch track/thumb geometry, slider track/thumb geometry, scalar percentages, and control scale feedback.
- `input`, `select`, and `textarea` still share legacy `field`/`label`/`help`/`input` selectors. Promote an internal form-control primitive if first component cleanup needs to reuse that base outside these text controls.
- `checkbox` and `radio` still share `check-row`; promote a choice-row primitive if settings rows or menu rows need the same shell.
- First component cleanup moved password form-control/action-button selectors into the `input` primitive. `PasswordInput` still renders raw input/action button DOM and should collapse further once input exposes an action-slot primitive API.
- `number-stepper` and `range-slider` initially remained centralized component CSS because they needed distinct stepper/range layout primitives; later `stepper-control` and `range-control` resolved that debt.
- Upload/media cluster introduced foundation tokens for avatar sizes, dropzone target/action geometry, upload row/thumb/progress/remove geometry, upload list grid templates, media upload measures, strong disabled opacity, and stronger pressed translation.
- `Dropzone` now owns the file-choice action label affordance through `.concrete-dropzone-action`; `primitives/internal/file-upload` no longer uses `.concrete-file-upload-action`.
- File inputs now use the shared `.concrete-visually-hidden` utility; the old `.concrete-file-input` selector has no active CSS and should be removed from class-name vocabulary only in an explicit compatibility cleanup.
- `UploadItem` owns `.concrete-upload-list` and its grid layout through `data-layout="grid"` so image upload no longer cross-selects upload-list layout from component CSS.
- `upload-field` owns file/image upload stack and width variants. `file-upload` and `image-upload` no longer carry active component CSS.
- Menu/search cluster introduced foundation tokens for command/search geometry, responsive search behavior, search-token layout, picker/menu sizing, calendar grids, time lists, shared popover z-indexes, and intermediate font weights.
- Command menu, search bar, multi-select, date picker, date-range picker, and time picker no longer rely on centralized active selectors.
- Date picker temporarily owns shared `.concrete-picker-control` and `.concrete-calendar-panel` selectors used by date-range and time picker. Promote picker-control, picker-popover, calendar-grid, and time-list primitives before deleting local component CSS.
- The composer suggestion menu moved with message/agent instead of command/search because it is composer-owned workflow chrome, not public command-menu vocabulary.
- Message/agent cluster introduced foundation tokens for code block chrome, syntax colors, message stack measures, reasoning/tool-call disclosure geometry, tool output shadows, composer suggestion menu geometry, and responsive transcript offsets.
- `code` is now an owned primitive. `tool-call-message` uses code-owned CSS variables for tool code block surface overrides.
- Message, reasoning, tool-call, and composer suggestion menu selectors are no longer centralized, but they remain local component debt until message, reasoning-step, tool-call, tool-output, and menu primitives exist.
- Main composer root/editor/rail/footer/tool-button selectors remain centralized and should move in a dedicated composer/editor/toolbar cleanup chunk.
- Data atom cluster introduced foundation tokens for stat display typography, delta icon sizes, progress track/ring animation geometry, distribution row templates, sparkline strokes/opacities, and metric/meter card layout.
- `stat`, `delta`, `progress`, `distribution`, and `sparkline` no longer rely on centralized active selectors.
- Metric shell primitive extraction added `metric-shell`; `metric-card` and `meter` no longer carry component-local CSS for scalar card composition.
- Chart cluster introduced foundation tokens for chart height, SVG label typography, mark strokes/opacities, chart bar filter, target dash arrays, donut geometry, and heatmap cell geometry.
- Chart surface primitive promotion added `chart-surface`, `data-card-header`, and `chart-legend`; chart-family active CSS now belongs to those primitives and chart components are assembled over schema parsing plus shared geometry utilities.
- Chart SVG mark components were not split into dozens of tiny primitives. The `chart-surface` primitive owns the SVG plot class vocabulary while rendering utilities own geometry, ticks, scaling, and path/rect/circle emission.
- Donut stroke widths now flow through foundation tokens and `DonutPlot`; Heatmap grid columns now flow through `HeatmapGrid` and foundation template tokens instead of renderer-owned pixel strings.
- Legacy `.concrete-horizontal-bars`, `.concrete-horizontal-bar-row`, `.concrete-stacked-bars`, and `.concrete-stacked-bar-group` selectors were not emitted by current chart renderers and were removed from active CSS while class-name compatibility remains.
- Table/data surface cluster introduced foundation tokens for table controls, sticky table z-indexes, dense table measures, pagination controls, and disabled table action opacity.
- Data-tone classes are now color foundation utilities because both chart renderers and data-table toolbar actions consume them.
- Data table primitive promotion added `data-table-shell`, `data-table-control`, and `data-table-pagination`; DataTable no longer carries active component selectors and table body routing remains with data utilities.
- Diagram/educational cluster introduced foundation tokens for concept frame scales, diagram node/item geometry, diagram role borders, flow SVG strokes, canvas viewport sizes, rail/minimap/legend geometry, edge dash arrays, and canvas texture backgrounds.
- Concept frame, concept connector, diagram node, and diagram item no longer depend on centralized active selectors.
- Diagram-tone classes are now color foundation utilities because diagram primitives and canvas edge rendering share the same tone vocabulary.
- DiagramCanvas and FlowDiagram no longer depend on centralized active selectors. They remain component-local debt until viewport, canvas controls, rail, edge, legend, minimap, and SVG node primitives exist.
- FlowDiagram now composes `DataCardHeader` and `ChartLegend`, so its remaining local debt is diagram viewport/control/SVG node/edge vocabulary.
- Diagram viewport/edge/legend promotion added `diagram-viewport`, `diagram-controls`, `diagram-rail`, `diagram-edge`, `diagram-minimap`, `diagram-legend`, and `flow-node`; the temporary `utilities/diagram-canvas-rendering.tsx` JSX file was deleted, and DiagramCanvas/FlowDiagram no longer render styled raw DOM.
- Scalar control primitive promotion added `stepper-control` and `range-control`; NumberStepper and RangeSlider no longer import `concreteClassNames`, render styled raw controls, or carry active component selectors.
- Control/form leftovers introduced foundation tokens for compact number stepper geometry, focus inset shadow, two-thumb range track geometry, thumb rings, range defaults, and scalar control scales.
- NumberStepper and RangeSlider no longer depend on centralized active selectors. They remain component-local debt because NumberStepper needs a real stepper/control-group primitive and RangeSlider needs a two-thumb range primitive.
- The central `/* Form controls */` component section is now empty. Remaining centralized form debt is form overlay/shell/settings/validation chrome, not scalar controls.
- Text-control chrome remains input-owned for now; no separate form-control primitive was created because `InputControl` covers the immediate reusable action-slot boundary without adding a weak public item.
- PasswordInput now composes `Field` and input-owned `InputControl`, so it no longer imports `concreteClassNames` or renders styled input/button wrapper DOM directly.
- Choice-row shell remains checkbox-owned through an exported `ChoiceRow` helper; Radio now composes that helper instead of applying the shared row class itself. Promote a public row/choice-row primitive only if settings/menu rows need the same label shell.
- Form shell/settings/validation cluster introduced foundation tokens for form row geometry, form-family overlay measures, title/subheading weights, validation summary/list geometry, validation status borders, and overlay z-index.
- Form shell, section, grid, row, overlay/dialog/drawer, and validation summary selectors no longer depend on the central component layer.
- `components/form-shell/styles.css` temporarily owns private form-family selectors for form-shell, form-dialog, form-drawer, and settings-panel because internal primitives cannot yet own item styles under the current manifest.
- `.concrete-form-row` remains private form-shell vocabulary; do not merge it into `primitives/row` until the row primitive has an explicit labeled settings/form-row contract.
- `ValidationSummary` remains local component debt until feedback-alert, validation-list, and status-icon primitives exist.
- Local media-query thresholds still require raw literals because CSS custom properties cannot parameterize `@media`; raw-value enforcement should introduce a documented breakpoint policy instead of ad hoc exceptions.
- Upload field/media primitive extraction added `upload-field` as the narrow upload stack primitive; it owns `.concrete-file-upload` plus image upload width variants while `dropzone` keeps the target and `upload-item` keeps rows/list layout.
- A separate media-preview primitive was not created because existing `upload-item` thumbnail preview covers the current image upload cases; create one only when cropping, avatar editing, or standalone preview controls appear.
- `ImageUpload` no longer renders a bespoke wrapper. Image variant class compatibility is emitted by `UploadField` through the existing `.concrete-image-upload` class.
- Menu/search first slice added `picker-control`, `calendar-panel`, `time-list`, and `search-token` primitives.
- `utilities/calendar-view` is now pure date math/formatting. Calendar UI moved to the `calendar-panel` primitive.
- DatePicker, DateRangePicker, and TimePicker have no active local selectors after composing `PickerShell`, `PickerControl`, `CalendarPanel`, and `TimeList`.
- SearchBar now composes `SearchField` and `SearchTokenPrimitive`; it has no active local selectors.
- CommandMenu and MultiSelect now compose menu/select primitives and have no active local selectors.
- Menu/search second pass completed the remaining picker root, command menu shell, option row, search field, select control, and select menu boundaries. The reusable option-row primitive covers both command rows and select listbox options; separate command/select primitives were not needed because the row anatomy is the same and density differences are variant data.
- `row` was localized in the same pass because command/select work revalidated its compact scan-line boundary and the central row selectors were already token expressible.
- CommandMenu, SearchBar, MultiSelect, DatePicker, DateRangePicker, TimePicker, FileUpload, ImageUpload, PasswordInput, and SettingsPanel are now useful examples of component-assembled targets.
- MessageShell was promoted as a public primitive instead of adding an internal stylesheet manifest because transcript anatomy is reusable product/generative vocabulary and the public component can stay a workflow wrapper.
- Reasoning disclosure and reasoning step stayed in one `reasoning-panel` primitive because they share disclosure animation, status marks, and trace-list grammar.
- Tool status chip stayed inside `tool-call-panel` instead of `badge`/`indicator` because it is tightly coupled to tool-call disclosure and uses tool-specific status labels/icons.
- Composer suggestion menu moved into `suggestion-menu`; the later composer/editor/toolbar pass moved the remaining root/editor/rail/footer/toolbar selectors into primitives.
- Composer/editor/toolbar cleanup introduced `composer-shell`, `composer-rail`, and `toolbar-control`; it also removed the now-obsolete private internal toolbar implementation.
- Composer inline token class generation still happens inside serialization/DOM utilities because contenteditable insertion is string/DOM based. The styling boundary is primitive-owned by `composer-rail`; revisit only if a future rich-text token primitive owns insertion helpers too.
- Composer and Toolbar now have no active component selectors. The Toolbar component remains a compatibility wrapper over `toolbar-control` to preserve public API names.
- MetricShell was promoted as one primitive instead of separate card-section/header primitives because MetricCard and Meter share a scalar card grammar: card grid, header/value row, optional sparkline/progress/ring content, and muted caption/footer copy.
- ProgressRing now accepts token strings for size and stroke width, which lets metric ring sizing use foundation variables instead of raw component numbers while preserving numeric public API compatibility.
- DataCardHeader and ChartLegend were promoted during the chart-surface chunk instead of staying as a separate queued extraction because FlowDiagram already shared those classes and the boundary was clear.
- Foundation extraction moved root custom property declarations into foundation-owned root blocks: colors, elevation, motion, radii, spacing, textures, and typography. `src/styles.css` now has zero Concrete custom property declarations.
- Font imports and `@font-face` stay in `src/styles.css` because CSS `@import` ordering requires imports before foundation root blocks in the built public stylesheet.
- Spacing owns responsive root overrides for layout aliases; raw media-query thresholds remain a documented exception candidate for raw-value enforcement because custom properties cannot parameterize media conditions.
- Historical component-prefixed semantic aliases stayed in the closest foundation by value type during extraction. The foundation semantic token tightening backlog should generalize or relocate those names after raw-value scanning gives a complete failure map.
- Raw value enforcement added scanner coverage for root, central primitive/component layers, and all primitive/component item styles. The scanner intentionally ignores `@import`, `@font-face`, `0`, strings, `var()`, and `url()` because those are CSS-language substrate rather than visual policy.
- Central primitive-layer button, link, tooltip, skeleton, brand-mark, wordmark, and focus-ring selectors have moved into item styles, but many exact bridge tokens remain in foundations and need the semantic token tightening pass.
- Component CSS deletion left exactly two active component stylesheets: `form-shell` for private form-family overlay/row vocabulary and `validation-summary` for the pending feedback-alert/list/status-icon primitive boundary.
- Component folders may now omit `styles.css`; primitive and foundation item manifests still require their owned stylesheets.
- Button migration kept loading as direct composition of the spinner primitive's inline `.concrete-spinner` class, rather than switching to the SVG `Spinner`, to avoid a DOM and visual change inside the structural CSS move.
- `.concrete-focus-target` belongs to the elevation foundation because it applies shared focus-ring language across primitives; `focus-ring` owns only its preview selector.
- `.concrete-root` belongs to the typography foundation and `.concrete-visually-hidden` belongs to spacing because they are lower-level utilities used by primitives without item-specific semantics.
- Foundation token tightening audited historical item-family names and took the highest-confidence first pass: scalar control tokens now use `stepper-control` and `range-control`, while compatibility selectors remain `.concrete-number-stepper` and `.concrete-range-slider`.
- `import-boundaries.test.ts` now rejects retired scalar component token names in foundation stylesheets: `--concrete-*number-stepper*` and `--concrete-*range-slider*`.
- `visual:smoke` starts the docs app on an open localhost port, checks route-scoped rendered selectors, captures screenshots in memory, fails on browser errors, and covers button/link/tooltip/skeleton/brand-mark/wordmark/focus-ring/stepper-control/range-control plus data table and chart compositions.
- The chart component had no `default` example key, so `/render/component/chart` was effectively blank except for docs metadata. The visual QA pass added a default example that aliases the line chart.
- `componentStyleSources` is now empty. Future component-owned CSS must be treated as a regression unless `ITEM_SCOPE.md` records a temporary migration exception.
- Components no longer own Concrete class-name helpers in `component.tsx`; import-boundary tests now reject `concreteClassNames`, `getConcreteClassName`, and literal `concrete-*` class assignments in component implementations.
- The visual smoke matrix now includes form-layout, form-overlay, feedback-panel, and validation-summary routes so the final selector migration has rendered coverage.
- Inline style inventory shows remaining raw visual debt concentrated in `examples.tsx` stage wrappers and a few primitive examples, not active component implementations.
- Inline example cleanup result: `preview-stage` owns neutral example constraints, component and primitive examples/render inputs no longer use inline visual styles, and primitive component inline style remains allowlisted for dynamic CSS-variable/SVG geometry adapters only.
- Chart renderer boundary result: chart utilities still own algorithmic scales, ticks, data routing, and SVG coordinates; they no longer import Concrete class-name helpers or apply chart selector vocabulary directly.
- Schema controls result: nested controls use dotted query paths, arrays stay JSON at their exact property path, and discriminated union controls select the active branch seed before applying query overrides.
- Recursive node schema result: `concreteNodeSchema` and `concreteNodeTreeSchema` are public schema exports for serializable generated UI descriptions. Registry helpers `validateConcreteNode` and `validateConcreteNodeTree` validate item references and parse props through existing item schemas, but intentionally do not render, call React, or accept pressure/layout metadata.
- Final hardening result: package export compatibility is tested against source barrels and tsdown entrypoints; token-consuming CSS custom property aliases must point at Concrete tokens; media query thresholds are constrained to `(width <= 640px)` and `(width <= 420px)` until a new breakpoint policy is added; browser smoke now validates the JPEG screenshot API route.
- Server-rendered docs examples must remain serializable. Interactive visual affordances such as removable search tokens, calendar days, time options, and diagram controls should expose serializable preview state separately from optional client-supplied callbacks.
