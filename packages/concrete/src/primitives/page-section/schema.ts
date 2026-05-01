import { z } from 'zod/v4'
import { densitySchema } from '../../foundations/state'

export const pageSectionGroundSchema = z.enum(['plain', 'field', 'perspective', 'depth'])
export const pageSectionRhythmSchema = z.enum(['standard', 'hero', 'chapter'])
export const pageSectionIntentSchema = z.enum(['default', 'inverse'])

export const pageSectionSchema = z
	.object({
		content: z.string().default('Page section content'),
		density: densitySchema.default('comfortable'),
		ground: pageSectionGroundSchema.default('plain'),
		intent: pageSectionIntentSchema.default('default'),
		rhythm: pageSectionRhythmSchema.default('standard'),
		separated: z.boolean().default(false)
	})
	.strict()

export { pageSectionSchema as pageSectionPropsSchema }
export type PageSectionGround = z.infer<typeof pageSectionGroundSchema>
export type PageSectionInput = z.input<typeof pageSectionSchema>
export type PageSectionRhythm = z.infer<typeof pageSectionRhythmSchema>
export type PageSectionIntent = z.infer<typeof pageSectionIntentSchema>
export type PageSectionValue = z.output<typeof pageSectionSchema>
