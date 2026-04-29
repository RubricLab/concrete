'use client'

import type { ChangeEvent, FormEvent, HTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import { Kbd } from '../primitives'
import { cn } from '../primitives/utils'
import type { CommandItemTone } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import { formatShortcutKey, stringifyReactNode } from './interaction-helpers'

export type SearchToken = {
	id: string
	label: ReactNode
	leadingIcon?: IconName
	tone?: CommandItemTone
}

export type SearchBarProps = Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
	actions?: ReactNode
	defaultValue?: string
	leading?: ReactNode
	menu?: ReactNode
	menuPlacement?: 'inline' | 'popdown'
	onQueryChange?: (query: string) => void
	onSubmit?: (query: string) => void
	onTokenRemove?: (token: SearchToken) => void
	placeholder?: string
	query?: string
	shortcut?: readonly string[]
	tokens?: readonly SearchToken[]
	trailing?: ReactNode
	wrap?: boolean
}

export function SearchBar({
	actions,
	className,
	defaultValue = '',
	leading,
	menu,
	menuPlacement = 'popdown',
	onQueryChange,
	onSubmit,
	onTokenRemove,
	placeholder = 'Search...',
	query,
	shortcut = [],
	tokens = [],
	trailing,
	wrap = false,
	...props
}: SearchBarProps) {
	const [internalQuery, setInternalQuery] = useState(defaultValue)
	const currentQuery = query ?? internalQuery

	function updateQuery(nextQuery: string) {
		if (query === undefined) {
			setInternalQuery(nextQuery)
		}

		onQueryChange?.(nextQuery)
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault()
		onSubmit?.(currentQuery)
	}

	return (
		<div className={cn(concreteClassNames.searchShell, className)}>
			<form
				className={concreteClassNames.searchBar}
				data-wrap={wrap ? true : undefined}
				onSubmit={handleSubmit}
				{...props}
			>
				<span className={concreteClassNames.searchLeading}>
					{leading ?? <ConcreteIcon name="search" />}
				</span>
				{tokens.map(token => (
					<span
						className={concreteClassNames.searchToken}
						data-tone={token.tone ?? 'default'}
						key={token.id}
					>
						{token.leadingIcon ? <ConcreteIcon name={token.leadingIcon} /> : null}
						<span>{token.label}</span>
						{onTokenRemove ? (
							<button
								aria-label={`Remove ${stringifyReactNode(token.label)}`}
								onClick={() => onTokenRemove(token)}
								type="button"
							>
								<ConcreteIcon name="x" />
							</button>
						) : null}
					</span>
				))}
				<input
					aria-label="Search"
					className={concreteClassNames.searchInput}
					onChange={(event: ChangeEvent<HTMLInputElement>) => updateQuery(event.currentTarget.value)}
					onInput={event => updateQuery(event.currentTarget.value)}
					placeholder={placeholder}
					value={currentQuery}
				/>
				{shortcut.length ? (
					<span className={concreteClassNames.searchShortcut}>
						{shortcut.map(shortcutKey => (
							<Kbd className={concreteClassNames.searchShortcutKey} key={shortcutKey}>
								{formatShortcutKey(shortcutKey)}
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
