import type { CSSProperties, ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { textureTokens } from './schema'

export const texturesExamples = defineExamples({
	default: {
		description: 'Quiet lattice, dot, line, and depth textures for structure without decoration.',
		render: () => (
			<TextureFrame meta="Lattice / dots / lines / depth" title="Texture tokens">
				<div style={textureGridStyle}>
					{textureTokens.map(token => (
						<div key={token} style={{ ...textureTileStyle, ...getTextureStyle(token) }}>
							<strong>{token}</strong>
							<span>{getTextureDescription(token)}</span>
						</div>
					))}
				</div>
			</TextureFrame>
		)
	},
	diagram: {
		description: 'Diagram grounds use texture as a coordinate system and not as ornament.',
		render: () => (
			<TextureFrame meta="Educational / diagram" title="Structured ground">
				<div style={diagramGroundStyle}>
					<div style={diagramNodeStyle}>Input</div>
					<div style={diagramLineStyle} />
					<div style={diagramNodeStyle}>Agent</div>
					<div style={diagramLineStyle} />
					<div style={diagramNodeStyle}>Output</div>
				</div>
			</TextureFrame>
		)
	}
})

type TextureFrameProps = {
	children: ReactNode
	meta: string
	title: string
}

function TextureFrame({ children, meta, title }: TextureFrameProps) {
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

function getTextureStyle(token: string): CSSProperties {
	switch (token) {
		case 'dots':
			return {
				backgroundImage:
					'radial-gradient(circle, var(--concrete-dots) var(--concrete-texture-dot-fade-size), transparent var(--concrete-texture-dot-fade-size))',
				backgroundSize: 'var(--concrete-space-4) var(--concrete-space-4)'
			}
		case 'lines':
			return {
				backgroundImage:
					'linear-gradient(to bottom, transparent, transparent calc(var(--concrete-space-3) - var(--concrete-border-width-hairline)), var(--concrete-lines) calc(var(--concrete-space-3) - var(--concrete-border-width-hairline)), var(--concrete-lines) var(--concrete-space-3))',
				backgroundSize: 'var(--concrete-size-full) var(--concrete-space-3)'
			}
		case 'lattice':
			return {
				backgroundImage:
					'linear-gradient(var(--concrete-lattice) var(--concrete-border-width-hairline), transparent var(--concrete-border-width-hairline)), linear-gradient(90deg, var(--concrete-lattice) var(--concrete-border-width-hairline), transparent var(--concrete-border-width-hairline))',
				backgroundSize: 'var(--concrete-grid-unit) var(--concrete-grid-unit)'
			}
		case 'depth':
			return {
				backgroundColor: 'var(--concrete-depth-background)',
				backgroundImage: 'var(--concrete-depth-background-image)',
				backgroundSize:
					'var(--concrete-size-full) var(--concrete-size-full), var(--concrete-grid-unit) var(--concrete-grid-unit), var(--concrete-grid-unit) var(--concrete-grid-unit), var(--concrete-size-full) var(--concrete-size-full)'
			}
		default:
			return {}
	}
}

function getTextureDescription(token: string): string {
	switch (token) {
		case 'dots':
			return 'soft sample fields'
		case 'lines':
			return 'reading and rows'
		case 'lattice':
			return 'diagram coordinates'
		case 'depth':
			return 'perspective grounds'
		default:
			return 'texture ground'
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

const textureGridStyle = {
	display: 'grid',
	gap: 'var(--concrete-space-2)',
	gridTemplateColumns: `repeat(${textureTokens.length}, minmax(var(--concrete-space-0), 1fr))`
} satisfies CSSProperties

const textureTileStyle = {
	backgroundColor: 'var(--concrete-sunken)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-3)',
	display: 'grid',
	gap: 'var(--concrete-space-1)',
	minBlockSize: 'var(--concrete-space-32)',
	padding: 'var(--concrete-space-3)'
} satisfies CSSProperties

const diagramGroundStyle = {
	alignItems: 'center',
	backgroundColor: 'var(--concrete-sunken)',
	backgroundImage: 'var(--concrete-diagram-background)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-4)',
	display: 'grid',
	gap: 'var(--concrete-space-3)',
	gridTemplateColumns:
		'minmax(var(--concrete-space-0), 1fr) var(--concrete-space-10) minmax(var(--concrete-space-0), 1fr) var(--concrete-space-10) minmax(var(--concrete-space-0), 1fr)',
	minBlockSize: 'var(--concrete-space-40)',
	padding: 'var(--concrete-space-4)'
} satisfies CSSProperties

const diagramNodeStyle = {
	background: 'var(--concrete-surface)',
	border: 'var(--concrete-border-width-hairline) solid var(--concrete-border)',
	borderRadius: 'var(--concrete-radius-3)',
	boxShadow: 'var(--concrete-shadow-1)',
	padding: 'var(--concrete-space-3)',
	textAlign: 'center'
} satisfies CSSProperties

const diagramLineStyle = {
	background: 'var(--concrete-ink-3)',
	blockSize: 'var(--concrete-border-width-hairline)'
} satisfies CSSProperties
