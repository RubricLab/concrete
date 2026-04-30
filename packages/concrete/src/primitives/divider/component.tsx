import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
	label?: ReactNode
}

export function Divider({ className, label, ...props }: DividerProps) {
	return (
		<div className={cn(concreteClassNames.divider, className)} {...props}>
			{label}
		</div>
	)
}
