import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Radio } from './component'

export const radioExamples = defineExamples({
	default: {
		description: 'Selected and unselected options.',
		render: () => (
			<Frame>
				<Radio checked label="Tight" name="rhythm" readOnly />{' '}
				<Radio label="Loose" name="rhythm" readOnly />
			</Frame>
		)
	},
	disabled: {
		description: 'Locked option state.',
		render: () => (
			<Frame>
				<Radio checked disabled label="Tight" name="rhythm" readOnly />{' '}
				<Radio disabled label="Loose" name="rhythm" readOnly />
			</Frame>
		)
	}
})
