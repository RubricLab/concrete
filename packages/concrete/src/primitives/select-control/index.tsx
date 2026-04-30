import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { SelectControl } from './component'
import { selectControlExamples } from './examples'
import { selectControlMeta } from './meta'
import { type SelectControlValue, selectControlSchema } from './schema'

export type { SelectControlProps } from './component'
export { SelectControl } from './component'
export type { SelectControlInput, SelectControlValue } from './schema'
export { selectControlPropsSchema, selectControlSchema } from './schema'

export const selectControlPrimitiveDefinition = createPrimitive({
	...selectControlMeta,
	component: SelectControl,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(selectControlExamples, state),
	renderInput: input => renderSelectControlInput(selectControlSchema.parse(input)),
	schema: selectControlSchema,
	slug: 'select-control',
	states: exampleStates(selectControlExamples, ['default', 'empty', 'open'])
})

function renderSelectControlInput({ empty, label, open }: SelectControlValue) {
	return (
		<SelectControl empty={empty} open={open}>
			{label}
		</SelectControl>
	)
}
