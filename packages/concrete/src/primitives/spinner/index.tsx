import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Spinner } from './component'
import { spinnerExamples } from './examples'
import { spinnerMeta } from './meta'
import { type SpinnerValue, spinnerSchema } from './schema'

export type { SpinnerProps } from './component'
export { Spinner } from './component'
export type { SpinnerInput, SpinnerValue } from './schema'
export { spinnerPropsSchema, spinnerSchema, spinnerToneValues } from './schema'

export const spinnerPrimitiveDefinition = createPrimitive({
	...spinnerMeta,
	component: Spinner,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(spinnerExamples, state),
	renderInput: input => renderSpinnerInput(spinnerSchema.parse(input)),
	schema: spinnerSchema,
	slug: 'spinner',
	states: exampleStates(spinnerExamples, ['default', 'tiny'])
})

function renderSpinnerInput(input: SpinnerValue) {
	return <Spinner {...input} />
}
