import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'
import type { ListboxSize } from './schema'

export type ListboxProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
	children?: ReactNode
	emptyLabel?: ReactNode
	size?: ListboxSize
}

export function Listbox({
	children,
	className,
	emptyLabel,
	role = 'listbox',
	size = 'default',
	...props
}: ListboxProps) {
	return (
		<div
			className={cn(concreteClassNames.listbox, className)}
			data-size={size}
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
