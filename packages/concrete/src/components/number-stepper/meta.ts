import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type NumberStepperMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const numberStepperMeta = {
	category: 'form',
	description: 'Inline numeric input with decrement/increment controls, min/max, and step support.',
	guidance:
		'Number stepper is for small bounded adjustments. Use a slider when the value is approximate or continuous.',
	name: 'Number stepper',
	pressure: ['product'],
	props: [
		prop('value', 'number', 'Controlled numeric value.'),
		prop('defaultValue', 'number', 'Uncontrolled initial value.', '0'),
		prop('min', 'number', 'Minimum allowed value.'),
		prop('max', 'number', 'Maximum allowed value.'),
		prop('step', 'number', 'Increment size.', '1'),
		prop('onValueChange', '(value: number) => void', 'Receives clamped numeric value.'),
		prop('label', 'ReactNode', 'Field label.')
	]
} as const satisfies NumberStepperMeta
