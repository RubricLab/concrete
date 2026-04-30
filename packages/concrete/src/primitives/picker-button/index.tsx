import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { PickerButton } from './component'
import { pickerButtonExamples } from './examples'
import { pickerButtonMeta } from './meta'
import { type PickerButtonValue, pickerButtonSchema } from './schema'

export type { PickerButtonProps } from './component'
export { PickerButton } from './component'
export type { PickerButtonInput, PickerButtonValue } from './schema'
export { pickerButtonPropsSchema, pickerButtonSchema } from './schema'

export const pickerButtonPrimitiveDefinition = createPrimitive({
	...pickerButtonMeta,
	component: PickerButton,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(pickerButtonExamples, state),
	renderInput: input => renderPickerButtonInput(pickerButtonSchema.parse(input)),
	schema: pickerButtonSchema,
	slug: 'picker-button',
	states: exampleStates(pickerButtonExamples, ['default', 'open', 'time'])
})

function renderPickerButtonInput({ icon, label, open }: PickerButtonValue) {
	return (
		<PickerButton icon={icon} open={open}>
			{label}
		</PickerButton>
	)
}
