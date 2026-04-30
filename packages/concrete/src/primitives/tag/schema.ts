import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const tagSizeValues = ['small', 'medium', 'large'] as const
export const tagToneValues = [
	'default',
	'ink',
	'sky',
	'sunken',
	'terminal',
	'ultra',
	'error'
] as const
export const tagVariantValues = ['default', 'outline', 'active', 'selected'] as const

export const tagSchema = z
	.object({
		dismissible: z.boolean().default(false),
		label: z.string().default('concrete'),
		leadingIcon: z.enum(iconNames).optional(),
		size: z.enum(tagSizeValues).default('medium'),
		tone: z.enum(tagToneValues).default('default'),
		variant: z.enum(tagVariantValues).default('default')
	})
	.strict()

export { tagSchema as tagPropsSchema }
export type TagInput = z.input<typeof tagSchema>
export type TagValue = z.output<typeof tagSchema>
