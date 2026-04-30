import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type TimeListProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
	formatOption?: ((value: string) => ReactNode) | undefined
	onSelect?: ((value: string) => void) | undefined
	options: readonly string[]
	placement?: 'floating' | 'inline' | undefined
	value?: string | undefined
}

export function TimeList({
	className,
	formatOption = value => value,
	onSelect,
	options,
	placement = 'floating',
	value,
	...props
}: TimeListProps) {
	return (
		<div
			className={cn(concreteClassNames.timeMenu, className)}
			data-placement={placement}
			role="listbox"
			{...props}
		>
			{options.map(option => (
				<button
					aria-selected={option === value}
					data-selected={option === value ? true : undefined}
					key={option}
					{...(onSelect ? { onClick: () => onSelect(option) } : {})}
					role="option"
					type="button"
				>
					{formatOption(option)}
				</button>
			))}
		</div>
	)
}
