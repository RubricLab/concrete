import { z } from 'zod/v4'

export const distributionDatumSchema = z
	.object({
		label: z.string().min(1),
		tone: z.enum(['default', 'sky', 'terminal', 'ultra', 'error']).optional(),
		value: z.number().min(0).max(100)
	})
	.strict()

export const distributionSchema = z
	.object({
		data: z.array(distributionDatumSchema).default([
			{ label: 'Direct', value: 47 },
			{ label: 'Referral', tone: 'sky', value: 28 },
			{ label: 'Agentic', tone: 'terminal', value: 18 }
		])
	})
	.strict()

export { distributionSchema as distributionPropsSchema }
export type DistributionDatumInput = z.input<typeof distributionDatumSchema>
export type DistributionDatumValue = z.output<typeof distributionDatumSchema>
export type DistributionInput = z.input<typeof distributionSchema>
export type DistributionValue = z.output<typeof distributionSchema>
