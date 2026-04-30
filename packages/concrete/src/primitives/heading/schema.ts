import { z } from 'zod/v4'

export const headingLevelSchema = z.enum(['1', '2', '3', '4', '5', '6'])
export const headingSizeSchema = z.enum(['display', 'title', 'section', 'subsection', 'label'])
export const headingToneSchema = z.enum(['default', 'muted', 'inverse'])

export const headingSchema = z
	.object({
		content: z.string().default('Concrete heading'),
		level: headingLevelSchema.default('2'),
		size: headingSizeSchema.default('section'),
		tone: headingToneSchema.default('default')
	})
	.strict()

export { headingSchema as headingPropsSchema }
export type HeadingInput = z.input<typeof headingSchema>
export type HeadingLevel = z.infer<typeof headingLevelSchema>
export type HeadingSize = z.infer<typeof headingSizeSchema>
export type HeadingTone = z.infer<typeof headingToneSchema>
export type HeadingValue = z.output<typeof headingSchema>
