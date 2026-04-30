import { z } from 'zod/v4'

export const caretSchema = z
	.object({
		direction: z.enum(['down', 'right', 'up']).default('right'),
		open: z.boolean().default(false),
		size: z.enum(['large', 'medium', 'small']).default('medium')
	})
	.strict()

export { caretSchema as caretPropsSchema }
export type CaretInput = z.input<typeof caretSchema>
export type CaretValue = z.output<typeof caretSchema>
