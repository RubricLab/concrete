import { z } from 'zod/v4'

export const scrollAreaExtentSchema = z.enum(['small', 'medium', 'large', 'viewport'])

export const scrollAreaSchema = z
	.object({
		content: z.string().default('Scrollable content'),
		extent: scrollAreaExtentSchema.default('medium')
	})
	.strict()

export { scrollAreaSchema as scrollAreaPropsSchema }
export type ScrollAreaInput = z.input<typeof scrollAreaSchema>
export type ScrollAreaExtent = z.infer<typeof scrollAreaExtentSchema>
export type ScrollAreaValue = z.output<typeof scrollAreaSchema>
