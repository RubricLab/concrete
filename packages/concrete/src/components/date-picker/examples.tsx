import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../../primitives'
import { DatePicker } from './component'

export const datePickerExamples = defineExamples({
	bounded: {
		description: 'Date picker with unavailable days.',
		render: () => renderDatePickerExample('bounded')
	},
	default: {
		description: 'Dense date fields in a run scheduling flow.',
		render: () => renderDatePickerExample('default')
	},
	open: {
		description: 'Calendar popdown with selected day.',
		render: () => renderDatePickerExample('open')
	},
	success: {
		description: 'Accepted date with success feedback.',
		render: () => renderDatePickerExample('success')
	}
})

function renderDatePickerExample(state: 'bounded' | 'default' | 'open' | 'success'): ReactNode {
	switch (state) {
		case 'default':
			return (
				<Stack density="compact">
					<DatePicker
						defaultValue="2026-04-28"
						help="Locks the evaluation start before routing begins."
						label="Start date"
					/>
					<DatePicker defaultValue="2026-05-01" label="Review date" />
				</Stack>
			)
		case 'bounded':
			return (
				<DatePicker
					defaultValue="2026-04-28"
					help="Only this sprint window is available."
					label="Start date"
					max="2026-05-02"
					min="2026-04-24"
				/>
			)
		case 'open':
			return (
				<DatePicker
					defaultOpen
					defaultValue="2026-04-28"
					help="Open calendar keeps selected, muted, and bounded days visible."
					label="Start date"
					max="2026-05-09"
					min="2026-04-20"
				/>
			)
		case 'success':
			return (
				<DatePicker defaultValue="2026-05-01" label="Review date" success="Review window confirmed." />
			)
	}
}
