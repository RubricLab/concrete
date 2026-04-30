import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../../icons'
import type { CommandItemTone } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { Kbd } from '../kbd/component'
import { cn } from '../utils'

export type OptionRowKind = 'command' | 'select'

export type OptionRowProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	active?: boolean | undefined
	children?: ReactNode
	description?: ReactNode
	kind?: OptionRowKind | undefined
	label?: ReactNode
	leadingIcon?: IconName | undefined
	meta?: ReactNode
	selected?: boolean | undefined
	shortcuts?: readonly ReactNode[] | undefined
	tone?: CommandItemTone | undefined
	trailing?: ReactNode
}

export function OptionRow({
	active = false,
	children,
	className,
	description,
	kind = 'select',
	label,
	leadingIcon,
	meta,
	selected = false,
	shortcuts = [],
	tone = 'default',
	trailing,
	type = 'button',
	...props
}: OptionRowProps) {
	const visibleLabel = label ?? children
	const resolvedTrailing =
		trailing ?? (kind === 'select' && selected ? <ConcreteIcon name="check" /> : null)

	return (
		<button
			className={cn(
				concreteClassNames.optionRow,
				kind === 'command' && concreteClassNames.commandItem,
				className
			)}
			data-active={active ? true : undefined}
			data-kind={kind}
			data-selected={selected ? true : undefined}
			data-tone={tone}
			type={type}
			{...props}
		>
			{kind === 'command' || leadingIcon ? (
				<span
					className={cn(
						concreteClassNames.optionRowIcon,
						kind === 'command' && concreteClassNames.commandIcon
					)}
				>
					{leadingIcon ? <ConcreteIcon name={leadingIcon} /> : null}
				</span>
			) : null}
			<span
				className={cn(
					concreteClassNames.optionRowCopy,
					kind === 'command' && concreteClassNames.commandCopy
				)}
			>
				<b>{visibleLabel}</b>
				{description ? <small>{description}</small> : null}
			</span>
			{meta || shortcuts.length > 0 || resolvedTrailing ? (
				<span
					className={cn(
						concreteClassNames.optionRowAside,
						kind === 'command' && concreteClassNames.commandAside
					)}
				>
					{meta ? <span>{meta}</span> : null}
					{shortcuts.map((shortcut, index) => (
						<Kbd key={`shortcut-${index}`}>{shortcut}</Kbd>
					))}
					{resolvedTrailing}
				</span>
			) : null}
		</button>
	)
}
