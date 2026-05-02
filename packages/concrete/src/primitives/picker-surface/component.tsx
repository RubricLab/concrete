import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { PickerSurfacePlacement } from './schema'

export type PickerSurfaceProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
	children: ReactNode
	open?: boolean
	placement?: PickerSurfacePlacement
}

export function PickerSurface({
	children,
	className,
	open = false,
	placement = 'inline',
	...props
}: PickerSurfaceProps) {
	return (
		<div
			className={cn(concreteClassNames.pickerSurface, className)}
			data-open={open ? true : undefined}
			data-placement={placement}
			{...props}
		>
			{children}
		</div>
	)
}
