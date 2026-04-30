import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { accessibilityTokens } from './schema'

export const accessibilityExamples = defineExamples({
	default: {
		description: 'Accessibility owns reset-level utilities and constraints below primitives.',
		render: () => (
			<AccessibilityFrame meta="Utilities / constraints" title="Accessibility foundation">
				<div style={gridStyle}>
					{accessibilityTokens.map(token => (
						<div key={token.name} style={cardStyle}>
							<span style={kindStyle}>{token.kind}</span>
							<strong>{token.name}</strong>
							<p style={descriptionStyle}>{token.description}</p>
							<code>{token.value}</code>
						</div>
					))}
				</div>
			</AccessibilityFrame>
		)
	},
	utilities: {
		description: 'Utilities are lower than primitives and should be consumed through shared anatomy.',
		render: () => (
			<AccessibilityFrame meta="Utility layer" title="Reset-level utilities">
				<div style={stackStyle}>
					<div style={rowStyle}>
						<strong>Visually hidden</strong>
						<code>.concrete-visually-hidden</code>
					</div>
					<div style={rowStyle}>
						<strong>Focus target</strong>
						<code>.concrete-focus-target</code>
					</div>
				</div>
			</AccessibilityFrame>
		)
	}
})

type AccessibilityFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function AccessibilityFrame({ children, meta, title }: AccessibilityFrameProps) {
	return (
		<div style={frameStyle}>
			<header style={frameHeaderStyle}>
				<strong>{title}</strong>
				<span>{meta}</span>
			</header>
			{children}
		</div>
	)
}

const frameStyle = {
	background: 'var(--concrete-surface)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-4)',
	boxShadow: 'var(--concrete-shadow-1)',
	display: 'grid',
	gap: 'var(--concrete-space-4)',
	padding: 'var(--concrete-space-4)',
	width: 'var(--concrete-size-full)'
} satisfies CSSProperties

const frameHeaderStyle = {
	alignItems: 'baseline',
	display: 'flex',
	gap: 'var(--concrete-space-2)',
	justifyContent: 'space-between'
} satisfies CSSProperties

const gridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'repeat(auto-fit, minmax(var(--concrete-space-32), 1fr))'
} satisfies CSSProperties

const cardStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	padding: 'var(--concrete-space-3)'
} satisfies CSSProperties

const kindStyle = {
	color: 'var(--concrete-foreground-muted)',
	fontFamily: 'var(--concrete-font-mono)',
	fontSize: 'var(--concrete-type-10)',
	textTransform: 'uppercase'
} satisfies CSSProperties

const descriptionStyle = {
	color: 'var(--concrete-foreground-muted)',
	fontSize: 'var(--concrete-type-12)',
	lineHeight: 'var(--concrete-line-normal)',
	margin: 0
} satisfies CSSProperties

const stackStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)'
} satisfies CSSProperties

const rowStyle = {
	alignItems: 'center',
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'flex',
	justifyContent: 'space-between',
	padding: 'var(--concrete-space-2)'
} satisfies CSSProperties
