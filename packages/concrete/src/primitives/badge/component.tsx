import type { HTMLAttributes } from 'react'
import type { ConcreteSignal } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type BadgeVariant = 'count' | 'ghost' | 'soft' | 'solid'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	signal?: ConcreteSignal
	variant?: BadgeVariant
}

export function Badge({
	children,
	className,
	signal = 'terminal',
	variant = 'soft',
	...props
}: BadgeProps) {
	return (
		<span
			className={cn(
				concreteClassNames.badge,
				getBadgeSignalClass(signal),
				getBadgeVariantClass(variant),
				className
			)}
			{...props}
		>
			{children}
		</span>
	)
}

function getBadgeSignalClass(signal: ConcreteSignal): string | undefined {
	switch (signal) {
		case 'error':
			return concreteClassNames.badgeError
		case 'terminal':
			return concreteClassNames.badgeTerminal
		case 'ultra':
			return concreteClassNames.badgeUltra
	}
}

function getBadgeVariantClass(variant: BadgeVariant): string | undefined {
	switch (variant) {
		case 'count':
			return concreteClassNames.badgeCount
		case 'ghost':
			return concreteClassNames.badgeGhost
		case 'soft':
			return undefined
		case 'solid':
			return concreteClassNames.badgeSolid
	}
}
