import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { spacingTokens } from './schema'

type SpacingToken = (typeof spacingTokens)[number]

const densityRows = [
	['Product', 'space-2', 'space-3', 'dense rows and controls'],
	['Generative UI', 'space-3', 'space-4', 'focused generated panels'],
	['Educational', 'space-4', 'space-6', 'diagram frames'],
	['Editorial', 'space-8', 'space-12', 'reading rhythm']
] as const

export const spacingExamples = defineExamples({
	default: {
		description: 'Compact spacing steps that scale from controls to editorial rhythm.',
		render: () => (
			<SpacingFrame meta="4px base increments" title="Spacing scale">
				<div style={spaceScaleStyle}>
					{spacingTokens.slice(0, 10).map(token => (
						<div key={token.name} style={spaceRowStyle}>
							<code>{token.name}</code>
							<span style={{ ...spaceBarStyle, inlineSize: toSpacingVariable(token) }} />
							<strong>{token.value}</strong>
						</div>
					))}
				</div>
			</SpacingFrame>
		)
	},
	density: {
		description: 'Pressure changes by composition density, not by primitive-specific props.',
		render: () => (
			<SpacingFrame meta="Composition pressure" title="Density bands">
				<div style={densityGridStyle}>
					{densityRows.map(([label, gapToken, paddingToken, description]) => (
						<div
							key={label}
							style={{
								...densityCardStyle,
								gap: `var(--concrete-${gapToken})`,
								padding: `var(--concrete-${paddingToken})`
							}}
						>
							<strong>{label}</strong>
							<span>{description}</span>
							<div style={{ ...densityRailStyle, gap: `var(--concrete-${gapToken})` }}>
								<i style={densityRailItemStyle} />
								<i style={densityRailItemStyle} />
								<i style={densityRailItemStyle} />
							</div>
						</div>
					))}
				</div>
			</SpacingFrame>
		)
	}
})

type SpacingFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function SpacingFrame({ children, meta, title }: SpacingFrameProps) {
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

function toSpacingVariable(token: SpacingToken): string {
	return `var(--concrete-${token.name})`
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

const spaceScaleStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-1-5)'
} satisfies CSSProperties

const spaceRowStyle = {
	alignItems: 'center',
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns:
		'var(--concrete-space-20) minmax(var(--concrete-space-0), 1fr) var(--concrete-space-10)'
} satisfies CSSProperties

const spaceBarStyle = {
	background: 'linear-gradient(90deg, var(--concrete-ink-9), var(--concrete-sky))',
	borderRadius: 'var(--concrete-radius-pill)',
	display: 'block',
	minBlockSize: 'var(--concrete-space-2)'
} satisfies CSSProperties

const densityGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'repeat(2, minmax(var(--concrete-space-0), 1fr))'
} satisfies CSSProperties

const densityCardStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid'
} satisfies CSSProperties

const densityRailStyle = {
	display: 'flex'
} satisfies CSSProperties

const densityRailItemStyle = {
	background: 'var(--concrete-ink-9)',
	borderRadius: 'var(--concrete-radius-2)',
	flex: 'var(--concrete-flex-fill)',
	minBlockSize: 'var(--concrete-space-3)'
} satisfies CSSProperties
