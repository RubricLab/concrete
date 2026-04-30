import { z } from 'zod/v4'

export const focusRingSchema = z
	.object({
		label: z.string().default('Focused')
	})
	.strict()

export { focusRingSchema as focusRingPropsSchema }
export type FocusRingInput = z.input<typeof focusRingSchema>
export type FocusRingValue = z.output<typeof focusRingSchema>
