import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Select } from './component'
import { selectExamples } from './examples'
import { selectMeta } from './meta'
import { type SelectValue, selectSchema } from './schema'

export type { SelectOption, SelectProps } from './component'
export { Select } from './component'
export type { SelectInput, SelectValue } from './schema'
export { selectOptionSchema, selectPropsSchema, selectSchema, workspaceOptions } from './schema'

export const selectPrimitiveDefinition = createPrimitive({
	...selectMeta,
	component: Select,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(selectExamples, state),
	renderInput: input => renderSelectInput(selectSchema.parse(input)),
	schema: selectSchema,
	slug: 'select',
	states: exampleStates(selectExamples, ['default', 'filled', 'error', 'disabled'])
})

function renderSelectInput({ value, ...input }: SelectValue) {
	return <Select {...input} {...(value ? { defaultValue: value } : {})} />
}
