import { defineExamples } from '../../factories/createExamples'
import { CodeBlock, Inline } from '../../primitives'
import { Footer } from './component'

const footerColumns = [
	{
		id: 'system',
		links: [
			{ href: '/foundations', id: 'foundations', label: 'Foundations' },
			{ href: '/primitives', id: 'primitives', label: 'Primitives' },
			{ href: '/components', id: 'components', label: 'Components' }
		],
		title: 'System'
	},
	{
		id: 'package',
		links: [
			{ href: '/render/primitive/button', id: 'render', label: 'Render route' },
			{ href: '/components/nav', id: 'nav', label: 'Nav' },
			{ href: '/components/footer', id: 'footer', label: 'Footer' }
		],
		title: 'Package'
	}
] as const

export const footerExamples = defineExamples({
	actions: {
		description: 'Footer with package and source links.',
		render: () => (
			<Footer
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
				columns={footerColumns}
				description="Concrete composes dense product surfaces and calm editorial pages."
				title="Rubric Labs"
			/>
		)
	},
	command: {
		description: 'Footer with a command aside.',
		render: () => (
			<Footer
				aside={<CodeBlock code="npm i @rubriclab/concrete" language="Shell" mode="command" />}
				columns={footerColumns}
				description="A shared visual language for AI-native software."
				title="Install Concrete."
			/>
		)
	},
	default: {
		description: 'Footer with brand, grouped links, and metadata.',
		render: () => (
			<Footer
				brand={<Inline density="compact">Concrete</Inline>}
				columns={footerColumns}
				description="Dense primitives, compact components, calm docs."
				meta="Rubric Labs"
				title="Concrete for AI-native software."
			/>
		)
	},
	minimal: {
		description: 'Footer with a compact brand statement and actions only.',
		render: () => (
			<Footer
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
				description="Soft, powerful, compact UI for agent workflows."
				meta="Rubric Labs"
				title="Concrete"
			/>
		)
	}
})
