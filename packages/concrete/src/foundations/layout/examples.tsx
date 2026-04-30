import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { layoutTokens } from './schema'

const templateNames = ['form-row', 'picker-control', 'calendar-grid', 'distribution-row'] as const
const layerNames = ['tooltip', 'form-overlay'] as const

export const layoutExamples = defineExamples({
	default: {
		description: 'Layout owns recipes for composition, not item-specific CSS shortcuts.',
		render: () => (
			<LayoutFrame meta="Templates / layers / offsets" title="Layout tokens">
				<div style={gridStyle}>
					{layoutTokens.map(token => (
						<div key={token.name} style={cardStyle}>
							<span style={kindStyle}>{token.kind}</span>
							<strong>{token.name}</strong>
							<code>{token.value}</code>
						</div>
					))}
				</div>
			</LayoutFrame>
		)
	},
	layers: {
		description: 'Layers keep overlays, menus, sticky table cells, and tooltips deterministic.',
		render: () => (
			<LayoutFrame meta="Z-index roles" title="Layer policy">
				<div style={stackStyle}>
					{layerNames.map(name => {
						const token = getLayoutToken(name)

						return (
							<div key={token.name} style={rowStyle}>
								<strong>{token.name}</strong>
								<code>{token.value}</code>
							</div>
						)
					})}
				</div>
			</LayoutFrame>
		)
	},
	templates: {
		description: 'Templates are shared composition recipes consumed by primitives.',
		render: () => (
			<LayoutFrame meta="Grid recipes" title="Templates">
				<div style={stackStyle}>
					{templateNames.map(name => {
						const token = getLayoutToken(name)

						return (
							<div key={token.name} style={rowStyle}>
								<strong>{token.name}</strong>
								<code>{token.value}</code>
							</div>
						)
					})}
				</div>
			</LayoutFrame>
		)
	}
})

type LayoutFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function LayoutFrame({ children, meta, title }: LayoutFrameProps) {
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

function getLayoutToken(name: string) {
	const token = layoutTokens.find(item => item.name === name)

	if (!token) {
		throw new Error(`Missing layout token: ${name}`)
	}

	return token
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
	gap: 'var(--concrete-space-2)',
	justifyContent: 'space-between',
	padding: 'var(--concrete-space-2)'
} satisfies CSSProperties
