import { z } from 'zod/v4'

export const concretePressureSchema = z.enum(['product', 'editorial', 'generative', 'educational'])
export const concreteSignalSchema = z.enum(['terminal', 'ultra', 'error'])
export const concreteViewportSchema = z.enum(['desktop', 'tablet', 'mobile'])
export const concreteRenderKindSchema = z.enum(['primitive', 'component'])
export const composerFormatSchema = z.enum(['bold', 'italic', 'underline', 'strikethrough'])
export const composerSuggestionKindSchema = z.enum(['command', 'mention'])
export const commandItemToneSchema = z.enum(['default', 'error', 'sky', 'terminal', 'ultra'])
export const messageRoleSchema = z.enum(['assistant', 'system', 'tool', 'user'])
export const messageSurfaceSchema = z.enum(['bubble', 'plain'])
export const messageStatusSchema = z.enum(['complete', 'error', 'pending', 'streaming'])
export const toolCallStatusSchema = z.enum(['error', 'queued', 'running', 'success'])
export const fieldStatusSchema = z.enum(['default', 'error', 'success'])
export const dateValueSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/)
export const timeValueSchema = z.string().regex(/^\d{2}:\d{2}$/)
export const uploadItemStatusSchema = z.enum(['error', 'idle', 'success', 'uploading'])
export const formShellVariantSchema = z.enum(['panel', 'modal', 'drawer'])
export const formGridColumnsSchema = z.union([z.literal(1), z.literal(2), z.literal(3)])
export const formOverlayPresentationSchema = z.enum(['fixed', 'inline'])
export const dataToneSchema = z.enum(['ink', 'muted', 'sky', 'terminal', 'ultra', 'error'])
export const dataComponentStateSchema = z.enum(['ready', 'loading', 'empty', 'error'])
export const dataDeltaIntentSchema = z.enum(['negative', 'neutral', 'positive'])
export const diagramToneSchema = dataToneSchema
export const conceptFrameKindSchema = z.enum([
	'ai-website',
	'api-card',
	'assistant-response',
	'browser-window',
	'chart-frame',
	'chat-interface',
	'code-editor',
	'dashboard-frame',
	'data-table',
	'database-panel',
	'document-page',
	'mobile-screen',
	'model-card',
	'stacked-windows',
	'terminal-window',
	'workflow-canvas'
])
export const conceptConnectorKindSchema = z.enum([
	'annotation-leader',
	'bidirectional',
	'branch',
	'curved',
	'dashed-relation',
	'elbow',
	'feedback-loop',
	'straight'
])
export const diagramNodeRoleSchema = z.enum([
	'boundary',
	'compute',
	'data',
	'decision',
	'error',
	'external',
	'process'
])
export const diagramItemKindSchema = z.enum([
	'card',
	'chart',
	'code',
	'document',
	'metric',
	'note',
	'status',
	'table'
])
export const contextFrameKindSchema = z.enum([
	'application',
	'browser',
	'ide',
	'laptop',
	'mobile',
	'terminal'
])
export const diagramAnchorSchema = z.enum(['bottom', 'center', 'left', 'right', 'top'])

const finiteNumberSchema = z.number().finite()

export const renderQuerySchema = z
	.object({
		pressure: concretePressureSchema.default('product'),
		quality: z.coerce.number().int().min(1).max(100).default(92),
		state: z.string().min(1).default('default'),
		viewport: concreteViewportSchema.default('desktop')
	})
	.catchall(z.union([z.boolean(), z.number(), z.string()]))

export const primitiveCategorySchema = z.enum([
	'brand',
	'control',
	'data',
	'diagram',
	'feedback',
	'form',
	'foundation',
	'layout',
	'media',
	'navigation',
	'status',
	'surface',
	'typography'
])

export const primitivePropSchema = z
	.object({
		defaultValue: z.string().optional(),
		description: z.string().min(1),
		name: z.string().min(1),
		required: z.boolean().optional(),
		type: z.string().min(1)
	})
	.strict()

export const primitiveStateSchema = z
	.object({
		description: z.string().min(1),
		name: z.string().min(1),
		query: z.string().min(1)
	})
	.strict()

export const registryEntrySchema = z
	.object({
		category: primitiveCategorySchema,
		description: z.string().min(1),
		guidance: z.string().min(1),
		name: z.string().min(1),
		pressure: z.array(concretePressureSchema).min(1),
		props: z.array(primitivePropSchema),
		slug: z.string().min(1),
		states: z.array(primitiveStateSchema).min(1)
	})
	.strict()

export const composerAttachmentSchema = z
	.object({
		id: z.string().min(1),
		meta: z.string().min(1).optional(),
		name: z.string().min(1),
		type: z.string().min(1).default('file')
	})
	.strict()

export const composerSuggestionSchema = z
	.object({
		avatar: z.string().min(1).optional(),
		description: z.string().min(1).optional(),
		disabled: z.boolean().default(false),
		id: z.string().min(1),
		insertLabel: z.string().min(1).optional(),
		kind: composerSuggestionKindSchema,
		label: z.string().min(1),
		meta: z.string().min(1).optional()
	})
	.strict()

export const composerTokenSchema = z
	.object({
		id: z.string().min(1),
		kind: composerSuggestionKindSchema,
		label: z.string().min(1)
	})
	.strict()

export const composerValueSchema = z
	.object({
		attachments: z.array(composerAttachmentSchema).default([]),
		commands: z.array(composerTokenSchema).default([]),
		html: z.string().default(''),
		mentions: z.array(composerTokenSchema).default([]),
		text: z.string().default('')
	})
	.strict()

export const composerConfigSchema = z
	.object({
		commandOptions: z.array(composerSuggestionSchema).default([]),
		defaultMenuKind: composerSuggestionKindSchema.optional(),
		defaultMenuQuery: z.string().default(''),
		disabled: z.boolean().default(false),
		mentionOptions: z.array(composerSuggestionSchema).default([]),
		placeholder: z.string().default('Write a message...'),
		submitLabel: z.string().default('Send'),
		submitOnEnter: z.boolean().default(true),
		value: composerValueSchema.optional()
	})
	.strict()

export const commandItemSchema = z
	.object({
		description: z.string().min(1).optional(),
		disabled: z.boolean().default(false),
		group: z.string().min(1).default('Actions'),
		id: z.string().min(1),
		label: z.string().min(1),
		meta: z.string().min(1).optional(),
		shortcut: z.array(z.string().min(1)).default([]),
		tone: commandItemToneSchema.default('default')
	})
	.strict()

export const searchBarTokenSchema = z
	.object({
		id: z.string().min(1),
		label: z.string().min(1),
		tone: commandItemToneSchema.default('default')
	})
	.strict()

export const messageSchema = z
	.object({
		author: z.string().min(1).optional(),
		id: z.string().min(1),
		meta: z.string().min(1).optional(),
		role: messageRoleSchema.default('assistant'),
		status: messageStatusSchema.default('complete'),
		surface: messageSurfaceSchema.default('bubble')
	})
	.strict()

export const reasoningStepSchema = z
	.object({
		detail: z.string().min(1).optional(),
		id: z.string().min(1),
		label: z.string().min(1),
		status: messageStatusSchema.default('complete')
	})
	.strict()

export const toolCallSchema = z
	.object({
		duration: z.string().min(1).optional(),
		id: z.string().min(1),
		name: z.string().min(1),
		status: toolCallStatusSchema.default('queued')
	})
	.strict()

export const dateRangeValueSchema = z
	.object({
		end: dateValueSchema.optional(),
		start: dateValueSchema.optional()
	})
	.strict()

export const multiSelectOptionSchema = z
	.object({
		description: z.string().min(1).optional(),
		disabled: z.boolean().default(false),
		label: z.string().min(1),
		meta: z.string().min(1).optional(),
		value: z.string().min(1)
	})
	.strict()

export const uploadItemSchema = z
	.object({
		error: z.string().min(1).optional(),
		id: z.string().min(1),
		name: z.string().min(1),
		previewUrl: z.string().min(1).optional(),
		progress: z.number().min(0).max(100).optional(),
		size: z.number().int().nonnegative(),
		status: uploadItemStatusSchema.default('idle'),
		type: z.string().default('application/octet-stream')
	})
	.strict()

export const formShellConfigSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().min(1).optional(),
		status: fieldStatusSchema.default('default'),
		title: z.string().min(1),
		variant: formShellVariantSchema.default('panel')
	})
	.strict()

export const formSectionConfigSchema = z
	.object({
		description: z.string().min(1).optional(),
		divided: z.boolean().default(true),
		id: z.string().min(1),
		title: z.string().min(1)
	})
	.strict()

export const formValidationItemSchema = z
	.object({
		href: z.string().min(1).optional(),
		id: z.string().min(1),
		label: z.string().min(1),
		message: z.string().min(1),
		status: fieldStatusSchema.default('error')
	})
	.strict()

export const settingsPanelRowSchema = z
	.object({
		description: z.string().min(1).optional(),
		id: z.string().min(1),
		label: z.string().min(1),
		meta: z.string().min(1).optional(),
		status: fieldStatusSchema.default('default')
	})
	.strict()

export const settingsPanelSectionSchema = z
	.object({
		description: z.string().min(1).optional(),
		id: z.string().min(1),
		rows: z.array(settingsPanelRowSchema).min(1),
		title: z.string().min(1)
	})
	.strict()

export const dataDeltaSchema = z
	.object({
		basis: z.string().min(1).optional(),
		intent: dataDeltaIntentSchema.default('neutral'),
		value: z.string().min(1)
	})
	.strict()

export const dataPointSchema = z
	.object({
		id: z.string().min(1).optional(),
		label: z.string().min(1),
		tone: dataToneSchema.default('ink'),
		value: finiteNumberSchema
	})
	.strict()

export const dataSeriesSchema = z
	.object({
		id: z.string().min(1),
		label: z.string().min(1),
		points: z.array(dataPointSchema).default([]),
		tone: dataToneSchema.default('sky')
	})
	.strict()

export const dataProgressValueSchema = z
	.object({
		max: finiteNumberSchema.default(100),
		min: finiteNumberSchema.default(0),
		value: finiteNumberSchema
	})
	.strict()
	.refine(value => value.max > value.min, 'Progress max must be greater than min.')

export const dataLegendItemSchema = z
	.object({
		label: z.string().min(1),
		tone: dataToneSchema.default('ink'),
		value: z.string().min(1).optional()
	})
	.strict()

export const metricCardSchema = z
	.object({
		compact: z.boolean().default(false),
		delta: dataDeltaSchema.optional(),
		description: z.string().min(1).optional(),
		label: z.string().min(1),
		status: dataLegendItemSchema.optional(),
		trend: z.array(finiteNumberSchema).default([]),
		trendTone: dataToneSchema.optional(),
		unit: z.string().min(1).optional(),
		value: z.string().min(1)
	})
	.strict()

export const meterSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().min(1).optional(),
		label: z.string().min(1),
		target: finiteNumberSchema.optional(),
		tone: dataToneSchema.default('sky'),
		unit: z.string().min(1).default('%'),
		value: dataProgressValueSchema,
		variant: z.enum(['bar', 'ring']).default('bar')
	})
	.strict()

const chartBaseSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().min(1).optional(),
		height: z.number().int().positive().default(220),
		legend: z.boolean().default(true),
		message: z.string().min(1).optional(),
		showHeader: z.boolean().default(true),
		state: dataComponentStateSchema.default('ready'),
		surface: z.enum(['raised', 'sunken', 'transparent']).default('raised'),
		title: z.string().min(1)
	})
	.strict()

export const lineChartSchema = chartBaseSchema
	.extend({
		series: z.array(dataSeriesSchema).default([]),
		showDots: z.boolean().default(false),
		showEndLabels: z.boolean().default(true),
		showGrid: z.boolean().default(true),
		showXAxis: z.boolean().default(true),
		showYAxis: z.boolean().default(true),
		target: finiteNumberSchema.optional(),
		variant: z.literal('line')
	})
	.strict()

export const areaChartSchema = chartBaseSchema
	.extend({
		series: z.array(dataSeriesSchema).default([]),
		showDots: z.boolean().default(false),
		showEndLabels: z.boolean().default(true),
		showGrid: z.boolean().default(true),
		showXAxis: z.boolean().default(true),
		showYAxis: z.boolean().default(true),
		stacked: z.boolean().default(false),
		target: finiteNumberSchema.optional(),
		variant: z.literal('area')
	})
	.strict()

export const barChartSchema = chartBaseSchema
	.extend({
		baseline: finiteNumberSchema.default(0),
		comparisonPoints: z.array(dataPointSchema).default([]),
		orientation: z.enum(['horizontal', 'vertical']).default('vertical'),
		points: z.array(dataPointSchema).default([]),
		showGrid: z.boolean().default(true),
		showValues: z.boolean().default(true),
		showXAxis: z.boolean().default(true),
		showYAxis: z.boolean().default(true),
		variant: z.literal('bar')
	})
	.strict()

export const stackedBarGroupSchema = z
	.object({
		label: z.string().min(1),
		segments: z.array(dataPointSchema).default([])
	})
	.strict()

export const stackedBarChartSchema = chartBaseSchema
	.extend({
		groups: z.array(stackedBarGroupSchema).default([]),
		normalized: z.boolean().default(false),
		orientation: z.enum(['horizontal', 'vertical']).default('vertical'),
		showGrid: z.boolean().default(true),
		showValues: z.boolean().default(true),
		showXAxis: z.boolean().default(true),
		showYAxis: z.boolean().default(true),
		variant: z.literal('stacked-bar')
	})
	.strict()

export const donutChartSchema = chartBaseSchema
	.extend({
		centerLabel: z.string().min(1).optional(),
		segments: z.array(dataPointSchema).default([]),
		showCenterLabel: z.boolean().default(true),
		thickness: z.enum(['thin', 'medium', 'thick']).default('medium'),
		variant: z.literal('donut')
	})
	.strict()

export const heatmapCellSchema = z
	.object({
		label: z.string().min(1).optional(),
		value: finiteNumberSchema,
		x: z.string().min(1),
		y: z.string().min(1)
	})
	.strict()

export const heatmapChartSchema = chartBaseSchema
	.extend({
		cells: z.array(heatmapCellSchema).default([]),
		showValues: z.boolean().default(true),
		variant: z.literal('heatmap')
	})
	.strict()

export const chartSchema = z.discriminatedUnion('variant', [
	lineChartSchema,
	areaChartSchema,
	barChartSchema,
	stackedBarChartSchema,
	donutChartSchema,
	heatmapChartSchema
])

export const dataTableStatusCellSchema = z
	.object({
		kind: z.literal('status'),
		label: z.string().min(1),
		tone: dataToneSchema.default('muted')
	})
	.strict()

export const dataTableDeltaCellSchema = z
	.object({
		delta: dataDeltaSchema,
		kind: z.literal('delta')
	})
	.strict()

export const dataTableSparklineCellSchema = z
	.object({
		kind: z.literal('sparkline'),
		tone: dataToneSchema.default('muted'),
		values: z.array(finiteNumberSchema).default([])
	})
	.strict()

export const dataTableMeterCellSchema = z
	.object({
		kind: z.literal('meter'),
		tone: dataToneSchema.default('sky'),
		value: dataProgressValueSchema
	})
	.strict()

export const dataTableCellValueSchema = z.union([
	z.string(),
	finiteNumberSchema,
	z.boolean(),
	z.null(),
	dataTableStatusCellSchema,
	dataTableDeltaCellSchema,
	dataTableSparklineCellSchema,
	dataTableMeterCellSchema
])

export const dataTableColumnSchema = z
	.object({
		align: z.enum(['center', 'left', 'right']).default('left'),
		frozen: z.boolean().default(false),
		header: z.string().min(1),
		key: z.string().min(1),
		sortable: z.boolean().default(false),
		width: z.string().min(1).optional()
	})
	.strict()

export const dataTableSortSchema = z
	.object({
		direction: z.enum(['ascending', 'descending']),
		key: z.string().min(1)
	})
	.strict()

export const dataTableFilterOptionSchema = z
	.object({
		count: z.number().int().nonnegative().optional(),
		label: z.string().min(1),
		value: z.string().min(1)
	})
	.strict()

export const dataTableFilterSchema = z
	.object({
		id: z.string().min(1),
		label: z.string().min(1),
		options: z.array(dataTableFilterOptionSchema).default([]),
		value: z.string().min(1).optional()
	})
	.strict()

export const dataTablePaginationSchema = z
	.object({
		page: z.number().int().positive().default(1),
		pageSize: z.number().int().positive().default(25),
		totalRows: z.number().int().nonnegative().optional()
	})
	.strict()

export const dataTableToolbarActionSchema = z
	.object({
		disabled: z.boolean().default(false),
		icon: z.enum(['download', 'inspect', 'more']).optional(),
		id: z.string().min(1),
		label: z.string().min(1),
		tone: dataToneSchema.default('muted')
	})
	.strict()

export const dataTableSchema = z
	.object({
		caption: z.string().min(1).optional(),
		columns: z.array(dataTableColumnSchema).default([]),
		compact: z.boolean().default(true),
		emptyLabel: z.string().min(1).default('No rows'),
		filters: z.array(dataTableFilterSchema).default([]),
		maxHeight: z.string().min(1).optional(),
		pagination: dataTablePaginationSchema.optional(),
		rows: z.array(z.record(z.string(), dataTableCellValueSchema)).default([]),
		searchPlaceholder: z.string().min(1).default('Search rows'),
		searchValue: z.string().default(''),
		selectable: z.boolean().default(false),
		selectedRowIds: z.array(z.string().min(1)).default([]),
		sort: dataTableSortSchema.optional(),
		title: z.string().min(1).optional(),
		toolbarActions: z.array(dataTableToolbarActionSchema).default([])
	})
	.strict()

export const conceptFramePropsSchema = z
	.object({
		kind: conceptFrameKindSchema.default('browser-window'),
		muted: z.boolean().default(false),
		selected: z.boolean().default(false),
		size: z.enum(['large', 'medium', 'small']).default('medium'),
		title: z.string().min(1).optional()
	})
	.strict()

export const conceptConnectorPropsSchema = z
	.object({
		kind: conceptConnectorKindSchema.default('straight'),
		muted: z.boolean().default(false),
		selected: z.boolean().default(false),
		tone: diagramToneSchema.default('muted')
	})
	.strict()

export const diagramNodePropsSchema = z
	.object({
		meta: z.string().min(1).optional(),
		muted: z.boolean().default(false),
		role: diagramNodeRoleSchema.default('process'),
		selected: z.boolean().default(false),
		title: z.string().min(1)
	})
	.strict()

export const diagramItemPropsSchema = z
	.object({
		body: z.string().min(1).optional(),
		kind: diagramItemKindSchema.default('note'),
		meta: z.string().min(1).optional(),
		muted: z.boolean().default(false),
		selected: z.boolean().default(false),
		title: z.string().min(1),
		tone: diagramToneSchema.default('ink'),
		value: z.string().min(1).optional()
	})
	.strict()

export const contextFramePropsSchema = z
	.object({
		compact: z.boolean().default(false),
		kind: contextFrameKindSchema.default('browser'),
		meta: z.string().min(1).optional(),
		title: z.string().min(1).optional(),
		url: z.string().min(1).optional()
	})
	.strict()

export const diagramCanvasNodeSchema = diagramNodePropsSchema
	.extend({
		height: z.number().int().positive().default(56),
		id: z.string().min(1),
		width: z.number().int().positive().default(184),
		x: z.number().min(0).max(100),
		y: z.number().min(0).max(100)
	})
	.strict()

export const diagramCanvasItemSchema = diagramItemPropsSchema
	.extend({
		height: z.number().int().positive().default(54),
		id: z.string().min(1),
		width: z.number().int().positive().default(132),
		x: z.number().min(0).max(100),
		y: z.number().min(0).max(100)
	})
	.strict()

export const diagramCanvasEdgeSchema = z
	.object({
		from: z.string().min(1),
		fromAnchor: diagramAnchorSchema.default('right'),
		id: z.string().min(1),
		label: z.string().min(1).optional(),
		selected: z.boolean().default(false),
		to: z.string().min(1),
		toAnchor: diagramAnchorSchema.default('left'),
		tone: diagramToneSchema.default('muted'),
		variant: z
			.enum(['bidirectional', 'branch', 'control', 'dashed', 'dotted', 'reference', 'solid'])
			.default('solid')
	})
	.strict()

export const diagramCanvasGraphSchema = z
	.object({
		edges: z.array(diagramCanvasEdgeSchema).default([]),
		items: z.array(diagramCanvasItemSchema).default([]),
		nodes: z.array(diagramCanvasNodeSchema).default([])
	})
	.strict()
	.superRefine((graph, context) => {
		const graphIds = new Set([
			...graph.nodes.map(node => node.id),
			...graph.items.map(item => item.id)
		])

		graph.edges.forEach((edge, edgeIndex) => {
			if (!graphIds.has(edge.from)) {
				context.addIssue({
					code: 'custom',
					message: `Unknown source diagram element "${edge.from}".`,
					path: ['edges', edgeIndex, 'from']
				})
			}

			if (!graphIds.has(edge.to)) {
				context.addIssue({
					code: 'custom',
					message: `Unknown target diagram element "${edge.to}".`,
					path: ['edges', edgeIndex, 'to']
				})
			}
		})
	})

export const diagramCanvasPropsSchema = z
	.object({
		controls: z.boolean().default(true),
		description: z.string().min(1).optional(),
		graph: diagramCanvasGraphSchema,
		height: z.number().int().positive().default(360),
		minimap: z.boolean().default(false),
		pannable: z.boolean().default(true),
		selectedId: z.string().min(1).optional(),
		title: z.string().min(1),
		width: z.number().int().positive().default(1000),
		zoomable: z.boolean().default(true)
	})
	.strict()

export const flowDiagramNodeSchema = z
	.object({
		height: z.number().int().positive().default(64),
		id: z.string().min(1),
		selected: z.boolean().default(false),
		subtitle: z.string().min(1).optional(),
		title: z.string().min(1),
		tone: z.enum(['accent', 'inverse', 'surface']).default('surface'),
		width: z.number().int().positive().default(160),
		x: finiteNumberSchema,
		y: finiteNumberSchema
	})
	.strict()

export const flowDiagramEdgeSchema = z
	.object({
		from: z.string().min(1),
		id: z.string().min(1),
		label: z.string().min(1).optional(),
		selected: z.boolean().default(false),
		to: z.string().min(1),
		tone: dataToneSchema.default('muted'),
		variant: z.enum(['dashed', 'dotted', 'pulse', 'solid', 'step']).default('solid')
	})
	.strict()

export const flowDiagramSchema = z
	.object({
		edges: z.array(flowDiagramEdgeSchema).default([]),
		nodes: z.array(flowDiagramNodeSchema).default([])
	})
	.strict()
	.superRefine((flow, context) => {
		const nodeIds = new Set(flow.nodes.map(node => node.id))

		flow.edges.forEach((edge, edgeIndex) => {
			if (!nodeIds.has(edge.from)) {
				context.addIssue({
					code: 'custom',
					message: `Unknown source node "${edge.from}".`,
					path: ['edges', edgeIndex, 'from']
				})
			}

			if (!nodeIds.has(edge.to)) {
				context.addIssue({
					code: 'custom',
					message: `Unknown target node "${edge.to}".`,
					path: ['edges', edgeIndex, 'to']
				})
			}
		})
	})

export const flowDiagramPropsSchema = z
	.object({
		compact: z.boolean().default(true),
		controls: z.boolean().default(false),
		description: z.string().min(1).optional(),
		draggableNodes: z.boolean().default(false),
		flow: flowDiagramSchema,
		height: z.number().int().positive().default(320),
		legend: z.array(dataLegendItemSchema).default([]),
		pannable: z.boolean().default(false),
		selectedEdgeId: z.string().min(1).optional(),
		selectedNodeId: z.string().min(1).optional(),
		title: z.string().min(1),
		width: z.number().int().positive().default(760),
		zoomable: z.boolean().default(false)
	})
	.strict()

export type CommandItem = z.infer<typeof commandItemSchema>
export type CommandItemTone = z.infer<typeof commandItemToneSchema>
export type ComposerAttachment = z.infer<typeof composerAttachmentSchema>
export type ComposerConfig = z.infer<typeof composerConfigSchema>
export type ComposerFormat = z.infer<typeof composerFormatSchema>
export type ComposerSuggestion = z.infer<typeof composerSuggestionSchema>
export type ComposerSuggestionKind = z.infer<typeof composerSuggestionKindSchema>
export type ComposerToken = z.infer<typeof composerTokenSchema>
export type ComposerValue = z.infer<typeof composerValueSchema>
export type ConcretePressure = z.infer<typeof concretePressureSchema>
export type ConcreteRenderKind = z.infer<typeof concreteRenderKindSchema>
export type ConcreteSignal = z.infer<typeof concreteSignalSchema>
export type ConcreteViewport = z.infer<typeof concreteViewportSchema>
export type ConceptConnectorKind = z.infer<typeof conceptConnectorKindSchema>
export type ConceptConnectorShape = z.output<typeof conceptConnectorPropsSchema>
export type ConceptFrameKind = z.infer<typeof conceptFrameKindSchema>
export type ConceptFrameShape = z.output<typeof conceptFramePropsSchema>
export type ContextFrameKind = z.infer<typeof contextFrameKindSchema>
export type ContextFrameShape = z.output<typeof contextFramePropsSchema>
export type AreaChartProps = Omit<z.input<typeof areaChartSchema>, 'variant'>
export type BarChartProps = Omit<z.input<typeof barChartSchema>, 'variant'>
export type ChartProps = z.input<typeof chartSchema>
export type DataComponentState = z.infer<typeof dataComponentStateSchema>
export type DataDelta = z.output<typeof dataDeltaSchema>
export type DataDeltaIntent = z.infer<typeof dataDeltaIntentSchema>
export type DataLegendItem = z.output<typeof dataLegendItemSchema>
export type DataPoint = z.output<typeof dataPointSchema>
export type DataProgressValue = z.output<typeof dataProgressValueSchema>
export type DataSeries = z.output<typeof dataSeriesSchema>
export type DonutChartProps = Omit<z.input<typeof donutChartSchema>, 'variant'>
export type DataTableCellValue = z.input<typeof dataTableCellValueSchema>
export type DataTableColumn<Row extends DataTableRow = DataTableRow> = Omit<
	z.input<typeof dataTableColumnSchema>,
	'key'
> & {
	key: Extract<keyof Row, string>
}
export type DataTableFilter = z.output<typeof dataTableFilterSchema>
export type DataTablePagination = z.output<typeof dataTablePaginationSchema>
export type DataTableProps<Row extends DataTableRow = DataTableRow> = Omit<
	z.input<typeof dataTableSchema>,
	'columns' | 'rows'
> & {
	columns: readonly DataTableColumn<Row>[]
	getRowId?: (row: Row, rowIndex: number) => string
	onFilterChange?: (filterId: string, value: string) => void
	onPageChange?: (page: number, pageSize: number) => void
	onRowSelectionChange?: (selectedRowIds: readonly string[]) => void
	onSearchChange?: (value: string) => void
	onSortChange?: (sort: DataTableSort | null) => void
	onToolbarAction?: (actionId: string, selectedRowIds: readonly string[]) => void
	rows: readonly Row[]
}
export type DataTableRow = Record<string, DataTableCellValue>
export type DataTableSort = z.output<typeof dataTableSortSchema>
export type DataTableToolbarAction = z.output<typeof dataTableToolbarActionSchema>
export type DataTone = z.infer<typeof dataToneSchema>
export type DateRangeValue = z.infer<typeof dateRangeValueSchema>
export type DateValue = z.infer<typeof dateValueSchema>
export type DiagramAnchor = z.infer<typeof diagramAnchorSchema>
export type DiagramCanvasEdge = z.output<typeof diagramCanvasEdgeSchema>
export type DiagramCanvasGraph = z.output<typeof diagramCanvasGraphSchema>
export type DiagramCanvasItem = z.output<typeof diagramCanvasItemSchema>
export type DiagramCanvasNode = z.output<typeof diagramCanvasNodeSchema>
export type DiagramCanvasProps = z.input<typeof diagramCanvasPropsSchema> & {
	onSelectionChange?: (selectedId: string) => void
	onViewportChange?: (viewport: { x: number; y: number; zoom: number }) => void
}
export type DiagramItemKind = z.infer<typeof diagramItemKindSchema>
export type DiagramItemShape = z.output<typeof diagramItemPropsSchema>
export type DiagramNodeRole = z.infer<typeof diagramNodeRoleSchema>
export type DiagramNodeShape = z.output<typeof diagramNodePropsSchema>
export type DiagramTone = z.infer<typeof diagramToneSchema>
export type FieldStatus = z.infer<typeof fieldStatusSchema>
export type HeatmapProps = Omit<z.input<typeof heatmapChartSchema>, 'variant'>
export type LineChartProps = Omit<z.input<typeof lineChartSchema>, 'variant'>
export type FlowDiagramEdge = z.output<typeof flowDiagramEdgeSchema>
export type FlowDiagramFlow = z.output<typeof flowDiagramSchema>
export type FlowDiagramNode = z.output<typeof flowDiagramNodeSchema>
export type FlowDiagramProps = z.input<typeof flowDiagramPropsSchema> & {
	onNodeMove?: (nodeId: string, position: { x: number; y: number }) => void
	onNodeSelect?: (nodeId: string) => void
	onViewportChange?: (viewport: { x: number; y: number; zoom: number }) => void
}
export type FormGridColumnCount = z.infer<typeof formGridColumnsSchema>
export type FormOverlayPresentation = z.infer<typeof formOverlayPresentationSchema>
export type FormSectionConfig = z.infer<typeof formSectionConfigSchema>
export type FormShellConfig = z.infer<typeof formShellConfigSchema>
export type FormShellVariantValue = z.infer<typeof formShellVariantSchema>
export type FormValidationItem = z.infer<typeof formValidationItemSchema>
export type MeterProps = z.input<typeof meterSchema>
export type MetricCardProps = z.input<typeof metricCardSchema>
export type MessageShape = z.infer<typeof messageSchema>
export type MessageRole = z.infer<typeof messageRoleSchema>
export type MessageSurface = z.infer<typeof messageSurfaceSchema>
export type MessageStatus = z.infer<typeof messageStatusSchema>
export type MultiSelectOption = z.input<typeof multiSelectOptionSchema>
export type PrimitiveCategory = z.infer<typeof primitiveCategorySchema>
export type PrimitivePropShape = z.infer<typeof primitivePropSchema>
export type PrimitiveStateShape = z.infer<typeof primitiveStateSchema>
export type ReasoningStep = z.infer<typeof reasoningStepSchema>
export type RegistryEntryShape = z.infer<typeof registryEntrySchema>
export type RenderQuery = z.infer<typeof renderQuerySchema>
export type SearchBarToken = z.infer<typeof searchBarTokenSchema>
export type SettingsPanelRowShape = z.infer<typeof settingsPanelRowSchema>
export type SettingsPanelSectionShape = z.infer<typeof settingsPanelSectionSchema>
export type StackedBarChartProps = Omit<z.input<typeof stackedBarChartSchema>, 'variant'>
export type TimeValue = z.infer<typeof timeValueSchema>
export type ToolCall = z.infer<typeof toolCallSchema>
export type ToolCallStatus = z.infer<typeof toolCallStatusSchema>
export type UploadItemValue = z.infer<typeof uploadItemSchema>
export type UploadItemStatus = z.infer<typeof uploadItemStatusSchema>
