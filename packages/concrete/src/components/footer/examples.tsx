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
		description: 'Footer with action links.',
		render: () => (
			<Footer
				actions={[
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
				aside={<CodeBlock code="npm install @rubriclab/concrete" language="Shell" mode="command" />}
				columns={footerColumns}
				description="A shared visual language for AI-native software."
				title="Start with foundations."
			/>
		)
	},
	default: {
		description: 'Footer with brand, grouped links, and metadata.',
		render: () => (
			<Footer
				brand={<Inline density="compact">Concrete</Inline>}
				columns={footerColumns}
				description="Soft, powerful, compact primitives and components."
				meta="Rubric Labs"
				title="Design system for AI-native software."
			/>
		)
	}
})
