import { z } from 'zod/v4'

export const kbdToneValues = ['default', 'dark'] as const

export const kbdSchema = z
	.object({
		label: z.string().default('⌘'),
		tone: z.enum(kbdToneValues).default('default')
	})
	.strict()

export { kbdSchema as kbdPropsSchema }
export type KbdInput = z.input<typeof kbdSchema>
export type KbdValue = z.output<typeof kbdSchema>
