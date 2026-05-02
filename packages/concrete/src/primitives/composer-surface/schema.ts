import { z } from 'zod/v4'

export const composerSurfaceSchema = z
	.object({
		disabled: z.boolean().default(false),
		placeholder: z.string().default('Write a message...'),
		submitLabel: z.string().default('Send')
	})
	.strict()

export { composerSurfaceSchema as composerSurfacePropsSchema }
export type ComposerSurfaceInput = z.input<typeof composerSurfaceSchema>
export type ComposerSurfaceValue = z.output<typeof composerSurfaceSchema>
