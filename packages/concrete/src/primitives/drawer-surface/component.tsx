import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { DrawerSurfaceMeasure, DrawerSurfaceSide } from './schema'

export type DrawerSurfaceProps = Omit<HTMLAttributes<HTMLElement>, 'role' | 'style'> & {
	children: ReactNode
	modal?: boolean
	side?: DrawerSurfaceSide
	measure?: DrawerSurfaceMeasure
}

export function DrawerSurface({
	children,
	className,
	modal = false,
	side = 'right',
	measure = 'default',
	...props
}: DrawerSurfaceProps) {
	return (
		<aside
			aria-modal={modal ? true : undefined}
			className={cn(concreteClassNames.drawerSurface, className)}
			data-side={side}
			data-measure={measure}
			role="dialog"
			{...props}
		>
			{children}
		</aside>
	)
}
