import { z } from 'zod/v4'

export const rangeSliderComponentSchema = z
	.object({
		defaultValue: z.tuple([z.number(), z.number()]).default([20, 80]),
		label: z.string().default('Confidence range'),
		max: z.number().default(100),
		min: z.number().default(0),
		step: z.number().default(1)
	})
	.strict()

export type RangeSliderInput = z.input<typeof rangeSliderComponentSchema>
export type RangeSliderValueInput = z.output<typeof rangeSliderComponentSchema>
