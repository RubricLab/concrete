import { z } from 'zod/v4'
import { iconNames } from '../../icons'

export const pickerControlSchema = z
	.object({
		icon: z.enum(iconNames).default('calendar'),
		label: z.string().default('April 29, 2026'),
		open: z.boolean().default(false)
	})
	.strict()

export { pickerControlSchema as pickerControlPropsSchema }
export type PickerControlInput = z.input<typeof pickerControlSchema>
export type PickerControlValue = z.output<typeof pickerControlSchema>
