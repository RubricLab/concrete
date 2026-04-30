import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FieldMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const fieldMeta = {
	category: 'form',
	description: 'Form chrome primitive for label, description, helper, validation, and counts.',
	guidance:
		'Field owns field-level hierarchy only. It does not own input state or validation logic; compose it around the primitive or component that owns the control.',
	name: 'Field',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'ReactNode', 'Primary field label.'),
		prop('description', 'ReactNode', 'Supporting copy below the label.'),
		prop('help', 'ReactNode', 'Neutral helper message.'),
		prop('error', 'ReactNode', 'Error message and error status source.'),
		prop('success', 'ReactNode', 'Success message and success status source.'),
		prop('required', 'boolean', 'Marks the label as required.', 'false'),
		prop('optional', 'boolean', 'Shows optional label metadata.', 'false'),
		prop('count', 'number', 'Current character or item count.'),
		prop('limit', 'number', 'Maximum character or item count.')
	]
} as const satisfies FieldMeta
