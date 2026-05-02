import { defineExamples } from '../../factories/createExamples'
import { Field } from '../field'
import { Stack } from '../stack'
import { Stepper, StepperAction, StepperInput } from './component'

export const stepperExamples = defineExamples({
	default: {
		description: 'Bounded numeric steppers in dense field composition.',
		render: () => (
			<Stack density="compact">
				<Field label="Agents">
					<Stepper>
						<StepperAction direction="decrement" />
						<StepperInput defaultValue={42} />
						<StepperAction direction="increment" />
					</Stepper>
				</Field>
				<Field help="Caps parallel tool calls." label="Concurrency">
					<Stepper>
						<StepperAction direction="decrement" />
						<StepperInput defaultValue={4} />
						<StepperAction direction="increment" />
					</Stepper>
				</Field>
			</Stack>
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
	},
	error: {
		description: 'Invalid numeric field state.',
		render: () => (
			<Field error="Choose at least one reviewer." label="Reviewers">
				<Stepper>
					<StepperAction direction="decrement" />
					<StepperInput defaultValue={0} invalid />
					<StepperAction direction="increment" />
				</Stepper>
			</Field>
		)
	}
})
