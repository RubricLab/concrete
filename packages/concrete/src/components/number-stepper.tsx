import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { numberControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { NumberStepper } from './number-stepper-view'

export * from './number-stepper-view'

export const numberStepperComponentSchema = z
	.object({
		error: z.string().optional(),
		label: z.string().default('Agents'),
		max: z.number().default(100),
		min: z.number().default(1),
		step: z.number().default(2),
		value: z.number().default(42)
	})
	.strict()

export const numberStepperComponentDefinition = defineConcreteComponent({
	category: 'form',
	component: NumberStepper,
	controls: [
		textControl('label', 'Label', 'Agents'),
		numberControl('value', 'Value', '42'),
		numberControl('min', 'Min', '1'),
		numberControl('max', 'Max', '100'),
		numberControl('step', 'Step', '2'),
		textControl('error', 'Error', '')
	],
	description: 'Inline numeric input with decrement/increment controls, min/max, and step support.',
	guidance:
		'Number stepper is for small bounded adjustments. Use a slider when the value is approximate or continuous.',
	kind: 'component',
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
	],
	renderExample: renderNumberStepperExample,
	schema: numberStepperComponentSchema,
	slug: 'number-stepper',
	states: states([
		['default', 'Bounded numeric adjustment.'],
		['small', 'Compact quantity control.'],
		['error', 'Invalid or out-of-policy value.']
	])
})

function renderNumberStepperExample(state = 'default'): ReactNode {
	return (
		<FormStage>
			<NumberStepper
				defaultValue={state === 'small' ? 3 : 42}
				error={state === 'error' ? 'Choose a value between 1 and 10.' : undefined}
				label="Agents"
				max={state === 'error' ? 10 : 100}
				min={1}
				step={state === 'small' ? 1 : 2}
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 420, width: '100%' }}>{children}</div>
}
