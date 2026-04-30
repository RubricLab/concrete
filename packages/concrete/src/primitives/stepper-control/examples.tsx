import { defineExamples } from '../../factories/createExamples'
import { Field } from '../field'
import { StepperAction, StepperControl, StepperInput } from './component'

export const stepperControlExamples = defineExamples({
	default: {
		description: 'Bounded numeric stepper control.',
		render: () => (
			<Field label="Agents">
				<StepperControl>
					<StepperAction direction="decrement" />
					<StepperInput defaultValue={42} />
					<StepperAction direction="increment" />
				</StepperControl>
			</Field>
		)
	},
	disabled: {
		description: 'Disabled stepper control.',
		render: () => (
			<Field label="Agents">
				<StepperControl disabled>
					<StepperAction disabled direction="decrement" />
					<StepperInput defaultValue={42} disabled />
					<StepperAction disabled direction="increment" />
				</StepperControl>
			</Field>
		)
	}
})
