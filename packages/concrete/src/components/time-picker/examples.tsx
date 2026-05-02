import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../../primitives'
import { TimePicker } from './component'

export const timePickerExamples = defineExamples({
	default: {
		description: 'Dense scheduling fields for agent run windows.',
		render: () => renderTimePickerExample('default')
	},
	dense: {
		description: 'Short interval list for detailed scheduling.',
		render: () => renderTimePickerExample('dense')
	},
	open: {
		description: 'Scrollable time menu.',
		render: () => renderTimePickerExample('open')
	},
	success: {
		description: 'Confirmed handoff time with success feedback.',
		render: () => renderTimePickerExample('success')
	}
})

function renderTimePickerExample(state: 'default' | 'dense' | 'open' | 'success'): ReactNode {
	switch (state) {
		case 'default':
			return (
				<Stack density="compact">
					<TimePicker
						defaultValue="14:30"
						help="Runs after the model batch is hydrated."
						label="Run time"
					/>
					<TimePicker defaultValue="16:00" interval={30} label="Review cutoff" />
				</Stack>
			)
		case 'dense':
			return (
				<TimePicker
					defaultOpen
					defaultValue="09:15"
					help="Fifteen-minute intervals for tight scheduling."
					interval={15}
					label="Run time"
				/>
			)
		case 'open':
			return (
				<TimePicker
					defaultOpen
					defaultValue="14:30"
					help="Open menu exposes the selected option and compact rows."
					interval={30}
					label="Run time"
				/>
			)
		case 'success':
			return (
				<TimePicker defaultValue="16:00" label="Review cutoff" success="Handoff time confirmed." />
			)
	}
}
