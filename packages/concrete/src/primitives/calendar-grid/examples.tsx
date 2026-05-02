import { defineExamples } from '../../factories/createExamples'
import { CalendarGrid } from './component'

export const calendarGridExamples = defineExamples({
	default: {
		description: 'Single selected date.',
		render: () => <CalendarGridExample selectedStart="2026-04-29" />
	},
	disabled: {
		description: 'Calendar with bounded selectable dates.',
		render: () => <CalendarGridExample max="2026-04-30" min="2026-04-10" selectedStart="2026-04-29" />
	},
	range: {
		description: 'Selected date range.',
		render: () => <CalendarGridExample selectedEnd="2026-04-29" selectedStart="2026-04-23" />
	}
})

function CalendarGridExample({
	max,
	min,
	selectedEnd,
	selectedStart
}: {
	max?: string | undefined
	min?: string | undefined
	selectedEnd?: string | undefined
	selectedStart?: string | undefined
}) {
	return (
		<CalendarGrid
			max={max}
			min={min}
			month="2026-04-01"
			placement="inline"
			selectedEnd={selectedEnd}
			selectedStart={selectedStart}
		/>
	)
}
