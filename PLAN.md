# Concrete Plan

This is the only actionable internal plan document for Concrete DX work.

`CODE.md` is the rulebook. `PLAN.md` is the todo list, target inventory, current audit, and migration memory. Do not add another Markdown runbook, queue, proposal, or scope ledger.

## Read Order

1. `CODE.md`
2. `PLAN.md`
3. Current source files for the active row

## Current Baseline

- Audit date: 2026-05-01.
- Current public package inventory: 12 foundations, 111 primitives, 33 components.
- Current private primitive inventory: 0 internal primitive folders.
- Folder-per-item architecture exists for every public foundation, primitive, and component.
- Public registry, docs, examples, playgrounds, render routes, and screenshot routes are item-definition driven.
- Active component CSS debt should remain zero. Any new component `styles.css` is a regression unless this file records a temporary exception.
- Central primitive/component CSS layers are compatibility bundle substrate only. Active selectors belong in foundation or primitive item styles.
- Phases 1-7 are structurally complete for foundations and primitives: foundation split, primitive ontology correction, destructive legacy primitive cleanup, prop discipline, component assembly hardening, foundation token nouns, primitive scope closure, primitive family consistency, runtime subpart export contracts, and final hardening gates have passed.
- Phase 8 component structural closure is complete. Component implementations pass the current structural contract, docs-shell scope is decided, demo/renderInput sibling composition is ledgered, and component item indexes are tightened around exact schema-to-JSX boundaries. Rich React slot serialization is documented as a deliberate future node-language pass.
- The current `main` rebase keeps the docs-shell additions `container`, `page-section`, `scale-frame`, `tilt-frame`, `nav`, and `footer`; `row`, `toolbar`, `form-shell`, and `feature-card` remain retired.

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
- `split`: current folder owns multiple target concepts.
- `merge`: current folder should collapse into a broader primitive/foundation.
- `demote`: current public item is docs-only, specimen-only, or migration-only; remove it from primitive registry/exports when the owning row is in scope.
- `compat`: public component stays as compatibility/API surface while delegating to better primitives/components.
- `audit`: source-level inspection is required before implementation.
- `done`: source, docs/examples, tests, and gates are complete for the row.

## Active Work

- [x] Phase 7 planning audit: replace stale migration-era rows with the current foundation/primitive perfection queue.
- [x] Phase 7A: foundation token noun policy and token rename/allowlist pass.
- [x] Phase 7B: primitive scope closure for the remaining ambiguous or multi-export primitives.
- [x] Phase 7C: label/control/media primitive consistency sweep.
- [x] Phase 7D: add enforcement tests for Phase 7 and run final gates.
- [x] Phase 7E: mark foundation and primitive architecture ready for aesthetic polish only after every row below is `done` or explicitly deferred.
- [x] Phase 8 audit: inspect the component layer against the current ontology and record the real remaining debt.
- [x] Phase 8 launch preflight: fast-forward to current `origin/main`, re-read `CODE.md` and this plan, and audit components for sibling imports, raw DOM, multi-runtime exports, heavy indexes, and test coverage.
- [x] Phase 8A: add and pass the component contract harness.
- [x] Phase 8B: delete, demote, or recast `form-shell` so generic form layout is primitive composition, not a component family.
- [x] Phase 8C: decide docs-shell components and add the demo/renderInput sibling composition contract.
- [x] Phase 8D: tighten heavy component `index.tsx` render adapters.
- [x] Phase 8E: document the rich child/slot serialization boundary and keep it deferred unless it becomes current scope.
- [x] Phase 8F: run full gates and mark components structurally closed.
- [x] Docs beauty restoration: add `PageSection`, richer generic texture grounds, stronger frame rhythm, render-route chrome isolation, and a Concrete-only landing/catalog/detail polish pass.

## Completion Bar Before Aesthetic Polish

- Every foundation token name is either a raw foundation scale, a semantic role, or an allowed cross-system domain noun.
- No foundation token uses a component noun such as `form-shell`, `data-table`, `metric-card`, `file-upload`, `image-upload`, `command-menu`, `search-bar`, `number-stepper`, `range-slider`, `diagram-canvas`, `flow-diagram`, or `composer`.
- Every primitive is reusable public Concrete vocabulary, not a component part disguised as a primitive.
- Every public primitive schema exposes semantic props, not raw visual overrides.
- Primitive subpart exports are either split into real primitives or documented and enforced as one item-owned scope.
- Every component assembles primitives and approved lower-tier components; it does not own CSS or styled raw DOM.
- Every component public runtime export is either the single component for that folder or a documented compatibility/subpart exception.
- Every component implementation dependency on another component is documented in an acyclic tier map and enforced by tests.
- Component `index.tsx` files stay item-bundle focused: public re-exports, `createComponent`, seed, and renderInput adapter only.
- Component examples and renderInput adapters may compose other public components only as serializable demo/render output, never as hidden implementation dependency.
- Public registry, package exports, docs routes, examples, controls, render routes, screenshot routes, catalog audit, visual smoke, and package build all resolve from item definitions.

## Phase 7A: Foundation Perfection

Foundations own the language that primitives consume. This phase is not visual polish; it is a token vocabulary and enforcement pass.

Allowed domain nouns for foundation token names:

- Base roles: `control`, `control-strip`, `surface`, `panel`, `section`, `overlay`, `overlay-tip`, `field`, `menu`, `query`, `picker`, `rail`, `dock`, `track`, `interval`, `step-control`, `viewport`, `feedback`, `status`, `intent`, `tone`, `density`, `hierarchy`, `focus`, `hit-target`, `media`, `editor`, `trace`, `data`.
- Data/display domains: `chart`, `table`, `diagram`, `message`, `tool`.

Component-shaped nouns must be renamed to a role/domain token or deleted when unused. If a noun needs to stay, add it to the allowlist in the same commit as a test and a one-line rationale in this file.

| Foundation | Status | Exact action | Done when |
| --- | --- | --- | --- |
| `foundations/colors` | `done` | `range` track background became `interval` track background; component-shaped token names are now test-banned. | Token names pass the Phase 7A noun test; docs examples still parse from validated token records. |
| `foundations/typography` | `done` | Existing type tokens describe roles and allowed domains such as `body`, `meta`, `label`, `heading`, `display`, `code`, `number`, `message`, or `diagram`. | No banned component-shaped type aliases remain. |
| `foundations/spacing` | `done` | Kept raw space scale plus semantic gap/inset/stack roles only. | The file remains scale/spacing-only and has no component-shaped aliases. |
| `foundations/sizing` | `done` | Renamed workflow/component-sized aliases into role/domain language: `media`, `menu`, `query`, `editor`, `control-strip`, `data`, `step-control`, `interval`, and `overlay-tip`; deleted the duplicate menu item token exposed by the rename. | The noun test fails on future component names; all renamed consumers build. |
| `foundations/layout` | `done` | Renamed component layout templates and responsive aliases into `media`, `editor`, `data`, `step-control`, `overlay-tip`, `query`, `menu`, and `control-strip` recipes. | No token names encode one component workflow unless explicitly allowlisted as a cross-system domain. |
| `foundations/radii` | `done` | Verified no Phase 7A component-shaped radius tokens exist. | Raw radii stay centralized and primitive CSS references foundation tokens. |
| `foundations/elevation` | `done` | Renamed `stepper`, `range`, and `tooltip` effects to `step-control`, `interval`, and `overlay-tip` effects. | Future component-named shadow/filter tokens fail tests outside the allowlist. |
| `foundations/motion` | `done` | Renamed `range`, `tooltip`, and `composer` motion aliases to `interval`, `overlay-tip`, and `editor` state aliases. | Motion tokens describe reusable state, not one component surface. |
| `foundations/textures` | `done` | Kept texture values and recipe examples here; public `texture` primitive stays retired. | Texture docs render from foundation examples, and no docs-only primitive returns. |
| `foundations/iconography` | `done` | Kept icon names, aliases, semantic icon roles, sizes, and stroke policy. | `Icon` schema and examples align with the foundation icon registry. |
| `foundations/state` | `done` | Kept shared statuses, intents, hierarchy, density, pressure metadata, command/form/upload/message/tool schemas, and data-attribute vocabulary; these are schema language, not foundation token names. | Primitive schemas import shared state language where appropriate. |
| `foundations/accessibility` | `done` | Kept visually hidden, focus target, hit-target, reduced-motion, and forced-colors policy. | Accessibility utilities remain foundation-level and focus visuals route through elevation/state tokens. |

## Phase 7B: Primitive Scope Closure

Primitives own reusable HTML/UI vocabulary. This phase decides the last ambiguous primitives and prevents component-specific pieces from hiding in primitive folders.

| Primitive or family | Status | Exact action | Done when |
| --- | --- | --- | --- |
| `primitives/progress` | `done` | Split `ProgressRing` and `SegmentedProgress` into public primitives with schemas, examples, metadata, registry entries, stylesheet ownership, and subpath exports. `Progress` now owns only linear bounded/indeterminate progress. | Static examples cover every exported runtime part and the Phase 7B scope test keeps the split closed. |
| `primitives/tool-call-panel` | `done` | Kept `ToolCallStatusChip`, `ToolCallBody`, `ToolOutput`, and `ToolCodeBlock` as item-owned anatomy because they only make sense inside the tool-call disclosure and one tool-call message workflow. | The Phase 7B scope test enforces the exact documented subpart list: `ToolCallStatusChip`, `ToolCallBody`, `ToolOutput`, and `ToolCodeBlock`. |
| `primitives/time-list` | `done` | Rebuilt over `Listbox` and `OptionRow`; `TimeList` now owns only time-specific option formatting, placement, and selection callback wiring. | Time picker keeps rendering, and list behavior is shared with the menu/picker vocabulary. |
| `primitives/row` | `done` | Demoted and deleted. It was preview filler only; examples now use `OptionRow`, while setting/form rows use `FieldRow` and layout remains `Stack`/`Inline`/`Grid`/`Split`. | `row` is retired from folder, barrel, registry, style manifest, class-name map, registry types, and examples. |
| `primitives/diagram-rail` | `done` | Kept as diagram-domain grammar: passive canvas tool rail, active mark, and diagram viewport placement. It is not generic `Rail`. | Metadata records why it differs from `Rail`, and styles use `diagram-*` vocabulary only. |
| `primitives/diagram-legend` | `done` | Kept as diagram-domain legend for node/edge marks. It is separate from data `Legend` because it owns diagram mark grammar. | Metadata records why it differs from `Legend`, examples show node/edge marks, and helpers are collapsed or justified. |
| `primitives/diagram-controls`, `diagram-edge`, `diagram-viewport` | `done` | Verified names, selectors, and schemas stay generic diagram vocabulary, not `diagram-canvas` or `flow-diagram` component vocabulary. | Existing Phase 6 diagram style tests cover these primitives and no component-shaped names return. |
| `primitives/icon` | `done` | Verified renderer is a strict iconography-foundation adapter: icon names from the foundation, `currentColor` policy, tokenized scale/stroke only. | Icon examples and schema parse against the foundation icon registry. |
| `badge`, `pill`, `tag`, `chip`, `label`, `token` | `done` | Final label-family audit. Kept distinct jobs: passive metadata label, status badge, rounded pill, selectable chip, entity tag, and selected/removable token. Removed no valid items because the family already had separate schemas and examples. | Each item has a one-line role distinction in metadata and no two examples teach the same concept. |
| `button`, `icon-button`, `toolbar-control`, `control-group` | `done` | Final control-family audit. Confirmed no duplicate toolbar button abstraction; synchronized `ControlGroup` metadata with schema-owned `density` and `content`; hierarchy/intent/density semantics remain consistent. | Control family schemas pass prop-policy tests and toolbar remains primitive vocabulary only. |
| `input`, `textarea`, `select`, `checkbox`, `radio`, `switch`, `slider`, `range`, `stepper`, `field`, `field-row` | `done` | Final form-control audit passed. Controls own native input anatomy only, form layout lives in `Field`/`FieldRow`/layout primitives, and components own validation/state flow. | No control primitive owns component workflow or arbitrary layout overrides. |
| `surface`, `panel`, `section`, `header`, `card`, `data-surface`, `frame`, `concept-frame` | `done` | Final surface-family audit passed. `Card` is repeated item surface, `DataSurface` is generated/data panel, and `Frame`/`ConceptFrame` are educational/editorial specimen grammar, not generic docs chrome. | Metadata and examples make scopes non-overlapping. |
| `stack`, `inline`, `cluster`, `grid`, `split`, `scroll-area`, `dock`, `rail` | `done` | Final layout-family audit passed. Layout primitives provide the exhaustive layout answer before components add wrappers. | Component code uses these for layout and no component-local CSS appears. |
| `listbox`, `option-row`, `menu-surface`, `menu-group`, `picker-button`, `picker-surface`, `overlay`, `dialog-surface`, `drawer-surface`, `tooltip` | `done` | Final interaction-shell audit passed. Picker/menu/overlay pieces are generic and components own open state, focus flow, and positioning behavior. | No picker/menu component requires a component-specific primitive. |
| `table`, `pagination`, `distribution`, `stat`, `delta`, `indicator`, `sparkline`, `progress` | `done` | Final data-display audit passed. Data values and geometry are schema/data driven, while visual policy routes through state/foundation tokens. | Data primitives pass dynamic geometry allowlists and prop-policy tests. |
| Chart atoms: `chart-frame`, `plot`, `chart-grid`, `axis`, `target-line`, `series-line`, `series-point`, `series-bar`, `donut-ring`, `heatmap-grid`, `legend` | `done` | Final chart-atom audit passed. SVG anatomy stays in primitives, math stays in utilities/components, and chart shell JSX stays in components. | Chart components render actual JSX shells and utilities stay algorithmic. |
| Diagram atoms: `diagram-item`, `diagram-node`, `flow-node`, `diagram-minimap`, `concept-connector` | `done` | Final diagram/dataflow audit passed. SVG/dataflow anatomy stays as domain primitives; no component-specific canvas/flow names remain in foundations. | Diagram tests and catalog audit pass with generic names. |
| AI/message atoms: `transcript-item`, `message-bubble`, `trace-panel`, `tool-call-panel`, `composer-surface`, `token-rail` | `done` | Final agent-workflow audit passed. Message, trace, and editor shell primitives are reusable AI-native vocabulary; component state and editor orchestration stay in components/utilities. | Message, reasoning, tool-call, and composer components compose primitives without private internal primitive folders. |
| Media/upload atoms: `dropzone`, `upload-field`, `upload-item`, `avatar`, `empty-state`, `skeleton`, `spinner`, `alert`, `validation-list` | `done` | Final feedback/media audit. Kept upload queue chrome in primitives, file/image validation and preview state in components/utilities, and removed the remaining arbitrary `style` escape from `Skeleton`. | No premature `thumbnail` or `attachment-item` primitive exists without a second workflow proving it. |
| Brand/editorial/education: `brand-mark`, `wordmark`, `text`, `heading`, `code`, `kbd`, `divider`, `caret` | `done` | Final support-vocabulary audit passed. These remain reusable text, brand, editorial, and education atoms rather than docs-only render helpers. | Catalog examples remain useful and no docs-only primitive reappears. |

## Phase 7C: Primitive Family Consistency

This sweep closes the final non-structural primitive family audit before enforcement. It is intentionally narrow: do not turn it into visual polish or a new ontology phase.

| Family | Status | Exact action | Done when |
| --- | --- | --- | --- |
| Label family | `done` | Audited `badge`, `pill`, `tag`, `chip`, `label`, and `token` for distinct public jobs, examples, schemas, and metadata. | Role distinctions are clear and no primitive is a duplicate label wrapper. |
| Control family | `done` | Audited `button`, `icon-button`, `toolbar-control`, and `control-group`; synchronized `ControlGroup` metadata with schema semantics. | Control props remain semantic and toolbar vocabulary stays primitive-level. |
| Media/support family | `done` | Audited `dropzone`, `upload-field`, `upload-item`, `avatar`, `empty-state`, `skeleton`, `spinner`, `alert`, and `validation-list`; removed `Skeleton` arbitrary `style` passthrough. | Media and feedback primitives stay rigid, and file/image workflow state remains in components/utilities. |

## Phase 8: Component Closure

Components are behavior and workflow surfaces. The audit found the implementation layer is strong, but the component layer is not yet as closed as foundations and primitives because a few public component bundles still carry compatibility wrappers, active render adapters, and rich slot examples that cannot be fully expressed by serializable Zod input.

Current component audit result:

- Implementation boundary: `A`. Component implementations assemble primitives/utilities, do not own CSS, do not own Concrete class names, and do not style raw DOM under the current contract tests.
- Component ontology: `A-`. Generic `form-shell` layout topology and landing-page-only `feature-card` are retired. `nav` and `footer` stay as durable app-shell components.
- Item-bundle purity: `A-`. Demo-only sibling composition is now ledgered and test-backed. Component indexes no longer carry pass-through mappers or hidden default content; remaining larger indexes are exact serializable adapters for React slots, queue seeds, or representative workflow render output.
- Aesthetic readiness: structurally ready. Foundations, primitives, and components are now ready for visual/aesthetic polish; recursive React node serialization remains a separate future architecture pass.

| Component scope | Status | Exact action | Done when |
| --- | --- | --- | --- |
| Component audit checkpoint | `done` | Inspected all 35 component folders, high-risk implementation files, utilities, indexes, and the import-boundary test contract. | `bun test packages/concrete/src/tests/import-boundaries.test.ts` passes and this phase records the remaining debt honestly. |
| Launch preflight | `done` | Fast-forwarded to `origin/main` release baseline, re-read the active rulebook, and audited components for sibling imports, raw DOM, runtime exports, index LOC, and test coverage. | Worktree is synced, existing contract surface is understood, and Phase 8 starts from `c707744 release: concrete v0.0.12`. |
| Component contract harness | `done` | Added a component runtime export contract, kept the sibling implementation import ban, and made the message lower-tier dependency ledger test-backed. | Tests fail on new multi-export component files unless this file names the exception. `message` is the only declared lower-tier implementation dependency for `reasoning-message` and `tool-call-message`. |
| `form-shell` topology | `done` | Deleted the public `form-shell` component bundle and replaced `FormSection`, `FormGrid`, and `FormRow` consumers with `Section`, `Grid`, and `FieldRow`. Removed the registry entry, barrel export, slug type, component schema bundle, generated skill inventory entry, and old public form-shell schema surface. | No public component exports generic form layout subparts. `form-shell` is retired and guarded by the retired component slug test. |
| Component `index.tsx` files | `done` | Kept indexes focused on public re-exports, item definition, seed, and renderInput adapter. Removed pass-through schema-output mappers from `command-menu`, `search-bar`, `nav`, and `footer`, removed hidden default content from `settings-panel`, and aligned icon slot types with exact optional schema output. | Heavy indexes have a written reason or are simplified. Current top index is `settings-panel` at 94 LOC, and every larger adapter listed below owns one coherent boundary. |
| RenderInput and examples | `done` | Allow sibling component composition only inside examples/renderInput when it is demo output, not runtime implementation. Prefer primitive composition when the same UI could be assembled without component dependencies. | Tests distinguish implementation imports from example/renderInput composition, examples remain serializable/server-renderable, and every allowed sibling composition is documented below. |
| Docs shell components | `done` | Kept `nav` and `footer` because they are reusable app-shell components. Deleted `feature-card` because it was landing-page composition over `TiltFrame`, icon, and text primitives. | `nav` and `footer` stay in registry/barrel/docs; `feature-card` is retired and guarded by the retired component slug test. |
| Rich child and slot serialization | `done` | Deferred the recursive Concrete node language from this phase and recorded the boundary explicitly. `SettingsPanel`, form overlays, search menus, `Nav` brand slots, `Footer` aside code, and similar rich slots use JSX adapters until node serialization is greenlit. | Serializable own props stay schema-validated; rich React slots remain typed runtime props or renderInput adapters. |
| Large controller components | `keep` | Keep `Composer`, `DataTable`, `CommandMenu`, and `DiagramCanvas` whole when each file owns one controller/event/render flow. Promote only reusable algorithms to utilities and reusable JSX to primitives/components. | No split is made solely for LOC. Large files are acceptable when the concern is singular and guarded by tests. |
| Component schema locality | `deferred` | Central public schemas stay for compatibility. Item-local schema ownership can be revisited in a breaking schema pass. | No duplicate schema truth appears; item `schema.ts` files continue to expose the correct public schema boundary. |
| Phase 8 gates | `done` | Ran `bun run format`, registry/import-boundary tests, `bun run typecheck`, `bun run check`, `bun run build`, `bun run visual:smoke`, and `bun run catalog:audit`. | The Recent Gate Log records a passing Phase 8F checkpoint and components are marked structurally closed. |

Component runtime ledger:

Target state: every component `component.tsx` exports exactly one runtime JSX component. Type exports may live beside that runtime export. No component runtime export exceptions are currently allowed. `form-shell` is retired and guarded as a deleted public component slug.

Component dependency tier ledger:

| Component | May import implementation from | Rationale |
| --- | --- | --- |
| `reasoning-message` | `message` | Reasoning output is a specialized message surface and should inherit the lower-tier message workflow shell. |
| `tool-call-message` | `message` | Tool-call output is a specialized message surface and should inherit the lower-tier message workflow shell. |

Component demo composition ledger:

These files may compose sibling components because they are examples or serializable render adapters, not implementation dependencies. Additions require this table and the import-boundary test to change together.

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

Component index adapter ledger:

These are the remaining component `index.tsx` files above 50 LOC after Phase 8D. They are allowed because each file owns one item boundary; do not split them solely for line count.

| Component | Current LOC | Reason |
| --- | ---: | --- |
| `settings-panel` | 94 | Bridges serializable section/row records into typed control React slots. |
| `form-drawer` | 76 | Renders representative drawer children and footer from serializable drawer props. |
| `file-upload` | 72 | Owns schema-valid queue seed fixtures and maps queue mode to upload defaults. |
| `command-menu` | 69 | Owns command seed fixtures and passes parsed schema items directly into the menu. |
| `search-bar` | 68 | Bridges serializable query/tokens/menu state into action and menu React slots. |
| `image-upload` | 66 | Owns image queue seed fixtures, including the inline preview data URI. |
| `composer` | 63 | Owns one schema-valid rich composer seed and adapter for optional menu/value props. |
| `footer` | 59 | Bridges serializable footer data and optional command code into a `CodeBlock` aside. |
| `form-dialog` | 52 | Renders representative dialog children and footer from serializable dialog props. |
| `message` | 51 | Bridges serializable message text into the typed `children` slot. |

## Phase 7D: Enforcement

Add or tighten tests in this order:

1. Foundation token noun policy: scan foundation `styles.css` files and fail on banned component nouns outside the explicit allowlist.
2. Primitive subpart export policy: scan `component.tsx` and `index.tsx` exports; fail on multiple runtime component exports unless the primitive has a written exception in this file.
3. Primitive registry truth: every public primitive folder appears in the registry/barrel, and every retired primitive slug stays deleted from folders, registry, exports, styles, and docs smoke targets.
4. Primitive dependency flow: primitives may import foundations, schemas, icons, factories, utilities, and lower-level primitives only where the import-boundary test allows it; components must not import sibling components unless the declared tier map allows it.
5. Foundation consumption: primitive CSS declarations resolve through foundation variables or documented non-visual scanner exceptions.
6. Docs import boundary: docs import only public `@rubriclab/concrete` surfaces.
7. Full item render contract: every registered example and seed renders to static markup.

Runtime subpart ledger:

These primitive component files intentionally export more than one runtime JSX part. Every other primitive `component.tsx` must export one runtime component only.

| Primitive | Allowed runtime exports | Rationale |
| --- | --- | --- |
| `axis` | `ChartAxis`, `ChartBaseline`, `ChartTickLabel`, `ChartAxisLabel`, `ChartRowLabel`, `ChartValueLabel`, `ChartEndLabel` | One chart-axis anatomy family for SVG labels and axis marks. |
| `chart-frame` | `ChartFrame`, `ChartMessage` | Chart shell plus its empty/loading/error message anatomy. |
| `chart-grid` | `ChartGrid`, `ChartPlotBackground` | One SVG grid/background anatomy family. |
| `checkbox` | `Checkbox`, `ChoiceRow` | Native choice input plus its label row anatomy shared with radio semantics. |
| `code` | `CodeBlock`, `InlineCode` | One code vocabulary with block and inline display forms. |
| `composer-surface` | `ComposerSurface`, `ComposerEditor`, `ComposerFooter`, `ComposerToolbar`, `ComposerMenuLayer`, `ComposerSubmitDock`, `ComposerSendButton` | Reusable AI editor surface anatomy; composer behavior remains in the component. |
| `diagram-edge` | `DiagramEdges`, `DiagramEdgePath` | One diagram-edge SVG anatomy family. |
| `diagram-viewport` | `DiagramShell`, `DiagramHeader`, `DiagramViewport`, `DiagramStage`, `DiagramElement`, `DiagramElementButton`, `DiagramFooter`, `DiagramSvg` | One diagram viewport anatomy family for canvas-like diagrams. |
| `donut-ring` | `DonutPlot`, `DonutCenter`, `DonutTrack`, `DonutSegment` | One donut SVG anatomy family. |
| `heatmap-grid` | `HeatmapGrid`, `HeatmapCorner`, `HeatmapColumnLabel`, `HeatmapRowLabel`, `HeatmapCell` | One heatmap grid anatomy family. |
| `input` | `Input`, `InputControl` | Field-wrapped input plus bare input control. |
| `legend` | `Legend`, `LegendItem` | Legend list plus item anatomy. |
| `pagination` | `Pagination`, `PaginationButton` | Pagination nav plus item anatomy. |
| `range` | `Range`, `RangeTrack`, `RangeInput`, `RangeValues` | One range-control anatomy family. |
| `series-bar` | `ChartBar`, `ChartBarTrack`, `ChartBarComparison`, `ChartStackSegment` | One chart-bar SVG anatomy family. |
| `series-line` | `ChartArea`, `ChartLine` | One chart-line SVG anatomy family. |
| `series-point` | `ChartPoint`, `ChartEndpoint` | One chart-point SVG anatomy family. |
| `stepper` | `Stepper`, `StepperAction`, `StepperInput` | One numeric step-control anatomy family. |
| `table` | `TableViewport`, `Table`, `TableHead`, `TableBody`, `TableRow`, `TableHeaderCell`, `TableCell`, `TableSelectionHeaderCell`, `TableSelectionCell`, `TableSelectionInput`, `TableSortButton`, `TableEmpty`, `TableEmptyCell` | One table anatomy family; data behavior stays in components. |
| `token-rail` | `TokenRail`, `TokenRailItem` | Token rail plus item anatomy. |
| `tool-call-panel` | `ToolCallPanel`, `ToolCallStatusChip`, `ToolCallBody`, `ToolOutput`, `ToolCodeBlock` | One tool-call disclosure anatomy family. |
| `toolbar-control` | `ToolbarControl`, `ToolbarControlGroup`, `ToolbarControlSeparator`, `ToolbarControlButton`, `ToolbarFormatGlyph` | One toolbar anatomy family. |
| `trace-panel` | `TracePanel`, `TraceSteps`, `TraceStep` | One trace disclosure anatomy family. |
| `transcript-item` | `TranscriptItem`, `TranscriptPlain`, `TranscriptMetaItem` | One transcript item anatomy family. |

## Retired Primitive Names

These names must stay deleted from public primitive folders, registry, exports, styles, tests, docs smoke targets, and foundation token names:

`bubble`, `calendar-panel`, `chart-legend`, `chart-surface`, `composer-rail`, `data-card-header`, `data-table-control`, `data-table-pagination`, `data-table-shell`, `feedback-panel`, `focus-ring`, `form-layout`, `form-overlay`, `menu-shell`, `message-shell`, `metric-shell`, `picker-control`, `picker-shell`, `preview-stage`, `range-control`, `reasoning-panel`, `row`, `search-field`, `search-token`, `select-control`, `select-menu`, `stepper-control`, `suggestion-menu`, `texture`.

Deferred primitive names that should not be added until a second workflow proves them:

`attachment-item`, `spacer`, `thumbnail`, `toolbar-button`, `toolbar-surface`, `trace-step`.

## Phase 7D Gates

Run narrow gates after each implementation chunk:

- `bun run format`
- `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`
- Add focused tests for the files touched by the row.
- `bun run typecheck`
- `bun run check`

Run full gates before marking Phase 7 complete:

- `bun run format`
- `bun test`
- `bun run typecheck`
- `bun run check`
- `bun run build`
- `bun run visual:smoke`
- `bun run catalog:audit`

After `bun run build` or `bun run catalog:audit`, restore `apps/docs/next-env.d.ts` to the production route import if Next rewrites it:

```ts
import "./.next/types/routes.d.ts";
```

## Recent Gate Log

- 2026-05-01 docs beauty restoration checkpoint passed: added `page-section`, richer texture grounds including the perspective vanishing grid, semantic `Frame` scale/align, sticky `Nav`, isolated render routes from site chrome, restored landing/catalog/detail polish, and kept docs route composition Concrete-only while preserving the Phase 8 retirement of `feature-card`. Gates passed after final main reconciliation: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts`, `bun test packages/concrete/src/tests/import-boundaries.test.ts`, `bun run check:skill`, `bun run typecheck`, `bun run check`, `bun run build`, `bun run catalog:audit`, and `bun run visual:smoke`. Catalog audit passed 495 render routes.
- 2026-05-01 Phase 8D/8E/8F component structural closure passed: tightened component `index.tsx` adapters, removed hidden default content from `settings-panel`, removed pass-through schema-output mappers from `command-menu`, `search-bar`, `nav`, and `footer`, aligned icon slot types with exact optional schema output, documented the remaining rich slot/node-language boundary, and marked components structurally ready for aesthetic polish. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun run check`, `bun run build`, `bun run visual:smoke`, and `bun run catalog:audit`. Catalog audit passed 487 render routes.
- 2026-05-01 Phase 8C component shell checkpoint passed: kept `nav` and `footer` as durable app-shell components, retired landing-page-only `feature-card`, added the sibling demo/renderInput composition ledger and enforcement test, regenerated `SKILL.md` to 33 components, and restored the production Next route type import after generated-file drift. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun run check`, `bun run build`, `bun run visual:smoke`, and `bun run catalog:audit`. Catalog audit passed 487 render routes.
- 2026-05-01 Phase 8A/8B component closure checkpoint passed: added the component runtime export contract and dependency-tier ledger enforcement, retired `form-shell`, replaced its consumers with `Section`, `Grid`, and `FieldRow`, removed stale registry/barrel/type/schema/test references, and regenerated `SKILL.md` to 34 components. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun test`, `bun run check`, `bun run build`, `bun run visual:smoke`, and `bun run catalog:audit`. Catalog audit passed 489 render routes.
- 2026-05-01 Phase 8 launch preflight passed: fast-forwarded to `c707744 release: concrete v0.0.12`, re-read `CODE.md` and `PLAN.md`, audited 35 component folders for sibling imports, raw DOM, multi-runtime exports, heavy indexes, and existing contract coverage, and crystallized the Phase 8 mega-blast sequence. Gates passed: `bun run format` and `bun test packages/concrete/src/tests/import-boundaries.test.ts`.
- 2026-05-01 DX refactor publish checkpoint passed: refreshed `CODE.md` and `PLAN.md` around Phase 8 component closure, restored the production Next route type import after build-generated drift, and prepared the structural refactor for `main`. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun test`, `bun run typecheck`, `bun run check`, `bun run build`, `bun run visual:smoke`, and `bun run catalog:audit`. Catalog audit passed 476 render routes.
- 2026-05-01 Phase 8 component audit checkpoint passed: inspected component folders, high-risk component implementations, utilities, indexes, renderInput adapters, and example composition. At that checkpoint, the debt was generic form layout topology, heavy `index.tsx` render adapters, component dependency tier documentation, and rich child/slot serialization. Gate passed: `bun test packages/concrete/src/tests/import-boundaries.test.ts`.
- 2026-05-01 Phase 7D/7E readiness checkpoint passed: added the exact primitive runtime subpart export contract, documented the runtime subpart ledger, closed every remaining foundation/primitive scope row, restored the production Next route type import after generated-file drift, and marked foundation/primitive architecture ready for component closure. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun test`, `bun run typecheck`, `bun run check`, `bun run build`, `bun run visual:smoke`, and `bun run catalog:audit`. Catalog audit passed 476 render routes.
- 2026-05-01 Phase 7C primitive consistency checkpoint passed: audited the label, control, and media/support primitive families, synchronized `ControlGroup` metadata, removed the remaining `Skeleton` arbitrary style passthrough, and kept upload/media workflow scope out of new primitives. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun run check`, and `bun run build`.
- 2026-05-01 Phase 7B primitive scope checkpoint passed: split `ProgressRing` and `SegmentedProgress` into standalone primitive bundles, retired public `row`, rebuilt `TimeList` on `Listbox` plus `OptionRow`, documented/enforced the `ToolCallPanel` subpart exception, and kept diagram-domain primitive decisions closed. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun run check`, `bun run build`, and `bun run catalog:audit`.
- 2026-05-01 Phase 7A foundation token noun checkpoint passed: added a component-shaped foundation token name contract, renamed foundation CSS variables and consumers from workflow nouns to role/domain nouns, updated foundation token records/examples, and removed one duplicate menu sizing token exposed by the rename. Gates passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun run check`, `bun run build`, and `bun run visual:smoke`.
- 2026-04-30 Phase 6 final hardening checkpoint passed: `bun run format`, `bun test packages/concrete/src/tests/registry.test.ts packages/concrete/src/tests/diagram.test.ts packages/concrete/src/tests/import-boundaries.test.ts`, `bun run typecheck`, `bun run check`, `bun run build`, `bun run visual:smoke`, and `bun run catalog:audit`. Catalog audit passed 476 render routes.

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
