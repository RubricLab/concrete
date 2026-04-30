import { z } from 'zod/v4'

export const rangeControlSchema = z
	.object({
		end: z.number().min(0).max(100).default(80),
		start: z.number().min(0).max(100).default(20)
	})
	.strict()

export { rangeControlSchema as rangeControlPropsSchema }
export type RangeControlInput = z.input<typeof rangeControlSchema>
export type RangeControlValue = z.output<typeof rangeControlSchema>
