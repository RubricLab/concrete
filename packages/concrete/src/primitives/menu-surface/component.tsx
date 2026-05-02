import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { MenuSurfaceRole } from './schema'

export type MenuSurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
	children: ReactNode
	density?: Density
	role?: MenuSurfaceRole
}

export function MenuSurface({
	children,
	className,
	density = 'comfortable',
	role = 'menu',
	...props
}: MenuSurfaceProps) {
	return (
		<div
			className={cn(concreteClassNames.menuSurface, className)}
			data-density={density}
			role={role}
			{...props}
		>
			{children}
		</div>
	)
}
