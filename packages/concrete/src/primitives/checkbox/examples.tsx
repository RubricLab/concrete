import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Checkbox } from './component'

export const checkboxExamples = defineExamples({
	default: {
		description: 'Checked and unchecked choices.',
		render: () => (
			<Frame>
				<Checkbox checked label="Use strict schemas" readOnly />{' '}
				<Checkbox label="Optional path" readOnly />
			</Frame>
		)
	},
	disabled: {
		description: 'Locked choice state.',
		render: () => (
			<Frame>
				<Checkbox checked disabled label="Use strict schemas" readOnly />{' '}
				<Checkbox disabled label="Optional path" readOnly />
			</Frame>
		)
	}
})
