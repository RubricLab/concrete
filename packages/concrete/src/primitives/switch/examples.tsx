import { defineExamples } from '../../factories/createExamples'
import { Switch } from './component'

export const switchExamples = defineExamples({
	default: {
		description: 'Enabled and disabled settings.',
		render: () => (
			<>
				<Switch checked label="Agent memory" readOnly />
				<Switch label="Draft mode" readOnly />
			</>
		)
	},
	disabled: {
		description: 'Locked setting state.',
		render: () => (
			<>
				<Switch checked disabled label="Agent memory" readOnly />
				<Switch disabled label="Draft mode" readOnly />
			</>
		)
	}
})
