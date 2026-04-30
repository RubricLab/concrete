import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { getTextureClass, type TextureVariant } from '../texture/component'
import { cn } from '../utils'

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
