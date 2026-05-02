import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { labelIntentValues } from '../label-helpers'

export const tagDensityValues = ['compact', 'comfortable', 'editorial'] as const
export const tagHierarchyValues = ['outline', 'soft'] as const
export const tagIntentValues = labelIntentValues

export const tagSchema = z
	.object({
		active: z.boolean().default(false),
		density: z.enum(tagDensityValues).default('comfortable'),
		dismissible: z.boolean().default(false),
		hierarchy: z.enum(tagHierarchyValues).default('soft'),
		intent: z.enum(tagIntentValues).default('neutral'),
		label: z.string().default('concrete'),
		leadingIcon: z.enum(iconNames).optional(),
		selected: z.boolean().default(false)
	})
	.strict()

export { tagSchema as tagPropsSchema }
export type TagInput = z.input<typeof tagSchema>
export type TagValue = z.output<typeof tagSchema>
