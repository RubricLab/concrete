import { z } from 'zod/v4'

export const diagramNodePrimitiveSchema = z
	.object({
		meta: z.string().optional(),
		muted: z.boolean().default(false),
		role: z
			.enum(['process', 'compute', 'data', 'external', 'decision', 'boundary', 'error'])
			.default('process'),
		selected: z.boolean().default(false),
		title: z.string().default('Router')
	})
	.strict()

export { diagramNodePrimitiveSchema as diagramNodePrimitivePropsSchema }
export type DiagramNodeInput = z.input<typeof diagramNodePrimitiveSchema>
export type DiagramNodeValue = z.output<typeof diagramNodePrimitiveSchema>
