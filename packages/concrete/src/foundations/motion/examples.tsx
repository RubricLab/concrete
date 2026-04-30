import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { motionTokens } from './schema'

const stateRows = [
	['hover', 'var(--concrete-duration-fast)', 'var(--concrete-scale-control-hover)'],
	['press', 'var(--concrete-duration-press)', 'var(--concrete-scale-control-pressed)'],
	['disclose', 'var(--concrete-duration-disclosure)', 'var(--concrete-rotate-quarter)']
] as const

export const motionExamples = defineExamples({
	default: {
		description: 'Short duration and easing tokens for calm product feedback.',
		render: () => (
			<MotionFrame meta="120ms / 180ms / ease" title="Motion vocabulary">
				<div style={motionTokenGridStyle}>
					{motionTokens.map(token => (
						<div key={token.name} style={motionTokenStyle}>
							<strong>{token.name}</strong>
							<code>{token.value}</code>
						</div>
					))}
				</div>
				<div style={trackStyle}>
					<span style={trackFillStyle} />
				</div>
			</MotionFrame>
		)
	},
	states: {
		description: 'Interaction motion uses small transforms and explicit state timing.',
		render: () => (
			<MotionFrame meta="Controls and disclosure" title="State transitions">
				<div style={stateGridStyle}>
					{stateRows.map(([name, duration, transform]) => (
						<div key={name} style={stateCardStyle}>
							<span style={{ ...stateGlyphStyle, transitionDuration: duration }} />
							<strong>{name}</strong>
							<code>{duration}</code>
							<small>{transform}</small>
						</div>
					))}
				</div>
			</MotionFrame>
		)
	}
})

type MotionFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function MotionFrame({ children, meta, title }: MotionFrameProps) {
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

const motionTokenGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'repeat(3, minmax(var(--concrete-space-0), 1fr))'
} satisfies CSSProperties

const motionTokenStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	padding: 'var(--concrete-space-3)'
} satisfies CSSProperties

const trackStyle = {
	background: 'var(--concrete-sunken)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-pill)',
	overflow: 'hidden',
	padding: 'var(--concrete-space-1)'
} satisfies CSSProperties

const trackFillStyle = {
	background: 'linear-gradient(90deg, var(--concrete-ink-9), var(--concrete-sky))',
	borderRadius: 'var(--concrete-radius-pill)',
	display: 'block',
	inlineSize: 'var(--concrete-size-half)',
	minBlockSize: 'var(--concrete-space-2)',
	transition: 'inline-size var(--concrete-duration) var(--concrete-ease)'
} satisfies CSSProperties

const stateGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'repeat(3, minmax(var(--concrete-space-0), 1fr))'
} satisfies CSSProperties

const stateCardStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	padding: 'var(--concrete-space-3)'
} satisfies CSSProperties

const stateGlyphStyle = {
	background: 'var(--concrete-sky)',
	borderRadius: 'var(--concrete-radius-2)',
	display: 'block',
	inlineSize: 'var(--concrete-space-8)',
	minBlockSize: 'var(--concrete-space-3)',
	transitionProperty: 'transform'
} satisfies CSSProperties
