import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { getTextureClass, type TextureVariant } from './texture'
import { cn } from './utils'

export type FrameProps = HTMLAttributes<HTMLDivElement> & {
	bodyClassName?: string
	footer?: ReactNode
	footerMeta?: ReactNode
	header?: ReactNode
	headerMeta?: ReactNode
	texture?: TextureVariant
}

export function Frame({
	bodyClassName,
	children,
	className,
	footer,
	footerMeta,
	header,
	headerMeta,
	texture,
	...props
}: FrameProps) {
	return (
		<div className={cn(concreteClassNames.frame, className)} {...props}>
			{header || headerMeta ? (
				<div className={concreteClassNames.frameHead}>
					<span className={concreteClassNames.frameEyebrow}>{header}</span>
					{headerMeta ? <span className={concreteClassNames.frameMeta}>{headerMeta}</span> : null}
				</div>
			) : null}
			<div
				className={cn(concreteClassNames.frameBody, texture && getTextureClass(texture), bodyClassName)}
			>
				{children}
			</div>
			{footer || footerMeta ? (
				<div className={concreteClassNames.frameFoot}>
					<span className={concreteClassNames.frameEyebrow}>{footer}</span>
					{footerMeta ? <span className={concreteClassNames.frameMeta}>{footerMeta}</span> : null}
				</div>
			) : null}
		</div>
	)
}

const frameTextureValues = ['', 'lattice', 'dots', 'lines'] as const

export const framePropsSchema = z
	.object({
		body: z.string().default('body'),
		footer: z.string().optional(),
		footerMeta: z.string().optional(),
		header: z.string().optional(),
		headerMeta: z.string().optional(),
		texture: z.enum(frameTextureValues).default('')
	})
	.strict()

export const framePrimitiveDefinition = defineConcretePrimitive({
	category: 'layout',
	component: Frame,
	controls: [
		textControl('header', 'Header', 'Eyebrow'),
		textControl('headerMeta', 'Header meta', 'meta'),
		textControl('body', 'Body', 'body'),
		textControl('footer', 'Footer', 'Footer'),
		textControl('footerMeta', 'Footer meta', 'meta'),
		selectControl('texture', 'Texture', '', frameTextureValues)
	],
	description: 'Single-border content frame with optional texture ground.',
	guidance:
		'Frames are for contained examples, generated panels, and educational fragments. Do not use them as a default page section wrapper.',
	kind: 'primitive',
	name: 'Frame',
	pressure: ['editorial', 'product', 'educational'],
	props: [
		prop('header', 'ReactNode', 'Optional top eyebrow slot.'),
		prop('headerMeta', 'ReactNode', 'Optional top-right meta slot.'),
		prop('footer', 'ReactNode', 'Optional bottom eyebrow slot.'),
		prop('footerMeta', 'ReactNode', 'Optional bottom-right meta slot.'),
		prop('texture', "'lattice' | 'dots' | 'lines'", 'Optional tokenized body ground pattern.'),
		prop('children', 'ReactNode', 'Frame body content.')
	],
	renderExample: renderFrameExample,
	schema: framePropsSchema,
	slug: 'frame',
	states: states([
		['default', 'Header, body, and footer chrome.'],
		['texture', 'Textured body ground.']
	])
})

function renderFrameExample(state = 'default') {
	return (
		<Frame
			footer="Footer"
			footerMeta="meta"
			header="Eyebrow"
			headerMeta="meta"
			{...(state === 'texture' ? { texture: 'lattice' as const } : {})}
		>
			body
		</Frame>
	)
}
