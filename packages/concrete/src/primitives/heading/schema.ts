import { z } from 'zod/v4'

export const headingLevelSchema = z.enum(['1', '2', '3', '4', '5', '6'])
export const headingHierarchySchema = z.enum([
	'hero',
	'display',
	'title',
	'section',
	'subsection',
	'label'
])
export const headingIntentSchema = z.enum(['default', 'muted', 'inverse'])

export const headingSchema = z
	.object({
		content: z.string().default('Concrete heading'),
		hierarchy: headingHierarchySchema.default('section'),
		intent: headingIntentSchema.default('default'),
		level: headingLevelSchema.default('2')
	})
	.strict()

export { headingSchema as headingPropsSchema }
export type HeadingInput = z.input<typeof headingSchema>
export type HeadingLevel = z.infer<typeof headingLevelSchema>
export type HeadingHierarchy = z.infer<typeof headingHierarchySchema>
export type HeadingIntent = z.infer<typeof headingIntentSchema>
export type HeadingValue = z.output<typeof headingSchema>
