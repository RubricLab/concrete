import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Kbd } from '../kbd'
import { OptionRow } from '../option-row'
import {
	MenuShell,
	MenuShellBody,
	MenuShellEmpty,
	MenuShellFooter,
	MenuShellGroup,
	MenuShellSearch
} from './component'
import { menuShellExamples } from './examples'
import { menuShellMeta } from './meta'
import { type MenuShellValue, menuShellSchema } from './schema'

export type {
	MenuShellBodyProps,
	MenuShellEmptyProps,
	MenuShellFooterProps,
	MenuShellGroupProps,
	MenuShellProps,
	MenuShellSearchProps
} from './component'
export {
	MenuShell,
	MenuShellBody,
	MenuShellEmpty,
	MenuShellFooter,
	MenuShellGroup,
	MenuShellSearch
} from './component'
export type { MenuShellInput, MenuShellValue } from './schema'
export { menuShellPropsSchema, menuShellSchema } from './schema'

export const menuShellPrimitiveDefinition = createPrimitive({
	...menuShellMeta,
	component: MenuShell,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(menuShellExamples, state),
	renderInput: input => renderMenuShellInput(menuShellSchema.parse(input)),
	schema: menuShellSchema,
	slug: 'menu-shell',
	states: exampleStates(menuShellExamples, ['default', 'empty'])
})

function renderMenuShellInput({ empty, heading, searchable, showEmpty }: MenuShellValue) {
	return (
		<MenuShell>
			{searchable ? <MenuShellSearch inputProps={{ placeholder: 'Search commands...' }} /> : null}
			<MenuShellBody>
				{showEmpty ? (
					<MenuShellEmpty>{empty}</MenuShellEmpty>
				) : (
					<MenuShellGroup title="Actions">
						<OptionRow kind="command" leadingIcon="folder-plus" shortcuts={['N']}>
							New workspace
						</OptionRow>
						<OptionRow kind="command" leadingIcon="settings">
							Open settings
						</OptionRow>
					</MenuShellGroup>
				)}
			</MenuShellBody>
			<MenuShellFooter
				end={
					<>
						<Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate
					</>
				}
				start={heading}
			/>
		</MenuShell>
	)
}
