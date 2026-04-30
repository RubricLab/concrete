import { defineExamples } from '../../factories/createExamples'
import { PasswordInput } from './component'

export const passwordInputExamples = defineExamples({
	default: {
		description: 'Hidden password with reveal action.',
		render: () => (
			<div style={{ maxWidth: 420, width: '100%' }}>
				<PasswordInput
					defaultValue="concrete-secret"
					help="Use a passphrase or generated credential."
					label="Password"
				/>
			</div>
		)
	},
	error: {
		description: 'Validation error surfaced through Field.',
		render: () => (
			<div style={{ maxWidth: 420, width: '100%' }}>
				<PasswordInput
					defaultValue="router-v2"
					error="Password must be at least 12 characters."
					label="Password"
				/>
			</div>
		)
	},
	visible: {
		description: 'Password revealed as plain text.',
		render: () => (
			<div style={{ maxWidth: 420, width: '100%' }}>
				<PasswordInput defaultValue="router-v2" label="Password" />
			</div>
		)
	}
})
