import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../../primitives'
import { PasswordInput } from './component'

export const passwordInputExamples = defineExamples({
	default: {
		description: 'Dense credential fields with reveal actions.',
		render: () => (
			<Stack density="compact">
				<PasswordInput
					defaultValue="concrete-secret"
					help="Use a passphrase or generated credential."
					label="Workspace password"
				/>
				<PasswordInput defaultValue="router-v2-token" label="Deploy token" />
			</Stack>
		)
	},
	disabled: {
		description: 'Locked credential while a session is active.',
		render: () => (
			<PasswordInput
				defaultValue="stored-credential"
				disabled
				help="Credential rotation is locked during an active release."
				label="Deploy token"
			/>
		)
	},
	error: {
		description: 'Validation error surfaced through Field.',
		render: () => (
			<PasswordInput
				defaultValue="router-v2"
				error="Password must be at least 12 characters."
				label="Workspace password"
			/>
		)
	},
	success: {
		description: 'Accepted credential with success message.',
		render: () => (
			<PasswordInput
				defaultValue="concrete-secret"
				label="Workspace password"
				success="Credential meets workspace policy."
			/>
		)
	}
})
