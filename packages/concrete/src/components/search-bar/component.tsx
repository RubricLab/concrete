'use client'

import type { ChangeEvent, FormEvent, HTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import type { IconName } from '../../icons'
import { PickerSurface, SearchInput, Token } from '../../primitives'
import type { CommandItemIntent } from '../../schemas'
import { formatShortcutKey, stringifyReactNode } from '../../utilities/interaction-helpers'

export type SearchToken = {
	id: string
	intent?: CommandItemIntent
	label: ReactNode
	leadingIcon?: IconName
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
		<form className={className} onSubmit={handleSubmit} {...props}>
			<SearchInput
				actions={actions}
				inputProps={{
					'aria-label': 'Search',
					onChange: (event: ChangeEvent<HTMLInputElement>) => updateQuery(event.currentTarget.value),
					onInput: event => updateQuery(event.currentTarget.value),
					placeholder,
					value: currentQuery
				}}
				shortcut={shortcut.map(formatShortcutKey)}
				tokens={tokens.map(token => (
					<Token
						key={token.id}
						leadingIcon={token.leadingIcon}
						onRemove={onTokenRemove ? () => onTokenRemove(token) : undefined}
						removeLabel={`Remove ${stringifyReactNode(token.label)}`}
						intent={token.intent ?? 'default'}
					>
						{token.label}
					</Token>
				))}
				trailing={
					<>
						{leading}
						{trailing}
					</>
				}
				wrap={wrap}
			/>
			{menu ? (
				<PickerSurface open placement={menuPlacement === 'popdown' ? 'floating' : 'inline'}>
					{menu}
				</PickerSurface>
			) : null}
		</form>
	)
}
