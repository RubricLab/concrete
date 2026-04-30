import { z } from 'zod/v4'

export const timePickerComponentSchema = z
	.object({
		defaultOpen: z.boolean().default(false),
		defaultValue: z
			.string()
			.regex(/^\d{2}:\d{2}$/)
			.default('14:30'),
		interval: z.number().int().positive().default(30),
		label: z.string().default('Run time')
	})
	.strict()

export type TimePickerInput = z.input<typeof timePickerComponentSchema>
export type TimePickerValue = z.output<typeof timePickerComponentSchema>
