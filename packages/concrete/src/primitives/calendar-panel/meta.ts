import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type CalendarPanelMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const calendarPanelMeta = {
	category: 'form',
	description: 'Calendar picker panel with month navigation, weekdays, range, and disabled states.',
	guidance:
		'CalendarPanel owns date grid chrome and keyboard/selectable day affordances. DatePicker and DateRangePicker own value state and range commit behavior.',
	name: 'Calendar panel',
	pressure: ['product'],
	props: [
		prop('month', 'string', 'Visible month ISO date.', '2026-04-01'),
		prop('selectedStart', 'string', 'Selected start ISO date.'),
		prop('selectedEnd', 'string', 'Selected end ISO date.'),
		prop('min', 'string', 'Minimum selectable ISO date.'),
		prop('max', 'string', 'Maximum selectable ISO date.')
	]
} as const satisfies CalendarPanelMeta
