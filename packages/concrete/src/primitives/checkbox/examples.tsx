import { defineExamples } from '../../factories/createExamples'
import { Checkbox } from './component'

export const checkboxExamples = defineExamples({
	default: {
		description: 'Checked and unchecked choices.',
		render: () => (
			<>
				<Checkbox checked label="Use strict schemas" readOnly />
				<Checkbox label="Allow preview-only fixtures" readOnly />
			</>
		)
	},
	disabled: {
		description: 'Locked choice state.',
		render: () => (
			<>
				<Checkbox checked disabled label="Use strict schemas" readOnly />
				<Checkbox disabled label="Allow preview-only fixtures" readOnly />
			</>
		)
	}
})
