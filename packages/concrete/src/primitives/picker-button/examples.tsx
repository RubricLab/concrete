import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../stack'
import { PickerButton } from './component'

export const pickerButtonExamples = defineExamples({
	default: {
		description: 'Disclosure triggers for date, time, select, and generated pickers.',
		render: () => (
			<Stack density="compact">
				<PickerButton>April 30, 2026</PickerButton>
				<PickerButton icon="clock">14:30</PickerButton>
			</Stack>
		)
	},
	disabled: {
		description: 'Disabled picker trigger.',
		render: () => <PickerButton disabled>Locked release date</PickerButton>
	},
	open: {
		description: 'Open picker state.',
		render: () => (
			<Stack density="compact">
				<PickerButton open>April 30, 2026</PickerButton>
				<PickerButton icon="chevron-down" open>
					Production
				</PickerButton>
			</Stack>
		)
	},
	time: {
		description: 'Alternate icon for time picker workflows.',
		render: () => <PickerButton icon="clock">14:30</PickerButton>
	}
})
