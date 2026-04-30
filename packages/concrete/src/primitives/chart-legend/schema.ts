import { z } from 'zod/v4'

export const chartLegendToneValues = [
	'default',
	'error',
	'muted',
	'sky',
	'terminal',
	'ultra'
] as const

export const chartLegendItemSchema = z
	.object({
		label: z.string().default('Accepted'),
		tone: z.enum(chartLegendToneValues).default('terminal'),
		value: z.string().optional()
	})
	.strict()

export const chartLegendSchema = z
	.object({
		items: z.array(chartLegendItemSchema).default([
			{ label: 'Accepted', tone: 'terminal', value: '64' },
			{ label: 'Review', tone: 'sky', value: '18' },
			{ label: 'Blocked', tone: 'error', value: '4' }
		])
	})
	.strict()

export { chartLegendSchema as chartLegendPropsSchema }
export type ChartLegendInput = z.input<typeof chartLegendSchema>
export type ChartLegendValue = z.output<typeof chartLegendSchema>
