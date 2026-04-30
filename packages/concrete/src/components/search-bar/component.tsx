'use client'

import type { ChangeEvent, FormEvent, HTMLAttributes, ReactNode } from 'react'
import { useState } from 'react'
import type { IconName } from '../../icons'
import { SearchField, SearchTokenPrimitive } from '../../primitives'
import type { CommandItemTone } from '../../schemas'
import { formatShortcutKey, stringifyReactNode } from '../../utilities/interaction-helpers'

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
		<SearchField
			actions={actions}
			className={className}
			formProps={{
				onSubmit: handleSubmit,
				...props
			}}
			inputProps={{
				'aria-label': 'Search',
				onChange: (event: ChangeEvent<HTMLInputElement>) => updateQuery(event.currentTarget.value),
				onInput: event => updateQuery(event.currentTarget.value),
				placeholder,
				value: currentQuery
			}}
			leading={leading}
			menu={menu}
			menuPlacement={menuPlacement}
			shortcut={shortcut.map(formatShortcutKey)}
			tokens={tokens.map(token => (
				<SearchTokenPrimitive
					key={token.id}
					leadingIcon={token.leadingIcon}
					onRemove={onTokenRemove ? () => onTokenRemove(token) : undefined}
					removeLabel={`Remove ${stringifyReactNode(token.label)}`}
					tone={token.tone ?? 'default'}
				>
					{token.label}
				</SearchTokenPrimitive>
			))}
			trailing={trailing}
			wrap={wrap}
		/>
	)
}
