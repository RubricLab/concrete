import type { HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { Kbd } from '../kbd/component'
import { cn } from '../utils'

export type SearchInputProps = Omit<HTMLAttributes<HTMLLabelElement>, 'children' | 'style'> & {
	actions?: ReactNode
	inputProps?: InputHTMLAttributes<HTMLInputElement>
	shortcut?: readonly ReactNode[]
	tokens?: ReactNode
	trailing?: ReactNode
	wrap?: boolean
}

export function SearchInput({
	actions,
	className,
	inputProps,
	shortcut = [],
	tokens,
	trailing,
	wrap = false,
	...props
}: SearchInputProps) {
	const { className: inputClassName, ...resolvedInputProps } = inputProps ?? {}

	return (
		<label
			className={cn(concreteClassNames.searchInputRoot, className)}
			data-wrap={wrap ? true : undefined}
			{...props}
		>
			<span className={concreteClassNames.searchInputIcon}>
				<ConcreteIcon name="search" />
			</span>
			{tokens}
			<input
				className={cn(concreteClassNames.searchInputControl, inputClassName)}
				{...resolvedInputProps}
			/>
			{shortcut.length ? (
				<span className={concreteClassNames.searchInputShortcut}>
					{shortcut.map((shortcutKey, index) => (
						<Kbd className={concreteClassNames.searchInputShortcutKey} key={`shortcut-${index}`}>
							{shortcutKey}
						</Kbd>
					))}
				</span>
			) : null}
			{actions}
			{trailing}
		</label>
	)
}
