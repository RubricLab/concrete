import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { ClusterAlign, ClusterJustify } from './schema'

type ClusterElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export type ClusterProps = ClusterElementProps & {
	align?: ClusterAlign
	children?: ReactNode
	density?: Density
	justify?: ClusterJustify
}

export function Cluster({
	align = 'center',
	children,
	className,
	density = 'comfortable',
	justify = 'start',
	...props
}: ClusterProps) {
	return (
		<div
			className={cn(concreteClassNames.cluster, className)}
			data-align={align}
			data-density={density}
			data-justify={justify}
			{...props}
		>
			{children}
		</div>
	)
}
