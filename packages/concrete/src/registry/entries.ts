import type { ComposerValue } from '../components'
import type { ConcretePressure, PrimitiveCategory } from '../schemas'
import {
	getAreaChartProps,
	getBarChartProps,
	getChartProps,
	getCommandMenuProps,
	getComposerProps,
	getDataTableProps,
	getDatePickerProps,
	getDateRangePickerProps,
	getDonutChartProps,
	getFileUploadProps,
	getFlowDiagramProps,
	getFormDialogProps,
	getFormDrawerProps,
	getFormShellProps,
	getHeatmapProps,
	getImageUploadProps,
	getLineChartProps,
	getMessageProps,
	getMeterProps,
	getMetricCardProps,
	getMultiSelectProps,
	getNumberStepperProps,
	getPasswordInputProps,
	getPrimitiveProps,
	getPrimitiveStates,
	getRangeSliderProps,
	getReasoningMessageProps,
	getSearchBarProps,
	getSettingsPanelProps,
	getStackedBarChartProps,
	getTimePickerProps,
	getToolbarProps,
	getToolCallMessageProps,
	getValidationSummaryProps,
	prop,
	states
} from './props'
import type {
	ComponentRegistryEntry,
	ComponentSlug,
	PrimitiveProp,
	PrimitiveRegistryEntry,
	PrimitiveSlug,
	PrimitiveState
} from './types'

export const primitiveRegistry = [
	entry(
		'button',
		'Button',
		'Tight command control with loading, icon, shortcut, and variant states.',
		'control',
		['product', 'generative'],
		'Buttons are short commands. Use primary for the one dominant action, sky for pointer moments, ultra for upgrade/pro moments, and danger only for destructive actions.',
		[
			prop(
				'variant',
				"'primary' | 'secondary' | 'soft' | 'ghost' | 'sky' | 'sky-soft' | 'ultra' | 'danger'",
				'Visual role of the command.',
				'secondary'
			),
			prop(
				'size',
				"'tiny' | 'small' | 'medium' | 'large'",
				'Control height and type rhythm.',
				'medium'
			),
			prop('leadingIcon', 'IconName | ReactElement', 'Optional glyph before the label.'),
			prop('trailingIcon', 'IconName | ReactElement', 'Optional glyph after the label.'),
			prop('shortcut', 'readonly string[]', 'Keyboard hints rendered as Concrete keycaps.'),
			prop(
				'pressed',
				'boolean',
				'Temporary active affordance for keyboard-triggered or programmatic button activation.',
				'false'
			),
			prop(
				'loading',
				'boolean',
				'Replaces the leading slot with a spinner and disables the button.',
				'false'
			),
			prop('iconOnly', 'boolean', 'Locks the button to a square icon control.', 'false')
		],
		states([
			['default', 'Variants, icon, and shortcut states.'],
			['signal', 'Ultra and destructive signal actions.'],
			['pressed', 'Keyboard-triggered active affordance with highlighted keycaps.'],
			['loading', 'Disabled pending command state.']
		])
	),
	entry(
		'input',
		'Input',
		'Single-line field with label, help, leading icon, disabled, and error states.',
		'form',
		['product', 'generative']
	),
	entry(
		'field',
		'Field',
		'Form chrome primitive for label, description, helper, validation, and counts.',
		'form',
		['product', 'generative'],
		'Field owns field-level hierarchy only. It does not own input state or validation logic; compose it around the primitive or component that owns the control.'
	),
	entry(
		'dropzone',
		'Dropzone',
		'Dashed upload target primitive with active, disabled, icon, and descriptive states.',
		'form',
		['product'],
		'Dropzone is a visual target and label surface. Product code or a higher-level upload component owns file transport and storage.'
	),
	entry(
		'upload-item',
		'Upload item',
		'Single uploaded-file row with thumbnail, progress, status, and remove affordance.',
		'media',
		['product'],
		'Use UploadItem inside upload components or queues. Keep the row compact and let progress/status carry the interaction state.'
	),
	entry(
		'caret',
		'Caret',
		'Disclosure chevron with open, directional, and size states.',
		'control',
		['product'],
		'Caret is an affordance, not decoration. Keep it currentColor, small, and baseline-aligned beside tree rows, accordions, and selects.'
	),
	entry(
		'textarea',
		'Textarea',
		'Multi-line prompt and prose input with validation support.',
		'form',
		['product', 'generative', 'editorial']
	),
	entry('select', 'Select', 'Native option picker styled to the Concrete field rhythm.', 'form', [
		'product'
	]),
	entry('checkbox', 'Checkbox', 'Binary selection primitive with compact row alignment.', 'form', [
		'product'
	]),
	entry(
		'radio',
		'Radio',
		'Exclusive choice primitive with the same row rhythm as checkbox.',
		'form',
		['product']
	),
	entry('switch', 'Switch', 'Binary setting control for product preferences and modes.', 'form', [
		'product'
	]),
	entry(
		'slider',
		'Slider',
		'Range input for scalar tuning without custom interaction code.',
		'form',
		['product']
	),
	entry(
		'card',
		'Card',
		'Hairline surface primitive with raised, sunken, and interactive variants.',
		'surface',
		['product', 'editorial', 'generative', 'educational']
	),
	entry('pill', 'Pill', 'Quiet inline metadata label.', 'status', ['product', 'editorial']),
	entry('chip', 'Chip', 'Selectable inline filter or segmented choice atom.', 'control', [
		'product'
	]),
	entry(
		'badge',
		'Badge',
		'Status-leading signal label using terminal, ultra, or error only.',
		'status',
		['product']
	),
	entry('tag', 'Tag', 'Closeable filter or entity label.', 'status', ['product']),
	entry('avatar', 'Avatar', 'Initials or image identity marker.', 'media', ['product']),
	entry(
		'row',
		'Row',
		'Compact scan-line primitive for lists, menus, and dense product panes.',
		'layout',
		['product', 'generative'],
		'Rows are the base unit of product density. Keep metadata right-aligned, truncate labels, and use one leading affordance.'
	),
	entry('bubble', 'Bubble', 'Compact conversational message surface.', 'surface', [
		'generative',
		'product'
	]),
	entry('code', 'Code', 'Mono code block and inline code treatment.', 'typography', [
		'editorial',
		'product'
	]),
	entry('kbd', 'Kbd', 'Keyboard shortcut keycap.', 'typography', ['product']),
	entry(
		'spinner',
		'Spinner',
		'Small loading indicator for command and inline pending states.',
		'feedback',
		['product', 'generative']
	),
	entry('link', 'Link', 'Ink-first text link with restrained underline treatment.', 'navigation', [
		'editorial',
		'product'
	]),
	entry('divider', 'Divider', 'Hairline separator with optional mono label.', 'layout', [
		'product',
		'editorial'
	]),
	entry(
		'empty-state',
		'Empty state',
		'Blank-slate composition with dashed glyph tile and terse copy.',
		'feedback',
		['product', 'educational']
	),
	entry('tooltip', 'Tooltip', 'Dark inverse hint surface for focused labels.', 'feedback', [
		'product'
	]),
	entry(
		'progress',
		'Progress',
		'Linear completion primitive with neutral, sky, and signal fills.',
		'data',
		['product', 'generative']
	),
	entry('stat', 'Stat', 'KPI number lockup for dense dashboards.', 'data', [
		'product',
		'generative'
	]),
	entry(
		'delta',
		'Delta',
		'Compact change indicator using terminal, error, or neutral ink.',
		'data',
		['product']
	),
	entry('sparkline', 'Sparkline', 'Tiny trend primitive rendered as line or bar SVG.', 'data', [
		'product',
		'generative',
		'educational'
	]),
	entry('distribution', 'Distribution', 'Part-to-whole bar list for dense summary data.', 'data', [
		'product',
		'generative'
	]),
	entry(
		'indicator',
		'Indicator',
		'Dot, legend, and series key punctuation for data surfaces and live rows.',
		'data',
		['product', 'generative']
	),
	entry(
		'skeleton',
		'Skeleton',
		'Structural loading atom for educational and product placeholders.',
		'feedback',
		['product', 'educational']
	),
	entry('frame', 'Frame', 'Single-border content frame with optional texture ground.', 'layout', [
		'editorial',
		'product',
		'educational'
	]),
	entry(
		'texture',
		'Texture',
		'Lattice, dot, and line grounds from the foundation tokens.',
		'foundation',
		['editorial', 'educational']
	),
	entry('brand-mark', 'Brand mark', 'Concrete C-glyph in a compact mark tile.', 'brand', [
		'editorial',
		'product'
	]),
	entry(
		'wordmark',
		'Wordmark',
		'Rubric wordmark text treatment for docs and product chrome.',
		'brand',
		['editorial', 'product']
	),
	entry('icon', 'Icon', 'Lucide-compatible currentColor icon surface.', 'foundation', ['product']),
	entry(
		'focus-ring',
		'Focus ring',
		'Single 3px sky ring standard applied to interactive atoms.',
		'foundation',
		['product']
	)
] as const satisfies readonly PrimitiveRegistryEntry[]

export const composerExampleValue: ComposerValue = {
	attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
	commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
	html: '',
	mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
	text: "Hey @arihan - can we run /eval triage-v2 against the new contract? I'll pair on the diff."
}

export const componentRegistry = [
	componentEntry(
		'toolbar',
		'Toolbar',
		'Atomic toolbar with quiet icon controls, optional chip appearance, tooltip shortcuts, roving arrow-key focus, selected state, and pressed feedback.',
		'control',
		['product', 'generative'],
		'Toolbar is for quiet clustered controls. Use icon or subtle appearance for tools, and reserve chip appearance for true labeled toggle choices.',
		getToolbarProps(),
		states([
			['default', 'Grouped controls with tooltip and shortcut affordances.'],
			['selected', 'Selected and keyboard-pressed states for mode controls.'],
			['compact', 'Dense rail suitable for editors, inspectors, and composers.']
		])
	),
	componentEntry(
		'command-menu',
		'Command menu',
		'Searchable action and navigation listbox with grouped items, keyboard navigation, shortcuts, loading, and empty states.',
		'navigation',
		['product', 'generative'],
		'Command menu is the shared substrate for palettes, / commands, @ suggestions, quick switchers, and model/action pickers.',
		getCommandMenuProps(),
		states([
			['default', 'Palette with search, grouped results, active row, shortcuts, and footer hints.'],
			['empty', 'No-result state with the same shell and keyboard contract.'],
			['loading', 'Pending remote results without changing layout.']
		])
	),
	componentEntry(
		'search-bar',
		'Search bar',
		'Compact single-line command input with removable scope tokens, keyboard hint, action slots, and optional menu slot.',
		'form',
		['product', 'generative'],
		'Search bar is intentionally slot-first: it can stay a search field, become a prompt bar, or host a command menu without changing the primitive contract.',
		getSearchBarProps(),
		states([
			['default', 'Plain search with shortcut and trailing action.'],
			['scoped', 'Search with removable scope tokens and action slots.'],
			['menu', 'Search bar composed with the command menu slot.']
		])
	),
	componentEntry(
		'form-shell',
		'Form shell',
		'Canonical form container with title hierarchy, metadata, action slots, body spacing, status border, and sticky-feeling footer.',
		'layout',
		['product'],
		'Form shell owns product form chrome and density. It deliberately slots controls and policy so persistence, submit rules, and validation source stay in application code.',
		getFormShellProps(),
		states([
			['default', 'Panel shell with sections and action footer.'],
			['validation', 'Shell composed with validation summary.'],
			['compact', 'Dense settings surface rhythm.']
		])
	),
	componentEntry(
		'validation-summary',
		'Validation summary',
		'Top-level form feedback with status icon, field-linked items, compact copy, and optional action slot.',
		'feedback',
		['product'],
		'Validation summary is for cross-field feedback and submit blocking. Field-level messages still live on Field, Input, and composed controls.',
		getValidationSummaryProps(),
		states([
			['error', 'Submit-blocking errors with field links.'],
			['success', 'Positive ready state.'],
			['mixed', 'Multiple rows with mixed statuses.']
		])
	),
	componentEntry(
		'settings-panel',
		'Settings panel',
		'Dense settings form composed from shell, sections, rows, and slotted primitive controls.',
		'layout',
		['product'],
		'Settings panel is a row-based assembly helper. It standardizes layout and hierarchy while every control stays an explicit primitive or component slot.',
		getSettingsPanelProps(),
		states([
			['default', 'Dense product settings with toggles, select, stepper, and upload state.'],
			['error', 'Settings panel with row and summary validation.'],
			['compact', 'Short modal-friendly settings stack.']
		])
	),
	componentEntry(
		'form-dialog',
		'Form dialog',
		'Inline or fixed modal form surface using FormShell inside a dimmed stage.',
		'layout',
		['product'],
		'Form dialog provides the constrained form surface. Product code owns focus trapping and portal strategy when using fixed presentation.',
		getFormDialogProps(),
		states([
			['default', 'Centered modal form with text, choice, and footer actions.'],
			['wide', 'Wider modal for picker and upload compositions.'],
			['error', 'Dialog with validation feedback.']
		])
	),
	componentEntry(
		'form-drawer',
		'Form drawer',
		'Inline or fixed side-sheet form surface for inspect-and-edit workflows.',
		'layout',
		['product'],
		'Form drawer is for contextual editing beside dense product surfaces. It uses the same shell and row language as panels and dialogs.',
		getFormDrawerProps(),
		states([
			['default', 'Right-side drawer with settings rows.'],
			['review', 'Drawer with validation and review actions.'],
			['left', 'Left-side drawer variant for navigation-adjacent forms.']
		])
	),
	componentEntry(
		'password-input',
		'Password input',
		'Text input composition with secure visibility toggling and field validation chrome.',
		'form',
		['product'],
		'Password input is the canonical pattern for slotting an inline icon action into a field without changing input semantics.',
		getPasswordInputProps(),
		states([
			['default', 'Hidden password with reveal action.'],
			['visible', 'Password revealed as plain text.'],
			['error', 'Validation error surfaced through Field.']
		])
	),
	componentEntry(
		'multi-select',
		'Multi select',
		'Tag-backed option picker with local filtering, disabled options, max selection, and removable values.',
		'form',
		['product', 'generative'],
		'Multi select composes Field, Tag, and menu rows. It owns local picker interaction; product code owns option sourcing and persistence.',
		getMultiSelectProps(),
		states([
			['default', 'Selected values rendered as removable tags.'],
			['open', 'Filterable option menu with selected row state.'],
			['empty', 'Placeholder-only state before selection.']
		])
	),
	componentEntry(
		'date-picker',
		'Date picker',
		'Single-date picker with calendar panel, month navigation, min/max bounds, and controlled value support.',
		'form',
		['product'],
		'Date picker is intentionally dependency-free for v1: ISO date strings at the boundary, product-local formatting outside the component when needed.',
		getDatePickerProps(),
		states([
			['default', 'Closed date field.'],
			['open', 'Calendar popdown with selected day.'],
			['bounded', 'Date picker with unavailable days.']
		])
	),
	componentEntry(
		'date-range-picker',
		'Date range picker',
		'Range picker for start/end ISO dates with calendar selection and in-range treatment.',
		'form',
		['product'],
		'Date range picker returns a small object boundary and keeps range intent visible without introducing a date runtime dependency.',
		getDateRangePickerProps(),
		states([
			['default', 'Closed range field.'],
			['open', 'Open calendar with active range.'],
			['partial', 'Start date selected while waiting for an end date.']
		])
	),
	componentEntry(
		'time-picker',
		'Time picker',
		'Compact HH:mm picker with interval-generated options and controlled value support.',
		'form',
		['product'],
		'Time picker stays a focused menu primitive for time-of-day selection; timezone and scheduling rules belong to product code.',
		getTimePickerProps(),
		states([
			['default', 'Closed time field.'],
			['open', 'Scrollable time menu.'],
			['dense', 'Short interval list for detailed scheduling.']
		])
	),
	componentEntry(
		'number-stepper',
		'Number stepper',
		'Inline numeric input with decrement/increment controls, min/max, and step support.',
		'form',
		['product'],
		'Number stepper is for small bounded adjustments. Use a slider when the value is approximate or continuous.',
		getNumberStepperProps(),
		states([
			['default', 'Bounded numeric adjustment.'],
			['small', 'Compact quantity control.'],
			['error', 'Invalid or out-of-policy value.']
		])
	),
	componentEntry(
		'range-slider',
		'Range slider',
		'Two-thumb range adjustment with an aligned filled rail and controlled tuple value.',
		'form',
		['product', 'generative'],
		'Range slider is a component because it coordinates two native range inputs while keeping the visual rail deterministic.',
		getRangeSliderProps(),
		states([
			['default', 'Selected range on a 0-100 scale.'],
			['narrow', 'Narrow range for filtering.'],
			['wide', 'Broad inclusive range.']
		])
	),
	componentEntry(
		'file-upload',
		'File upload',
		'Local upload queue composition with dropzone, file validation, progress rows, and remove actions.',
		'form',
		['product'],
		'File upload owns local selection and value shape only. Applications own signed URLs, transport, retries, virus scanning, and persistence.',
		getFileUploadProps(),
		states([
			['default', 'Dropzone with a completed file row.'],
			['empty', 'Empty drop target.'],
			['error', 'Rejected file row with validation copy.']
		])
	),
	componentEntry(
		'image-upload',
		'Image upload',
		'Image-specific upload composition with previews, accept filtering, and avatar/grid variants.',
		'media',
		['product'],
		'Image upload is a tuned FileUpload preset for media previews. It does not crop, transform, or store assets.',
		getImageUploadProps(),
		states([
			['single', 'Single preview image upload.'],
			['avatar', 'Compact avatar-oriented image picker.'],
			['grid', 'Multi-image grid treatment.']
		])
	),
	componentEntry(
		'metric-card',
		'Metric card',
		'KPI tile composed from Stat, Delta, Sparkline, Indicator, and Concrete surface primitives.',
		'data',
		['product', 'generative'],
		'Metric card is for compact dashboard summaries. It accepts formatted values at the boundary and leaves business math to product code.',
		getMetricCardProps(),
		states([
			['default', 'KPI tile with value, delta, and sparkline.'],
			['status', 'Metric with a terminal status indicator.'],
			['compact', 'Dense grid tile for dashboard rows.']
		])
	),
	componentEntry(
		'meter',
		'Meter',
		'Progress summary card that composes Concrete linear and ring progress primitives.',
		'data',
		['product', 'generative'],
		'Meter is a bounded progress summary, not a charting framework. Use it for quotas, completion, utilization, and health summaries.',
		getMeterProps(),
		states([
			['bar', 'Linear progress summary with target copy.'],
			['ring', 'Circular progress summary for compact scorecards.'],
			['signal', 'Terminal, ultra, and error signal meters.']
		])
	),
	componentEntry(
		'line-chart',
		'Line chart',
		'Multi-series trend chart with Concrete grid, endpoint, target, and legend language.',
		'data',
		['product', 'generative'],
		'Line chart is the default trend primitive for product summaries. Use dots only for inspection states; let the line and endpoint carry the hierarchy.',
		getLineChartProps(),
		states([
			['default', 'Multi-series line chart with endpoint labels.'],
			['target', 'Trend with a horizontal reference target.'],
			['inspect', 'Point markers enabled for inspection.'],
			['loading', 'Stable loading state.'],
			['empty', 'No-data state.'],
			['error', 'Failed data state.']
		])
	),
	componentEntry(
		'area-chart',
		'Area chart',
		'Soft filled trend chart for volume, confidence, and generated UI previews.',
		'data',
		['generative', 'product'],
		'Area chart should stay light. It is useful when the signal is cumulative or atmospheric, not when exact comparison is the main task.',
		getAreaChartProps(),
		states([
			['default', 'Soft area chart with endpoint labels.'],
			['quiet', 'Transparent surface and hidden axes for compact generated UI.'],
			['dots', 'Inspection state with point markers.']
		])
	),
	componentEntry(
		'bar-chart',
		'Bar chart',
		'Categorical comparison chart with optional comparison bars and horizontal rails.',
		'data',
		['product', 'generative'],
		'Bar chart is for ranked or categorical values. Keep labels sparse and use comparison bars only when they answer a direct before/after question.',
		getBarChartProps(),
		states([
			['default', 'Vertical bars with value labels.'],
			['comparison', 'Muted comparison bars behind the primary series.'],
			['horizontal', 'Horizontal rail layout for ranked lists.'],
			['quiet', 'No value labels for dense cards.']
		])
	),
	componentEntry(
		'stacked-bar-chart',
		'Stacked bar chart',
		'Composition chart for small category stacks across time or groups.',
		'data',
		['product', 'generative'],
		'Stacked bar chart is for composition, not precise comparison. Keep the segment count low and prefer normalized bars when the share is more important than total volume.',
		getStackedBarChartProps(),
		states([
			['default', 'Vertical stacked composition.'],
			['normalized', 'Normalized 100% composition.'],
			['horizontal', 'Rail layout for compact summaries.']
		])
	),
	componentEntry(
		'donut-chart',
		'Donut chart',
		'Part-to-whole ring summary with controlled center metric and thickness.',
		'data',
		['generative', 'product'],
		'Donut chart works best for a small number of stable segments. It should summarize, not explain an entire distribution.',
		getDonutChartProps(),
		states([
			['default', 'Medium ring with center label.'],
			['thin', 'Thin ring for quiet summaries.'],
			['thick', 'Thick ring for primary scorecards.'],
			['plain', 'Ring without center label.']
		])
	),
	componentEntry(
		'heatmap',
		'Heatmap',
		'Two-axis intensity grid for compact activity and density summaries.',
		'data',
		['product', 'educational', 'generative'],
		'Heatmap should use one accent scale with restrained contrast. Use it when relative density matters more than exact values.',
		getHeatmapProps(),
		states([
			['default', 'Labeled intensity grid with values.'],
			['quiet', 'Values hidden for denser overview cards.'],
			['sunken', 'Sunken plot surface for dashboard wells.']
		])
	),
	componentEntry(
		'chart',
		'Chart',
		'Backward-compatible discriminated union wrapper for every focused chart component.',
		'data',
		['product', 'generative'],
		'Chart is a convenience wrapper. Prefer LineChart, BarChart, DonutChart, and Heatmap in product code when the chart type is known.',
		getChartProps(),
		states([
			['line', 'Multi-series line chart with a target marker.'],
			['area', 'Soft area chart for trend previews.'],
			['bar', 'Grouped bar comparison.'],
			['stacked', 'Stacked bar composition.'],
			['donut', 'Part-to-whole ring summary.'],
			['heatmap', 'Compact two-axis intensity grid.'],
			['loading', 'Stable loading state.'],
			['empty', 'No-data state.'],
			['error', 'Failed data state.']
		])
	),
	componentEntry(
		'data-table',
		'Data table',
		'Dense typed table with sortable columns, selection, search, filters, pagination, and rich cells.',
		'data',
		['product'],
		'Data table is the canonical product grid for Concrete. Use createDataTableColumns<Row>() to keep columns aligned to row data.',
		getDataTableProps(),
		states([
			['default', 'Dense table with status, delta, sparkline, and meter cells.'],
			['selected', 'Selectable rows with toolbar actions.'],
			['filtered', 'Search and filter controls with pagination.'],
			['empty', 'No-row state inside the same table shell.']
		])
	),
	componentEntry(
		'flow-diagram',
		'Flow diagram',
		'Routed node and edge diagram for agent plans, systems, memory flows, and tool pipelines.',
		'data',
		['product', 'generative', 'educational'],
		'Flow diagram is a deterministic SVG map for explainers and product inspectors. It exposes selection and local node movement without owning graph persistence.',
		getFlowDiagramProps(),
		states([
			['default', 'Routed node graph with muted edges.'],
			['selected', 'Selected node and edge states.'],
			['interactive', 'Controls and draggable nodes enabled.'],
			['empty', 'Empty graph state.']
		])
	),
	componentEntry(
		'message',
		'Message',
		'Role-aware message wrapper with avatars, plain or bubble surfaces, metadata, and subtle action toolbars.',
		'surface',
		['generative', 'product'],
		'Message keeps transcript structure portable: role, author, avatar, status, meta, surface, actions, and body. It does not own transport or persistence.',
		getMessageProps(),
		states([
			['assistant', 'Assistant response with metadata and actions.'],
			['user', 'Outbound user message treatment.'],
			['system', 'System note for constraints, memory, or run context.']
		])
	),
	componentEntry(
		'reasoning-message',
		'Reasoning message',
		'Subdued expandable reasoning line for visible agent progress, scoped steps, and streaming state.',
		'feedback',
		['generative', 'product'],
		'Reasoning message communicates process as a collapsible progress artifact. It stays visually below final answers and generated UI.',
		getReasoningMessageProps(),
		states([
			['streaming', 'Open reasoning artifact with active step.'],
			['complete', 'Completed reasoning summary.'],
			['collapsed', 'Collapsed summary-only state.']
		])
	),
	componentEntry(
		'tool-call-message',
		'Tool call message',
		'Collapsible tool execution artifact with status, duration, optional input code, and output.',
		'feedback',
		['generative', 'product'],
		'Tool call message makes agent work inspectable. The component renders status and artifacts; application code owns execution and permissions.',
		getToolCallMessageProps(),
		states([
			['running', 'Active tool call with indeterminate progress.'],
			['success', 'Completed call with output.'],
			['error', 'Failed call with error output.']
		])
	),
	componentEntry(
		'composer',
		'Composer',
		'Agentic message input with token chips, mentions, commands, attachments, formatting, keyboard submission, and deterministic value output.',
		'layout',
		['product', 'generative'],
		'Composer owns the reusable local interaction contract: token insertion, command and mention menus, rich text formatting shortcuts, attachment display, and controlled/uncontrolled value flow. Product code owns persistence, remote search, uploads, command execution, collaboration, and domain-specific editor schemas.',
		getComposerProps(),
		states([
			['default', 'Filled message with mention, command, attachment, shortcut hint, and send action.'],
			['empty', 'Blank composer with placeholder and toolbar affordances.'],
			['mention', 'Mention popdown opened from the @ trigger.'],
			['command', 'Command popdown opened from the / trigger.'],
			['formatting', 'Rich formatted content with inline command and mention tokens.'],
			['disabled', 'Read-only pending surface with all controls disabled.']
		])
	)
] as const satisfies readonly ComponentRegistryEntry[]

export function getPrimitiveEntry(slug: string): PrimitiveRegistryEntry | undefined {
	return primitiveRegistry.find(entryValue => entryValue.slug === slug)
}

export function getComponentEntry(slug: string): ComponentRegistryEntry | undefined {
	return componentRegistry.find(entryValue => entryValue.slug === slug)
}

function componentEntry(
	slug: ComponentSlug,
	name: string,
	description: string,
	category: PrimitiveCategory,
	pressure: readonly ConcretePressure[],
	guidance: string,
	props: readonly PrimitiveProp[],
	statesValue: readonly PrimitiveState[]
): ComponentRegistryEntry {
	return {
		category,
		description,
		guidance,
		name,
		pressure,
		props,
		slug,
		states: statesValue
	}
}

function entry(
	slug: PrimitiveSlug,
	name: string,
	description: string,
	category: PrimitiveCategory,
	pressure: readonly ConcretePressure[],
	guidance = description,
	props?: readonly PrimitiveProp[],
	statesValue?: readonly PrimitiveState[]
): PrimitiveRegistryEntry {
	return {
		category,
		description,
		guidance,
		name,
		pressure,
		props: props ?? getPrimitiveProps(slug),
		slug,
		states: statesValue ?? getPrimitiveStates(slug)
	}
}
