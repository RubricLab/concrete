import { z } from 'zod/v4'

export const spinnerToneValues = ['default', 'sky', 'inverse'] as const

export const spinnerSchema = z
	.object({
		size: z.number().min(1).default(18),
		tone: z.enum(spinnerToneValues).default('default')
	})
	.strict()

export { spinnerSchema as spinnerPropsSchema }
export type SpinnerInput = z.input<typeof spinnerSchema>
export type SpinnerValue = z.output<typeof spinnerSchema>
