import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames, getConcreteClassName } from '../../styles/class-names'
import { cn } from '../utils'

export const frameTextureValues = ['lattice', 'dots', 'lines'] as const
export type FrameTexture = (typeof frameTextureValues)[number]

const frameTextureClassNames = {
	dots: getConcreteClassName('dots'),
	lattice: getConcreteClassName('lattice'),
	lines: getConcreteClassName('lines')
} satisfies Record<FrameTexture, string>

export type FrameProps = HTMLAttributes<HTMLDivElement> & {
	bodyClassName?: string
	footer?: ReactNode
	footerMeta?: ReactNode
	header?: ReactNode
	headerMeta?: ReactNode
	texture?: FrameTexture
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
				className={cn(
					concreteClassNames.frameBody,
					texture && frameTextureClassNames[texture],
					bodyClassName
				)}
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
