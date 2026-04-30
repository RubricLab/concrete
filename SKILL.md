---
name: concrete
description: Use this skill when building with Concrete, Rubric Labs' React design system for AI-native product surfaces, editorial research, generated UI, agent workflows, and educational explainers.
user-invocable: true
---

# Concrete

Concrete is Rubric Labs' design system for AI-native software. It is soft, powerful, and compact: calm surfaces, high-density product structure, and a shared visual language for product screens, research writing, generated interfaces, agent workflows, and educational explainers.

Use this skill when you need Concrete-native UI decisions, package imports, registry breadth, render route guidance, or AI-agent rules for building with the system.

## Install

```sh
bun add @rubriclab/concrete
```

```tsx
import '@rubriclab/concrete/styles.css'
import { Badge, Button, Card } from '@rubriclab/concrete'
import { Composer } from '@rubriclab/concrete/components'
import { foundationRegistry } from '@rubriclab/concrete/registry'
```

## Package Interfaces

- `@rubriclab/concrete`: primary React primitives, components, schemas, registry, and icons.
- `@rubriclab/concrete/components`: composed product behavior built from primitives.
- `@rubriclab/concrete/primitives`: atomic DOM-owning Concrete vocabulary.
- `@rubriclab/concrete/foundations`: foundation definitions and token metadata.
- `@rubriclab/concrete/registry`: foundations, primitives, components, examples, controls, and render metadata.
- `@rubriclab/concrete/icons`: typed icon and brand asset registry.
- `@rubriclab/concrete/schemas`: Zod schemas for runtime boundaries.
- `@rubriclab/concrete/styles.css`: foundation tokens, utilities, primitive styles, and component styles.

## Non-negotiables

- Import `@rubriclab/concrete/styles.css` before rendering package UI.
- Use the ink ramp first. Sky is the only accent.
- Use exactly three signals: `terminal`, `ultra`, and `error`.
- Do not add amber warning variants, decorative gradients, double borders, emoji, bouncy motion, or loose component APIs.
- Keep primitive props semantic: role, hierarchy, tone, density, state, and intent. Do not expose raw aesthetic dials.
- Pressure is composition guidance, not a universal primitive prop.
- Prefer foundations before primitive CSS, primitives before components, and registry-backed examples before bespoke demos.

## Pressure Guidance

- `product`: dense, nested, scan-first surfaces with rows, tables, panes, filters, transcripts, forms, command surfaces, and agent state.
- `editorial`: lower-density reading surfaces with stronger typography, longer rhythm, and clear hierarchy.
- `generative`: focused product output such as one generated chart, table, form, answer panel, or tool result.
- `educational`: simplified primitives, skeletons, diagrams, frames, and examples that teach concepts without pretending to be a full app.

<!-- concrete-skill:generated:start -->
## Registry Map

This section is generated from `foundationRegistry`, `primitiveRegistry`, and `componentRegistry`. Run `bun run build:skill` after registry changes.

Concrete currently exposes 12 foundations, 84 primitives, and 34 components.

### Foundations

#### Colors

Color tokens for ink, surfaces, accents, and the three Concrete signals.

- Slug: `colors`
- Category: `foundation`
- Pressure: `product`, `editorial`, `generative`, `educational`
- Guidance: Use tokens directly through Concrete CSS variables; do not create component-local palettes.
- Tokens: Palette (23: `canvas`, `surface`, `raised`, `sunken`, `mist`, `ink-9`, `ink-8`, `ink-7`, plus 15 more)

#### Typography

Type families, scale, line height, and tracking for Concrete reading and product UI.

- Slug: `typography`
- Category: `typography`
- Pressure: `product`, `editorial`, `educational`
- Guidance: Use Jakarta for interface density and reserve Fraunces for editorial display moments.
- Tokens: Display (2: `display`, `hero`); Sans (7: `h1`, `h2`, `h3`, `article`, `body`, `label`, `caps`); Mono (1: `mono`)

#### Spacing

Compact spacing steps for dense but legible composition.

- Slug: `spacing`
- Category: `layout`
- Pressure: `product`, `editorial`, `generative`, `educational`
- Guidance: Prefer smaller repeated steps over bespoke gaps; pressure comes from composition density.
- Tokens: Tokens (15: `space-1`, `space-2`, `space-3`, `space-4`, `space-5`, `space-6`, `space-8`, `space-10`, plus 7 more)

#### Sizing

Dimension tokens for controls, icons, tracks, media, viewports, and measures.

- Slug: `sizing`
- Category: `foundation`
- Pressure: `product`, `generative`, `educational`
- Guidance: Use sizing tokens for intrinsic dimensions. Use spacing tokens for rhythm and layout tokens for composition.
- Tokens: Control (3: `field-control`, `button-medium`, `toolbar-control`); Icon (1: `icon-medium`); Avatar (1: `avatar-medium`); Track (2: `progress-track`, `slider-hit`); Measure (2: `form-dialog`, `agent-panel`); Viewport (1: `diagram-canvas`); Data (1: `chart-height`); Media (1: `thumbnail`)

#### Layout

Composition recipes for grids, layers, offsets, responsive behavior, and templates.

- Slug: `layout`
- Category: `layout`
- Pressure: `product`, `generative`, `educational`
- Guidance: Use layout tokens through layout primitives. Components should not invent grid templates or z-index values.
- Tokens: Template (5: `form-row`, `picker-control`, `calendar-grid`, `distribution-row`, `heatmap-grid`); Grid (2: `track-fill`, `column-full`); Layer (2: `tooltip`, `form-overlay`); Offset (1: `tooltip-gap`); Responsive (1: `search-wrap`); Utility (1: `flex-fill`)

#### Radii

Tight corner tokens for calm product surfaces.

- Slug: `radii`
- Category: `foundation`
- Pressure: `product`, `generative`, `educational`
- Guidance: Use small radii by default; reserve pill radius for explicit chips and badges.
- Tokens: Tokens (7: `radius-0`, `radius-2`, `radius-3`, `radius-4`, `radius-5`, `radius-6`, `radius-pill`)

#### Elevation

Restrained shadows and borders for Concrete surfaces.

- Slug: `elevation`
- Category: `foundation`
- Pressure: `product`, `generative`
- Guidance: Prefer hairlines first; add shadow only when a surface must separate from its plane.
- Tokens: Tokens (5: `hairline`, `shadow-1`, `shadow-2`, `shadow-3`, `shadow-4`)

#### Motion

Short motion tokens for focus, hover, disclosure, and loading feedback.

- Slug: `motion`
- Category: `foundation`
- Pressure: `product`, `generative`
- Guidance: Motion should clarify state changes without becoming decorative.
- Tokens: Tokens (3: `duration-fast`, `duration`, `ease`)

#### Textures

Quiet texture grounds for diagrams, editorial frames, and educational examples.

- Slug: `textures`
- Category: `foundation`
- Pressure: `editorial`, `educational`
- Guidance: Use texture as structure, never as decorative noise.
- Tokens: Tokens (4: `lattice`, `dots`, `lines`, `depth`)

#### Iconography

Icon roles, alias policy, stroke policy, and semantic glyph categories.

- Slug: `iconography`
- Category: `foundation`
- Pressure: `product`, `editorial`, `generative`, `educational`
- Guidance: Use iconography as semantic policy. The public icons subpath remains the renderer and asset registry.
- Tokens: Action (1: `command`); Navigation (1: `navigation`); Status (1: `status`); Data (1: `data`); Brand (1: `brand`); Editorial (1: `concept`)

#### State

Shared semantic state schemas for tones, statuses, hierarchy, and density.

- Slug: `state`
- Category: `foundation`
- Pressure: `product`, `generative`, `educational`
- Guidance: Use state schemas to close primitive props around semantic intent instead of raw visual overrides.
- Tokens: Tone (2: `signals`, `data-tones`); Status (5: `field-status`, `upload-status`, `data-component-state`, `message-status`, `tool-call-status`); Hierarchy (1: `hierarchy`); Density (1: `density`)

#### Accessibility

Reset-level accessibility utilities and interaction constraints.

- Slug: `accessibility`
- Category: `foundation`
- Pressure: `product`, `editorial`, `generative`, `educational`
- Guidance: Accessibility utilities sit below primitives. Components consume them through primitives, not bespoke CSS.
- Tokens: Visually Hidden (1: `visually-hidden`); Focus (1: `focus-target`); Hit Target (1: `hit-target`); Reduced Motion (1: `reduced-motion`); Forced Colors (1: `forced-colors`)

### Primitives

Primitives are the Concrete HTML vocabulary. They own DOM, scoped classes, schemas, examples, states, and the smallest meaningful styling surface.

- **Control** (14): Button (`button`), Toolbar Control (`toolbar-control`), Search field (`search-field`), Search token (`search-token`), Menu shell (`menu-shell`), Option row (`option-row`), Caret (`caret`), Select control (`select-control`), Select menu (`select-menu`), Chip (`chip`), Composer Shell (`composer-shell`), Composer Rail (`composer-rail`), Diagram Controls (`diagram-controls`), Suggestion menu (`suggestion-menu`)
- **Form** (18): Input (`input`), Field (`field`), Form Layout (`form-layout`), Form Overlay (`form-overlay`), Calendar panel (`calendar-panel`), Dropzone (`dropzone`), Upload field (`upload-field`), Textarea (`textarea`), Select (`select`), Checkbox (`checkbox`), Radio (`radio`), Stepper Control (`stepper-control`), Range Control (`range-control`), Switch (`switch`), Slider (`slider`), Picker control (`picker-control`), Picker shell (`picker-shell`), Time list (`time-list`)
- **Feedback** (8): Message shell (`message-shell`), Feedback Panel (`feedback-panel`), Reasoning panel (`reasoning-panel`), Spinner (`spinner`), Empty state (`empty-state`), Tooltip (`tooltip`), Skeleton (`skeleton`), Tool-call panel (`tool-call-panel`)
- **Data** (13): Metric Shell (`metric-shell`), Data Card Header (`data-card-header`), Chart Surface (`chart-surface`), Chart Legend (`chart-legend`), Data Table Shell (`data-table-shell`), Data Table Control (`data-table-control`), Data Table Pagination (`data-table-pagination`), Progress (`progress`), Stat (`stat`), Delta (`delta`), Sparkline (`sparkline`), Distribution (`distribution`), Indicator (`indicator`)
- **Media** (2): Upload item (`upload-item`), Avatar (`avatar`)
- **Surface** (4): Card (`card`), Bubble (`bubble`), TiltFrame (`tilt-frame`), ScaleFrame (`scale-frame`)
- **Status** (3): Pill (`pill`), Badge (`badge`), Tag (`tag`)
- **Layout** (4): Row (`row`), Preview Stage (`preview-stage`), Divider (`divider`), Frame (`frame`)
- **Typography** (2): Code (`code`), Kbd (`kbd`)
- **Diagram** (10): Concept frame (`concept-frame`), Concept connector (`concept-connector`), Diagram Viewport (`diagram-viewport`), Diagram Rail (`diagram-rail`), Diagram Edge (`diagram-edge`), Diagram MiniMap (`diagram-minimap`), Diagram Legend (`diagram-legend`), Diagram node (`diagram-node`), Diagram item (`diagram-item`), Flow Node (`flow-node`)
- **Navigation** (1): Link (`link`)
- **Foundation** (3): Texture (`texture`), Icon (`icon`), Focus ring (`focus-ring`)
- **Brand** (2): Brand mark (`brand-mark`), Wordmark (`wordmark`)

### Components

Components assemble primitives into reusable product behavior. They should not introduce bespoke styling when a primitive or foundation can own the concept.

- **Control** (1): Toolbar (`toolbar`)
- **Navigation** (1): Command menu (`command-menu`)
- **Form** (9): Search bar (`search-bar`), Password input (`password-input`), Multi select (`multi-select`), Date picker (`date-picker`), Date range picker (`date-range-picker`), Time picker (`time-picker`), Number stepper (`number-stepper`), Range slider (`range-slider`), File upload (`file-upload`)
- **Layout** (5): Form shell (`form-shell`), Settings panel (`settings-panel`), Form dialog (`form-dialog`), Form drawer (`form-drawer`), Composer (`composer`)
- **Feedback** (3): Validation summary (`validation-summary`), Reasoning message (`reasoning-message`), Tool call message (`tool-call-message`)
- **Media** (1): Image upload (`image-upload`)
- **Data** (11): Metric card (`metric-card`), Meter (`meter`), Line chart (`line-chart`), Area chart (`area-chart`), Bar chart (`bar-chart`), Stacked bar chart (`stacked-bar-chart`), Donut chart (`donut-chart`), Heatmap (`heatmap`), Chart (`chart`), Data table (`data-table`), Flow diagram (`flow-diagram`)
- **Surface** (2): FeatureCard (`feature-card`), Message (`message`)
- **Diagram** (1): Diagram canvas (`diagram-canvas`)
<!-- concrete-skill:generated:end -->

## Usage Guide

1. Start with foundations. If a primitive needs a new visual value, add or reuse a foundation token before adding bespoke CSS.
2. Choose primitives for DOM, class names, scoped styles, examples, states, and schemas.
3. Choose components only when behavior or composition repeats across product surfaces.
4. Keep components as primitive assembly. Avoid component-local HTML and CSS unless the missing concept should become a new primitive.
5. Use registry examples and render routes to validate breadth: `/render/primitive/:slug` and `/render/component/:slug`.
6. Run `bun run check` before handing off changes.
