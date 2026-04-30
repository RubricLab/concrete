import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { PickerControl } from './component'
import { pickerControlExamples } from './examples'
import { pickerControlMeta } from './meta'
import { type PickerControlValue, pickerControlSchema } from './schema'

export type { PickerControlProps } from './component'
export { PickerControl } from './component'
export type { PickerControlInput, PickerControlValue } from './schema'
export { pickerControlPropsSchema, pickerControlSchema } from './schema'

export const pickerControlPrimitiveDefinition = createPrimitive({
	...pickerControlMeta,
	component: PickerControl,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(pickerControlExamples, state),
	renderInput: input => renderPickerControlInput(pickerControlSchema.parse(input)),
	schema: pickerControlSchema,
	slug: 'picker-control',
	states: exampleStates(pickerControlExamples, ['default', 'date', 'open', 'time'])
})

function renderPickerControlInput({ label, ...input }: PickerControlValue) {
	return <PickerControl {...input}>{label}</PickerControl>
}
