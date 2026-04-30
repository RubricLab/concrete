import { z } from 'zod/v4'

export const scrollAreaSizeSchema = z.enum(['small', 'medium', 'large', 'viewport'])

export const scrollAreaSchema = z
	.object({
		content: z.string().default('Scrollable content'),
		size: scrollAreaSizeSchema.default('medium')
	})
	.strict()

export { scrollAreaSchema as scrollAreaPropsSchema }
export type ScrollAreaInput = z.input<typeof scrollAreaSchema>
export type ScrollAreaSize = z.infer<typeof scrollAreaSizeSchema>
export type ScrollAreaValue = z.output<typeof scrollAreaSchema>
