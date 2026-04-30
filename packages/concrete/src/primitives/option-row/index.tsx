import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { OptionRow } from './component'
import { optionRowExamples } from './examples'
import { optionRowMeta } from './meta'
import { type OptionRowValue, optionRowSchema } from './schema'

export type { OptionRowKind, OptionRowProps } from './component'
export { OptionRow } from './component'
export type { OptionRowInput, OptionRowValue } from './schema'
export { optionRowPropsSchema, optionRowSchema } from './schema'

export const optionRowPrimitiveDefinition = createPrimitive({
	...optionRowMeta,
	component: OptionRow,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(optionRowExamples, state),
	renderInput: input => renderOptionRowInput(optionRowSchema.parse(input)),
	schema: optionRowSchema,
	slug: 'option-row',
	states: exampleStates(optionRowExamples, ['default', 'command', 'select', 'danger'])
})

function renderOptionRowInput({ label, ...input }: OptionRowValue) {
	return <OptionRow {...input}>{label}</OptionRow>
}
