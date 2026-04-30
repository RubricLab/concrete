import { z } from 'zod/v4'
import { iconNames } from '../../icons'

const buttonIconSchema = z.enum(iconNames)

export const buttonSchema = z
	.object({
		disabled: z.boolean().default(false),
		iconOnly: z.boolean().default(false),
		label: z.string().default('Continue'),
		leadingIcon: buttonIconSchema.optional(),
		loading: z.boolean().default(false),
		pressed: z.boolean().default(false),
		size: z.enum(['tiny', 'small', 'medium', 'large']).default('medium'),
		trailingIcon: buttonIconSchema.optional(),
		variant: z
			.enum(['danger', 'ghost', 'primary', 'secondary', 'sky', 'sky-soft', 'soft', 'ultra'])
			.default('secondary')
	})
	.strict()

export { buttonSchema as buttonPropsSchema }
export type ButtonInput = z.input<typeof buttonSchema>
export type ButtonValue = z.output<typeof buttonSchema>
