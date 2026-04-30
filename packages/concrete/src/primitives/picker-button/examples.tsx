import { defineExamples } from '../../factories/createExamples'
import { PickerButton } from './component'

export const pickerButtonExamples = defineExamples({
	default: {
		description: 'Disclosure button for date, time, select, and generated pickers.',
		render: () => <PickerButton>April 30, 2026</PickerButton>
	},
	open: {
		description: 'Open picker state.',
		render: () => <PickerButton open>April 30, 2026</PickerButton>
	},
	time: {
		description: 'Alternate icon for time picker workflows.',
		render: () => <PickerButton icon="clock">14:30</PickerButton>
	}
})
