import { z } from 'zod/v4'
import { dataLegendItemSchema, dataToneSchema } from './data-core'
import { finiteNumberSchema } from './numbers'

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
export const diagramAnchorSchema = z.enum(['bottom', 'center', 'left', 'right', 'top'])

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

export type ConceptConnectorKind = z.infer<typeof conceptConnectorKindSchema>
export type ConceptConnectorShape = z.output<typeof conceptConnectorPropsSchema>
export type ConceptFrameKind = z.infer<typeof conceptFrameKindSchema>
export type ConceptFrameShape = z.output<typeof conceptFramePropsSchema>
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
export type FlowDiagramEdge = z.output<typeof flowDiagramEdgeSchema>
export type FlowDiagramFlow = z.output<typeof flowDiagramSchema>
export type FlowDiagramNode = z.output<typeof flowDiagramNodeSchema>
export type FlowDiagramProps = z.input<typeof flowDiagramPropsSchema> & {
	onNodeMove?: (nodeId: string, position: { x: number; y: number }) => void
	onNodeSelect?: (nodeId: string) => void
	onViewportChange?: (viewport: { x: number; y: number; zoom: number }) => void
}
