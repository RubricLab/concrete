import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const dropzoneSchema = z
	.object({
		active: z.boolean().default(false),
		description: z.string().optional(),
		disabled: z.boolean().default(false),
		icon: z.enum(iconNames).default('upload'),
		title: z.string().default('Upload files')
	})
	.strict()

export { dropzoneSchema as dropzonePropsSchema }
export type DropzoneInput = z.input<typeof dropzoneSchema>
export type DropzoneValue = z.output<typeof dropzoneSchema>
