import { z } from 'zod/v4'

export const pickerShellKindValues = ['date', 'multi-select', 'time'] as const

export const pickerShellSchema = z
	.object({
		kind: z.enum(pickerShellKindValues).default('date'),
		open: z.boolean().default(false)
	})
	.strict()

export { pickerShellSchema as pickerShellPropsSchema }
export type PickerShellInput = z.input<typeof pickerShellSchema>
export type PickerShellValue = z.output<typeof pickerShellSchema>
