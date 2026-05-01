import { z } from 'zod/v4'

export const progressSchema = z
	.object({
		density: z.enum(['compact', 'comfortable', 'editorial']).default('comfortable'),
		indeterminate: z.enum(['', 'shuttle', 'lined']).default(''),
		intent: z.enum(['danger', 'neutral', 'sky', 'terminal', 'ultra']).default('neutral'),
		value: z.number().min(0).max(100).default(62)
	})
	.strict()

export { progressSchema as progressPropsSchema }
export type ProgressInput = z.input<typeof progressSchema>
export type ProgressValue = z.output<typeof progressSchema>
