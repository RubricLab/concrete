import { z } from 'zod/v4'
import { dateValueSchema } from '../../schemas'

export const datePickerComponentSchema = z
	.object({
		defaultOpen: z.boolean().default(false),
		defaultValue: dateValueSchema.default('2026-04-28'),
		label: z.string().default('Start date'),
		max: dateValueSchema.optional(),
		min: dateValueSchema.optional()
	})
	.strict()

export type DatePickerInput = z.input<typeof datePickerComponentSchema>
export type DatePickerValue = z.output<typeof datePickerComponentSchema>
