import '@rubriclab/concrete/styles.css'
import './globals.css'
import { Icon } from '@rubriclab/concrete'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	description: 'Concrete design system foundations, primitives, components, skill, and API.',
	title: 'Concrete'
}

const navigationItems = [
	{ href: '/#foundations', label: 'Foundations' },
	{ href: '/#primitives', label: 'Primitives' },
	{ href: '/#components', label: 'Components' },
	{ href: '/#skill', label: 'Skill' },
	{ href: '/#api', label: 'API' }
] as const

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<header className="docs-nav">
					<a aria-label="Concrete home" className="docs-brand" href="/#home">
						<Icon name="layers" size={16} />
						<span>Concrete</span>
					</a>
					<nav aria-label="Primary">
						{navigationItems.map(item => (
							<a href={item.href} key={item.href}>
								{item.label}
							</a>
						))}
					</nav>
				</header>
				{children}
			</body>
		</html>
	)
}
