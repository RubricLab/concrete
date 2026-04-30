import { z } from 'zod/v4'

export const statSchema = z
	.object({
		label: z.string().optional(),
		meta: z.string().optional(),
		size: z.enum(['xsmall', 'small', 'medium', 'large', 'xlarge']).default('medium'),
		tone: z.enum(['default', 'muted', 'sky']).default('default'),
		unit: z.string().optional(),
		value: z.string().default('14.8k'),
		variant: z.enum(['lockup', 'numeric', 'display']).default('lockup')
	})
	.strict()

export { statSchema as statPropsSchema }
export type StatInput = z.input<typeof statSchema>
export type StatValue = z.output<typeof statSchema>
