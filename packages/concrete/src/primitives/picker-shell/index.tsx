import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { PickerControl } from '../picker-control'
import { PickerShell } from './component'
import { pickerShellExamples } from './examples'
import { pickerShellMeta } from './meta'
import { type PickerShellValue, pickerShellSchema } from './schema'

export type { PickerShellKind, PickerShellProps } from './component'
export { PickerShell } from './component'
export type { PickerShellInput, PickerShellValue } from './schema'
export { pickerShellKindValues, pickerShellPropsSchema, pickerShellSchema } from './schema'

export const pickerShellPrimitiveDefinition = createPrimitive({
	...pickerShellMeta,
	component: PickerShell,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(pickerShellExamples, state),
	renderInput: input => renderPickerShellInput(pickerShellSchema.parse(input)),
	schema: pickerShellSchema,
	slug: 'picker-shell',
	states: exampleStates(pickerShellExamples, ['default', 'date', 'time', 'multi'])
})

function renderPickerShellInput(input: PickerShellValue) {
	return (
		<PickerShell {...input}>
			<PickerControl icon={input.kind === 'time' ? 'clock' : 'calendar'}>Selected value</PickerControl>
		</PickerShell>
	)
}
