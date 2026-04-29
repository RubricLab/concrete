import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { PasswordInput } from './password-input-view'

export * from './password-input-view'

export const passwordInputComponentSchema = z
	.object({
		error: z.string().optional(),
		help: z.string().optional(),
		label: z.string().default('Password'),
		value: z.string().default('concrete-secret')
	})
	.strict()

export const passwordInputComponentDefinition = defineConcreteComponent({
	category: 'form',
	component: PasswordInput,
	controls: [
		textControl('label', 'Label', 'Password'),
		textControl('value', 'Value', 'concrete-secret'),
		textControl('help', 'Help', 'Use a passphrase or generated credential.'),
		textControl('error', 'Error', '')
	],
	description: 'Text input composition with secure visibility toggling and field validation chrome.',
	guidance:
		'Password input is the canonical pattern for slotting an inline icon action into a field without changing input semantics.',
	kind: 'component',
	name: 'Password input',
	pressure: ['product'],
	props: [
		prop('value', 'string', 'Controlled password value.'),
		prop('defaultValue', 'string', 'Uncontrolled initial password value.'),
		prop('visibleLabel', 'string', 'Accessible label for reveal action.', 'Show password'),
		prop('hiddenLabel', 'string', 'Accessible label for hide action.', 'Hide password'),
		prop('label', 'ReactNode', 'Field label.'),
		prop('help', 'ReactNode', 'Muted helper text.'),
		prop('error', 'ReactNode', 'Error copy and invalid treatment.')
	],
	renderExample: renderPasswordInputExample,
	schema: passwordInputComponentSchema,
	slug: 'password-input',
	states: states([
		['default', 'Hidden password with reveal action.'],
		['visible', 'Password revealed as plain text.'],
		['error', 'Validation error surfaced through Field.']
	])
})

function renderPasswordInputExample(state = 'default'): ReactNode {
	return (
		<FormStage>
			<PasswordInput
				defaultValue={state === 'default' ? 'concrete-secret' : 'router-v2'}
				error={state === 'error' ? 'Password must be at least 12 characters.' : undefined}
				help={state === 'default' ? 'Use a passphrase or generated credential.' : undefined}
				label="Password"
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 420, width: '100%' }}>{children}</div>
}
