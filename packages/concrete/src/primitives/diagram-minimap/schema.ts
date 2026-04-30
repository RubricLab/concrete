import { z } from 'zod/v4'

export const diagramMiniMapNodeSchema = z
	.object({
		id: z.string().default('node-1'),
		selected: z.boolean().default(false),
		x: z.number().min(0).max(100).default(24),
		y: z.number().min(0).max(100).default(42)
	})
	.strict()

export const diagramMiniMapSchema = z
	.object({
		nodes: z.array(diagramMiniMapNodeSchema).default([
			{ id: 'input', selected: false, x: 18, y: 44 },
			{ id: 'model', selected: true, x: 48, y: 30 },
			{ id: 'output', selected: false, x: 78, y: 58 }
		]),
		selectedId: z.string().optional()
	})
	.strict()

export { diagramMiniMapSchema as diagramMiniMapPropsSchema }
export type DiagramMiniMapInput = z.input<typeof diagramMiniMapSchema>
export type DiagramMiniMapValue = z.output<typeof diagramMiniMapSchema>
