import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { ListboxDensity } from './schema'

export type ListboxProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
	children?: ReactNode
	emptyLabel?: ReactNode
	density?: ListboxDensity
}

export function Listbox({
	children,
	className,
	emptyLabel,
	role = 'listbox',
	density = 'default',
	...props
}: ListboxProps) {
	return (
		<div
			className={cn(concreteClassNames.listbox, className)}
			data-density={density}
			role={role}
			{...props}
		>
			{children ? (
				<div className={concreteClassNames.listboxItems}>{children}</div>
			) : (
				<div className={concreteClassNames.listboxEmpty}>{emptyLabel ?? 'No options'}</div>
			)}
		</div>
	)
}
