import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Radio } from './component'
import { radioExamples } from './examples'
import { radioMeta } from './meta'
import { type RadioValue, radioSchema } from './schema'

export type { RadioProps } from './component'
export { Radio } from './component'
export type { RadioInput, RadioValue } from './schema'
export { radioPropsSchema, radioSchema } from './schema'

export const radioPrimitiveDefinition = createPrimitive({
	...radioMeta,
	component: Radio,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(radioExamples, state),
	renderInput: input => renderRadioInput(radioSchema.parse(input)),
	schema: radioSchema,
	slug: 'radio',
	states: exampleStates(radioExamples, ['default', 'disabled'])
})

function renderRadioInput(input: RadioValue) {
	return <Radio {...input} readOnly />
}
