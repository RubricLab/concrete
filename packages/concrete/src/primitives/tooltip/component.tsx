import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type TooltipPlacement = 'bottom' | 'left' | 'right' | 'top'

export type TooltipProps = HTMLAttributes<HTMLSpanElement> & {
	content?: ReactNode
	forceOpen?: boolean
	placement?: TooltipPlacement
	shortcut?: readonly string[]
	title?: ReactNode
}

export function Tooltip({
	children,
	className,
	content,
	forceOpen = false,
	placement = 'top',
	shortcut,
	title,
	...props
}: TooltipProps) {
	if (!content && !title) {
		return (
			<span className={cn(concreteClassNames.tooltipBubble, className)} role="tooltip" {...props}>
				{children}
			</span>
		)
	}

	return (
		<span className={cn(concreteClassNames.tooltipWrap, className)} {...props}>
			<span className={concreteClassNames.tooltipAnchor}>{children}</span>
			<span
				className={cn(
					concreteClassNames.tooltip,
					getTooltipPlacementClass(placement),
					forceOpen && concreteClassNames.tooltipForceOpen,
					title && concreteClassNames.tooltipRich
				)}
				role="tooltip"
			>
				{title ? <b>{title}</b> : null}
				{content ? <span>{content}</span> : null}
				{shortcut?.map(shortcutKey => (
					<span className={concreteClassNames.tooltipKbd} key={shortcutKey}>
						{formatShortcutKey(shortcutKey)}
					</span>
				))}
			</span>
		</span>
	)
}

function getTooltipPlacementClass(placement: TooltipPlacement): string | undefined {
	switch (placement) {
		case 'bottom':
			return concreteClassNames.tooltipBottom
		case 'left':
			return concreteClassNames.tooltipLeft
		case 'right':
			return concreteClassNames.tooltipRight
		case 'top':
			return concreteClassNames.tooltipTop
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
