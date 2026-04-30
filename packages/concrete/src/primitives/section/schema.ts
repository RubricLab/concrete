import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const sectionSchema = z
	.object({
		content: z.string().default('Section content'),
		density: densitySchema.default('comfortable'),
		description: z.string().optional(),
		separated: z.boolean().default(false),
		title: z.string().default('Section')
	})
	.strict()

export { sectionSchema as sectionPropsSchema }
export type SectionInput = z.input<typeof sectionSchema>
export type SectionValue = z.output<typeof sectionSchema>
