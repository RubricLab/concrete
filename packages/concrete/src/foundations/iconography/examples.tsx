import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { iconographyStrokePolicy, iconographyTokens } from './schema'

export const iconographyExamples = defineExamples({
	default: {
		description: 'Iconography maps glyphs to semantic roles before any component chooses an icon.',
		render: () => (
			<IconographyFrame meta="Roles / aliases / stroke" title="Iconography roles">
				<div style={gridStyle}>
					{iconographyTokens.map(token => (
						<div key={token.name} style={cardStyle}>
							<span style={roleStyle}>{token.role}</span>
							<strong>{token.name}</strong>
							<p style={descriptionStyle}>{token.description}</p>
						</div>
					))}
				</div>
			</IconographyFrame>
		)
	},
	stroke: {
		description: 'Concrete icons stay quiet, currentColor, and stroke-led.',
		render: () => (
			<IconographyFrame meta="CurrentColor stroke" title="Stroke policy">
				<div style={policyGridStyle}>
					{Object.entries(iconographyStrokePolicy).map(([name, value]) => (
						<div key={name} style={policyRowStyle}>
							<strong>{name}</strong>
							<code>{value}</code>
						</div>
					))}
				</div>
			</IconographyFrame>
		)
	}
})

type IconographyFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function IconographyFrame({ children, meta, title }: IconographyFrameProps) {
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

const roleStyle = {
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

const policyGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)'
} satisfies CSSProperties

const policyRowStyle = {
	alignItems: 'center',
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'flex',
	justifyContent: 'space-between',
	padding: 'var(--concrete-space-2)'
} satisfies CSSProperties
