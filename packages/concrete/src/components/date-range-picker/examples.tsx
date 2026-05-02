import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../../primitives'
import { DateRangePicker } from './component'

export const dateRangePickerExamples = defineExamples({
	bounded: {
		description: 'Range picker constrained to a sprint window.',
		render: () => renderDateRangePickerExample('bounded')
	},
	default: {
		description: 'Dense range fields for experiment planning.',
		render: () => renderDateRangePickerExample('default')
	},
	open: {
		description: 'Open calendar with active range.',
		render: () => renderDateRangePickerExample('open')
	},
	partial: {
		description: 'Start date selected while waiting for an end date.',
		render: () => renderDateRangePickerExample('partial')
	}
})

function renderDateRangePickerExample(
	state: 'bounded' | 'default' | 'open' | 'partial'
): ReactNode {
	switch (state) {
		case 'default':
			return (
				<Stack density="compact">
					<DateRangePicker
						defaultValue={{ end: '2026-05-07', start: '2026-04-28' }}
						help="Controls when the evaluation runner can collect samples."
						label="Experiment window"
					/>
					<DateRangePicker defaultValue={{ end: '2026-05-02', start: '2026-05-01' }} label="QA hold" />
				</Stack>
			)
		case 'bounded':
			return (
				<DateRangePicker
					defaultValue={{ end: '2026-05-03', start: '2026-04-29' }}
					help="Only dates inside the current release train are selectable."
					label="Release window"
					max="2026-05-05"
					min="2026-04-24"
				/>
			)
		case 'open':
			return (
				<DateRangePicker
					defaultOpen
					defaultValue={{ end: '2026-05-07', start: '2026-04-28' }}
					help="Open calendar shows the selected endpoints and active range wash."
					label="Experiment window"
				/>
			)
		case 'partial':
			return (
				<DateRangePicker
					defaultOpen
					defaultValue={{ start: '2026-04-28' }}
					help="Partial range keeps the picker open until an end date is chosen."
					label="Experiment window"
				/>
			)
	}
}
