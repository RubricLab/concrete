import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../stack'
import { Switch } from './component'

export const switchExamples = defineExamples({
	default: {
		description: 'Compact setting toggles with on and off states.',
		render: () => (
			<Stack density="compact">
				<Switch checked label="Agent memory" readOnly />
				<Switch label="Draft mode" readOnly />
				<Switch checked label="Tool traces" readOnly />
			</Stack>
		)
	},
	disabled: {
		description: 'Locked setting state.',
		render: () => (
			<Stack density="compact">
				<Switch checked disabled label="Agent memory" readOnly />
				<Switch disabled label="Draft mode" readOnly />
			</Stack>
		)
	}
})
