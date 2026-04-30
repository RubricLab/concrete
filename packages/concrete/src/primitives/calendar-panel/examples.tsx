import { defineExamples } from '../../factories/createExamples'
import { CalendarPanel } from './component'

export const calendarPanelExamples = defineExamples({
	default: {
		description: 'Single selected date.',
		render: () => <CalendarPanelExample selectedStart="2026-04-29" />
	},
	disabled: {
		description: 'Calendar with bounded selectable dates.',
		render: () => (
			<CalendarPanelExample max="2026-04-30" min="2026-04-10" selectedStart="2026-04-29" />
		)
	},
	range: {
		description: 'Selected date range.',
		render: () => <CalendarPanelExample selectedEnd="2026-04-29" selectedStart="2026-04-23" />
	}
})

function CalendarPanelExample({
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
		<CalendarPanel
			max={max}
			min={min}
			month="2026-04-01"
			placement="inline"
			selectedEnd={selectedEnd}
			selectedStart={selectedStart}
		/>
	)
}
