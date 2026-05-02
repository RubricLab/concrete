import { z } from 'zod/v4'

export const calendarGridSchema = z
	.object({
		max: z.string().optional(),
		min: z.string().optional(),
		month: z.string().default('2026-04-01'),
		placement: z.enum(['floating', 'inline']).default('inline'),
		selectedEnd: z.string().optional(),
		selectedStart: z.string().default('2026-04-29')
	})
	.strict()

export { calendarGridSchema as calendarGridPropsSchema }
export type CalendarGridInput = z.input<typeof calendarGridSchema>
export type CalendarGridValue = z.output<typeof calendarGridSchema>
