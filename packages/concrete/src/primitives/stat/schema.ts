import { z } from 'zod/v4'

export const statSchema = z
	.object({
		density: z
			.enum(['compact', 'comfortable', 'display', 'editorial', 'micro'])
			.default('comfortable'),
		intent: z.enum(['muted', 'neutral', 'sky']).default('neutral'),
		label: z.string().optional(),
		meta: z.string().optional(),
		purpose: z.enum(['display', 'lockup', 'numeric']).default('lockup'),
		unit: z.string().optional(),
		value: z.string().default('14.8k')
	})
	.strict()

export { statSchema as statPropsSchema }
export type StatInput = z.input<typeof statSchema>
export type StatValue = z.output<typeof statSchema>
