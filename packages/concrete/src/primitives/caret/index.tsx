import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Caret } from './component'
import { caretExamples } from './examples'
import { caretMeta } from './meta'
import { type CaretValue, caretSchema } from './schema'

export type { CaretDirection, CaretProps, CaretSize } from './component'
export { Caret } from './component'
export type { CaretInput, CaretValue } from './schema'
export { caretPropsSchema, caretSchema } from './schema'

export const caretPrimitiveDefinition = createPrimitive({
	...caretMeta,
	component: Caret,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(caretExamples, state),
	renderInput: input => renderCaretInput(caretSchema.parse(input)),
	schema: caretSchema,
	slug: 'caret',
	states: exampleStates(caretExamples, ['default', 'open', 'direction'])
})

function renderCaretInput(input: CaretValue) {
	return <Caret {...input} />
}
