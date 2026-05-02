import { z } from 'zod/v4'

export const textElementSchema = z.enum(['code', 'div', 'p', 'small', 'span', 'strong'])
export const textPurposeSchema = z.enum([
	'body',
	'caption',
	'lead',
	'meta',
	'mono',
	'number',
	'prose'
])
export const textIntentSchema = z.enum([
	'default',
	'muted',
	'soft',
	'strong',
	'inverse',
	'sky',
	'terminal',
	'ultra',
	'error'
])

export const textSchema = z
	.object({
		as: textElementSchema.default('span'),
		content: z.string().default('Concrete text'),
		intent: textIntentSchema.default('default'),
		purpose: textPurposeSchema.default('body')
	})
	.strict()

export { textSchema as textPropsSchema }
export type TextElement = z.infer<typeof textElementSchema>
export type TextInput = z.input<typeof textSchema>
export type TextPurpose = z.infer<typeof textPurposeSchema>
export type TextIntent = z.infer<typeof textIntentSchema>
export type TextValue = z.output<typeof textSchema>
