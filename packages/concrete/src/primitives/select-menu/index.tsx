import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { OptionRow } from '../option-row'
import { SelectMenu } from './component'
import { selectMenuExamples } from './examples'
import { selectMenuMeta } from './meta'
import { type SelectMenuValue, selectMenuSchema } from './schema'

export type { SelectMenuProps } from './component'
export { SelectMenu } from './component'
export type { SelectMenuInput, SelectMenuValue } from './schema'
export { selectMenuPropsSchema, selectMenuSchema } from './schema'

export const selectMenuPrimitiveDefinition = createPrimitive({
	...selectMenuMeta,
	component: SelectMenu,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(selectMenuExamples, state),
	renderInput: input => renderSelectMenuInput(selectMenuSchema.parse(input)),
	schema: selectMenuSchema,
	slug: 'select-menu',
	states: exampleStates(selectMenuExamples, ['default', 'static'])
})

function renderSelectMenuInput({ filterable, placeholder, placement }: SelectMenuValue) {
	return (
		<SelectMenu
			filterInputProps={filterable ? { 'aria-label': 'Filter options', placeholder } : undefined}
			placement={placement}
		>
			<OptionRow kind="select" selected>
				Research
			</OptionRow>
			<OptionRow kind="select">Design system</OptionRow>
		</SelectMenu>
	)
}
