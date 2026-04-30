import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { DrawerSurfaceSide, DrawerSurfaceSize } from './schema'

export type DrawerSurfaceProps = Omit<HTMLAttributes<HTMLElement>, 'role' | 'style'> & {
	children: ReactNode
	modal?: boolean
	side?: DrawerSurfaceSide
	size?: DrawerSurfaceSize
}

export function DrawerSurface({
	children,
	className,
	modal = false,
	side = 'right',
	size = 'default',
	...props
}: DrawerSurfaceProps) {
	return (
		<aside
			aria-modal={modal ? true : undefined}
			className={cn(concreteClassNames.drawerSurface, className)}
			data-side={side}
			data-size={size}
			role="dialog"
			{...props}
		>
			{children}
		</aside>
	)
}
