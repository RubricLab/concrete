import { z } from 'zod/v4'

export const textElementSchema = z.enum(['code', 'div', 'p', 'small', 'span', 'strong'])
export const textPurposeSchema = z.enum(['body', 'caption', 'meta', 'mono', 'number', 'prose'])
export const textToneSchema = z.enum([
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
		purpose: textPurposeSchema.default('body'),
		tone: textToneSchema.default('default')
	})
	.strict()

export { textSchema as textPropsSchema }
export type TextElement = z.infer<typeof textElementSchema>
export type TextInput = z.input<typeof textSchema>
export type TextPurpose = z.infer<typeof textPurposeSchema>
export type TextTone = z.infer<typeof textToneSchema>
export type TextValue = z.output<typeof textSchema>
