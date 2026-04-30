import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SelectMenuProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	filterInputProps?: InputHTMLAttributes<HTMLInputElement> | undefined
	listboxProps?: HTMLAttributes<HTMLDivElement> | undefined
	placement?: 'floating' | 'inline' | undefined
}

export function SelectMenu({
	children,
	className,
	filterInputProps,
	listboxProps,
	placement = 'floating',
	...props
}: SelectMenuProps) {
	const {
		className: listboxClassName,
		role = 'listbox',
		...resolvedListboxProps
	} = listboxProps ?? {}

	return (
		<div
			className={cn(concreteClassNames.multiSelectMenu, className)}
			data-placement={placement}
			{...props}
		>
			{filterInputProps ? <input {...filterInputProps} /> : null}
			<div className={listboxClassName} role={role} {...resolvedListboxProps}>
				{children}
			</div>
		</div>
	)
}
