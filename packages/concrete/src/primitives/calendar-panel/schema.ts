import { z } from 'zod/v4'

export const calendarPanelSchema = z
	.object({
		max: z.string().optional(),
		min: z.string().optional(),
		month: z.string().default('2026-04-01'),
		placement: z.enum(['floating', 'inline']).default('inline'),
		selectedEnd: z.string().optional(),
		selectedStart: z.string().default('2026-04-29')
	})
	.strict()

export { calendarPanelSchema as calendarPanelPropsSchema }
export type CalendarPanelInput = z.input<typeof calendarPanelSchema>
export type CalendarPanelValue = z.output<typeof calendarPanelSchema>
