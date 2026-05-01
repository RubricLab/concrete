import { z } from 'zod/v4'
import { iconNames } from '../../icons'
import { labelIntentValues } from '../label-helpers'

export const chipIntentValues = labelIntentValues

export const chipSchema = z
	.object({
		intent: z.enum(chipIntentValues).default('neutral'),
		label: z.string().default('Filter'),
		leadingIcon: z.enum(iconNames).optional(),
		selected: z.boolean().default(false)
	})
	.strict()

export { chipSchema as chipPropsSchema }
export type ChipInput = z.input<typeof chipSchema>
export type ChipValue = z.output<typeof chipSchema>
