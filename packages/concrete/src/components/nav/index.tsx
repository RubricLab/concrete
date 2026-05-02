import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { BrandMark, Inline, Text } from '../../primitives'
import { Nav } from './component'
import { navExamples } from './examples'
import { navMeta } from './meta'
import { type NavComponentValue, navComponentSchema } from './schema'

export type { NavItem, NavProps } from './component'
export { Nav } from './component'
export type { NavComponentInput, NavComponentValue, NavItemValue } from './schema'
export { navComponentSchema, navItemSchema } from './schema'

export const navComponentDefinition = createComponent({
	...navMeta,
	component: Nav,
	kind: 'component',
	renderExample: (state?: string) => renderExample(navExamples, state),
	renderInput: input => renderNavInput(navComponentSchema.parse(input)),
	schema: navComponentSchema,
	seed: navComponentSchema.parse({
		activeId: 'foundations',
		brandLabel: 'Concrete',
		items: [
			{ href: '/foundations', id: 'foundations', label: 'Foundations' },
			{ href: '/primitives', id: 'primitives', label: 'Primitives' },
			{ href: '/components', id: 'components', label: 'Components' }
		],
		label: 'Primary'
	}),
	slug: 'nav',
	states: exampleStates(navExamples, ['default', 'actions', 'slot', 'sticky'])
})

function renderNavInput(input: NavComponentValue) {
	const { brandLabel, ...props } = input

	return (
		<Nav
			{...props}
			brand={
				<Inline density="compact">
					<BrandMark />
					<Text intent="strong">{brandLabel}</Text>
				</Inline>
			}
			items={input.items}
		/>
	)
}
