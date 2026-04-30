'use client'

import type {
	ButtonHTMLAttributes,
	HTMLAttributes,
	KeyboardEvent,
	MouseEvent,
	ReactNode
} from 'react'
import { useEffect, useRef, useState } from 'react'
import { ConcreteIcon, type IconName } from '../../../icons'
import { concreteClassNames } from '../../../styles/class-names'
import { formatShortcutKey } from '../../../utilities/interaction-helpers'
import { Kbd } from '../../kbd'
import { Tooltip, type TooltipPlacement } from '../../tooltip'
import { cn } from '../../utils'

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
			className={cn(
				concreteClassNames.toolbarRoot,
				compact && concreteClassNames.toolbarCompact,
				className
			)}
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
		<div className={cn(concreteClassNames.toolbarRootGroup, className)} {...props}>
			{children}
		</div>
	)
}

export type ToolbarSeparatorProps = HTMLAttributes<HTMLSpanElement>

export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
	return (
		<span aria-hidden className={cn(concreteClassNames.toolbarRootSeparator, className)} {...props} />
	)
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
				className={cn(concreteClassNames.toolbarRootButton, className)}
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
					<span className={concreteClassNames.toolbarRootButtonLabel}>{children ?? label}</span>
				) : null}
				{showInlineShortcut
					? shortcut?.map(shortcutKey => (
							<Kbd
								className={concreteClassNames.toolbarRootButtonKbd}
								key={shortcutKey}
								tone={shortcutTone}
							>
								{formatShortcutKey(shortcutKey)}
							</Kbd>
						))
					: null}
			</button>
		</Tooltip>
	)
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
