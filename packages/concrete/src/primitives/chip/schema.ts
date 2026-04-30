import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const chipToneValues = ['default', 'ink', 'sky', 'sunken'] as const

export const chipSchema = z
	.object({
		label: z.string().default('Filter'),
		leadingIcon: z.enum(iconNames).optional(),
		selected: z.boolean().default(false),
		tone: z.enum(chipToneValues).default('default')
	})
	.strict()

export { chipSchema as chipPropsSchema }
export type ChipInput = z.input<typeof chipSchema>
export type ChipValue = z.output<typeof chipSchema>
