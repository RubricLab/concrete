import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type BadgeHierarchy = 'ghost' | 'soft' | 'solid'
export type BadgeIntent = 'danger' | 'terminal' | 'ultra'
export type BadgePurpose = 'count' | 'status'

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	hierarchy?: BadgeHierarchy
	intent?: BadgeIntent
	purpose?: BadgePurpose
}

export function Badge({
	children,
	className,
	hierarchy = 'soft',
	intent = 'terminal',
	purpose = 'status',
	...props
}: BadgeProps) {
	return (
		<span
			className={cn(
				concreteClassNames.badge,
				getBadgeIntentClass(intent),
				getBadgeHierarchyClass(hierarchy),
				purpose === 'count' && concreteClassNames.badgeCount,
				className
			)}
			data-hierarchy={hierarchy}
			data-intent={intent}
			data-purpose={purpose}
			{...props}
		>
			{children}
		</span>
	)
}

function getBadgeIntentClass(intent: BadgeIntent): string | undefined {
	switch (intent) {
		case 'danger':
			return concreteClassNames.badgeError
		case 'terminal':
			return concreteClassNames.badgeTerminal
		case 'ultra':
			return concreteClassNames.badgeUltra
	}
}

function getBadgeHierarchyClass(hierarchy: BadgeHierarchy): string | undefined {
	switch (hierarchy) {
		case 'ghost':
			return concreteClassNames.badgeGhost
		case 'soft':
			return undefined
		case 'solid':
			return concreteClassNames.badgeSolid
	}
}
