import { z } from 'zod/v4'
import { dateRangeValueSchema, dateValueSchema } from '../../schemas'

export const dateRangePickerComponentSchema = z
	.object({
		defaultOpen: z.boolean().default(false),
		defaultValue: dateRangeValueSchema.default({ end: '2026-05-07', start: '2026-04-28' }),
		label: z.string().default('Experiment window'),
		max: dateValueSchema.optional(),
		min: dateValueSchema.optional()
	})
	.strict()

export type DateRangePickerInput = z.input<typeof dateRangePickerComponentSchema>
export type DateRangePickerValue = z.output<typeof dateRangePickerComponentSchema>
