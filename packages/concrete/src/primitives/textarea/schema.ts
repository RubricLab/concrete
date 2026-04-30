import { z } from 'zod/v4'

export const textareaSchema = z
	.object({
		error: z.string().optional(),
		label: z.string().optional(),
		placeholder: z.string().optional(),
		value: z.string().default('')
	})
	.strict()

export { textareaSchema as textareaPropsSchema }
export type TextareaInput = z.input<typeof textareaSchema>
export type TextareaValue = z.output<typeof textareaSchema>
