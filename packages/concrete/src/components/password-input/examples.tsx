import { defineExamples } from '../../factories/createExamples'
import { PasswordInput } from './component'

export const passwordInputExamples = defineExamples({
	default: {
		description: 'Hidden password with reveal action.',
		render: () => (
			<>
				<PasswordInput
					defaultValue="concrete-secret"
					help="Use a passphrase or generated credential."
					label="Password"
				/>
			</>
		)
	},
	error: {
		description: 'Validation error surfaced through Field.',
		render: () => (
			<>
				<PasswordInput
					defaultValue="router-v2"
					error="Password must be at least 12 characters."
					label="Password"
				/>
			</>
		)
	},
	success: {
		description: 'Accepted credential with success message.',
		render: () => (
			<>
				<PasswordInput
					defaultValue="concrete-secret"
					label="Password"
					success="Credential meets workspace policy."
				/>
			</>
		)
	}
})
