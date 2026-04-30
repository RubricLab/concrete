import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { stateTokens } from './schema'

const statusTokenNames = [
	'field-status',
	'upload-status',
	'data-component-state',
	'message-status',
	'tool-call-status'
] as const

export const stateExamples = defineExamples({
	default: {
		description: 'Semantic state groups are schemas first, then visual language.',
		render: () => (
			<StateFrame meta="Tones / statuses / hierarchy / density" title="State vocabulary">
				<div style={tokenGridStyle}>
					{stateTokens.map(token => (
						<div key={token.name} style={tokenCardStyle}>
							<span style={tokenKindStyle}>{token.kind}</span>
							<strong>{token.name}</strong>
							<p style={descriptionStyle}>{token.description}</p>
							<div style={chipClusterStyle}>
								{token.values.map(value => (
									<code key={value} style={chipStyle}>
										{value}
									</code>
								))}
							</div>
						</div>
					))}
				</div>
			</StateFrame>
		)
	},
	statuses: {
		description: 'Statuses describe lifecycle and validation before any component chooses UI.',
		render: () => (
			<StateFrame meta="Reusable lifecycle groups" title="Status contracts">
				<div style={statusGridStyle}>
					{statusTokenNames.map(name => {
						const token = getStateToken(name)

						return (
							<div key={token.name} style={statusRowStyle}>
								<strong>{token.name}</strong>
								<div style={chipClusterStyle}>
									{token.values.map(value => (
										<code key={value} style={chipStyle}>
											{value}
										</code>
									))}
								</div>
							</div>
						)
					})}
				</div>
			</StateFrame>
		)
	},
	tones: {
		description: 'Tone groups keep signal, data, and command semantics closed and reusable.',
		render: () => (
			<StateFrame meta="Signal and data tones" title="Tone contracts">
				<div style={statusGridStyle}>
					{['signals', 'data-tones'].map(name => {
						const token = getStateToken(name)

						return (
							<div key={token.name} style={statusRowStyle}>
								<strong>{token.name}</strong>
								<p style={descriptionStyle}>{token.description}</p>
								<div style={chipClusterStyle}>
									{token.values.map(value => (
										<code key={value} style={chipStyle}>
											{value}
										</code>
									))}
								</div>
							</div>
						)
					})}
				</div>
			</StateFrame>
		)
	}
})

type StateFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function StateFrame({ children, meta, title }: StateFrameProps) {
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

function getStateToken(name: string) {
	const token = stateTokens.find(item => item.name === name)

	if (!token) {
		throw new Error(`Missing state token: ${name}`)
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

const tokenGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'repeat(auto-fit, minmax(var(--concrete-space-32), 1fr))'
} satisfies CSSProperties

const tokenCardStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1-5)',
	padding: 'var(--concrete-space-3)'
} satisfies CSSProperties

const tokenKindStyle = {
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

const chipClusterStyle = {
	display: 'flex',
	flexWrap: 'wrap',
	gap: 'var(--concrete-space-1)'
} satisfies CSSProperties

const chipStyle = {
	background: 'var(--concrete-sunken)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-pill)',
	color: 'var(--concrete-foreground)',
	fontSize: 'var(--concrete-type-10-5)',
	padding: 'var(--concrete-space-0-5) var(--concrete-space-1-5)'
} satisfies CSSProperties

const statusGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)'
} satisfies CSSProperties

const statusRowStyle = {
	alignItems: 'center',
	borderBottom: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'minmax(var(--concrete-space-32), 0.5fr) 1fr',
	paddingBlockEnd: 'var(--concrete-space-2)'
} satisfies CSSProperties
