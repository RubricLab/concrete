import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../stack'
import { Checkbox } from './component'

export const checkboxExamples = defineExamples({
	default: {
		description: 'Dense checked, unchecked, and required choice states.',
		render: () => (
			<Stack density="compact">
				<Checkbox checked label="Use strict schemas" readOnly />
				<Checkbox label="Allow preview-only fixtures" readOnly />
				<Checkbox checked required label="Require Zod boundary parse" readOnly />
			</Stack>
		)
	},
	disabled: {
		description: 'Locked choice state.',
		render: () => (
			<Stack density="compact">
				<Checkbox checked disabled label="Use strict schemas" readOnly />
				<Checkbox disabled label="Allow preview-only fixtures" readOnly />
			</Stack>
		)
	}
})
