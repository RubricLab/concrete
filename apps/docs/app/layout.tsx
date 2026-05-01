import type { Metadata } from 'next'
import '@rubriclab/concrete/styles.css'

export const metadata: Metadata = {
	description:
		'Concrete is the Rubric Labs design system for AI-native editorial and product interfaces.',
	title: 'Concrete - Rubric Labs Design System'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	)
}
