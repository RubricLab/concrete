import { z } from 'zod/v4'

export const indicatorToneValues = [
	'default',
	'muted',
	'sky',
	'terminal',
	'ultra',
	'error'
] as const

export const indicatorSchema = z
	.object({
		label: z.string().default('Running'),
		tone: z.enum(indicatorToneValues).default('default')
	})
	.strict()

export { indicatorSchema as indicatorPropsSchema }
export type IndicatorInput = z.input<typeof indicatorSchema>
export type IndicatorValue = z.output<typeof indicatorSchema>
