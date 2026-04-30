import { z } from 'zod/v4'

export const legendToneValues = ['default', 'error', 'muted', 'sky', 'terminal', 'ultra'] as const

export const legendItemSchema = z
	.object({
		label: z.string().default('Accepted'),
		tone: z.enum(legendToneValues).default('terminal'),
		value: z.string().optional()
	})
	.strict()

export const legendSchema = z
	.object({
		items: z.array(legendItemSchema).default([
			{ label: 'Accepted', tone: 'terminal', value: '64' },
			{ label: 'Review', tone: 'sky', value: '18' },
			{ label: 'Blocked', tone: 'error', value: '4' }
		])
	})
	.strict()

export { legendSchema as legendPropsSchema }
export type LegendInput = z.input<typeof legendSchema>
export type LegendValue = z.output<typeof legendSchema>
