import { z } from 'zod/v4'

export const kbdIntentValues = ['default', 'inverse'] as const

export const kbdSchema = z
	.object({
		intent: z.enum(kbdIntentValues).default('default'),
		label: z.string().default('⌘')
	})
	.strict()

export { kbdSchema as kbdPropsSchema }
export type KbdInput = z.input<typeof kbdSchema>
export type KbdValue = z.output<typeof kbdSchema>
