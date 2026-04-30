import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const labelPurposeSchema = z.enum(['compact', 'field', 'meta', 'status'])
export const labelToneSchema = z.enum([
	'default',
	'ink',
	'sky',
	'sunken',
	'terminal',
	'ultra',
	'error'
])

export const labelSchema = z
	.object({
		content: z.string().default('Label'),
		leadingIcon: z.enum(iconNames).optional(),
		marker: z.boolean().default(false),
		purpose: labelPurposeSchema.default('compact'),
		tone: labelToneSchema.default('default')
	})
	.strict()

export { labelSchema as labelPropsSchema }
export type LabelInput = z.input<typeof labelSchema>
export type LabelPurpose = z.infer<typeof labelPurposeSchema>
export type LabelToneValue = z.infer<typeof labelToneSchema>
export type LabelValue = z.output<typeof labelSchema>
