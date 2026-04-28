import { BrandMark } from '@rubriclab/concrete'
import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
	description:
		'Concrete is the Rubric Labs design system for AI-native editorial and product interfaces.',
	title: 'Concrete - Rubric Labs Design System'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>
				<div className="siteShell">
					<header className="topbar">
						<Link className="brand" href="/#home">
							<BrandMark />
							<span>Concrete</span>
						</Link>
						<nav className="nav">
							<Link href="/#foundations">Foundations</Link>
							<Link href="/#primitives">Primitives</Link>
							<Link href="/#components">Components</Link>
							<Link href="/#api">API</Link>
						</nav>
					</header>
					{children}
				</div>
			</body>
		</html>
	)
}
