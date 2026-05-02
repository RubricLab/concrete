import type { HTMLAttributes, ReactNode } from 'react'
import type { Density } from '../../foundations/state'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { GridColumns } from './schema'

type GridElementProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export type GridProps = GridElementProps & {
	children?: ReactNode
	columns?: GridColumns
	density?: Density
}

export function Grid({
	children,
	className,
	columns = 'auto',
	density = 'comfortable',
	...props
}: GridProps) {
	return (
		<div
			className={cn(concreteClassNames.grid, className)}
			data-columns={columns}
			data-density={density}
			{...props}
		>
			{children}
		</div>
	)
}
