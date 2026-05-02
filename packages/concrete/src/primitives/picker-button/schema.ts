import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const pickerButtonSchema = z
	.object({
		icon: z.enum(iconNames).default('calendar'),
		label: z.string().default('April 30, 2026'),
		open: z.boolean().default(false)
	})
	.strict()

export { pickerButtonSchema as pickerButtonPropsSchema }
export type PickerButtonInput = z.input<typeof pickerButtonSchema>
export type PickerButtonValue = z.output<typeof pickerButtonSchema>
