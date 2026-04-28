'use client'

import type {
	ButtonHTMLAttributes,
	ChangeEvent,
	FormEvent,
	HTMLAttributes,
	KeyboardEvent,
	MouseEvent,
	ReactNode
} from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import { Kbd, Spinner, Tooltip, type TooltipPlacement } from '../primitives'
import { cn } from '../primitives/utils'
import type { CommandItemTone } from '../schemas'
import classes from './components.module.css'

export type ToolbarProps = HTMLAttributes<HTMLDivElement> & {
	compact?: boolean
	label?: string
}

export function Toolbar({
	children,
	className,
	compact = false,
	label = 'Toolbar',
	onKeyDown,
	...props
}: ToolbarProps) {
	function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
		onKeyDown?.(event)

		if (event.defaultPrevented) {
			return
		}

		switch (event.key) {
			case 'ArrowDown':
			case 'ArrowRight':
				event.preventDefault()
				focusToolbarButton(event.currentTarget, 1)
				return
			case 'ArrowLeft':
			case 'ArrowUp':
				event.preventDefault()
				focusToolbarButton(event.currentTarget, -1)
				return
			case 'End':
				event.preventDefault()
				focusToolbarEdgeButton(event.currentTarget, 'end')
				return
			case 'Home':
				event.preventDefault()
				focusToolbarEdgeButton(event.currentTarget, 'start')
				return
			default:
				return
		}
	}

	return (
		<div
			aria-label={label}
			className={cn(classes.toolbarRoot, compact && classes.toolbarCompact, className)}
			onKeyDown={handleKeyDown}
			role="toolbar"
			{...props}
		>
			{children}
		</div>
	)
}

export type ToolbarGroupProps = HTMLAttributes<HTMLDivElement>

export function ToolbarGroup({ children, className, ...props }: ToolbarGroupProps) {
	return (
		<div className={cn(classes.toolbarRootGroup, className)} {...props}>
			{children}
		</div>
	)
}

export type ToolbarSeparatorProps = HTMLAttributes<HTMLSpanElement>

export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
	return <span aria-hidden className={cn(classes.toolbarRootSeparator, className)} {...props} />
}

export type ToolbarButtonAppearance = 'chip' | 'icon' | 'subtle'

export type ToolbarButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	appearance?: ToolbarButtonAppearance
	children?: ReactNode
	defaultSelected?: boolean
	icon?: IconName
	label: string
	onSelectedChange?: (selected: boolean) => void
	pressed?: boolean
	selected?: boolean
	shortcut?: readonly string[]
	showLabel?: boolean
	showShortcut?: 'both' | 'inline' | 'none' | 'tooltip'
	toggleable?: boolean
	tooltip?: string
	tooltipPlacement?: TooltipPlacement
}

export function ToolbarButton({
	appearance = 'icon',
	children,
	className,
	defaultSelected = false,
	icon,
	label,
	onClick,
	onSelectedChange,
	pressed = false,
	selected,
	shortcut,
	showLabel,
	showShortcut,
	toggleable = false,
	tooltip,
	tooltipPlacement = 'top',
	type = 'button',
	onKeyDown,
	...props
}: ToolbarButtonProps) {
	const [internalSelected, setInternalSelected] = useState(defaultSelected)
	const [pressedPulse, setPressedPulse] = useState(false)
	const pressedTimeoutRef = useRef<number | undefined>(undefined)
	const currentSelected = selected ?? internalSelected
	const currentPressed = pressed || pressedPulse
	const resolvedShowLabel = showLabel ?? (appearance === 'chip' || !icon)
	const shortcutMode = showShortcut ?? 'tooltip'
	const showInlineShortcut =
		Boolean(shortcut?.length) && (shortcutMode === 'inline' || shortcutMode === 'both')
	const tooltipShortcut =
		shortcutMode === 'tooltip' || shortcutMode === 'both' ? shortcut : undefined
	const shortcutTone =
		appearance === 'chip' && (currentSelected || currentPressed) ? 'dark' : 'default'

	useEffect(
		() => () => {
			if (pressedTimeoutRef.current !== undefined) {
				window.clearTimeout(pressedTimeoutRef.current)
			}
		},
		[]
	)

	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		onClick?.(event)

		if (event.defaultPrevented) {
			return
		}

		pulseToolbarButton()

		if (!toggleable) {
			return
		}

		const nextSelected = !currentSelected

		if (selected === undefined) {
			setInternalSelected(nextSelected)
		}

		onSelectedChange?.(nextSelected)
	}

	function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
		onKeyDown?.(event)

		if (event.defaultPrevented) {
			return
		}

		switch (event.key) {
			case ' ':
			case 'Enter':
				pulseToolbarButton()
				return
			default:
				return
		}
	}

	function pulseToolbarButton() {
		if (pressedTimeoutRef.current !== undefined) {
			window.clearTimeout(pressedTimeoutRef.current)
		}

		setPressedPulse(true)
		pressedTimeoutRef.current = window.setTimeout(() => {
			setPressedPulse(false)
			pressedTimeoutRef.current = undefined
		}, 140)
	}

	return (
		<Tooltip
			content={tooltip ?? label}
			placement={tooltipPlacement}
			{...(tooltipShortcut ? { shortcut: tooltipShortcut } : {})}
		>
			<button
				aria-label={label}
				aria-pressed={toggleable || selected !== undefined ? currentSelected : undefined}
				className={cn(classes.toolbarRootButton, className)}
				data-concrete-toolbar-button="true"
				data-appearance={appearance}
				data-pressed={currentPressed ? true : undefined}
				data-selected={currentSelected ? true : undefined}
				onClick={handleClick}
				onKeyDown={handleKeyDown}
				type={type}
				{...props}
			>
				{icon ? <ConcreteIcon name={icon} /> : null}
				{resolvedShowLabel ? (
					<span className={classes.toolbarRootButtonLabel}>{children ?? label}</span>
				) : null}
				{showInlineShortcut
					? shortcut?.map(shortcutKey => (
							<Kbd className={classes.toolbarRootButtonKbd} key={shortcutKey} tone={shortcutTone}>
								{formatShortcutKey(shortcutKey)}
							</Kbd>
						))
					: null}
			</button>
		</Tooltip>
	)
}

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

export type CommandMenuProps = Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> & {
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
		<div
			className={cn(classes.commandMenu, className)}
			onKeyDown={handleKeyDown}
			role="listbox"
			tabIndex={searchable ? undefined : 0}
			{...props}
		>
			{searchable ? (
				<label className={classes.commandSearch}>
					<ConcreteIcon name="search" />
					<input
						aria-label="Search commands"
						onChange={(event: ChangeEvent<HTMLInputElement>) => updateQuery(event.currentTarget.value)}
						onInput={event => updateQuery(event.currentTarget.value)}
						placeholder={placeholder}
						value={currentQuery}
					/>
					<Kbd>Esc</Kbd>
				</label>
			) : null}
			<div className={classes.commandBody}>
				{loading ? (
					<div className={classes.commandEmpty}>
						<Spinner size={14} tone="sky" />
						<span>Searching</span>
					</div>
				) : null}
				{!loading && filteredItems.length === 0 ? (
					<div className={classes.commandEmpty}>{empty}</div>
				) : null}
				{!loading
					? groupedItems.map(group => (
							<section className={classes.commandGroup} key={group.name}>
								<div className={classes.commandGroupTitle}>{group.name}</div>
								{group.items.map(item => (
									<button
										className={classes.commandItem}
										data-active={item.id === currentActiveId ? true : undefined}
										data-tone={item.tone ?? 'default'}
										disabled={item.disabled}
										key={item.id}
										onClick={() => selectItem(item)}
										onMouseEnter={() =>
											setCommandMenuActiveId(item.id, setInternalActiveId, onActiveIdChange)
										}
										role="option"
										type="button"
									>
										<span className={classes.commandIcon}>
											{item.leadingIcon ? <ConcreteIcon name={item.leadingIcon} /> : null}
										</span>
										<span className={classes.commandCopy}>
											<b>{item.label}</b>
											{item.description ? <small>{item.description}</small> : null}
										</span>
										<span className={classes.commandAside}>
											{item.meta ? <span>{item.meta}</span> : null}
											{item.shortcut?.map(shortcutKey => (
												<Kbd key={shortcutKey}>{formatShortcutKey(shortcutKey)}</Kbd>
											))}
										</span>
									</button>
								))}
							</section>
						))
					: null}
			</div>
			{footer ? <div className={classes.commandFooter}>{footer}</div> : null}
			{!footer && heading ? (
				<div className={classes.commandFooter}>
					<span>{heading}</span>
					<span>
						<Kbd>↑</Kbd> <Kbd>↓</Kbd> navigate <Kbd>↵</Kbd> open
					</span>
				</div>
			) : null}
		</div>
	)
}

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
		<div className={cn(classes.searchShell, className)}>
			<form
				className={classes.searchBar}
				data-wrap={wrap ? true : undefined}
				onSubmit={handleSubmit}
				{...props}
			>
				<span className={classes.searchLeading}>{leading ?? <ConcreteIcon name="search" />}</span>
				{tokens.map(token => (
					<span className={classes.searchToken} data-tone={token.tone ?? 'default'} key={token.id}>
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
					className={classes.searchInput}
					onChange={(event: ChangeEvent<HTMLInputElement>) => updateQuery(event.currentTarget.value)}
					onInput={event => updateQuery(event.currentTarget.value)}
					placeholder={placeholder}
					value={currentQuery}
				/>
				{shortcut.length ? (
					<span className={classes.searchShortcut}>
						{shortcut.map(shortcutKey => (
							<Kbd className={classes.searchShortcutKey} key={shortcutKey}>
								{formatShortcutKey(shortcutKey)}
							</Kbd>
						))}
					</span>
				) : null}
				{actions}
				{trailing}
			</form>
			{menu ? (
				<div className={classes.searchMenu} data-placement={menuPlacement}>
					{menu}
				</div>
			) : null}
		</div>
	)
}

type CommandGroup = {
	items: readonly CommandMenuItem[]
	name: string
}

function focusToolbarButton(toolbar: HTMLElement, offset: number) {
	const buttons = getToolbarButtons(toolbar)
	const activeIndex = buttons.indexOf(document.activeElement as HTMLButtonElement)
	const nextIndex = activeIndex < 0 ? 0 : (activeIndex + offset + buttons.length) % buttons.length

	buttons[nextIndex]?.focus()
}

function focusToolbarEdgeButton(toolbar: HTMLElement, edge: 'end' | 'start') {
	const buttons = getToolbarButtons(toolbar)
	const nextButton = edge === 'start' ? buttons[0] : buttons.at(-1)

	nextButton?.focus()
}

function getToolbarButtons(toolbar: HTMLElement): HTMLButtonElement[] {
	return Array.from(
		toolbar.querySelectorAll<HTMLButtonElement>(
			'[data-concrete-toolbar-button="true"]:not(:disabled)'
		)
	)
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

function stringifyReactNode(value: ReactNode): string {
	switch (typeof value) {
		case 'number':
		case 'string':
			return String(value)
		default:
			return ''
	}
}

function formatShortcutKey(shortcutKey: string): string {
	switch (shortcutKey.toLowerCase()) {
		case 'cmd':
		case 'command':
		case 'meta':
			return '⌘'
		case 'enter':
		case 'return':
			return '↵'
		case 'shift':
			return '⇧'
		case 'option':
		case 'alt':
			return '⌥'
		default:
			return shortcutKey
	}
}
