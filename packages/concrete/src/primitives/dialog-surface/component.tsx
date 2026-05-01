import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { DialogSurfaceMeasure } from './schema'

export type DialogSurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'style'> & {
	children: ReactNode
	modal?: boolean
	measure?: DialogSurfaceMeasure
}

export function DialogSurface({
	children,
	className,
	modal = false,
	measure = 'default',
	...props
}: DialogSurfaceProps) {
	return (
		<div
			aria-modal={modal ? true : undefined}
			className={cn(concreteClassNames.dialogSurface, className)}
			data-measure={measure}
			role="dialog"
			{...props}
		>
			{children}
		</div>
	)
}
