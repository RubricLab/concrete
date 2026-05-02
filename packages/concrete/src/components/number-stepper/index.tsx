import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { NumberStepper } from './component'
import { numberStepperExamples } from './examples'
import { numberStepperMeta } from './meta'
import { type NumberStepperValue, numberStepperComponentSchema } from './schema'

export type { NumberStepperProps } from './component'
export { NumberStepper } from './component'
export type { NumberStepperInput, NumberStepperValue } from './schema'
export { numberStepperComponentSchema } from './schema'

export const numberStepperComponentDefinition = createComponent({
	...numberStepperMeta,
	component: NumberStepper,
	kind: 'component',
	renderExample: (state?: string) => renderExample(numberStepperExamples, state),
	renderInput: input => renderNumberStepperInput(numberStepperComponentSchema.parse(input)),
	schema: numberStepperComponentSchema,
	slug: 'number-stepper',
	states: exampleStates(numberStepperExamples, ['default', 'small', 'success', 'disabled', 'error'])
})

function renderNumberStepperInput({ value, ...input }: NumberStepperValue) {
	return <NumberStepper {...input} defaultValue={value} />
}
