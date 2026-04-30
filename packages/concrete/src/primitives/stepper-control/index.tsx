import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { StepperAction, StepperControl, StepperInput } from './component'
import { stepperControlExamples } from './examples'
import { stepperControlMeta } from './meta'
import { type StepperControlValue, stepperControlSchema } from './schema'

export type {
	StepperActionProps,
	StepperControlProps,
	StepperDirection,
	StepperInputProps
} from './component'
export { StepperAction, StepperControl, StepperInput } from './component'
export type { StepperControlInput, StepperControlValue } from './schema'
export { stepperControlPropsSchema, stepperControlSchema } from './schema'

export const stepperControlPrimitiveDefinition = createPrimitive({
	...stepperControlMeta,
	component: StepperControl,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(stepperControlExamples, state),
	renderInput: input => renderStepperControlInput(stepperControlSchema.parse(input)),
	schema: stepperControlSchema,
	slug: 'stepper-control',
	states: exampleStates(stepperControlExamples, ['default', 'disabled'])
})

function renderStepperControlInput({ disabled, value }: StepperControlValue) {
	return (
		<StepperControl disabled={disabled}>
			<StepperAction disabled={disabled} direction="decrement" />
			<StepperInput defaultValue={value} disabled={disabled} />
			<StepperAction disabled={disabled} direction="increment" />
		</StepperControl>
	)
}
