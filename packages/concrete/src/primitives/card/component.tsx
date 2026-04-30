import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type CardVariant = 'default' | 'raised' | 'sunken'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
	description?: ReactNode
	interactive?: boolean
	title?: ReactNode
	variant?: CardVariant
}

export function Card({
	children,
	className,
	description,
	interactive = false,
	title,
	variant = 'default',
	...props
}: CardProps) {
	return (
		<div
			className={cn(
				concreteClassNames.card,
				variant === 'raised' && concreteClassNames.cardRaised,
				variant === 'sunken' && concreteClassNames.cardSunken,
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
