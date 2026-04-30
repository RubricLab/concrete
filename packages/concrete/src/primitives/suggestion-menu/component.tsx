import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SuggestionMenuLayerProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	placement?: 'floating' | 'inline' | undefined
}

export type SuggestionMenuProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
}

export type SuggestionMenuTitleProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode
	trigger?: ReactNode
}

export type SuggestionMenuListProps = HTMLAttributes<HTMLDivElement> & {
	children?: ReactNode
	empty?: ReactNode
}

export type SuggestionMenuItemProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	active?: boolean | undefined
	children?: ReactNode
	description?: ReactNode
	itemKind?: string | undefined
	label?: ReactNode
	meta?: ReactNode
}

export function SuggestionMenuLayer({
	children,
	className,
	placement = 'floating',
	...props
}: SuggestionMenuLayerProps) {
	return (
		<div
			className={cn(concreteClassNames.menuLayer, className)}
			data-placement={placement}
			{...props}
		>
			{children}
		</div>
	)
}

export function SuggestionMenu({ children, className, ...props }: SuggestionMenuProps) {
	return (
		<div className={cn(concreteClassNames.menu, className)} {...props}>
			{children}
		</div>
	)
}

export function SuggestionMenuTitle({
	children,
	className,
	trigger,
	...props
}: SuggestionMenuTitleProps) {
	return (
		<div className={cn(concreteClassNames.menuTitle, className)} {...props}>
			<span>{children}</span>
			{trigger ? <code>{trigger}</code> : null}
		</div>
	)
}

export function SuggestionMenuList({
	children,
	className,
	empty,
	...props
}: SuggestionMenuListProps) {
	return (
		<div className={cn(concreteClassNames.menuList, className)} {...props}>
			{empty ? <div className={concreteClassNames.emptyMenu}>{empty}</div> : null}
			{children}
		</div>
	)
}

export function SuggestionMenuItem({
	active = false,
	children,
	className,
	description,
	itemKind,
	label,
	meta,
	type = 'button',
	...props
}: SuggestionMenuItemProps) {
	return (
		<button
			className={cn(concreteClassNames.menuItem, className)}
			data-active={active ? true : undefined}
			data-kind={itemKind}
			type={type}
			{...props}
		>
			<span className={concreteClassNames.menuCopy}>
				<b>{label ?? children}</b>
				{description ? <small>{description}</small> : null}
			</span>
			{meta ? <span className={concreteClassNames.menuMeta}>{meta}</span> : null}
		</button>
	)
}
