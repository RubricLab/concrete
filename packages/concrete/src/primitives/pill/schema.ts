import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { labelIntentValues } from '../label-helpers'

export const pillIntentValues = labelIntentValues

export const pillSchema = z
	.object({
		intent: z.enum(pillIntentValues).default('neutral'),
		label: z.string().default('queued'),
		leadingIcon: z.enum(iconNames).optional()
	})
	.strict()

export { pillSchema as pillPropsSchema }
export type PillInput = z.input<typeof pillSchema>
export type PillValue = z.output<typeof pillSchema>
