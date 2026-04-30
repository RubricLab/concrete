import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { colorTokens } from './schema'

type ColorToken = (typeof colorTokens)[number]

const surfaceNames = ['canvas', 'surface', 'raised', 'sunken', 'mist'] as const
const inkNames = [
	'ink-9',
	'ink-8',
	'ink-7',
	'ink-6',
	'ink-5',
	'ink-4',
	'ink-3',
	'ink-2',
	'ink-1'
] as const
const skyNames = ['sky-1', 'sky-2', 'sky-3', 'sky-4', 'sky', 'sky-strong'] as const
const signalNames = ['terminal', 'ultra', 'error'] as const
const lightTokenNames = new Set<string>([
	'canvas',
	'surface',
	'raised',
	'sunken',
	'mist',
	'ink-1',
	'ink-2',
	'ink-3',
	'sky-1',
	'sky-2',
	'sky-3'
])

const dataTokens = [
	['data-1', 'var(--concrete-data-1)', 'primary'],
	['data-2', 'var(--concrete-data-2)', 'accent'],
	['data-3', 'var(--concrete-data-3)', 'success'],
	['data-4', 'var(--concrete-data-4)', 'muted'],
	['data-5', 'var(--concrete-data-5)', 'featured']
] as const

export const colorsExamples = defineExamples({
	data: {
		description: 'Chart and generated-output colors inherit the same restrained palette.',
		render: () => (
			<ColorFoundationFrame meta="Generated UI" title="Data color order">
				<div style={dataChartStyle}>
					{dataTokens.map(([name, value, role], index) => (
						<div key={name} style={dataColumnStyle}>
							<span
								style={{
									...dataBarStyle,
									background: value,
									height: `calc(var(--concrete-space-8) + var(--concrete-space-${index + 3}))`
								}}
							/>
							<strong>{name}</strong>
							<small>{role}</small>
						</div>
					))}
				</div>
			</ColorFoundationFrame>
		)
	},
	default: {
		description: 'Surface, ink, accent, and signal tokens in one compact color system.',
		render: () => (
			<ColorFoundationFrame meta="Core palette" title="Concrete color tokens">
				<ColorSection label="Surfaces">{renderColorSwatches(surfaceNames)}</ColorSection>
				<ColorSection label="Ink ramp">{renderColorSwatches(inkNames)}</ColorSection>
				<ColorSection label="Sky accent">{renderColorSwatches(skyNames)}</ColorSection>
				<ColorSection label="Signals">{renderColorSwatches(signalNames)}</ColorSection>
			</ColorFoundationFrame>
		)
	},
	signals: {
		description: 'Terminal, ultra, and error remain the only semantic signal colors.',
		render: () => (
			<ColorFoundationFrame meta="Semantic color" title="Three signal channels">
				<div style={signalGridStyle}>
					{signalNames.map(name => {
						const token = getColorToken(name)

						return (
							<div key={token.name} style={signalCardStyle}>
								<span style={{ ...signalDotStyle, background: token.value }} />
								<strong>{token.name}</strong>
								<small>{getSignalDescription(token.name)}</small>
							</div>
						)
					})}
				</div>
			</ColorFoundationFrame>
		)
	}
})

type ColorFoundationFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function ColorFoundationFrame({ children, meta, title }: ColorFoundationFrameProps) {
	return (
		<div style={frameStyle}>
			<header style={frameHeaderStyle}>
				<strong>{title}</strong>
				<span>{meta}</span>
			</header>
			<div style={frameBodyStyle}>{children}</div>
		</div>
	)
}

type ColorSectionProps = {
	children: ReactNode
	label: string
}

function ColorSection({ children, label }: ColorSectionProps) {
	return (
		<section style={sectionStyle}>
			<span style={sectionLabelStyle}>{label}</span>
			<div style={swatchGridStyle}>{children}</div>
		</section>
	)
}

function renderColorSwatches(names: readonly string[]): ReactNode {
	return names.map(name => {
		const token = getColorToken(name)

		return (
			<span
				key={token.name}
				style={{
					...swatchStyle,
					background: token.value,
					color: lightTokenNames.has(token.name)
						? 'var(--concrete-foreground-strong)'
						: 'var(--concrete-inverse-foreground)'
				}}
			>
				<b>{token.name}</b>
				<small>{token.hex?.replace('#', '')}</small>
			</span>
		)
	})
}

function getColorToken(name: string): ColorToken {
	const token = colorTokens.find(item => item.name === name)

	if (!token) {
		throw new Error(`Missing color token: ${name}`)
	}

	return token
}

function getSignalDescription(name: string): string {
	switch (name) {
		case 'error':
			return 'critical and destructive state'
		case 'terminal':
			return 'running and successful state'
		case 'ultra':
			return 'featured and elevated state'
		default:
			return 'semantic signal state'
	}
}

const frameStyle = {
	background: 'var(--concrete-surface)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-4)',
	boxShadow: 'var(--concrete-shadow-1)',
	display: 'grid',
	gap: 'var(--concrete-space-3)',
	maxWidth: 'var(--concrete-size-full)',
	padding: 'var(--concrete-space-4)',
	width: 'var(--concrete-size-full)'
} satisfies CSSProperties

const frameHeaderStyle = {
	alignItems: 'baseline',
	display: 'flex',
	gap: 'var(--concrete-space-2)',
	justifyContent: 'space-between'
} satisfies CSSProperties

const frameBodyStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-3)'
} satisfies CSSProperties

const sectionStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-1-5)'
} satisfies CSSProperties

const sectionLabelStyle = {
	color: 'var(--concrete-foreground-muted)',
	font:
		'var(--concrete-weight-bold) var(--concrete-type-11) / var(--concrete-line-flat) var(--concrete-font-mono)',
	letterSpacing: 'var(--concrete-tracking-section)',
	textTransform: 'uppercase'
} satisfies CSSProperties

const swatchGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	gridTemplateColumns: 'repeat(auto-fit, minmax(var(--concrete-space-16), 1fr))'
} satisfies CSSProperties

const swatchStyle = {
	alignItems: 'end',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-0-5)',
	minBlockSize: 'var(--concrete-space-12)',
	minWidth: 'var(--concrete-space-0)',
	padding: 'var(--concrete-space-2)'
} satisfies CSSProperties

const signalGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: 'repeat(3, minmax(var(--concrete-space-0), 1fr))'
} satisfies CSSProperties

const signalCardStyle = {
	background: 'var(--concrete-raised)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1-5)',
	padding: 'var(--concrete-space-3)'
} satisfies CSSProperties

const signalDotStyle = {
	blockSize: 'var(--concrete-size-label-dot)',
	borderRadius: 'var(--concrete-radius-pill)',
	inlineSize: 'var(--concrete-size-full)'
} satisfies CSSProperties

const dataChartStyle = {
	alignItems: 'end',
	background: 'var(--concrete-sunken)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border-soft)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: `repeat(${dataTokens.length}, minmax(var(--concrete-space-0), 1fr))`,
	minHeight: 'var(--concrete-space-40)',
	padding: 'var(--concrete-space-3)'
} satisfies CSSProperties

const dataColumnStyle = {
	alignItems: 'center',
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	justifyItems: 'center'
} satisfies CSSProperties

const dataBarStyle = {
	borderRadius: 'var(--concrete-radius-2)',
	inlineSize: 'var(--concrete-size-full)'
} satisfies CSSProperties
