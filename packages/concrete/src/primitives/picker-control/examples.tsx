import { defineExamples } from '../../factories/createExamples'
import { PickerControl } from './component'

export const pickerControlExamples = defineExamples({
	date: {
		description: 'Closed date picker trigger.',
		render: () => renderDatePickerControl()
	},
	default: {
		description: 'Closed date picker trigger.',
		render: () => renderDatePickerControl()
	},
	open: {
		description: 'Open picker trigger.',
		render: () => (
			<>
				<PickerControl open>Apr 29, 2026</PickerControl>
			</>
		)
	},
	time: {
		description: 'Time picker trigger.',
		render: () => (
			<>
				<PickerControl icon="clock">2:30 PM</PickerControl>
			</>
		)
	}
})

function renderDatePickerControl() {
	return <PickerControl>Apr 29, 2026</PickerControl>
}
