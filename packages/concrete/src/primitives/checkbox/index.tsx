import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Checkbox } from './component'
import { checkboxExamples } from './examples'
import { checkboxMeta } from './meta'
import { type CheckboxValue, checkboxSchema } from './schema'

export type { CheckboxProps } from './component'
export { Checkbox } from './component'
export type { CheckboxInput, CheckboxValue } from './schema'
export { checkboxPropsSchema, checkboxSchema } from './schema'

export const checkboxPrimitiveDefinition = createPrimitive({
	...checkboxMeta,
	component: Checkbox,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(checkboxExamples, state),
	renderInput: input => renderCheckboxInput(checkboxSchema.parse(input)),
	schema: checkboxSchema,
	slug: 'checkbox',
	states: exampleStates(checkboxExamples, ['default', 'disabled'])
})

function renderCheckboxInput(input: CheckboxValue) {
	return <Checkbox {...input} readOnly />
}
