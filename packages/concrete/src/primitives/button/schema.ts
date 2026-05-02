import { z } from 'zod/v4'
import { iconNames } from '../../icons'

const buttonIconSchema = z.enum(iconNames)
export const buttonDensitySchema = z.enum(['tiny', 'small', 'medium', 'large'])
export const buttonHierarchySchema = z.enum(['ghost', 'primary', 'secondary', 'soft'])
export const buttonIntentSchema = z.enum(['danger', 'neutral', 'sky', 'ultra'])

export const buttonSchema = z
	.object({
		density: buttonDensitySchema.default('medium'),
		disabled: z.boolean().default(false),
		hierarchy: buttonHierarchySchema.default('secondary'),
		iconOnly: z.boolean().default(false),
		intent: buttonIntentSchema.default('neutral'),
		label: z.string().default('Continue'),
		leadingIcon: buttonIconSchema.optional(),
		loading: z.boolean().default(false),
		pressed: z.boolean().default(false),
		trailingIcon: buttonIconSchema.optional()
	})
	.strict()

export { buttonSchema as buttonPropsSchema }
export type ButtonInput = z.input<typeof buttonSchema>
export type ButtonValue = z.output<typeof buttonSchema>
