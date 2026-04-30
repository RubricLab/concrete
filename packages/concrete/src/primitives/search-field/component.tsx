import type { FormHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import { Kbd } from '../kbd/component'
import { cn } from '../utils'

export type SearchFieldMenuPlacement = 'inline' | 'popdown'

export type SearchFieldProps = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'onSubmit'> & {
	actions?: ReactNode
	formProps?: Omit<FormHTMLAttributes<HTMLFormElement>, 'children'> | undefined
	inputProps?: InputHTMLAttributes<HTMLInputElement> | undefined
	leading?: ReactNode
	menu?: ReactNode
	menuPlacement?: SearchFieldMenuPlacement | undefined
	shortcut?: readonly ReactNode[] | undefined
	tokens?: ReactNode
	trailing?: ReactNode
	wrap?: boolean | undefined
}

export function SearchField({
	actions,
	className,
	formProps,
	inputProps,
	leading,
	menu,
	menuPlacement = 'popdown',
	shortcut = [],
	tokens,
	trailing,
	wrap = false,
	...props
}: SearchFieldProps) {
	const { className: formClassName, ...resolvedFormProps } = formProps ?? {}
	const { className: inputClassName, ...resolvedInputProps } = inputProps ?? {}

	return (
		<div className={cn(concreteClassNames.searchShell, className)} {...props}>
			<form
				className={cn(concreteClassNames.searchBar, formClassName)}
				data-wrap={wrap ? true : undefined}
				{...resolvedFormProps}
			>
				<span className={concreteClassNames.searchLeading}>
					{leading ?? <ConcreteIcon name="search" />}
				</span>
				{tokens}
				<input className={cn(concreteClassNames.searchInput, inputClassName)} {...resolvedInputProps} />
				{shortcut.length ? (
					<span className={concreteClassNames.searchShortcut}>
						{shortcut.map((shortcutKey, index) => (
							<Kbd className={concreteClassNames.searchShortcutKey} key={`shortcut-${index}`}>
								{shortcutKey}
							</Kbd>
						))}
					</span>
				) : null}
				{actions}
				{trailing}
			</form>
			{menu ? (
				<div className={concreteClassNames.searchMenu} data-placement={menuPlacement}>
					{menu}
				</div>
			) : null}
		</div>
	)
}
