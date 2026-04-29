import type { PrimitiveProp, PrimitiveSlug, PrimitiveState } from './types'

export function prop(
	name: string,
	type: string,
	description: string,
	defaultValue?: string,
	required = false
): PrimitiveProp {
	return {
		description,
		name,
		...(defaultValue === undefined ? {} : { defaultValue }),
		...(required ? { required } : {}),
		type
	}
}

export function states(values: readonly (readonly [string, string])[]): readonly PrimitiveState[] {
	return values.map(([query, description]) => ({
		description,
		name: titleCase(query),
		query
	}))
}

export function commonProps(): readonly PrimitiveProp[] {
	return [
		prop('className', 'string', 'Optional class hook for layout-level styling.'),
		prop('children', 'ReactNode', 'Slot content when the primitive renders children.')
	]
}

export function getToolbarProps(): readonly PrimitiveProp[] {
	return [
		prop('label', 'string', 'Accessible toolbar label.', 'Toolbar'),
		prop('compact', 'boolean', 'Tightens the rail for dense product surfaces.', 'false'),
		prop(
			'ToolbarButton.appearance',
			"'icon' | 'subtle' | 'chip'",
			'Visual role for the control.',
			'icon'
		),
		prop('ToolbarButton.icon', 'IconName', 'Optional tool glyph.'),
		prop('ToolbarButton.shortcut', 'readonly string[]', 'Tooltip or inline shortcut hints.'),
		prop(
			'ToolbarButton.tooltipPlacement',
			"'top' | 'right' | 'bottom' | 'left'",
			'Tooltip placement for cramped surfaces.',
			'top'
		),
		prop('ToolbarButton.selected', 'boolean', 'Persistent selected mode state.', 'false'),
		prop(
			'ToolbarButton.defaultSelected',
			'boolean',
			'Initial selected state for uncontrolled toggle chips.',
			'false'
		),
		prop(
			'ToolbarButton.toggleable',
			'boolean',
			'Allows click to update uncontrolled selected state.',
			'false'
		),
		prop(
			'ToolbarButton.onSelectedChange',
			'(selected: boolean) => void',
			'Back-propagates local toggle state for controlled toolbars.'
		),
		prop('ToolbarButton.pressed', 'boolean', 'Transient keyboard activation state.', 'false'),
		prop(
			'ToolbarButton.showLabel',
			'boolean',
			'Shows the label beside the icon. Defaults to true only for chip appearance or text-only controls.'
		),
		...commonProps()
	]
}

export function getCommandMenuProps(): readonly PrimitiveProp[] {
	return [
		prop(
			'items',
			'readonly CommandMenuItem[]',
			'Grouped command items with labels, metadata, shortcuts, and disabled state.',
			undefined,
			true
		),
		prop('query', 'string', 'Controlled search query.'),
		prop('defaultActiveId', 'string', 'Initial active item id for uncontrolled navigation.'),
		prop('activeId', 'string', 'Controlled active item id.'),
		prop('searchable', 'boolean', 'Renders the search input header.', 'true'),
		prop('loading', 'boolean', 'Shows a pending remote results row.', 'false'),
		prop(
			'onSelect',
			'(item: CommandMenuItem) => void',
			'Called when Enter, Tab, or click selects an enabled item.'
		),
		prop('onEscape', '() => void', 'Called when Escape closes the menu.')
	]
}

export function getSearchBarProps(): readonly PrimitiveProp[] {
	return [
		prop('query', 'string', 'Controlled input query.'),
		prop('defaultValue', 'string', 'Uncontrolled initial query.', "''"),
		prop('tokens', 'readonly SearchToken[]', 'Optional removable scope chips before the input.'),
		prop('actions', 'ReactNode', 'Trailing action slot for submit, filter, or mode controls.'),
		prop('menu', 'ReactNode', 'Popdown slot, commonly a CommandMenu.'),
		prop(
			'menuPlacement',
			"'popdown' | 'inline'",
			'Whether the menu floats over content or reserves flow height.',
			'popdown'
		),
		prop(
			'shortcut',
			'readonly string[]',
			'Keyboard hint rendered as a grouped chord in the field.',
			'[]'
		),
		prop(
			'wrap',
			'boolean',
			'Allows tokens and input to wrap when a composition wants taller search chrome.',
			'false'
		),
		prop('onSubmit', '(query: string) => void', 'Called on form submit.'),
		prop(
			'onTokenRemove',
			'(token: SearchToken) => void',
			'Called when a token close button is clicked.'
		)
	]
}

export function getFormShellProps(): readonly PrimitiveProp[] {
	return [
		prop('title', 'ReactNode', 'Primary form title rendered in the shell header.', undefined, true),
		prop('description', 'ReactNode', 'Supporting copy below the title.'),
		prop('eyebrow', 'ReactNode', 'Optional compact section label above the title.'),
		prop('meta', 'ReactNode', 'Small metadata beside the title.'),
		prop('actions', 'ReactNode', 'Header action slot.'),
		prop('footer', 'ReactNode', 'Footer action slot, usually cancel and submit buttons.'),
		prop('variant', "'panel' | 'modal' | 'drawer'", 'Surface treatment for the shell.', 'panel'),
		prop('status', "'default' | 'error' | 'success'", 'Outer status border treatment.', 'default'),
		prop('compact', 'boolean', 'Tightens header/body spacing for dense settings.', 'false'),
		prop('FormSection.title', 'ReactNode', 'Section title slot.'),
		prop('FormGrid.columns', '1 | 2 | 3', 'Responsive field grid column count.', '2'),
		prop('FormRow.control', 'ReactNode', 'Right-aligned primitive or component control slot.')
	]
}

export function getValidationSummaryProps(): readonly PrimitiveProp[] {
	return [
		prop('title', 'ReactNode', 'Summary title.', 'Review required'),
		prop('description', 'ReactNode', 'Short explanation below the title.'),
		prop(
			'items',
			'readonly ValidationSummaryItem[]',
			'Field-linked validation rows. Serializable item shape is validated by formValidationItemSchema.',
			'[]'
		),
		prop('status', "'default' | 'error' | 'success'", 'Summary status tone.', 'error'),
		prop('action', 'ReactNode', 'Optional right-side action slot.')
	]
}

export function getSettingsPanelProps(): readonly PrimitiveProp[] {
	return [
		prop(
			'sections',
			'readonly SettingsPanelSection[]',
			'Section and row metadata with explicit ReactNode control slots. Serializable metadata is validated by settingsPanelSectionSchema.',
			'',
			true
		),
		...getFormShellProps().filter(
			item => item.name !== 'FormSection.title' && item.name !== 'FormGrid.columns'
		)
	]
}

export function getFormDialogProps(): readonly PrimitiveProp[] {
	return [
		prop('open', 'boolean', 'Controls whether the dialog renders.', 'true'),
		prop(
			'presentation',
			"'inline' | 'fixed'",
			'Inline documentation stage or fixed viewport overlay.',
			'inline'
		),
		prop('size', "'compact' | 'default' | 'wide'", 'Dialog max-width preset.', 'default'),
		prop('onOpenChange', '(open: boolean) => void', 'Close affordance callback.'),
		...getFormShellProps().filter(item => item.name !== 'variant')
	]
}

export function getFormDrawerProps(): readonly PrimitiveProp[] {
	return [
		prop('open', 'boolean', 'Controls whether the drawer renders.', 'true'),
		prop(
			'presentation',
			"'inline' | 'fixed'",
			'Inline documentation stage or fixed viewport overlay.',
			'inline'
		),
		prop('side', "'left' | 'right'", 'Drawer edge for fixed or inline stages.', 'right'),
		prop('onOpenChange', '(open: boolean) => void', 'Close affordance callback.'),
		...getFormShellProps().filter(item => item.name !== 'variant')
	]
}

export function getPasswordInputProps(): readonly PrimitiveProp[] {
	return [
		prop('value', 'string', 'Controlled password value.'),
		prop('defaultValue', 'string', 'Uncontrolled initial password value.'),
		prop('visibleLabel', 'string', 'Accessible label for reveal action.', 'Show password'),
		prop('hiddenLabel', 'string', 'Accessible label for hide action.', 'Hide password'),
		...fieldChromeProps()
	]
}

export function getMultiSelectProps(): readonly PrimitiveProp[] {
	return [
		prop(
			'options',
			'readonly MultiSelectOption[]',
			'Options validated by multiSelectOptionSchema.',
			'',
			true
		),
		prop('value', 'readonly string[]', 'Controlled selected option values.'),
		prop('defaultValue', 'readonly string[]', 'Uncontrolled initial selected values.', '[]'),
		prop('defaultOpen', 'boolean', 'Initial menu state for demos and screenshots.', 'false'),
		prop('maxSelected', 'number', 'Optional maximum selected item count.'),
		prop('placeholder', 'string', 'Placeholder when no values are selected.', 'Select options...'),
		prop('onValueChange', '(value: readonly string[]) => void', 'Receives the selected value ids.'),
		...fieldChromeProps()
	]
}

export function getDatePickerProps(): readonly PrimitiveProp[] {
	return [
		prop('value', 'DateValue', 'Controlled ISO date string.'),
		prop('defaultValue', 'DateValue', 'Uncontrolled initial ISO date string.', 'today'),
		prop('defaultOpen', 'boolean', 'Initial calendar popdown state.', 'false'),
		prop('min', 'DateValue', 'Minimum selectable ISO date.'),
		prop('max', 'DateValue', 'Maximum selectable ISO date.'),
		prop('onValueChange', '(value: DateValue) => void', 'Receives the selected ISO date.'),
		...fieldChromeProps()
	]
}

export function getDateRangePickerProps(): readonly PrimitiveProp[] {
	return [
		prop('value', 'DateRangeValue', 'Controlled start/end ISO date object.'),
		prop('defaultValue', 'DateRangeValue', 'Uncontrolled initial range value.'),
		prop('defaultOpen', 'boolean', 'Initial calendar popdown state.', 'false'),
		prop('min', 'DateValue', 'Minimum selectable ISO date.'),
		prop('max', 'DateValue', 'Maximum selectable ISO date.'),
		prop('onValueChange', '(value: DateRangeValue) => void', 'Receives the next range value.'),
		...fieldChromeProps()
	]
}

export function getTimePickerProps(): readonly PrimitiveProp[] {
	return [
		prop('value', 'TimeValue', 'Controlled HH:mm value.'),
		prop('defaultValue', 'TimeValue', 'Uncontrolled initial HH:mm value.', '14:30'),
		prop('interval', 'number', 'Minute spacing for generated options.', '30'),
		prop('defaultOpen', 'boolean', 'Initial menu state for demos and screenshots.', 'false'),
		prop('onValueChange', '(value: TimeValue) => void', 'Receives the selected HH:mm value.'),
		...fieldChromeProps()
	]
}

export function getNumberStepperProps(): readonly PrimitiveProp[] {
	return [
		prop('value', 'number', 'Controlled numeric value.'),
		prop('defaultValue', 'number', 'Uncontrolled initial value.', '0'),
		prop('min', 'number', 'Minimum committed value.'),
		prop('max', 'number', 'Maximum committed value.'),
		prop('step', 'number', 'Increment and decrement amount.', '1'),
		prop('onValueChange', '(value: number) => void', 'Receives clamped numeric updates.'),
		...fieldChromeProps()
	]
}

export function getRangeSliderProps(): readonly PrimitiveProp[] {
	return [
		prop('value', 'readonly [number, number]', 'Controlled minimum and maximum tuple.'),
		prop('defaultValue', 'readonly [number, number]', 'Uncontrolled initial range.', '[20, 80]'),
		prop('min', 'number', 'Minimum selectable value.', '0'),
		prop('max', 'number', 'Maximum selectable value.', '100'),
		prop('step', 'number', 'Native input step.', '1'),
		prop(
			'onValueChange',
			'(value: readonly [number, number]) => void',
			'Receives the ordered range tuple.'
		),
		...fieldChromeProps()
	]
}

export function getFileUploadProps(): readonly PrimitiveProp[] {
	return [
		prop('value', 'readonly UploadItemValue[]', 'Controlled visible upload queue.'),
		prop('defaultValue', 'readonly UploadItemValue[]', 'Uncontrolled initial upload queue.', '[]'),
		prop('accept', 'string', 'Native file accept string used for local validation.'),
		prop('multiple', 'boolean', 'Allows more than one selected file.', 'true'),
		prop('maxSize', 'number', 'Maximum accepted file size in bytes.'),
		prop('previewImages', 'boolean', 'Creates object URL previews for image files.', 'false'),
		prop('title', 'ReactNode', 'Dropzone title text.', 'Upload files'),
		prop('descriptionText', 'ReactNode', 'Dropzone descriptive copy.'),
		prop(
			'onFilesChange',
			'(files: readonly File[]) => void',
			'Receives selected File objects for product upload code.'
		),
		prop(
			'onValueChange',
			'(value: readonly UploadItemValue[]) => void',
			'Receives the local queue state.'
		),
		...fieldChromeProps()
	]
}

export function getImageUploadProps(): readonly PrimitiveProp[] {
	return [
		prop('variant', "'single' | 'avatar' | 'grid'", 'Preview layout treatment.', 'single'),
		...getFileUploadProps().filter(item => item.name !== 'accept' && item.name !== 'previewImages')
	]
}

export function getMetricCardProps(): readonly PrimitiveProp[] {
	return [
		prop('label', 'string', 'Metric label shown above the value.', undefined, true),
		prop('value', 'string', 'Formatted metric value.', undefined, true),
		prop('unit', 'string', 'Optional unit suffix beside the value.'),
		prop('delta', 'DataDelta', 'Optional terminal/error/neutral change indicator.'),
		prop('trend', 'readonly number[]', 'Optional inline sparkline values.', '[]'),
		prop('trendTone', 'DataTone', 'Overrides the sparkline tone derived from delta intent.'),
		prop('status', 'DataLegendItem', 'Small status indicator in the header.'),
		prop('compact', 'boolean', 'Tight metric card rhythm for dense dashboards.', 'false')
	]
}

export function getMeterProps(): readonly PrimitiveProp[] {
	return [
		prop('label', 'string', 'Meter label shown in the card header.', undefined, true),
		prop('value', 'DataProgressValue', 'Bounded value object parsed at runtime.', undefined, true),
		prop('variant', "'bar' | 'ring'", 'Linear or circular meter rendering.', 'bar'),
		prop('tone', 'DataTone', 'Progress tone mapped to Concrete signals.', 'sky'),
		prop('target', 'number', 'Optional target value called out in the footer.'),
		prop('unit', 'string', 'Rendered value unit.', '%'),
		prop('compact', 'boolean', 'Tighter rail/ring dimensions.', 'false')
	]
}

export function getChartProps(): readonly PrimitiveProp[] {
	return [
		prop(
			'variant',
			"'line' | 'area' | 'bar' | 'stacked-bar' | 'donut' | 'heatmap'",
			'Chart renderer selected by the discriminated schema.',
			'line',
			true
		),
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('height', 'number', 'SVG or grid stage height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('showHeader', 'boolean', 'Shows title, description, and async state indicator.', 'true'),
		prop(
			'surface',
			"'raised' | 'sunken' | 'transparent'",
			'Foundation surface treatment for the plot stage.',
			'raised'
		),
		prop('series', 'readonly DataSeries[]', 'Line and area series data.'),
		prop('points', 'readonly DataPoint[]', 'Bar chart points.'),
		prop('groups', 'readonly StackedBarGroup[]', 'Stacked bar groups.'),
		prop('segments', 'readonly DataPoint[]', 'Donut segments.'),
		prop('cells', 'readonly HeatmapCell[]', 'Heatmap cells.')
	]
}

export function getLineChartProps(): readonly PrimitiveProp[] {
	return [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('series', 'readonly DataSeries[]', 'One or more typed data series.', '[]'),
		prop('target', 'number', 'Optional horizontal reference line.'),
		prop('showDots', 'boolean', 'Shows every point marker for inspection states.', 'false'),
		prop('showEndLabels', 'boolean', 'Labels each series endpoint.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules.', 'true'),
		prop('showXAxis', 'boolean', 'Shows sparse x-axis labels.', 'true'),
		prop('showYAxis', 'boolean', 'Shows y-axis tick labels.', 'true'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	]
}

export function getAreaChartProps(): readonly PrimitiveProp[] {
	return [
		...getLineChartProps(),
		prop('stacked', 'boolean', 'Reserved for stacked area compositions.', 'false')
	]
}

export function getBarChartProps(): readonly PrimitiveProp[] {
	return [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('points', 'readonly DataPoint[]', 'Primary bar data.', '[]'),
		prop('comparisonPoints', 'readonly DataPoint[]', 'Muted comparison bars.', '[]'),
		prop('baseline', 'number', 'Value used as the zero rail for positive or negative bars.', '0'),
		prop('orientation', "'vertical' | 'horizontal'", 'Column or rail layout.', 'vertical'),
		prop('showValues', 'boolean', 'Shows value labels.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules in vertical mode.', 'true'),
		prop('showXAxis', 'boolean', 'Shows axis labels in vertical mode.', 'true'),
		prop('showYAxis', 'boolean', 'Shows tick labels in vertical mode.', 'true'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	]
}

export function getStackedBarChartProps(): readonly PrimitiveProp[] {
	return [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('groups', 'readonly StackedBarGroup[]', 'Stacked bar groups.', '[]'),
		prop('normalized', 'boolean', 'Normalizes each group to 100%.', 'false'),
		prop('orientation', "'vertical' | 'horizontal'", 'Column or rail layout.', 'vertical'),
		prop('showValues', 'boolean', 'Shows group total labels.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules in vertical mode.', 'true'),
		prop('showXAxis', 'boolean', 'Shows axis labels in vertical mode.', 'true'),
		prop('showYAxis', 'boolean', 'Shows tick labels in vertical mode.', 'true'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true')
	]
}

export function getDonutChartProps(): readonly PrimitiveProp[] {
	return [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('segments', 'readonly DataPoint[]', 'Part-to-whole segments.', '[]'),
		prop('centerLabel', 'string', 'Optional center metric override.'),
		prop('showCenterLabel', 'boolean', 'Shows the center metric and leading segment label.', 'true'),
		prop('thickness', "'thin' | 'medium' | 'thick'", 'Ring stroke thickness.', 'medium'),
		prop('height', 'number', 'Plot stage height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	]
}

export function getHeatmapProps(): readonly PrimitiveProp[] {
	return [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('cells', 'readonly HeatmapCell[]', 'Two-axis intensity cells.', '[]'),
		prop('showValues', 'boolean', 'Shows cell values.', 'true'),
		prop('height', 'number', 'Grid stage height.', '220'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Grid stage surface.', 'raised')
	]
}

export function getDataTableProps(): readonly PrimitiveProp[] {
	return [
		prop(
			'columns',
			'readonly DataTableColumn<Row>[]',
			'Typed column definitions. Use createDataTableColumns<Row>() for best DX.',
			undefined,
			true
		),
		prop(
			'rows',
			'readonly Row[]',
			'Typed row data with primitive or rich cell values.',
			undefined,
			true
		),
		prop('selectable', 'boolean', 'Adds a checkbox selection column.', 'false'),
		prop('selectedRowIds', 'readonly string[]', 'Controlled selected row ids.', '[]'),
		prop('sort', 'DataTableSort', 'Controlled sort state.'),
		prop('filters', 'readonly DataTableFilter[]', 'Compact toolbar filter controls.', '[]'),
		prop('searchValue', 'string', 'Controlled search query.', "''"),
		prop('pagination', 'DataTablePagination', 'Optional page status and controls.'),
		prop('toolbarActions', 'readonly DataTableToolbarAction[]', 'Right-side table toolbar actions.'),
		prop('onSortChange', '(sort: DataTableSort | null) => void', 'Receives local sort changes.'),
		prop(
			'onFilterChange',
			'(filterId: string, value: string) => void',
			'Receives filter selection changes.'
		),
		prop(
			'onPageChange',
			'(page: number, pageSize: number) => void',
			'Receives pagination control clicks.'
		)
	]
}

export function getFlowDiagramProps(): readonly PrimitiveProp[] {
	return [
		prop('flow', 'FlowDiagramFlow', 'Validated node and edge graph.', undefined, true),
		prop('title', 'string', 'Diagram title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('selectedNodeId', 'string', 'Highlights one node.'),
		prop('selectedEdgeId', 'string', 'Highlights one routed edge.'),
		prop('controls', 'boolean', 'Shows zoom controls.', 'false'),
		prop('draggableNodes', 'boolean', 'Allows local node dragging.', 'false'),
		prop('pannable', 'boolean', 'Reserved for product-level pan orchestration.', 'false'),
		prop('zoomable', 'boolean', 'Reserved for product-level zoom orchestration.', 'false'),
		prop('legend', 'readonly DataLegendItem[]', 'Optional legend indicators.', '[]'),
		prop('onNodeSelect', '(nodeId: string) => void', 'Node click callback.'),
		prop('onNodeMove', '(nodeId: string, position: Point) => void', 'Drag position callback.')
	]
}

export function getDiagramCanvasProps(): readonly PrimitiveProp[] {
	return [
		prop('graph', 'DiagramCanvasGraph', 'Validated nodes, items, and routed edges.', undefined, true),
		prop('title', 'string', 'Diagram title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('selectedId', 'string', 'Highlights a node, item, or edge.'),
		prop('controls', 'boolean', 'Shows zoom and fit controls.', 'true'),
		prop('minimap', 'boolean', 'Shows a small node overview map.', 'false'),
		prop('pannable', 'boolean', 'Allows local pan interaction.', 'true'),
		prop('zoomable', 'boolean', 'Allows local zoom interaction.', 'true'),
		prop('height', 'number', 'Canvas stage height.', '360'),
		prop('width', 'number', 'Canvas design coordinate width.', '1000'),
		prop(
			'onSelectionChange',
			'(selectedId: string) => void',
			'Receives local node, item, or edge selection.'
		),
		prop('onViewportChange', '(viewport: DiagramViewport) => void', 'Receives pan and zoom changes.')
	]
}

export function fieldChromeProps(): readonly PrimitiveProp[] {
	return [
		prop('label', 'ReactNode', 'Field label.'),
		prop('description', 'ReactNode', 'Supporting copy above the control.'),
		prop('help', 'ReactNode', 'Muted helper text below the control.'),
		prop('error', 'ReactNode', 'Error copy and invalid styling.'),
		prop('success', 'ReactNode', 'Success copy and status styling.'),
		prop('optional', 'boolean', 'Shows optional metadata.', 'false'),
		prop('required', 'boolean', 'Adds a visual required marker.', 'false')
	]
}

export function getMessageProps(): readonly PrimitiveProp[] {
	return [
		prop(
			'messageRole',
			"'assistant' | 'system' | 'tool' | 'user'",
			'Transcript role controlling alignment and tone.',
			'assistant'
		),
		prop(
			'surface',
			"'bubble' | 'plain'",
			'Bubble chat surface or stronger plain answer surface.',
			'bubble'
		),
		prop(
			'status',
			"'complete' | 'error' | 'pending' | 'streaming'",
			'Optional status badge for live or failed messages.',
			'complete'
		),
		prop('author', 'ReactNode', 'Author label shown above the bubble.'),
		prop('avatar', 'ReactNode', 'Custom avatar slot for multiplayer or multi-agent transcripts.'),
		prop('avatarInitials', 'string', 'Convenience initials for the built-in Avatar primitive.'),
		prop('avatarSrc', 'string', 'Convenience image source for the built-in Avatar primitive.'),
		prop(
			'showAvatar',
			'boolean',
			'Forces built-in avatar rendering even without a custom avatar.',
			'false'
		),
		prop(
			'grouped',
			'boolean',
			'Tucks consecutive messages into a tighter transcript rhythm.',
			'false'
		),
		prop('meta', 'ReactNode', 'Timestamp or secondary metadata.'),
		prop('actions', 'ReactNode', 'Subtle toolbar-like action slot below the message body.'),
		...commonProps()
	]
}

export function getReasoningMessageProps(): readonly PrimitiveProp[] {
	return [
		prop('title', 'ReactNode', 'Reasoning artifact title.', 'Reasoning'),
		prop('summary', 'ReactNode', 'Visible process summary without private chain-of-thought.'),
		prop(
			'steps',
			'readonly ReasoningMessageStep[]',
			'Structured collapsible progress steps validated by reasoningStepSchema, with optional render detail.'
		),
		prop('open', 'boolean', 'Initial details disclosure state.', 'false'),
		prop('status', "'complete' | 'error' | 'pending' | 'streaming'", 'Reasoning status.', 'streaming')
	]
}

export function getToolCallMessageProps(): readonly PrimitiveProp[] {
	return [
		prop('name', 'ReactNode', 'Tool or function name.', undefined, true),
		prop('status', "'queued' | 'running' | 'success' | 'error'", 'Tool execution status.', 'running'),
		prop('open', 'boolean', 'Initial disclosure state. Running calls open by default.'),
		prop('duration', 'ReactNode', 'Elapsed time or latency label.'),
		prop('input', 'string', 'Optional input code block.'),
		prop('output', 'ReactNode', 'Result or error output slot.'),
		prop('toolIcon', 'IconName', 'Leading tool glyph.', 'terminal')
	]
}

export function getComposerProps(): readonly PrimitiveProp[] {
	return [
		prop(
			'value',
			'ComposerValue',
			'Controlled rich text, token, and attachment value. Validated by composerValueSchema.'
		),
		prop(
			'defaultValue',
			'ComposerValue',
			'Uncontrolled initial value with text/html, mentions, commands, and attachments.',
			'empty ComposerValue'
		),
		prop(
			'placeholder',
			'string',
			'Placeholder shown when the editor has no content.',
			'Write a message...'
		),
		prop(
			'mentionOptions',
			'readonly ComposerSuggestion[]',
			'People suggestions for @ menus. Validated by composerSuggestionSchema.'
		),
		prop(
			'commandOptions',
			'readonly ComposerSuggestion[]',
			'Slash-command suggestions for / menus. Product code owns execution.'
		),
		prop(
			'defaultMenuKind',
			"'command' | 'mention'",
			'Initial open menu for deterministic demos, onboarding, and screenshots.'
		),
		prop(
			'defaultMenuQuery',
			'string',
			'Initial suggestion filter when defaultMenuKind is set.',
			"''"
		),
		prop(
			'submitOnEnter',
			'boolean',
			'When true, Enter submits and Shift+Enter inserts a line break.',
			'true'
		),
		prop('submitLabel', 'ReactNode', 'Send button label.', 'Send'),
		prop('disabled', 'boolean', 'Locks editor, toolbar, menus, and submit action.', 'false'),
		prop('onValueChange', '(value: ComposerValue) => void', 'Receives deterministic value output.'),
		prop(
			'onSubmit',
			'(value: ComposerValue) => void',
			'Submit callback for keyboard or button send.'
		),
		prop('onAttachmentRequest', '() => void', 'Called when the attach tool is clicked.'),
		prop(
			'onAttachmentRemove',
			'(attachment: ComposerAttachment) => void',
			'Called after a visible attachment chip is removed.'
		)
	]
}

export function getPrimitiveProps(slug: PrimitiveSlug): readonly PrimitiveProp[] {
	switch (slug) {
		case 'avatar':
			return [
				prop('initials', 'string', 'Initials shown when no image is provided.', 'C'),
				prop('src', 'string', 'Optional image URL.'),
				prop('alt', 'string', 'Accessible image text when src is present.', "''"),
				prop('size', "'small' | 'medium' | 'large'", 'Avatar diameter.', 'medium')
			]
		case 'badge':
			return [
				prop(
					'signal',
					"'terminal' | 'ultra' | 'error'",
					'Status signal. Amber warning is intentionally absent.',
					'terminal'
				),
				prop(
					'variant',
					"'soft' | 'solid' | 'ghost' | 'count'",
					'Badge emphasis and count treatment.',
					'soft'
				),
				...commonProps()
			]
		case 'brand-mark':
			return [prop('inverse', 'boolean', 'Flips the mark tile for dark or inverse contexts.', 'false')]
		case 'bubble':
			return [
				prop(
					'direction',
					"'inbound' | 'outbound'",
					'Controls neutral or ink-filled message treatment.',
					'inbound'
				),
				...commonProps()
			]
		case 'button':
			return [
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
					'loading',
					'boolean',
					'Replaces the leading slot with a spinner and disables the button.',
					'false'
				),
				prop('iconOnly', 'boolean', 'Locks the button to a square icon control.', 'false')
			]
		case 'card':
			return [
				prop(
					'variant',
					"'default' | 'raised' | 'sunken'",
					'Surface elevation and ground relationship.',
					'default'
				),
				prop(
					'interactive',
					'boolean',
					'Adds hover lift and tighter border for clickable surfaces.',
					'false'
				),
				prop('title', 'ReactNode', 'Optional compact heading.'),
				prop('description', 'ReactNode', 'Optional muted supporting copy.'),
				...commonProps()
			]
		case 'caret':
			return [
				prop('direction', "'right' | 'down' | 'up'", 'Base chevron orientation.', 'right'),
				prop('open', 'boolean', 'Rotates the caret to the disclosure-open state.', 'false'),
				prop('size', "'small' | 'medium' | 'large'", 'Caret box and stroke rhythm.', 'medium')
			]
		case 'checkbox':
		case 'radio':
		case 'switch':
			return [
				prop('checked', 'boolean', 'Controlled checked state.'),
				prop('defaultChecked', 'boolean', 'Uncontrolled checked state.'),
				prop('label', 'ReactNode', 'Inline label rendered beside the control.'),
				prop('disabled', 'boolean', 'Native disabled behavior and opacity.')
			]
		case 'chip':
			return [
				prop('selected', 'boolean', 'Promotes the chip into the active ink state.', 'false'),
				prop(
					'tone',
					"'default' | 'ink' | 'sky' | 'sunken'",
					'Non-selected tonal treatment.',
					'default'
				),
				prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
				...commonProps()
			]
		case 'code':
			return [
				prop('code', 'string', 'CodeBlock source text.', '', true),
				prop('language', 'string', 'Header label and syntax tokenizer hint.', 'TypeScript'),
				prop('showLineNumbers', 'boolean', 'Renders the numeric gutter.', 'true'),
				prop('copyLabel', 'ReactNode', 'Copy button label.', 'Copy'),
				prop('children', 'ReactNode', 'InlineCode text content.')
			]
		case 'concept-frame':
			return [
				prop('kind', 'ConceptFrameKind', 'Symbolic frame asset name.', 'browser-window'),
				prop('size', "'small' | 'medium' | 'large'", 'SVG display scale.', 'medium'),
				prop('selected', 'boolean', 'Promotes the frame for focused explainer states.', 'false'),
				prop('muted', 'boolean', 'Subdues the frame for background context.', 'false'),
				prop('title', 'string', 'Optional accessible title.')
			]
		case 'concept-connector':
			return [
				prop('kind', 'ConceptConnectorKind', 'Connector grammar asset name.', 'straight'),
				prop(
					'tone',
					"'ink' | 'muted' | 'sky' | 'terminal' | 'ultra' | 'error'",
					'Concrete-native connector tone.',
					'muted'
				),
				prop('selected', 'boolean', 'Highlights the relation.', 'false'),
				prop('muted', 'boolean', 'Subdues the relation.', 'false')
			]
		case 'diagram-node':
			return [
				prop('title', 'ReactNode', 'Primary node label.', '', true),
				prop('meta', 'ReactNode', 'Compact secondary label.'),
				prop(
					'role',
					"'boundary' | 'compute' | 'data' | 'decision' | 'error' | 'external' | 'process'",
					'Node semantic category.',
					'process'
				),
				prop('selected', 'boolean', 'Selected canvas state.', 'false'),
				prop('muted', 'boolean', 'Background canvas state.', 'false')
			]
		case 'diagram-item':
			return [
				prop('title', 'ReactNode', 'Primary item label.', '', true),
				prop('value', 'ReactNode', 'Optional prominent value.'),
				prop('body', 'ReactNode', 'Optional supporting copy.'),
				prop('meta', 'ReactNode', 'Optional small metadata.'),
				prop(
					'kind',
					"'card' | 'chart' | 'code' | 'document' | 'metric' | 'note' | 'status' | 'table'",
					'Item evidence type.',
					'note'
				),
				prop(
					'tone',
					"'ink' | 'muted' | 'sky' | 'terminal' | 'ultra' | 'error'",
					'Concrete-native item tone.',
					'ink'
				),
				prop('selected', 'boolean', 'Selected canvas state.', 'false'),
				prop('muted', 'boolean', 'Background canvas state.', 'false')
			]
		case 'delta':
			return [
				prop('value', 'string', 'Formatted delta text.', '', true),
				prop(
					'intent',
					"'positive' | 'negative' | 'neutral'",
					'Terminal, error, or neutral ink treatment.',
					'neutral'
				),
				prop('size', "'small' | 'medium' | 'large' | 'xlarge'", 'Delta type and icon scale.', 'medium'),
				prop('variant', "'bare' | 'wash'", 'Plain inline delta or soft tinted chip.', 'bare'),
				prop('basis', 'ReactNode', 'Optional comparison basis text.')
			]
		case 'distribution':
			return [
				prop(
					'data',
					'readonly { label: string; value: number; tone?: ProgressTone }[]',
					'Part-to-whole rows.',
					'',
					true
				)
			]
		case 'divider':
			return [prop('label', 'ReactNode', 'Optional mono caps label centered in the rule.')]
		case 'dropzone':
			return [
				prop('title', 'ReactNode', 'Primary drop target label.', 'Upload files'),
				prop('description', 'ReactNode', 'Secondary drop target copy.'),
				prop('icon', 'IconName', 'Glyph shown in the circular affordance.', 'upload'),
				prop('active', 'boolean', 'Highlights drag-over state.', 'false'),
				prop('disabled', 'boolean', 'Locks the target visually and functionally.', 'false'),
				...commonProps()
			]
		case 'empty-state':
			return [
				prop('title', 'ReactNode', 'Primary blank-state message.', '', true),
				prop('body', 'ReactNode', 'Muted explanation.'),
				prop('icon', 'IconName | ReactElement', 'Glyph inside the dashed mark tile.', 'search'),
				prop('size', "'small' | 'medium' | 'large'", 'Mark tile scale.', 'medium'),
				prop('tone', "'default' | 'sky'", 'Default ink or sky mark treatment.', 'default'),
				prop('action', 'ReactNode', 'Optional CTA row.')
			]
		case 'field':
			return [
				prop('label', 'ReactNode', 'Field label.'),
				prop('description', 'ReactNode', 'Supporting copy above the control.'),
				prop('help', 'ReactNode', 'Muted helper text below the control.'),
				prop('error', 'ReactNode', 'Error copy and invalid status.'),
				prop('success', 'ReactNode', 'Success copy and valid status.'),
				prop(
					'status',
					"'default' | 'error' | 'success'",
					'Explicit status when no message sets it.',
					'default'
				),
				prop('count', 'number', 'Current character or item count.'),
				prop('limit', 'number', 'Optional count limit rendered as count / limit.'),
				prop('optional', 'boolean', 'Shows optional metadata.', 'false'),
				prop('required', 'boolean', 'Adds a visual required marker.', 'false'),
				...commonProps()
			]
		case 'focus-ring':
			return [prop('token', '--concrete-ring-focus', 'Global token applied through :focus-visible.')]
		case 'frame':
			return [
				prop('header', 'ReactNode', 'Optional top eyebrow slot.'),
				prop('headerMeta', 'ReactNode', 'Optional top-right meta slot.'),
				prop('footer', 'ReactNode', 'Optional bottom eyebrow slot.'),
				prop('footerMeta', 'ReactNode', 'Optional bottom-right meta slot.'),
				prop('texture', "'lattice' | 'dots' | 'lines'", 'Optional tokenized body ground pattern.'),
				...commonProps()
			]
		case 'texture':
			return [
				prop('texture', "'lattice' | 'dots' | 'lines'", 'Optional tokenized ground pattern.'),
				...commonProps()
			]
		case 'icon':
			return [
				prop('name', 'IconName', 'Typed Concrete icon name.', '', true),
				prop('title', 'string', 'Optional accessible title.')
			]
		case 'indicator':
			return [
				prop(
					'tone',
					"'default' | 'muted' | 'sky' | 'terminal' | 'ultra' | 'error'",
					'Dot color and semantic role.',
					'default'
				),
				...commonProps()
			]
		case 'input':
			return [
				prop('label', 'ReactNode', 'Optional field label.'),
				prop('help', 'ReactNode', 'Muted helper text.'),
				prop('error', 'ReactNode', 'Error copy and invalid treatment.'),
				prop('leadingIcon', 'IconName | ReactElement', 'Glyph inside the left field slot.'),
				prop('placeholder', 'string', 'Native placeholder text.'),
				prop('disabled', 'boolean', 'Native disabled behavior.')
			]
		case 'kbd':
			return [prop('tone', "'default' | 'dark'", 'Keycap surface tone.', 'default'), ...commonProps()]
		case 'link':
			return [
				prop('href', 'string', 'Native anchor destination.'),
				prop('tone', "'default' | 'sky' | 'muted'", 'Inline link tone.', 'default'),
				prop('variant', "'inline' | 'nav'", 'Prose underline or nav-link treatment.', 'inline'),
				prop('external', 'boolean', 'Appends an external-link glyph.', 'false'),
				prop('children', 'ReactNode', 'Link text.')
			]
		case 'tag':
			return [
				prop(
					'tone',
					"'default' | 'ink' | 'sky' | 'sunken' | 'terminal' | 'ultra' | 'error'",
					'Inline label tone or signal wash.',
					'default'
				),
				prop('variant', "'default' | 'outline' | 'active' | 'selected'", 'Tag emphasis.', 'default'),
				prop('size', "'small' | 'medium' | 'large'", 'Tag height and type rhythm.', 'medium'),
				prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
				prop('dismissible', 'boolean', 'Shows a passive dismiss affordance.', 'false'),
				prop('onDismiss', '() => void', 'Interactive dismiss action.'),
				...commonProps()
			]
		case 'pill':
			return [
				prop(
					'tone',
					"'default' | 'ink' | 'sky' | 'sunken' | 'terminal' | 'ultra' | 'error'",
					'Inline label tone or quiet signal wash.',
					'default'
				),
				prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
				...commonProps()
			]
		case 'progress':
			return [
				prop(
					'value',
					'number',
					'Clamped 0-100 progress value. Optional for indeterminate states.',
					'0'
				),
				prop('tone', "'default' | 'sky' | 'terminal' | 'ultra' | 'error'", 'Fill tone.', 'default'),
				prop('size', "'thin' | 'medium' | 'thick'", 'Linear rail thickness.', 'medium'),
				prop('indeterminate', "'shuttle' | 'lined'", 'Unknown-duration progress treatment.'),
				prop('segments', 'number', 'SegmentedProgress segment count.'),
				prop('ProgressRing.size', 'number', 'ProgressRing diameter.'),
				prop('ProgressRing.strokeWidth', 'number', 'ProgressRing stroke width.')
			]
		case 'row':
			return [
				prop('leadingIcon', 'IconName | ReactElement', 'Icon tile at the row start.'),
				prop('meta', 'ReactNode', 'Right-aligned mono metadata.'),
				prop('interactive', 'boolean', 'Adds hover surface treatment.', 'false'),
				...commonProps()
			]
		case 'select':
			return [
				prop(
					'options',
					'readonly { label: string; value: string; disabled?: boolean }[]',
					'Native select options.',
					'',
					true
				),
				prop('label', 'ReactNode', 'Optional field label.'),
				prop('help', 'ReactNode', 'Muted helper text.'),
				prop('error', 'ReactNode', 'Error copy and invalid treatment.')
			]
		case 'skeleton':
			return [
				prop('width', 'number | string', 'Rendered skeleton width.', '100%'),
				prop('height', 'number | string', 'Rendered skeleton height.', '12')
			]
		case 'slider':
			return [
				prop('min', 'number', 'Native minimum.'),
				prop('max', 'number', 'Native maximum.'),
				prop('step', 'number', 'Native step.'),
				prop('defaultValue', 'number', 'Uncontrolled value.'),
				prop('value', 'number', 'Controlled value.'),
				prop('tone', "'default' | 'sky'", 'Track and thumb tone.', 'default')
			]
		case 'sparkline':
			return [
				prop(
					'values',
					'readonly number[]',
					'Series values normalized into the SVG viewport.',
					'',
					true
				),
				prop('variant', "'line' | 'bar' | 'dot'", 'Sparkline mark type.', 'line'),
				prop(
					'tone',
					"'sky' | 'neutral' | 'terminal' | 'error'",
					'Line, endpoint, area, and bar color.',
					'sky'
				),
				prop('area', 'boolean', 'Adds a soft area fill under a line sparkline.', 'false'),
				prop('showEndpoint', 'boolean', 'Shows the last value dot for line sparklines.', 'true')
			]
		case 'spinner':
			return [
				prop('size', 'number', 'Rendered SVG width and height.', '18'),
				prop('tone', "'default' | 'sky' | 'inverse'", 'Stroke tone.', 'default')
			]
		case 'stat':
			return [
				prop('label', 'ReactNode', 'Optional metric label for lockups.'),
				prop('value', 'ReactNode', 'Large numeric value.', '', true),
				prop('unit', 'ReactNode', 'Baseline unit suffix.'),
				prop(
					'variant',
					"'lockup' | 'numeric' | 'display'",
					'Dashboard or editorial numeric treatment.',
					'lockup'
				),
				prop('size', "'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'", 'Numeric scale.', 'medium'),
				prop('tone', "'default' | 'muted' | 'sky'", 'Numeric color treatment.', 'default'),
				prop('delta', 'ReactNode', 'Optional Delta slot.'),
				prop('meta', 'ReactNode', 'Optional muted suffix.')
			]
		case 'textarea':
			return [
				prop('label', 'ReactNode', 'Optional field label.'),
				prop('help', 'ReactNode', 'Muted helper text.'),
				prop('error', 'ReactNode', 'Error copy and invalid treatment.'),
				prop('placeholder', 'string', 'Native placeholder text.')
			]
		case 'tooltip':
			return [
				prop('content', 'ReactNode', 'Tooltip body rendered in the floating surface.'),
				prop('placement', "'top' | 'right' | 'bottom' | 'left'", 'Floating surface placement.', 'top'),
				prop(
					'forceOpen',
					'boolean',
					'Keeps the tooltip visible for documentation and screenshots.',
					'false'
				),
				prop('shortcut', 'readonly string[]', 'Optional keycaps inside the tooltip.'),
				...commonProps()
			]
		case 'upload-item':
			return [
				prop('name', 'ReactNode', 'Visible file name.', '', true),
				prop('meta', 'ReactNode', 'Size, type, or secondary upload metadata.'),
				prop('error', 'ReactNode', 'Error copy shown instead of metadata.'),
				prop('status', "'idle' | 'uploading' | 'success' | 'error'", 'Upload item status.', 'idle'),
				prop('progress', 'number', 'Optional 0-100 upload progress rail.'),
				prop('previewUrl', 'string', 'Image preview URL.'),
				prop('icon', 'IconName', 'Fallback glyph when no preview is present.', 'file'),
				prop('onRemove', '() => void', 'Shows and handles the remove affordance.')
			]
		case 'wordmark':
			return [prop('children', 'never', 'The wordmark renders the Rubric text treatment.')]
	}
}

export function getPrimitiveStates(slug: PrimitiveSlug): readonly PrimitiveState[] {
	switch (slug) {
		case 'button':
			return states([
				['default', 'Variants, icon, and shortcut states.'],
				['signal', 'Ultra and destructive signal actions.'],
				['loading', 'Disabled pending command state.']
			])
		case 'input':
		case 'textarea':
		case 'select':
			return states([
				['default', 'Empty field state.'],
				['filled', 'Value present.'],
				['error', 'Validation failure.'],
				['disabled', 'Locked field.']
			])
		case 'field':
			return states([
				['default', 'Label, description, helper, and control slot.'],
				['error', 'Error message and status.'],
				['success', 'Success message and status.'],
				['count', 'Character or token count with limit.']
			])
		case 'dropzone':
			return states([
				['default', 'Passive upload target.'],
				['active', 'Drag-over state.'],
				['image', 'Image-specific icon and copy.'],
				['disabled', 'Locked upload target.']
			])
		case 'upload-item':
			return states([
				['default', 'Completed file row.'],
				['uploading', 'Progress row.'],
				['image', 'Image row with preview affordance.'],
				['error', 'Rejected file row.']
			])
		case 'progress':
			return states([
				['default', 'Linear progress.'],
				['signals', 'Signal tone variants.'],
				['indeterminate', 'Unknown-duration shuttle and lined states.'],
				['segmented', 'Step-based completion.'],
				['ring', 'Circular progress composition.']
			])
		case 'sparkline':
			return states([
				['line', 'Line trend.'],
				['area', 'Line with soft area and endpoint.'],
				['bar', 'Bar density.'],
				['dot', 'Dot distribution.'],
				['volatile', 'High variance trend.']
			])
		case 'concept-frame':
			return states([
				['default', 'Frame atlas with generic symbolic content.'],
				['selected', 'Focused frame state.'],
				['muted', 'Background context state.']
			])
		case 'concept-connector':
			return states([
				['default', 'Connector atlas for flow, relation, and callouts.'],
				['selected', 'Highlighted relation.'],
				['tones', 'Concrete-native connector tones.']
			])
		case 'diagram-node':
			return states([
				['default', 'Node role atlas.'],
				['selected', 'Selected node state.'],
				['muted', 'Subdued background node state.']
			])
		case 'diagram-item':
			return states([
				['default', 'Supporting evidence item atlas.'],
				['selected', 'Selected item state.'],
				['tones', 'Metric, code, status, and note tones.']
			])
		case 'badge':
			return states([
				['default', 'Soft signal badges.'],
				['solid', 'Reserved high-emphasis badges.'],
				['count', 'Notification count treatment.']
			])
		default:
			return states([['default', 'Canonical example.']])
	}
}

function titleCase(value: string): string {
	return value
		.split('-')
		.map(part => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
		.join(' ')
}
