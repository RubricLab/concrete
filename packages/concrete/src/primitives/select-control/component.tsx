import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SelectControlProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	empty?: boolean | undefined
	onToggle?: ButtonHTMLAttributes<HTMLButtonElement>['onClick'] | undefined
	open?: boolean | undefined
	toggleLabel?: string | undefined
	toggleProps?: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'onClick'> | undefined
}

export function SelectControl({
	children,
	className,
	empty = false,
	onToggle,
	open = false,
	toggleLabel = 'Toggle options',
	toggleProps,
	...props
}: SelectControlProps) {
	const { className: toggleClassName, type = 'button', ...resolvedToggleProps } = toggleProps ?? {}

	return (
		<div
			className={cn(concreteClassNames.multiSelectControl, className)}
			data-open={open ? true : undefined}
			{...props}
		>
			<span className={concreteClassNames.multiSelectValues} data-empty={empty ? true : undefined}>
				{children}
			</span>
			<button
				aria-expanded={open}
				aria-label={toggleLabel}
				className={cn(concreteClassNames.multiSelectToggle, toggleClassName)}
				data-open={open ? true : undefined}
				onClick={onToggle}
				type={type}
				{...resolvedToggleProps}
			>
				<ConcreteIcon name="chevron-down" />
			</button>
		</div>
	)
}
