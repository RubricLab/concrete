import { z } from 'zod/v4'

export const diagramItemPrimitiveSchema = z
	.object({
		kind: z
			.enum(['metric', 'code', 'status', 'note', 'chart', 'table', 'document', 'card'])
			.default('metric'),
		meta: z.string().optional(),
		muted: z.boolean().default(false),
		selected: z.boolean().default(false),
		title: z.string().default('Trace'),
		tone: z.enum(['ink', 'muted', 'sky', 'terminal', 'ultra', 'error']).default('ink'),
		value: z.string().optional()
	})
	.strict()

export { diagramItemPrimitiveSchema as diagramItemPrimitivePropsSchema }
export type DiagramItemInput = z.input<typeof diagramItemPrimitiveSchema>
export type DiagramItemValue = z.output<typeof diagramItemPrimitiveSchema>
