import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { elevationTokens } from './schema'

const surfacePlans = [
	['hairline', 'Base plane', 'border only'],
	['shadow-1', 'Raised tile', 'resting card'],
	['shadow-2', 'Popover', 'anchored layer'],
	['shadow-3', 'Overlay', 'modal surface'],
	['shadow-4', 'Lifted shell', 'rare emphasis']
] as const

export const elevationExamples = defineExamples({
	default: {
		description: 'Border-first elevation steps from hairline to rare lifted shells.',
		render: () => (
			<ElevationFrame meta="Five elevation steps" title="Surface separation">
				<div style={elevationGridStyle}>
					{surfacePlans.map(([tokenName, title, description]) => (
						<div key={tokenName} style={getElevationCardStyle(tokenName)}>
							<strong>{title}</strong>
							<span>{description}</span>
							<code>{tokenName}</code>
						</div>
					))}
				</div>
			</ElevationFrame>
		)
	},
	stack: {
		description: 'Layered planes show when elevation should replace heavier borders.',
		render: () => (
			<ElevationFrame meta="Product stack" title="Nested surface rhythm">
				<div style={stackOuterStyle}>
					<div style={stackMiddleStyle}>
						<div style={stackInnerStyle}>
							<strong>Command output</strong>
							<span>Hairlines handle structure. Shadow only separates floating affordances.</span>
						</div>
					</div>
				</div>
			</ElevationFrame>
		)
	}
})

type ElevationFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function ElevationFrame({ children, meta, title }: ElevationFrameProps) {
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

function getElevationCardStyle(tokenName: string): CSSProperties {
	const token = elevationTokens.find(item => item.name === tokenName)

	if (!token) {
		throw new Error(`Missing elevation token: ${tokenName}`)
	}

	return {
		...elevationCardStyle,
		boxShadow: token.value
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

const elevationGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'repeat(auto-fit, minmax(var(--concrete-space-24), 1fr))'
} satisfies CSSProperties

const elevationCardStyle = {
	background: 'var(--concrete-surface)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	minBlockSize: 'var(--concrete-space-24)',
	padding: 'var(--concrete-space-3)'
} satisfies CSSProperties

const stackOuterStyle = {
	background: 'var(--concrete-sunken)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-5)',
	display: 'grid',
	padding: 'var(--concrete-space-5)'
} satisfies CSSProperties

const stackMiddleStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-4)',
	boxShadow: 'var(--concrete-shadow-2)',
	display: 'grid',
	padding: 'var(--concrete-space-4)'
} satisfies CSSProperties

const stackInnerStyle = {
	background: 'var(--concrete-surface)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	boxShadow: 'var(--concrete-shadow-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1-5)',
	padding: 'var(--concrete-space-4)'
} satisfies CSSProperties
