import { z } from 'zod/v4'

export const deltaSchema = z
	.object({
		basis: z.string().optional(),
		intent: z.enum(['positive', 'negative', 'neutral']).default('neutral'),
		size: z.enum(['small', 'medium', 'large', 'xlarge']).default('medium'),
		value: z.string().default('18.6%'),
		variant: z.enum(['bare', 'wash']).default('bare')
	})
	.strict()

export { deltaSchema as deltaPropsSchema }
export type DeltaInput = z.input<typeof deltaSchema>
export type DeltaValue = z.output<typeof deltaSchema>
