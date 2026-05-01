import { z } from 'zod/v4'

export const progressRingSchema = z
	.object({
		density: z.enum(['compact', 'comfortable', 'editorial']).default('comfortable'),
		intent: z.enum(['danger', 'neutral', 'sky', 'terminal', 'ultra']).default('neutral'),
		value: z.number().min(0).max(100).default(68)
	})
	.strict()

export { progressRingSchema as progressRingPropsSchema }
export type ProgressRingInput = z.input<typeof progressRingSchema>
export type ProgressRingValue = z.output<typeof progressRingSchema>
