import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { labelIntentValues } from '../label-helpers'

export const labelPurposeSchema = z.enum(['compact', 'field', 'meta', 'status'])
export const labelIntentSchema = z.enum(labelIntentValues)

export const labelSchema = z
	.object({
		content: z.string().default('Label'),
		intent: labelIntentSchema.default('neutral'),
		leadingIcon: z.enum(iconNames).optional(),
		marker: z.boolean().default(false),
		purpose: labelPurposeSchema.default('compact')
	})
	.strict()

export { labelSchema as labelPropsSchema }
export type LabelInput = z.input<typeof labelSchema>
export type LabelIntentValue = z.infer<typeof labelIntentSchema>
export type LabelPurpose = z.infer<typeof labelPurposeSchema>
export type LabelValue = z.output<typeof labelSchema>
