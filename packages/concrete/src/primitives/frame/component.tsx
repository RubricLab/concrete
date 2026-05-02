import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames, getConcreteClassName } from '../../styles/class-names'
import { cn } from '../utils'

export const frameAlignValues = ['start', 'center', 'stretch'] as const
export const frameScaleValues = ['compact', 'standard', 'showcase'] as const
export const frameTextureValues = [
	'lattice',
	'dots',
	'lines',
	'field',
	'perspective',
	'depth'
] as const
export type FrameAlign = (typeof frameAlignValues)[number]
export type FrameScale = (typeof frameScaleValues)[number]
export type FrameTexture = (typeof frameTextureValues)[number]

const frameTextureClassNames = {
	depth: getConcreteClassName('textureDepth'),
	dots: getConcreteClassName('dots'),
	field: getConcreteClassName('textureField'),
	lattice: getConcreteClassName('lattice'),
	lines: getConcreteClassName('lines'),
	perspective: getConcreteClassName('texturePerspective')
} satisfies Record<FrameTexture, string>

export type FrameProps = HTMLAttributes<HTMLDivElement> & {
	align?: FrameAlign
	bodyClassName?: string
	footer?: ReactNode
	footerMeta?: ReactNode
	header?: ReactNode
	headerMeta?: ReactNode
	scale?: FrameScale
	texture?: FrameTexture
}

export function Frame({
	align = 'center',
	bodyClassName,
	children,
	className,
	footer,
	footerMeta,
	header,
	headerMeta,
	scale = 'standard',
	texture,
	...props
}: FrameProps) {
	return (
		<div className={cn(concreteClassNames.frame, className)} data-scale={scale} {...props}>
			{header || headerMeta ? (
				<div className={concreteClassNames.frameHead}>
					<span className={concreteClassNames.frameEyebrow}>{header}</span>
					{headerMeta ? <span className={concreteClassNames.frameMeta}>{headerMeta}</span> : null}
				</div>
			) : null}
			<div
				className={cn(
					concreteClassNames.frameBody,
					texture && frameTextureClassNames[texture],
					bodyClassName
				)}
				data-align={align}
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
