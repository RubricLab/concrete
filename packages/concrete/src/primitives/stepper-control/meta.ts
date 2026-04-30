import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type StepperControlMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const stepperControlMeta = {
	category: 'form',
	description: 'Compact numeric control group with decrement and increment actions.',
	guidance:
		'Use StepperControl for the HTML and styling of bounded numeric adjustment. Keep clamping, min/max, controlled state, and field validation in the owning component.',
	name: 'Stepper Control',
	pressure: ['product'],
	props: [
		prop('disabled', 'boolean', 'Whether the stepper surface is disabled.', 'false'),
		prop(
			'StepperAction.direction',
			"'decrement' | 'increment'",
			'Action icon and label direction.',
			undefined,
			true
		),
		prop('StepperInput.invalid', 'boolean', 'Invalid state forwarded to aria-invalid.'),
		prop('children', 'ReactNode', 'StepperAction, StepperInput, StepperAction anatomy.')
	]
} as const satisfies StepperControlMeta
