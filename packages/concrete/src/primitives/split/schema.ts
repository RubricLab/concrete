import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const splitRatioSchema = z.enum(['auto', 'even', 'sidebar'])

export const splitSchema = z
	.object({
		aside: z.string().default('Aside'),
		content: z.string().default('Primary content'),
		density: densitySchema.default('comfortable'),
		ratio: splitRatioSchema.default('auto')
	})
	.strict()

export { splitSchema as splitPropsSchema }
export type SplitInput = z.input<typeof splitSchema>
export type SplitRatio = z.infer<typeof splitRatioSchema>
export type SplitValue = z.output<typeof splitSchema>
