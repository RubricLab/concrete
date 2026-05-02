import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const containerElementSchema = z.enum([
	'article',
	'aside',
	'div',
	'footer',
	'header',
	'main',
	'nav',
	'section'
])
export const containerMeasureSchema = z.enum(['content', 'wide', 'full'])

export const containerSchema = z
	.object({
		as: containerElementSchema.default('div'),
		content: z.string().default('Container content'),
		density: densitySchema.default('comfortable'),
		measure: containerMeasureSchema.default('wide')
	})
	.strict()

export { containerSchema as containerPropsSchema }
export type ContainerElement = z.infer<typeof containerElementSchema>
export type ContainerInput = z.input<typeof containerSchema>
export type ContainerMeasure = z.infer<typeof containerMeasureSchema>
export type ContainerValue = z.output<typeof containerSchema>
