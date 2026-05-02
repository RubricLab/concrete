import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { MenuGroup } from '../menu-group'
import { OptionRow } from '../option-row'
import { MenuSurface } from './component'
import { menuSurfaceExamples } from './examples'
import { menuSurfaceMeta } from './meta'
import { type MenuSurfaceValue, menuSurfaceSchema } from './schema'

export type { MenuSurfaceProps } from './component'
export { MenuSurface } from './component'
export type { MenuSurfaceInput, MenuSurfaceRole, MenuSurfaceValue } from './schema'
export { menuSurfacePropsSchema, menuSurfaceRoleSchema, menuSurfaceSchema } from './schema'

export const menuSurfacePrimitiveDefinition = createPrimitive({
	...menuSurfaceMeta,
	component: MenuSurface,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(menuSurfaceExamples, state),
	renderInput: input => renderMenuSurfaceInput(menuSurfaceSchema.parse(input)),
	schema: menuSurfaceSchema,
	slug: 'menu-surface',
	states: exampleStates(menuSurfaceExamples, ['default', 'search', 'compact'])
})

function renderMenuSurfaceInput({ density, itemCount, role }: MenuSurfaceValue) {
	const items = ['Ask Concrete', 'Open brief', 'Copy link', 'Delete'].slice(0, itemCount)

	return (
		<MenuSurface density={density} role={role}>
			<MenuGroup title="Commands">
				{items.map(item => (
					<OptionRow key={item} kind="command">
						{item}
					</OptionRow>
				))}
			</MenuGroup>
		</MenuSurface>
	)
}
