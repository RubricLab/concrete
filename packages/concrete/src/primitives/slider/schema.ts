import { z } from 'zod/v4'

export const sliderSchema = z
	.object({
		intent: z.enum(['default', 'sky']).default('default'),
		max: z.number().default(100),
		min: z.number().default(0),
		value: z.number().default(62)
	})
	.strict()

export { sliderSchema as sliderPropsSchema }
export type SliderInput = z.input<typeof sliderSchema>
export type SliderValue = z.output<typeof sliderSchema>
