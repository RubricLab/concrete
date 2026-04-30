import { defineExamples } from '../../factories/createExamples'
import { Field } from '../field'
import { Stepper, StepperAction, StepperInput } from './component'

export const stepperExamples = defineExamples({
	default: {
		description: 'Bounded numeric stepper control.',
		render: () => (
			<Field label="Agents">
				<Stepper>
					<StepperAction direction="decrement" />
					<StepperInput defaultValue={42} />
					<StepperAction direction="increment" />
				</Stepper>
			</Field>
		)
	},
	disabled: {
		description: 'Disabled stepper control.',
		render: () => (
			<Field label="Agents">
				<Stepper disabled>
					<StepperAction disabled direction="decrement" />
					<StepperInput defaultValue={42} disabled />
					<StepperAction disabled direction="increment" />
				</Stepper>
			</Field>
		)
	}
})
