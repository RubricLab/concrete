import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { OptionRow } from '../option-row'
import { MenuGroup } from './component'
import { menuGroupExamples } from './examples'
import { menuGroupMeta } from './meta'
import { type MenuGroupValue, menuGroupSchema } from './schema'

export type { MenuGroupProps } from './component'
export { MenuGroup } from './component'
export type { MenuGroupInput, MenuGroupValue } from './schema'
export { menuGroupPropsSchema, menuGroupSchema } from './schema'

export const menuGroupPrimitiveDefinition = createPrimitive({
	...menuGroupMeta,
	component: MenuGroup,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(menuGroupExamples, state),
	renderInput: input => renderMenuGroupInput(menuGroupSchema.parse(input)),
	schema: menuGroupSchema,
	slug: 'menu-group',
	states: exampleStates(menuGroupExamples, ['default', 'selection', 'status'])
})

function renderMenuGroupInput({ itemCount, title }: MenuGroupValue) {
	const items = ['Ask Concrete', 'Open brief', 'Copy link', 'Delete'].slice(0, itemCount)

	return (
		<MenuGroup title={title}>
			{items.map(item => (
				<OptionRow key={item} kind="command">
					{item}
				</OptionRow>
			))}
		</MenuGroup>
	)
}
