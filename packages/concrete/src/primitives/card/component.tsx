import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type CardDepth = 'default' | 'raised' | 'sunken'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
	description?: ReactNode
	interactive?: boolean
	title?: ReactNode
	depth?: CardDepth
}

export function Card({
	children,
	className,
	description,
	interactive = false,
	title,
	depth = 'default',
	...props
}: CardProps) {
	return (
		<div
			className={cn(
				concreteClassNames.card,
				depth === 'raised' && concreteClassNames.cardRaised,
				depth === 'sunken' && concreteClassNames.cardSunken,
				interactive && concreteClassNames.cardInteractive,
				className
			)}
			{...props}
		>
			{title ? <b className={concreteClassNames.cardTitle}>{title}</b> : null}
			{description ? <p className={concreteClassNames.cardBody}>{description}</p> : null}
			{children}
		</div>
	)
}
