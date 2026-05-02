import { z } from 'zod/v4'

export const spinnerDensityValues = ['compact', 'comfortable', 'editorial'] as const
export const spinnerIntentValues = ['inverse', 'neutral', 'sky'] as const

export const spinnerSchema = z
	.object({
		density: z.enum(spinnerDensityValues).default('comfortable'),
		intent: z.enum(spinnerIntentValues).default('neutral')
	})
	.strict()

export { spinnerSchema as spinnerPropsSchema }
export type SpinnerInput = z.input<typeof spinnerSchema>
export type SpinnerValue = z.output<typeof spinnerSchema>
