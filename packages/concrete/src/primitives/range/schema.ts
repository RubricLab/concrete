import { z } from 'zod/v4'

export const rangeSchema = z
	.object({
		end: z.number().min(0).max(100).default(80),
		start: z.number().min(0).max(100).default(20)
	})
	.strict()

export { rangeSchema as rangePropsSchema }
export type RangePrimitiveInput = z.input<typeof rangeSchema>
export type RangeValue = z.output<typeof rangeSchema>
