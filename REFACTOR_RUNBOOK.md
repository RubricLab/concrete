# Concrete DX Refactor Runbook

This file is the continuity anchor for the Concrete DX refactor. Update it after every meaningful phase so the work can resume after context compression without rediscovering intent.

## Invariants

- Preserve the public package API and current subpath exports.
- Do not restore or revert the deleted `concepts/` tree; those deletions predate this refactor.
- Keep docs imports on public `@rubriclab/concrete` surfaces only.
- Keep Zod/v4 schemas at serializable boundaries.
- Keep dependency flow one-way: foundations -> primitives -> components -> registry -> docs.
- Keep `@rubriclab/concrete/styles.css` as the only required public stylesheet.
- Prefer item-owned source of truth for metadata, examples, playground controls, and JSX.

## Baseline

- 2026-04-29: Before implementation, `bun test`, `bun run lint`, `bun run typecheck`, and `bun run build` passed.
- Existing dirty worktree: deleted `concepts/` files are user-owned and intentionally left untouched.

## Phase Status

- [x] Plan pinned in chat.
- [x] Convert package styling away from CSS modules to stable global `concrete-*` class names.
- [x] Add typed item definition helpers.
- [x] Add foundation definitions for colors, typography, spacing, radii, elevation, motion, and textures.
- [x] Add vertical-slice primitive definitions for Button, Field, and Card.
- [x] Add vertical-slice component definition for MetricCard.
- [x] Wire registry/docs render paths to item definitions.
- [x] Add structural tests for definitions, imports, CSS-module removal, and public API compatibility.
- [x] Run `bun test`, `bun run lint`, `bun run typecheck`, and `bun run build`.
- [x] Expand primitive definitions through controls/forms, labels/typography, surfaces/feedback/brand, data display, and diagram clusters.
- [x] Add first component definition cluster for Toolbar, CommandMenu, SearchBar, FormShell, ValidationSummary, and SettingsPanel.
- [x] Add form/upload component definition cluster for FormDialog, FormDrawer, PasswordInput, MultiSelect, DatePicker, DateRangePicker, TimePicker, NumberStepper, RangeSlider, FileUpload, and ImageUpload.
- [x] Add data/chart component definition cluster for Meter, LineChart, AreaChart, BarChart, StackedBarChart, DonutChart, Chart, Heatmap, DataTable, FlowDiagram, and DiagramCanvas.
- [x] Add AI/message input component definition cluster for Message, ReasoningMessage, ToolCallMessage, and Composer.
- [x] Delete the legacy registry example switchboard and component/primitive prop switch helpers after all items became definition-backed.
- [x] Split primitive controls implementations into item-owned files for Button, Kbd, Spinner, Caret, Checkbox, Radio, Switch, and Slider while keeping `primitives/controls.tsx` as a compatibility barrel.
- [x] Split primitive fields implementations into item-owned files for Input, Textarea, and Select while keeping `primitives/fields.tsx` as a compatibility barrel.
- [x] Split primitive forms implementations into item-owned files for Field, Dropzone, and UploadItem while keeping `primitives/forms.tsx` as a compatibility barrel.
- [x] Split primitive surface implementations into item-owned files for Card, Frame, Row, Avatar, Bubble, Divider, EmptyState, and Tooltip while keeping `primitives/surfaces.tsx` as a compatibility barrel.
- [x] Split primitive label implementations into item-owned files for Pill, Chip, Badge, and Tag while keeping `primitives/labels.tsx` as a compatibility barrel.
- [x] Split primitive feedback implementations into item-owned files for Progress, Indicator, and Skeleton while keeping `primitives/feedback.tsx` as a compatibility barrel.
- [x] Split primitive typography implementations into item-owned files for CodeBlock, InlineCode, and TextLink while keeping `primitives/typography.tsx` as a compatibility barrel.
- [x] Split primitive data-display implementations into item-owned files for Stat, Delta, Sparkline, and Distribution while keeping `primitives/data-display.tsx` as a compatibility barrel.
- [x] Split primitive brand implementations into item-owned files for Texture, BrandMark, and Wordmark while keeping `primitives/brand.tsx` as a compatibility barrel.
- [x] Split primitive diagram implementations into item-owned files for ConceptFrame, ConceptConnector, DiagramNode, and DiagramItem while keeping `primitives/diagrams.tsx` as a compatibility barrel.
- [x] Split AI/message component implementations into item-owned files for Message, ReasoningMessage, and ToolCallMessage while keeping `components/ai.tsx` as a compatibility barrel.
- [x] Split DiagramCanvas into `diagram-canvas-view.tsx` for the client implementation and `diagram-canvas.tsx` for the server-readable item definition/re-export while keeping `components/diagrams.tsx` as a compatibility barrel.
- [x] Normalize hook-based form implementations into top-level view files while keeping public item definition files server-readable and old `components/forms/*` paths as compatibility barrels.
- [x] Normalize hook-based interaction implementations into `interaction-view.tsx` while keeping public item definition files server-readable and `components/interaction.tsx` as a compatibility barrel.
- [x] Split non-hook form composition implementations into item-owned files for FormShell, ValidationSummary, SettingsPanel, FormDialog, and FormDrawer while keeping `components/form-composition.tsx` as a compatibility barrel.
- [x] Split the large data component bundle into item-owned MetricCard/Meter/chart wrappers, focused chart rendering, data tone helpers, DataTable view, and FlowDiagram view while keeping `components/data.tsx` as a compatibility barrel.
- [x] Split the mixed interaction client view into focused Toolbar, CommandMenu, and SearchBar view files while keeping `components/interaction-view.tsx` as a compatibility barrel.
- [x] Split the mixed date/time client view into focused DatePicker, DateRangePicker, and TimePicker view files with shared calendar helpers while keeping `components/date-time-view.tsx` as a compatibility barrel.
- [x] Split the mixed upload client view into focused FileUpload and ImageUpload view files while keeping `components/upload-view.tsx` as a compatibility barrel.
- [x] Decompose the oversized Composer client view into orchestration, engine helpers, and render parts without changing the public `Composer` contract.
- [x] Decompose the broad chart rendering engine into chart-family renderers and shared chart core helpers without changing public chart component contracts.
- [x] Decompose the DataTable client view into orchestration, pure row/search helpers, and cell/action renderers without changing the public `DataTable` contract.
- [x] Decompose the DiagramCanvas client view into orchestration, pure graph/style helpers, and focused graph chrome/rendering without changing the public `DiagramCanvas` contract.
- [x] Delete redundant internal category barrels after direct item exports preserved the public `@rubriclab/concrete/primitives` and `@rubriclab/concrete/components` surfaces.
- [x] Split the primitive docs overview route into a thin App Router page, a catalog renderer, and an isolated interactive concept gallery with a typed slug renderer map.
- [x] Split the component detail playground out of the route tree into a URL-state shell, pure control definitions, and component-specific render adapters.
- [x] Split the primitive detail playground out of the route tree into the same URL-state shell, pure control definitions, and primitive-specific render adapters pattern.
- [x] Remove duplicated docs playground control switchboards after item definitions became the source of truth for controls.
- [x] Split the primitive overview concept gallery into a typed dispatcher, cluster-owned concept renderers, and shared concept parts.
- [x] Split the component playground render adapters into fixture, stage, interaction, data, message, and form modules with the original renderer file reduced to a slug dispatcher.
- [x] Split the package Composer engine into defaults, actions, DOM selection/token operations, formatting, menu, and serialization helpers while keeping `composer-engine.ts` as the internal barrel.
- [x] Split the foundations docs route into a thin App Router shell, source-owned foundation fixtures, and a renderer module.
- [x] Split the docs home route into a thin App Router shell, source-owned home fixtures, and a renderer module.

## Current Notes

- Styling migration strategy: preserve existing CSS content, transform CSS module selectors to global `.concrete-*` selectors, and use a typed `concreteClassNames` map from JSX.
- The old module CSS files should remain deleted after verification.
- Definitions now exist for all foundations, every primitive, and every registered component. Primitive and component registry entries are fully definition-backed.
- Registry entries preserve the strict public metadata shape; item definitions are exposed separately through `primitiveDefinitions`, `componentDefinitions`, and `foundationDefinitions`.
- Final stabilization decision: keep package CSS as the current layered `styles.css`, `styles/primitives.css`, and `styles/components.css` files for collective auditability. Split CSS later only when ownership seams are clear.
- Final stabilization decision: do not add module-load runtime parsing to `defineConcrete*`. The helper surface stays small; registry tests now validate item metadata, examples, control-name uniqueness, and state-query uniqueness.
- Final stabilization cleanup: removed redundant internal primitive category barrels (`brand`, `controls`, `data-display`, `diagrams`, `feedback`, `fields`, `forms`, `labels`, `surfaces`, `typography`) and component category barrels (`ai`, `data`, `diagrams`, `form-composition`, `forms`, `interaction`) after confirming the package only exposes the top-level `./primitives` and `./components` subpaths. `LabelTone` remains exported directly from `primitives/index.tsx`.
- Final stabilization cleanup: removed duplicated docs playground control switchboards and replaced the repeated component/primitive URL-state shells with `apps/docs/src/catalog-playground.tsx`. Playground controls now come from package item definitions.
- Final stabilization cleanup: moved the last nested form helper from `components/forms/shared.ts` to `components/form-field-helpers.ts` and removed obsolete view barrels for interaction, date/time, and upload groups.
- Verified on 2026-04-29 with `bun test`, `bun run lint`, `bun run typecheck`, and `bun run build`.
- Next chunk completed on 2026-04-29: controls/forms primitive definitions now cover Button, Input, Field, Dropzone, UploadItem, Caret, Textarea, Select, Checkbox, Radio, Switch, Slider, and Card.
- Next chunk completed on 2026-04-29: labels/typography primitive definitions now cover Pill, Chip, Badge, Tag, Code, Kbd, Link, and Divider.
- Next chunk completed on 2026-04-29: surfaces/media/feedback/brand primitive definitions now cover Avatar, Row, Bubble, Spinner, EmptyState, Tooltip, Progress, Indicator, Skeleton, Frame, Texture, BrandMark, Wordmark, Icon, and FocusRing.
- Next chunk completed on 2026-04-29: remaining data display and diagram primitive definitions now cover Stat, Delta, Sparkline, Distribution, ConceptFrame, ConceptConnector, DiagramNode, and DiagramItem. The old primitive `entry(...)` helper is deleted because primitive registry metadata now comes from item definitions only.
- Next chunk completed on 2026-04-29: component definitions now cover Toolbar, CommandMenu, SearchBar, FormShell, ValidationSummary, and SettingsPanel. `renderComponentExample` now uses `getComponentDefinition` first, so migrated components drive render routes, docs detail previews, state matrices, and playground controls from item definitions.
- Next chunk completed on 2026-04-29: form/upload component definitions now cover FormDialog, FormDrawer, PasswordInput, MultiSelect, DatePicker, DateRangePicker, TimePicker, NumberStepper, RangeSlider, FileUpload, and ImageUpload. The legacy component registry entries for those items now read from item definitions.
- Next chunk completed on 2026-04-29: data/chart component definitions now cover Meter, LineChart, AreaChart, BarChart, StackedBarChart, DonutChart, Chart, Heatmap, DataTable, FlowDiagram, and DiagramCanvas. The legacy data/chart render fallback examples and dead data/chart prop helpers were removed after full gate verification.
- Next chunk completed on 2026-04-29: AI/message input component definitions now cover Message, ReasoningMessage, ToolCallMessage, and Composer. Composer was split into `composer-view.tsx` for the client implementation and `composer.tsx` for the item definition/re-export. `registry/examples.tsx` now delegates directly to item definitions, and `registry/props.ts` now only exposes the `prop` and `states` builders.
- Next chunk completed on 2026-04-29: primitive controls implementation bundle was split into item-owned implementation files. `primitives/controls.tsx` now re-exports item files for public compatibility.
- Next chunk completed on 2026-04-29: primitive fields implementation bundle was split into item-owned implementation files. `primitives/fields.tsx` now re-exports item files for public compatibility.
- Next chunk completed on 2026-04-29: primitive forms implementation bundle was split into item-owned implementation files. `primitives/forms.tsx` now re-exports item files for public compatibility.
- Next chunk completed on 2026-04-29: primitive surfaces implementation bundle was split into item-owned implementation files. `primitives/surfaces.tsx` now re-exports item files for public compatibility, and internal primitive examples import `Frame` and `Row` directly from their owning files to avoid barrel cycles.
- Next chunk completed on 2026-04-29: primitive labels implementation bundle was split into item-owned implementation files. `primitives/labels.tsx` now re-exports item files and the public `LabelTone` type for compatibility.
- Next chunk completed on 2026-04-29: primitive feedback implementation bundle was split into item-owned implementation files. `primitives/feedback.tsx` now re-exports Progress, Indicator, and Skeleton item files for public compatibility.
- Next chunk completed on 2026-04-29: primitive typography implementation bundle was split into item-owned implementation files. The syntax tokenizer now lives with the Code primitive, and `primitives/typography.tsx` re-exports Code and Link item files for compatibility.
- Next chunk completed on 2026-04-29: primitive data-display implementation bundle was split into item-owned implementation files. `primitives/data-display.tsx` now re-exports Stat, Delta, Sparkline, and Distribution item files for public compatibility.
- Next chunk completed on 2026-04-29: primitive brand implementation bundle was split into item-owned implementation files. `primitives/brand.tsx` now re-exports Texture, BrandMark, and Wordmark item files, and `Frame` imports texture helpers directly from `texture.tsx`.
- Next chunk completed on 2026-04-29: primitive diagram implementation bundle was split into item-owned implementation files. `primitives/diagrams.tsx` now re-exports ConceptFrame, ConceptConnector, DiagramNode, and DiagramItem item files for public compatibility.
- Next chunk completed on 2026-04-29: AI/message component implementation bundle was split into item-owned implementation files. Keep item definition files server-readable; adding `"use client"` to definition modules breaks docs static param generation because registry metadata becomes unavailable during Next build.
- Next chunk completed on 2026-04-29: DiagramCanvas now follows the Composer client-boundary pattern: the hook-based JSX lives in `diagram-canvas-view.tsx`, the item definition stays in `diagram-canvas.tsx`, and `components/diagrams.tsx` remains a compatibility barrel.
- Next chunk completed on 2026-04-29: form component JSX implementations were moved from nested `components/forms/*` files into top-level `*-view.tsx` files. Public item files now import/re-export their view modules, and old nested paths remain compatibility barrels.
- Next chunk completed on 2026-04-29: interaction component JSX implementations were moved into `interaction-view.tsx`. Public item files now import/re-export their view APIs directly, and `components/interaction.tsx` remains a compatibility barrel.
- Next chunk completed on 2026-04-29: non-hook form composition implementations now live in their public item files. `components/form-composition.tsx` is a compatibility barrel for FormShell, ValidationSummary, SettingsPanel, FormDialog, and FormDrawer.
- Next chunk completed on 2026-04-29: the large data component implementation bundle was split. MetricCard, Meter, and focused chart wrappers now live in their public item files; chart rendering lives in `chart-rendering.tsx`; table and flow hook implementations live in client view files; `components/data.tsx` is now a compatibility barrel only.
- Next chunk completed on 2026-04-29: `interaction-view.tsx` was split into `toolbar-view.tsx`, `command-menu-view.tsx`, `search-bar-view.tsx`, and shared `interaction-helpers.ts`. Internal Composer and Message code now import Toolbar APIs from the focused view file, and `interaction-view.tsx` is a compatibility barrel.
- Next chunk completed on 2026-04-29: `date-time-view.tsx` was split into `date-picker-view.tsx`, `date-range-picker-view.tsx`, `time-picker-view.tsx`, and shared `calendar-view.tsx`. Form dialog/drawer examples now import focused picker view files, and old nested `components/forms/date-time.tsx` remains compatible through the barrel.
- Next chunk completed on 2026-04-29: `upload-view.tsx` was split into `file-upload-view.tsx` and `image-upload-view.tsx`. FileUpload owns queue helpers and ImageUpload is now a focused preset wrapper; old nested `components/forms/upload.tsx` remains compatible through the barrel.
- Next chunk completed on 2026-04-29: Composer was decomposed into `composer-view.tsx` for orchestration, `composer-engine.ts` for DOM/value/menu helpers and defaults, and `composer-parts.tsx` for rail, tools, format buttons, and menu rendering. Public exports still come from `composer.tsx` through `composer-view.tsx`.
- Next chunk completed on 2026-04-29: `chart-rendering.tsx` was reduced to the chart shell and dispatcher. Shared chart helpers now live in `chart-core-rendering.tsx`, with focused line, bar, stacked bar, donut, and heatmap renderer modules.
- Next chunk completed on 2026-04-29: docs dev server CSS resolution was fixed. Docs app CSS files now import directly from `layout.tsx`, and Concrete internal stylesheet layers are exposed as package CSS subpaths so Turbopack dev resolves them through package exports instead of the `/apps` root.
- Next chunk completed on 2026-04-29: DataTable was decomposed into `data-table-view.tsx` for client orchestration, `data-table-logic.ts` for row id/search/scroll helpers, and `data-table-rendering.tsx` for cells, toolbar actions, and sort glyph rendering.
- Next chunk completed on 2026-04-29: DiagramCanvas was decomposed into `diagram-canvas-view.tsx` for client orchestration, `diagram-canvas-logic.ts` for graph/style helpers, and `diagram-canvas-rendering.tsx` for rails, SVG edges, nodes, items, minimap, legend, and zoom controls.
- Next chunk completed on 2026-04-29: primitive docs overview moved from `app/primitives/page.tsx` into `src/primitive-catalog.tsx` and `src/primitive-concepts.tsx`. The route is now a 5-line App Router shell, and the old slug switch is now a typed `Partial<Record<PrimitiveSlug, renderer>>` map with fallback examples from the package registry.
- Next chunk completed on 2026-04-29: component detail playground moved from `app/components/[slug]/component-playground.tsx` into `src/component-playground.tsx`, with controls in `src/component-playground-controls.ts` and component-specific fixtures/render adapters in `src/component-playground-renderers.tsx`.
- Next chunk completed on 2026-04-29: primitive detail playground moved from `app/primitives/[slug]/primitive-playground.tsx` into `src/primitive-playground.tsx`, with controls in `src/primitive-playground-controls.ts` and primitive-specific render adapters in `src/primitive-playground-renderers.tsx`.
- Next chunk completed on 2026-04-29: primitive overview concept renderers moved out of `src/primitive-concepts.tsx` into `primitive-concepts-controls.tsx`, `primitive-concepts-labels.tsx`, `primitive-concepts-data.tsx`, `primitive-concepts-surfaces.tsx`, and shared `primitive-concept-parts.tsx`. The dispatcher file now only maps primitive slugs to cluster renderers with registry fallback examples.
- Next chunk completed on 2026-04-29: component playground renderers moved out of `src/component-playground-renderers.tsx` into `component-playground-fixtures.ts`, `component-playground-stages.tsx`, `component-playground-interaction-renderers.tsx`, `component-playground-data-renderers.tsx`, `component-playground-message-renderers.tsx`, and `component-playground-form-renderers.tsx`. The renderer file now only maps component slugs to family renderers with registry fallback examples.
- Next chunk completed on 2026-04-29: `components/composer-engine.ts` is now a 6-line barrel over `composer-defaults.ts`, `composer-actions.ts`, `composer-dom.ts`, `composer-formatting.ts`, `composer-menu.ts`, and `composer-serialization.ts`. The temporary mechanical mismatch between `getTrigger` and `getTriggerRange` was corrected before gate verification.
- Next chunk completed on 2026-04-29: foundations docs moved from `app/foundations/page.tsx` into `src/foundations-page.tsx` and `src/foundation-fixtures.ts`. The App Router route is now a 5-line shell.
- Next chunk completed on 2026-04-29: docs home moved from `app/page.tsx` into `src/home-page.tsx` and `src/home-fixtures.ts`. The App Router route is now a 5-line shell.
- The docs dev server was restarted after the DataTable, DiagramCanvas, primitive docs, component playground, primitive playground, primitive concept gallery, component renderer, Composer engine, foundations route, and home route chunks. `curl --max-time 12 -I http://localhost:3000`, `curl --max-time 12 -I http://localhost:3000/primitives`, `curl --max-time 12 -I http://localhost:3000/components/toolbar`, `curl --max-time 12 -I http://localhost:3000/primitives/button`, `curl --max-time 12 -I 'http://localhost:3000/primitives/button?variant=primary&label=Continue'`, representative component detail URLs for toolbar, line chart, form dialog, and message, composer detail/render URLs, `curl --max-time 12 -I http://localhost:3000/foundations`, and `curl --max-time 12 -I http://localhost:3000/` returned `200 OK`.
- `renderPrimitiveExample` uses `getPrimitiveDefinition` first, so primitives drive render routes, docs detail previews, state matrices, and playground controls from item definitions.

## Latest Gate Log

- 2026-04-29 labels/typography cluster: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 surfaces/media/feedback/brand cluster: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive completion cluster: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 first component cluster: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 form/upload component cluster: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 data/chart component cluster: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 AI/message input component cluster and registry switchboard cleanup: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive controls implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive fields implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive forms implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive surfaces implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive labels implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive feedback implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive typography implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive data-display implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive brand implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 primitive diagram implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 AI/message component implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed after removing client directives from definition files.
- 2026-04-29 DiagramCanvas client view split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 form component view normalization: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 interaction component view normalization: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 form composition item split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 data component implementation split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 interaction focused view split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 date/time focused view split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 upload focused view split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 Composer internal decomposition: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 chart renderer decomposition: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed.
- 2026-04-29 docs/package stylesheet dev-server fix: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. `curl --max-time 12 -I http://localhost:3000` returned `200 OK` after a clean dev-server restart.
- 2026-04-29 DataTable internal decomposition: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. `curl --max-time 12 -I http://localhost:3000` returned `200 OK` after restarting the docs dev server.
- 2026-04-29 DiagramCanvas internal decomposition: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. `curl --max-time 12 -I http://localhost:3000` returned `200 OK` after restarting the docs dev server.
- 2026-04-29 primitive docs overview split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. `curl --max-time 12 -I http://localhost:3000/primitives` returned `200 OK` after restarting the docs dev server.
- 2026-04-29 component playground split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. `curl --max-time 12 -I http://localhost:3000/components/toolbar` returned `200 OK` after restarting the docs dev server.
- 2026-04-29 primitive playground split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. `curl --max-time 12 -I http://localhost:3000/primitives/button` returned `200 OK` after restarting the docs dev server.
- 2026-04-29 primitive concept gallery split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. `curl --max-time 12 -I http://localhost:3000/primitives` and `curl --max-time 12 -I 'http://localhost:3000/primitives/button?variant=primary&label=Continue'` returned `200 OK` after restarting the docs dev server.
- 2026-04-29 component playground renderer split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. Representative component detail URLs across interaction, data, form, and message renderer families returned `200 OK` after restarting the docs dev server.
- 2026-04-29 Composer engine split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. Composer detail and render URLs returned `200 OK` after restarting the docs dev server.
- 2026-04-29 foundations docs split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. `curl --max-time 12 -I http://localhost:3000/foundations` returned `200 OK` after restarting the docs dev server.
- 2026-04-29 home docs split: `bun run format`, `bun run typecheck`, `bun test`, `bun run lint`, and `bun run build` passed. `curl --max-time 12 -I http://localhost:3000/` returned `200 OK` after restarting the docs dev server.
- 2026-04-29 final stabilization: `bun run format`, `bun test`, `bun run lint`, `bun run typecheck`, and `bun run build` passed after deleting redundant barrels, removing docs control duplication, tightening registry tests, and applying the narrow mobile containment fix. Dev server was restarted on `http://localhost:3000`; sampled home, foundations, primitive detail, component detail, and render routes returned `200 OK`, and in-app browser inspection showed no console errors on inspected routes.

## Next Actions

- Ready for review/ship assessment. Remaining non-blocking follow-ups: broader visual screenshot sweep, later CSS layer split by item/cluster if useful, and commit/PR organization for the large refactor diff.
- Avoid additional broad refactor churn unless a gate or review finding exposes a concrete ownership problem.
