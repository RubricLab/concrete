import { z } from 'zod/v4'

export const indicatorIntentValues = [
	'neutral',
	'muted',
	'sky',
	'terminal',
	'ultra',
	'danger'
] as const

export const indicatorSchema = z
	.object({
		intent: z.enum(indicatorIntentValues).default('neutral'),
		label: z.string().default('Running')
	})
	.strict()

export { indicatorSchema as indicatorPropsSchema }
export type IndicatorInput = z.input<typeof indicatorSchema>
export type IndicatorValue = z.output<typeof indicatorSchema>
