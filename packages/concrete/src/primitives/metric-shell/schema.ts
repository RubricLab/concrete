import { z } from 'zod/v4'

export const metricShellKindValues = ['meter', 'meter-ring', 'metric'] as const

export const metricShellSchema = z
	.object({
		compact: z.boolean().default(false),
		description: z.string().default('Accepted agent runs across production workspaces.'),
		kind: z.enum(metricShellKindValues).default('metric'),
		label: z.string().default('Agent runs'),
		value: z.string().default('72%')
	})
	.strict()

export { metricShellSchema as metricShellPropsSchema }
export type MetricShellInput = z.input<typeof metricShellSchema>
export type MetricShellValue = z.output<typeof metricShellSchema>
