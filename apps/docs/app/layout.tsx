import { BrandMark } from '@rubriclab/concrete'
import type { Metadata } from 'next'
import Link from 'next/link'
import '@rubriclab/concrete/styles.css'
import './styles/base.css'
import './styles/home.css'
import './styles/foundations.css'
import './styles/concepts.css'
import './styles/primitives.css'
import './styles/components.css'
import './styles/forms.css'
import './styles/render.css'
import './styles/responsive.css'

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
							<Link
								aria-label="Concrete on npm"
								className="navIconLink"
								href="https://www.npmjs.com/package/@rubriclab/concrete"
								rel="noreferrer"
								target="_blank"
							>
								<NpmIcon />
							</Link>
							<Link
								aria-label="Concrete on GitHub"
								className="navIconLink"
								href="https://github.com/RubricLab/concrete"
								rel="noreferrer"
								target="_blank"
							>
								<GitHubIcon />
							</Link>
						</nav>
					</header>
					{children}
				</div>
			</body>
		</html>
	)
}

function NpmIcon() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<path d="M2.5 7h19v10h-9.5v-2h-2v2H2.5V7Zm2 2v6h2V9h-2Zm4 0v4h2V9h-2Zm4 0v4h2V9h-2Zm4 0v6h2V9h-2Z" />
		</svg>
	)
}

function GitHubIcon() {
	return (
		<svg aria-hidden="true" viewBox="0 0 24 24">
			<path d="M12 2.75c-5.11 0-9.25 4.14-9.25 9.25 0 4.08 2.65 7.54 6.32 8.76.46.08.63-.2.63-.45v-1.58c-2.57.56-3.11-1.24-3.11-1.24-.42-1.07-1.03-1.36-1.03-1.36-.84-.57.06-.56.06-.56.93.07 1.42.96 1.42.96.83 1.42 2.18 1.01 2.71.77.08-.6.32-1.01.59-1.24-2.05-.23-4.21-1.03-4.21-4.57 0-1.01.36-1.84.95-2.49-.1-.23-.41-1.18.09-2.45 0 0 .78-.25 2.54.95A8.8 8.8 0 0 1 12 7.16c.78 0 1.56.1 2.3.31 1.76-1.2 2.53-.95 2.53-.95.5 1.27.19 2.22.09 2.45.59.65.95 1.48.95 2.49 0 3.55-2.16 4.33-4.22 4.56.33.29.63.86.63 1.73v2.56c0 .25.17.54.64.45A9.26 9.26 0 0 0 21.25 12c0-5.11-4.14-9.25-9.25-9.25Z" />
		</svg>
	)
}
