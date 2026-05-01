import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Stepper, StepperAction, StepperInput } from './component'
import { stepperExamples } from './examples'
import { stepperMeta } from './meta'
import { type StepperValue, stepperSchema } from './schema'

export type {
	StepperActionProps,
	StepperDirection,
	StepperInputProps,
	StepperProps
} from './component'
export { Stepper, StepperAction, StepperInput } from './component'
export type { StepperPrimitiveInput, StepperValue } from './schema'
export { stepperPropsSchema, stepperSchema } from './schema'

export const stepperPrimitiveDefinition = createPrimitive({
	...stepperMeta,
	component: Stepper,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(stepperExamples, state),
	renderInput: input => renderStepperInput(stepperSchema.parse(input)),
	schema: stepperSchema,
	slug: 'stepper',
	states: exampleStates(stepperExamples, ['default', 'error', 'disabled'])
})

function renderStepperInput({ disabled, value }: StepperValue) {
	return (
		<Stepper disabled={disabled}>
			<StepperAction disabled={disabled} direction="decrement" />
			<StepperInput defaultValue={value} disabled={disabled} />
			<StepperAction disabled={disabled} direction="increment" />
		</Stepper>
	)
}
