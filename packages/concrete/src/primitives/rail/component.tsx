import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { RailAlign, RailOrientation } from './schema'

type RailElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export type RailProps = RailElementProps & {
	align?: RailAlign
	children?: ReactNode
	density?: Density
	orientation?: RailOrientation
}

export function Rail({
	align = 'center',
	children,
	className,
	density = 'comfortable',
	orientation = 'vertical',
	...props
}: RailProps) {
	return (
		<div
			className={cn(concreteClassNames.rail, className)}
			data-align={align}
			data-density={density}
			data-orientation={orientation}
			{...props}
		>
			{children}
		</div>
	)
}
