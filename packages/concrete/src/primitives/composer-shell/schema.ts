import { z } from 'zod/v4'

export const composerShellSchema = z
	.object({
		disabled: z.boolean().default(false),
		placeholder: z.string().default('Write a message...'),
		submitLabel: z.string().default('Send')
	})
	.strict()

export { composerShellSchema as composerShellPropsSchema }
export type ComposerShellInput = z.input<typeof composerShellSchema>
export type ComposerShellValue = z.output<typeof composerShellSchema>
