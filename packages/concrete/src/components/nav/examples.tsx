import { defineExamples } from '../../factories/createExamples'
import { BrandMark, Inline, Text } from '../../primitives'
import { Nav } from './component'

const navItems = [
	{ href: '/foundations', id: 'foundations', label: 'Foundations' },
	{ href: '/primitives', id: 'primitives', label: 'Primitives' },
	{ href: '/components', id: 'components', label: 'Components' }
] as const

export const navExamples = defineExamples({
	actions: {
		description: 'Navigation with package and source links.',
		render: () => (
			<Nav
				actions={[
					{
						external: true,
						href: 'https://www.npmjs.com/package/@rubriclab/concrete',
						id: 'npm',
						label: 'npm'
					},
					{
						external: true,
						href: 'https://github.com/RubricLab/concrete',
						id: 'github',
						label: 'GitHub'
					}
				]}
				activeId="components"
				items={navItems}
			/>
		)
	},
	default: {
		description: 'Primary navigation with Concrete brand.',
		render: () => <Nav activeId="foundations" items={navItems} />
	},
	slot: {
		description: 'Navigation with an explicit brand slot.',
		render: () => (
			<Nav
				brand={
					<Inline density="compact">
						<BrandMark />
						<Text intent="strong">Rubric OS</Text>
					</Inline>
				}
				items={navItems}
			/>
		)
	},
	sticky: {
		description: 'Sticky top-level navigation chrome.',
		render: () => <Nav activeId="foundations" items={navItems} placement="sticky" />
	}
})
