import { z } from 'zod/v4'

export const diagramViewportSchema = z
	.object({
		description: z.string().default('Pan and zoom across agent workflow topology.'),
		height: z.number().int().positive().default(360),
		title: z.string().default('Agent canvas'),
		width: z.number().int().positive().default(1000)
	})
	.strict()

export { diagramViewportSchema as diagramViewportPropsSchema }
export type DiagramViewportInput = z.input<typeof diagramViewportSchema>
export type DiagramViewportValue = z.output<typeof diagramViewportSchema>
