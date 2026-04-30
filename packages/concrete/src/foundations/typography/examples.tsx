import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { typographyTokens } from './schema'

const roleRows = [
	['display', 'Concrete', 'editorial display'],
	['h2', 'Research note', 'section hierarchy'],
	['body', 'Dense product copy stays legible at interface scale.', 'default UI copy'],
	['label', 'Run audit', 'controls and metadata'],
	['mono', 'catalog.render("default")', 'code and traces']
] as const

export const typographyExamples = defineExamples({
	default: {
		description: 'Jakarta carries product UI while Fraunces stays reserved for display moments.',
		render: () => (
			<TypographyFrame meta="Display / sans / mono" title="Typographic roles">
				<div style={roleGridStyle}>
					{roleRows.map(([tokenName, sample, description]) => {
						const token = getTypographyToken(tokenName)

						return (
							<div key={token.name} style={roleRowStyle}>
								<span style={getSampleStyle(token.name)}>{sample}</span>
								<code>{token.name}</code>
								<small>{description}</small>
							</div>
						)
					})}
				</div>
			</TypographyFrame>
		)
	},
	mono: {
		description: 'The mono family is reserved for commands, traces, tokens, and compact metadata.',
		render: () => (
			<TypographyFrame meta="JetBrains Mono" title="Trace typography">
				<div style={tracePanelStyle}>
					<code>task.foundation.colors.default</code>
					<code>render route: /render/foundation/colors?state=signals</code>
					<code>result: visible, typed, registry-backed</code>
				</div>
			</TypographyFrame>
		)
	},
	scale: {
		description: 'The public type scale spans display, editorial, interface, labels, and traces.',
		render: () => (
			<TypographyFrame meta="11px through 120px" title="Type scale">
				<div style={scaleStyle}>
					{typographyTokens.map(token => (
						<div key={token.name} style={scaleRowStyle}>
							<span style={getScaleSampleStyle(token.name)}>Aa</span>
							<code>{token.name}</code>
							<small>{token.size}</small>
						</div>
					))}
				</div>
			</TypographyFrame>
		)
	}
})

type TypographyFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function TypographyFrame({ children, meta, title }: TypographyFrameProps) {
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

function getTypographyToken(name: string) {
	const token = typographyTokens.find(item => item.name === name)

	if (!token) {
		throw new Error(`Missing typography token: ${name}`)
	}

	return token
}

function getSampleStyle(name: string): CSSProperties {
	const token = getTypographyToken(name)

	return {
		color: name === 'display' ? 'var(--concrete-foreground-strong)' : 'var(--concrete-foreground)',
		fontFamily: getFontFamily(token.family),
		fontSize: token.size,
		fontVariationSettings:
			token.family === 'display' ? 'var(--concrete-font-display-settings)' : undefined,
		fontWeight: getFontWeight(token.name),
		lineHeight: getLineHeight(token.name)
	}
}

function getScaleSampleStyle(name: string): CSSProperties {
	return {
		...getSampleStyle(name),
		fontSize: 'var(--concrete-type-32)'
	}
}

function getFontFamily(family: string): string {
	switch (family) {
		case 'display':
			return 'var(--concrete-font-display)'
		case 'mono':
			return 'var(--concrete-font-mono)'
		default:
			return 'var(--concrete-font-sans)'
	}
}

function getFontWeight(name: string): string {
	switch (name) {
		case 'display':
			return 'var(--concrete-weight-light)'
		case 'h1':
		case 'h2':
		case 'h3':
			return 'var(--concrete-weight-heading)'
		case 'label':
		case 'caps':
			return 'var(--concrete-weight-bold)'
		default:
			return 'var(--concrete-weight-regular)'
	}
}

function getLineHeight(name: string): string {
	switch (name) {
		case 'display':
		case 'hero':
			return 'var(--concrete-line-tight)'
		case 'article':
			return 'var(--concrete-line-loose)'
		case 'mono':
			return 'var(--concrete-line-code)'
		default:
			return 'var(--concrete-line-normal)'
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

const roleGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)'
} satisfies CSSProperties

const roleRowStyle = {
	alignItems: 'baseline',
	borderBottom: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns:
		'minmax(var(--concrete-space-0), 1fr) var(--concrete-space-20) minmax(var(--concrete-space-0), 0.8fr)',
	paddingBlockEnd: 'var(--concrete-space-2)'
} satisfies CSSProperties

const scaleStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-1-5)',
	gridTemplateColumns: 'repeat(auto-fit, minmax(var(--concrete-space-20), 1fr))'
} satisfies CSSProperties

const scaleRowStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	padding: 'var(--concrete-space-2)'
} satisfies CSSProperties

const tracePanelStyle = {
	background: 'var(--concrete-ink-9)',
	borderRadius: 'var(--concrete-radius-3)',
	color: 'var(--concrete-inverse-foreground)',
	display: 'grid',
	fontFamily: 'var(--concrete-font-mono)',
	gap: 'var(--concrete-space-2)',
	padding: 'var(--concrete-space-4)'
} satisfies CSSProperties
