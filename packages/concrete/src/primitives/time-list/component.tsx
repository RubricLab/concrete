import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { Listbox } from '../listbox/component'
import { OptionRow } from '../option-row/component'
import { cn } from '../utils'

export type TimeListProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'style'> & {
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
		<Listbox
			{...props}
			className={cn(concreteClassNames.timeMenu, className)}
			data-placement={placement}
			role="listbox"
		>
			{options.map(option => (
				<OptionRow
					aria-selected={option === value}
					key={option}
					{...(onSelect ? { onClick: () => onSelect(option) } : {})}
					role="option"
					selected={option === value}
					trailing={false}
				>
					{formatOption(option)}
				</OptionRow>
			))}
		</Listbox>
	)
}
