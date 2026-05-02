import { z } from 'zod/v4'

export const cardSchema = z
	.object({
		depth: z.enum(['default', 'raised', 'sunken']).default('default'),
		description: z.string().optional(),
		interactive: z.boolean().default(false),
		title: z.string().optional()
	})
	.strict()

export { cardSchema as cardPropsSchema }
export type CardInput = z.input<typeof cardSchema>
export type CardValue = z.output<typeof cardSchema>
