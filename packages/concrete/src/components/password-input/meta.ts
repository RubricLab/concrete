import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PasswordInputMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const passwordInputMeta = {
	category: 'form',
	description: 'Text input composition with secure visibility toggling and field validation chrome.',
	guidance:
		'Password input is the canonical pattern for slotting an inline icon action into a field without changing input semantics.',
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
	]
} as const satisfies PasswordInputMeta
