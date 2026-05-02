import { z } from 'zod/v4'

export const distributionDatumSchema = z
	.object({
		intent: z.enum(['danger', 'neutral', 'sky', 'terminal', 'ultra']).optional(),
		label: z.string().min(1),
		value: z.number().min(0).max(100)
	})
	.strict()

export const distributionSchema = z
	.object({
		data: z.array(distributionDatumSchema).default([
			{ label: 'Direct', value: 47 },
			{ intent: 'sky', label: 'Referral', value: 28 },
			{ intent: 'terminal', label: 'Agentic', value: 18 }
		])
	})
	.strict()

export { distributionSchema as distributionPropsSchema }
export type DistributionDatumInput = z.input<typeof distributionDatumSchema>
export type DistributionDatumValue = z.output<typeof distributionDatumSchema>
export type DistributionInput = z.input<typeof distributionSchema>
export type DistributionValue = z.output<typeof distributionSchema>
