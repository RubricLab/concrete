'use client'

import type { ChangeEvent, HTMLAttributes, KeyboardEvent, ReactNode } from 'react'
import { useEffect, useMemo, useState } from 'react'
import type { IconName } from '../../icons'
import {
	Dock,
	Kbd,
	Listbox,
	MenuGroup,
	MenuSurface,
	OptionRow,
	SearchInput,
	Spinner
} from '../../primitives'
import type { CommandItemTone } from '../../schemas'
import { formatShortcutKey, stringifyReactNode } from '../../utilities/interaction-helpers'

export type CommandMenuItem = {
	description?: ReactNode
	disabled?: boolean
	group?: string
	id: string
	label: ReactNode
	leadingIcon?: IconName
	meta?: ReactNode
	shortcut?: readonly string[]
	tone?: CommandItemTone
}

export type CommandMenuProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect' | 'role'> & {
	activeId?: string
	defaultActiveId?: string
	empty?: ReactNode
	footer?: ReactNode
	heading?: ReactNode
	items: readonly CommandMenuItem[]
	loading?: boolean
	onActiveIdChange?: (id: string) => void
	onEscape?: () => void
	onQueryChange?: (query: string) => void
	onSelect?: (item: CommandMenuItem) => void
	placeholder?: string
	query?: string
	searchable?: boolean
}

export function CommandMenu({
	activeId,
	className,
	defaultActiveId,
	empty = 'No matches',
	footer,
	heading = 'Commands',
	items,
	loading = false,
	onActiveIdChange,
	onEscape,
	onKeyDown,
	onQueryChange,
	onSelect,
	placeholder = 'Search commands...',
	query,
	searchable = true,
	...props
}: CommandMenuProps) {
	const [internalQuery, setInternalQuery] = useState('')
	const [internalActiveId, setInternalActiveId] = useState(defaultActiveId)
	const currentQuery = query ?? internalQuery
	const filteredItems = useMemo(() => filterCommandItems(items, currentQuery), [currentQuery, items])
	const enabledItems = filteredItems.filter(item => !item.disabled)
	const currentActiveId = activeId ?? internalActiveId ?? enabledItems[0]?.id
	const groupedItems = useMemo(() => groupCommandItems(filteredItems), [filteredItems])

	useEffect(() => {
		if (!enabledItems.length || enabledItems.some(item => item.id === currentActiveId)) {
			return
		}

		setCommandMenuActiveId(enabledItems[0]?.id, setInternalActiveId, onActiveIdChange)
	}, [currentActiveId, enabledItems, onActiveIdChange])

	function updateQuery(nextQuery: string) {
		if (query === undefined) {
			setInternalQuery(nextQuery)
		}

		onQueryChange?.(nextQuery)
	}

	function selectItem(item: CommandMenuItem | undefined) {
		if (!item || item.disabled) {
			return
		}

		onSelect?.(item)
	}

	function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		onKeyDown?.(event)

		if (event.defaultPrevented) {
			return
		}

		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault()
				setCommandMenuActiveId(
					getRelativeCommandItem(enabledItems, currentActiveId, 1)?.id,
					setInternalActiveId,
					onActiveIdChange
				)
				return
			case 'ArrowUp':
				event.preventDefault()
				setCommandMenuActiveId(
					getRelativeCommandItem(enabledItems, currentActiveId, -1)?.id,
					setInternalActiveId,
					onActiveIdChange
				)
				return
			case 'End':
				event.preventDefault()
				setCommandMenuActiveId(enabledItems.at(-1)?.id, setInternalActiveId, onActiveIdChange)
				return
			case 'Enter':
			case 'Tab':
				event.preventDefault()
				selectItem(enabledItems.find(item => item.id === currentActiveId))
				return
			case 'Escape':
				event.preventDefault()
				onEscape?.()
				return
			case 'Home':
				event.preventDefault()
				setCommandMenuActiveId(enabledItems[0]?.id, setInternalActiveId, onActiveIdChange)
				return
			default:
				return
		}
	}

	return (
		<MenuSurface
			className={className}
			density="compact"
			onKeyDown={handleKeyDown}
			role="listbox"
			tabIndex={searchable ? undefined : 0}
			{...props}
		>
			{searchable ? (
				<SearchInput
					inputProps={{
						'aria-label': 'Search commands',
						onChange: (event: ChangeEvent<HTMLInputElement>) => updateQuery(event.currentTarget.value),
						onInput: event => updateQuery(event.currentTarget.value),
						placeholder,
						value: currentQuery
					}}
				/>
			) : null}
			{loading ? (
				<Listbox
					emptyLabel={
						<>
							<Spinner size={14} tone="sky" />
							Searching
						</>
					}
				/>
			) : null}
			{!loading && filteredItems.length === 0 ? <Listbox emptyLabel={empty} /> : null}
			{!loading && filteredItems.length > 0 ? (
				<Listbox role="presentation">
					{groupedItems.map(group => (
						<MenuGroup key={group.name} title={group.name}>
							{group.items.map(item => (
								<OptionRow
									active={item.id === currentActiveId}
									description={item.description}
									disabled={item.disabled}
									kind="command"
									key={item.id}
									label={item.label}
									leadingIcon={item.leadingIcon}
									meta={item.meta}
									onClick={() => selectItem(item)}
									onMouseEnter={() => setCommandMenuActiveId(item.id, setInternalActiveId, onActiveIdChange)}
									role="option"
									shortcuts={item.shortcut?.map(formatShortcutKey)}
									tone={item.tone ?? 'default'}
								/>
							))}
						</MenuGroup>
					))}
				</Listbox>
			) : null}
			{footer ? <Dock>{footer}</Dock> : null}
			{!footer && heading ? (
				<Dock align="between" density="compact">
					<span>{heading}</span>
					<span>
						<Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate <Kbd>↵</Kbd> open
					</span>
				</Dock>
			) : null}
		</MenuSurface>
	)
}

type CommandGroup = {
	items: readonly CommandMenuItem[]
	name: string
}

function filterCommandItems(
	items: readonly CommandMenuItem[],
	query: string
): readonly CommandMenuItem[] {
	const normalizedQuery = query.trim().toLowerCase()

	if (!normalizedQuery) {
		return items
	}

	return items.filter(item =>
		[item.label, item.description, item.group, item.meta]
			.map(stringifyReactNode)
			.some(value => value.toLowerCase().includes(normalizedQuery))
	)
}

function groupCommandItems(items: readonly CommandMenuItem[]): readonly CommandGroup[] {
	const groups = new Map<string, CommandMenuItem[]>()

	for (const item of items) {
		const groupName = item.group ?? 'Actions'
		const groupItems = groups.get(groupName) ?? []

		groupItems.push(item)
		groups.set(groupName, groupItems)
	}

	return Array.from(groups.entries()).map(([name, groupItems]) => ({ items: groupItems, name }))
}

function getRelativeCommandItem(
	items: readonly CommandMenuItem[],
	activeId: string | undefined,
	offset: number
): CommandMenuItem | undefined {
	if (items.length === 0) {
		return undefined
	}

	const activeIndex = items.findIndex(item => item.id === activeId)
	const nextIndex = activeIndex < 0 ? 0 : (activeIndex + offset + items.length) % items.length

	return items[nextIndex]
}

function setCommandMenuActiveId(
	id: string | undefined,
	setInternalActiveId: (id: string | undefined) => void,
	onActiveIdChange: ((id: string) => void) | undefined
) {
	if (!id) {
		return
	}

	setInternalActiveId(id)
	onActiveIdChange?.(id)
}
