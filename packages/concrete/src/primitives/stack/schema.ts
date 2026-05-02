import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const stackAlignSchema = z.enum(['start', 'center', 'end', 'stretch'])

export const stackSchema = z
	.object({
		align: stackAlignSchema.default('stretch'),
		content: z.string().default('Stacked content'),
		density: densitySchema.default('comfortable'),
		divided: z.boolean().default(false)
	})
	.strict()

export { stackSchema as stackPropsSchema }
export type StackAlign = z.infer<typeof stackAlignSchema>
export type StackInput = z.input<typeof stackSchema>
export type StackValue = z.output<typeof stackSchema>
