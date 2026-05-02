import { z } from 'zod/v4'

export const legendIntentValues = [
	'danger',
	'muted',
	'neutral',
	'sky',
	'terminal',
	'ultra'
] as const

export const legendItemSchema = z
	.object({
		intent: z.enum(legendIntentValues).default('terminal'),
		label: z.string().default('Accepted'),
		value: z.string().optional()
	})
	.strict()

export const legendSchema = z
	.object({
		items: z.array(legendItemSchema).default([
			{ intent: 'terminal', label: 'Accepted', value: '64' },
			{ intent: 'sky', label: 'Review', value: '18' },
			{ intent: 'danger', label: 'Blocked', value: '4' }
		])
	})
	.strict()

export { legendSchema as legendPropsSchema }
export type LegendInput = z.input<typeof legendSchema>
export type LegendValue = z.output<typeof legendSchema>
