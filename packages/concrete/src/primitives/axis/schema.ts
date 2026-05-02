import { z } from 'zod/v4'

export const axisSchema = z
	.object({
		baseline: z.boolean().default(true),
		labels: z.boolean().default(true)
	})
	.strict()

export { axisSchema as axisPropsSchema }
export type AxisInput = z.input<typeof axisSchema>
export type AxisValue = z.output<typeof axisSchema>
