import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Input } from '../input'
import { Field } from './component'
import { fieldExamples } from './examples'
import { fieldMeta } from './meta'
import { type FieldValue, fieldSchema } from './schema'

export type { FieldProps } from './component'
export { Field } from './component'
export type { FieldInput, FieldValue } from './schema'
export { fieldPropsSchema, fieldSchema } from './schema'

export const fieldPrimitiveDefinition = createPrimitive({
	...fieldMeta,
	component: Field,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(fieldExamples, state),
	renderInput: input => renderFieldInput(fieldSchema.parse(input)),
	schema: fieldSchema,
	slug: 'field',
	states: exampleStates(fieldExamples, ['default', 'error', 'success', 'count'])
})

function renderFieldInput(input: FieldValue) {
	return (
		<Field {...input}>
			<Input placeholder="rubric-labs" />
		</Field>
	)
}
