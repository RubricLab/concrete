import { CodeBlock, Footer, Nav } from '@rubriclab/concrete'
import type { Metadata } from 'next'
import '@rubriclab/concrete/styles.css'

const navigationItems = [
	{ href: '/', id: 'home', label: 'Home' },
	{ href: '/foundations', id: 'foundations', label: 'Foundations' },
	{ href: '/primitives', id: 'primitives', label: 'Primitives' },
	{ href: '/components', id: 'components', label: 'Components' }
] as const

const navigationActions = [
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
] as const

const footerColumns = [
	{
		id: 'catalog',
		links: [
			{ href: '/foundations', id: 'foundations', label: 'Foundations' },
			{ href: '/primitives', id: 'primitives', label: 'Primitives' },
			{ href: '/components', id: 'components', label: 'Components' }
		],
		title: 'Catalog'
	},
	{
		id: 'render',
		links: [
			{ href: '/render/foundation/colors', id: 'foundation-render', label: 'Foundation render' },
			{ href: '/render/primitive/button', id: 'primitive-render', label: 'Primitive render' },
			{ href: '/render/component/nav', id: 'component-render', label: 'Component render' }
		],
		title: 'Render'
	},
	{
		id: 'package',
		links: navigationActions,
		title: 'Package'
	}
] as const

export const metadata: Metadata = {
	description:
		'Concrete is the Rubric Labs design system for AI-native editorial and product interfaces.',
	title: 'Concrete - Rubric Labs Design System'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<Nav actions={navigationActions} brandHref="/" items={navigationItems} />
				{children}
				<Footer
					actions={navigationActions}
					aside={<CodeBlock code="npm install @rubriclab/concrete" language="Shell" mode="command" />}
					columns={footerColumns}
					description="Soft, powerful, compact UI vocabulary for AI-native software."
					meta="Rubric Labs"
					title="Concrete"
				/>
			</body>
		</html>
	)
}
