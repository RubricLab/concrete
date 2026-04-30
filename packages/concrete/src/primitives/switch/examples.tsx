import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Switch } from './component'

export const switchExamples = defineExamples({
	default: {
		description: 'Enabled and disabled settings.',
		render: () => (
			<Frame>
				<Switch checked label="Agent memory" readOnly /> <Switch label="Draft mode" readOnly />
			</Frame>
		)
	},
	disabled: {
		description: 'Locked setting state.',
		render: () => (
			<Frame>
				<Switch checked disabled label="Agent memory" readOnly />{' '}
				<Switch disabled label="Draft mode" readOnly />
			</Frame>
		)
	}
})
