import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { radiusTokens } from './schema'

const usageRows = [
	['radius-2', 'Atoms', 'checkboxes and marks'],
	['radius-3', 'Controls', 'inputs and buttons'],
	['radius-4', 'Cards', 'compact panels'],
	['radius-5', 'Surfaces', 'larger grouped regions'],
	['radius-pill', 'Pills', 'chips and badges']
] as const

export const radiiExamples = defineExamples({
	controls: {
		description: 'Small radii keep dense controls calm while pills remain explicit.',
		render: () => (
			<RadiiFrame meta="Control hierarchy" title="Radius use by scope">
				<div style={usageGridStyle}>
					{usageRows.map(([tokenName, label, description]) => (
						<div key={tokenName} style={getUsageStyle(tokenName)}>
							<strong>{label}</strong>
							<span>{description}</span>
							<code>{tokenName}</code>
						</div>
					))}
				</div>
			</RadiiFrame>
		)
	},
	default: {
		description: 'Corner tokens from square edges through explicit pill shapes.',
		render: () => (
			<RadiiFrame meta="0 / 4 / 6 / 10 / 14 / 20 / pill" title="Corner scale">
				<div style={radiusGridStyle}>
					{radiusTokens.map(token => (
						<div key={token.name} style={radiusTileStyle}>
							<span style={{ ...radiusPreviewStyle, borderRadius: token.value }} />
							<strong>{token.name}</strong>
							<code>{token.value}</code>
						</div>
					))}
				</div>
			</RadiiFrame>
		)
	}
})

type RadiiFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function RadiiFrame({ children, meta, title }: RadiiFrameProps) {
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

function getUsageStyle(tokenName: string): CSSProperties {
	const token = radiusTokens.find(item => item.name === tokenName)

	if (!token) {
		throw new Error(`Missing radius token: ${tokenName}`)
	}

	return {
		...usageCardStyle,
		borderRadius: token.value
	}
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

const radiusGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'repeat(auto-fit, minmax(var(--concrete-space-20), 1fr))'
} satisfies CSSProperties

const radiusTileStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	padding: 'var(--concrete-space-2)'
} satisfies CSSProperties

const radiusPreviewStyle = {
	background: 'linear-gradient(135deg, var(--concrete-ink-9), var(--concrete-sky))',
	display: 'block',
	inlineSize: 'var(--concrete-size-full)',
	minBlockSize: 'var(--concrete-space-10)'
} satisfies CSSProperties

const usageGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'repeat(auto-fit, minmax(var(--concrete-space-24), 1fr))'
} satisfies CSSProperties

const usageCardStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	padding: 'var(--concrete-space-3)'
} satisfies CSSProperties
