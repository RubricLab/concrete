import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Listbox } from '../listbox'
import { PickerSurface } from './component'
import { pickerSurfaceExamples } from './examples'
import { pickerSurfaceMeta } from './meta'
import { type PickerSurfaceValue, pickerSurfaceSchema } from './schema'

export type { PickerSurfaceProps } from './component'
export { PickerSurface } from './component'
export type { PickerSurfaceInput, PickerSurfacePlacement, PickerSurfaceValue } from './schema'
export {
	pickerSurfacePlacementSchema,
	pickerSurfacePropsSchema,
	pickerSurfaceSchema
} from './schema'

export const pickerSurfacePrimitiveDefinition = createPrimitive({
	...pickerSurfaceMeta,
	component: PickerSurface,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(pickerSurfaceExamples, state),
	renderInput: input => renderPickerSurfaceInput(pickerSurfaceSchema.parse(input)),
	schema: pickerSurfaceSchema,
	slug: 'picker-surface',
	states: exampleStates(pickerSurfaceExamples, ['default', 'floating', 'dense'])
})

function renderPickerSurfaceInput({ content, open, placement }: PickerSurfaceValue) {
	return (
		<PickerSurface open={open} placement={placement}>
			<Listbox emptyLabel={content} />
		</PickerSurface>
	)
}
