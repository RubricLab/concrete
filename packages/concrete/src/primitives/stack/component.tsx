import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { StackAlign } from './schema'

type StackElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export type StackProps = StackElementProps & {
	align?: StackAlign
	children?: ReactNode
	density?: Density
	divided?: boolean
}

export function Stack({
	align = 'stretch',
	children,
	className,
	density = 'comfortable',
	divided = false,
	...props
}: StackProps) {
	return (
		<div
			className={cn(concreteClassNames.stack, className)}
			data-align={align}
			data-density={density}
			data-divided={divided ? 'true' : undefined}
			{...props}
		>
			{children}
		</div>
	)
}
