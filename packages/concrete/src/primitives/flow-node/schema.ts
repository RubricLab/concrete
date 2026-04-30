import { z } from 'zod/v4'

export const flowNodeToneValues = ['accent', 'inverse', 'surface'] as const

export const flowNodeSchema = z
	.object({
		height: z.number().int().positive().default(64),
		selected: z.boolean().default(false),
		subtitle: z.string().default('Validation'),
		title: z.string().default('Model step'),
		tone: z.enum(flowNodeToneValues).default('surface'),
		width: z.number().int().positive().default(160),
		x: z.number().default(24),
		y: z.number().default(24)
	})
	.strict()

export { flowNodeSchema as flowNodePropsSchema }
export type FlowNodeInput = z.input<typeof flowNodeSchema>
export type FlowNodeValue = z.output<typeof flowNodeSchema>
