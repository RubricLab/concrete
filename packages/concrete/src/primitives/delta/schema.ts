import { z } from 'zod/v4'

export const deltaSchema = z
	.object({
		basis: z.string().optional(),
		density: z.enum(['compact', 'comfortable', 'display', 'editorial']).default('comfortable'),
		hierarchy: z.enum(['plain', 'wash']).default('plain'),
		intent: z.enum(['positive', 'negative', 'neutral']).default('neutral'),
		value: z.string().default('18.6%')
	})
	.strict()

export { deltaSchema as deltaPropsSchema }
export type DeltaInput = z.input<typeof deltaSchema>
export type DeltaValue = z.output<typeof deltaSchema>
