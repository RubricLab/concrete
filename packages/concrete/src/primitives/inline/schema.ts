import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const inlineAlignSchema = z.enum(['start', 'center', 'end', 'baseline', 'stretch'])
export const inlineJustifySchema = z.enum(['start', 'center', 'end', 'between'])

export const inlineSchema = z
	.object({
		align: inlineAlignSchema.default('center'),
		content: z.string().default('Inline content'),
		density: densitySchema.default('comfortable'),
		justify: inlineJustifySchema.default('start')
	})
	.strict()

export { inlineSchema as inlinePropsSchema }
export type InlineAlign = z.infer<typeof inlineAlignSchema>
export type InlineInput = z.input<typeof inlineSchema>
export type InlineJustify = z.infer<typeof inlineJustifySchema>
export type InlineValue = z.output<typeof inlineSchema>
