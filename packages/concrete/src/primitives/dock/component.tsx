import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { DockAlign, DockPlacement } from './schema'

type DockElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export type DockProps = DockElementProps & {
	align?: DockAlign
	children?: ReactNode
	density?: Density
	placement?: DockPlacement
}

export function Dock({
	align = 'end',
	children,
	className,
	density = 'comfortable',
	placement = 'bottom',
	...props
}: DockProps) {
	return (
		<div
			className={cn(concreteClassNames.dock, className)}
			data-align={align}
			data-density={density}
			data-placement={placement}
			{...props}
		>
			{children}
		</div>
	)
}
