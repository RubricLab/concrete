import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const surfaceDepthSchema = z.enum(['flat', 'raised', 'sunken'])
export const surfaceElementSchema = z.enum(['article', 'aside', 'div', 'section'])
export const surfaceToneSchema = z.enum([
	'default',
	'muted',
	'inverse',
	'sky',
	'terminal',
	'ultra',
	'error'
])

export const surfaceSchema = z
	.object({
		content: z.string().default('Surface content'),
		density: densitySchema.default('comfortable'),
		depth: surfaceDepthSchema.default('flat'),
		disabled: z.boolean().default(false),
		interactive: z.boolean().default(false),
		selected: z.boolean().default(false),
		tone: surfaceToneSchema.default('default')
	})
	.strict()

export { surfaceSchema as surfacePropsSchema }
export type SurfaceDepth = z.infer<typeof surfaceDepthSchema>
export type SurfaceElement = z.infer<typeof surfaceElementSchema>
export type SurfaceInput = z.input<typeof surfaceSchema>
export type SurfaceTone = z.infer<typeof surfaceToneSchema>
export type SurfaceValue = z.output<typeof surfaceSchema>
