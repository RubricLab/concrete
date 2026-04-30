import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { DialogSurfaceSize } from './schema'

export type DialogSurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, 'role' | 'style'> & {
	children: ReactNode
	modal?: boolean
	size?: DialogSurfaceSize
}

export function DialogSurface({
	children,
	className,
	modal = false,
	size = 'default',
	...props
}: DialogSurfaceProps) {
	return (
		<div
			aria-modal={modal ? true : undefined}
			className={cn(concreteClassNames.dialogSurface, className)}
			data-size={size}
			role="dialog"
			{...props}
		>
			{children}
		</div>
	)
}
