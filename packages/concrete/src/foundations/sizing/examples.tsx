import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { sizingTokens } from './schema'

const controlNames = ['field-control', 'button-medium', 'toolbar-control', 'icon-medium'] as const
const measureNames = ['dialog-surface', 'trace-panel', 'diagram-canvas', 'chart-height'] as const

export const sizingExamples = defineExamples({
	controls: {
		description:
			'Control and icon dimensions are shared across buttons, fields, toolbars, and menus.',
		render: () => (
			<SizingFrame meta="Shared control heights" title="Control sizing">
				<div style={barStackStyle}>
					{controlNames.map(name => {
						const token = getSizingToken(name)

						return (
							<div key={token.name} style={barRowStyle}>
								<span>{token.name}</span>
								<div style={{ ...barStyle, inlineSize: token.value }} />
								<code>{token.value}</code>
							</div>
						)
					})}
				</div>
			</SizingFrame>
		)
	},
	default: {
		description: 'Sizing owns dimensions, measures, tracks, and viewport constraints.',
		render: () => (
			<SizingFrame meta="Controls / tracks / measures" title="Sizing roles">
				<div style={gridStyle}>
					{sizingTokens.map(token => (
						<div key={token.name} style={cardStyle}>
							<span style={kindStyle}>{token.kind}</span>
							<strong>{token.name}</strong>
							<code>{token.value}</code>
						</div>
					))}
				</div>
			</SizingFrame>
		)
	},
	measures: {
		description: 'Measures cap readable and interactive surfaces without creating local widths.',
		render: () => (
			<SizingFrame meta="Dialogs / panels / charts" title="Measures">
				<div style={barStackStyle}>
					{measureNames.map(name => {
						const token = getSizingToken(name)

						return (
							<div key={token.name} style={measureRowStyle}>
								<strong>{token.name}</strong>
								<code>{token.value}</code>
							</div>
						)
					})}
				</div>
			</SizingFrame>
		)
	}
})

type SizingFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function SizingFrame({ children, meta, title }: SizingFrameProps) {
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

function getSizingToken(name: string) {
	const token = sizingTokens.find(item => item.name === name)

	if (!token) {
		throw new Error(`Missing sizing token: ${name}`)
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

const barStackStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)'
} satisfies CSSProperties

const barRowStyle = {
	alignItems: 'center',
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'minmax(var(--concrete-space-32), 0.45fr) 1fr auto'
} satisfies CSSProperties

const barStyle = {
	background: 'var(--concrete-sky-2)',
	blockSize: 'var(--concrete-space-2)',
	borderRadius: 'var(--concrete-radius-pill)',
	maxInlineSize: 'var(--concrete-size-full)'
} satisfies CSSProperties

const measureRowStyle = {
	alignItems: 'center',
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'flex',
	justifyContent: 'space-between',
	padding: 'var(--concrete-space-2)'
} satisfies CSSProperties
