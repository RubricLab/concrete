import { z } from 'zod/v4'

export const donutThicknessValues = ['medium', 'thick', 'thin'] as const

export const donutRingSchema = z
	.object({
		label: z.string().default('accepted'),
		thickness: z.enum(donutThicknessValues).default('medium'),
		value: z.string().default('72%')
	})
	.strict()

export { donutRingSchema as donutRingPropsSchema }
export type DonutRingInput = z.input<typeof donutRingSchema>
export type DonutRingValue = z.output<typeof donutRingSchema>
