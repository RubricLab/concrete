import { z } from 'zod/v4'

export const diagramRailSchema = z
	.object({
		activeIndex: z.number().int().min(0).default(0)
	})
	.strict()

export { diagramRailSchema as diagramRailPropsSchema }
export type DiagramRailInput = z.input<typeof diagramRailSchema>
export type DiagramRailValue = z.output<typeof diagramRailSchema>
