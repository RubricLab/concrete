import { z } from 'zod/v4'

export const sliderSchema = z
	.object({
		max: z.number().default(100),
		min: z.number().default(0),
		tone: z.enum(['default', 'sky']).default('default'),
		value: z.number().default(62)
	})
	.strict()

export { sliderSchema as sliderPropsSchema }
export type SliderInput = z.input<typeof sliderSchema>
export type SliderValue = z.output<typeof sliderSchema>
