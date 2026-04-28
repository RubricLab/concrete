import type { HTMLAttributes, ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import { getTextureClass, type TextureVariant } from './brand'
import classes from './primitives.module.css'
import { cn } from './utils'

type IconSlot = IconName | ReactElement

export type CardVariant = 'default' | 'raised' | 'sunken'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
	description?: ReactNode
	interactive?: boolean
	title?: ReactNode
	variant?: CardVariant
}

export function Card({
	children,
	className,
	description,
	interactive = false,
	title,
	variant = 'default',
	...props
}: CardProps) {
	return (
		<div
			className={cn(
				classes.card,
				variant === 'raised' && classes.cardRaised,
				variant === 'sunken' && classes.cardSunken,
				interactive && classes.cardInteractive,
				className
			)}
			{...props}
		>
			{title ? <b className={classes.cardTitle}>{title}</b> : null}
			{description ? <p className={classes.cardBody}>{description}</p> : null}
			{children}
		</div>
	)
}

export type RowProps = HTMLAttributes<HTMLDivElement> & {
	interactive?: boolean
	leadingIcon?: IconSlot
	meta?: ReactNode
}

export function Row({
	children,
	className,
	interactive = false,
	leadingIcon,
	meta,
	...props
}: RowProps) {
	return (
		<div className={cn(classes.row, interactive && classes.rowInteractive, className)} {...props}>
			{leadingIcon ? <span className={classes.rowIcon}>{renderIconSlot(leadingIcon)}</span> : <span />}
			<span className={classes.rowLabel}>{children}</span>
			{meta ? <span className={classes.rowMeta}>{meta}</span> : null}
		</div>
	)
}

export type AvatarSize = 'large' | 'medium' | 'small'

export type AvatarProps = HTMLAttributes<HTMLSpanElement> & {
	alt?: string
	initials?: string
	size?: AvatarSize
	src?: string
}

export function Avatar({
	alt = '',
	className,
	initials = 'C',
	size = 'medium',
	src,
	...props
}: AvatarProps) {
	return (
		<span className={cn(classes.avatar, getAvatarSizeClass(size), className)} {...props}>
			{src ? <img alt={alt} height="100%" src={src} width="100%" /> : initials}
		</span>
	)
}

export type BubbleProps = HTMLAttributes<HTMLDivElement> & {
	direction?: 'inbound' | 'outbound'
}

export function Bubble({ children, className, direction = 'inbound', ...props }: BubbleProps) {
	return (
		<div
			className={cn(classes.bubble, direction === 'outbound' && classes.bubbleOutbound, className)}
			{...props}
		>
			{children}
		</div>
	)
}

export type DividerProps = HTMLAttributes<HTMLDivElement> & {
	label?: ReactNode
}

export function Divider({ className, label, ...props }: DividerProps) {
	return (
		<div className={cn(classes.divider, className)} {...props}>
			{label}
		</div>
	)
}

export type EmptyStateSize = 'large' | 'medium' | 'small'
export type EmptyStateTone = 'default' | 'sky'

export type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
	action?: ReactNode
	body?: ReactNode
	icon?: IconSlot
	size?: EmptyStateSize
	title: ReactNode
	tone?: EmptyStateTone
}

export function EmptyState({
	action,
	body,
	className,
	icon = 'search',
	size = 'medium',
	title,
	tone = 'default',
	...props
}: EmptyStateProps) {
	return (
		<div
			className={cn(
				classes.emptyState,
				getEmptyStateSizeClass(size),
				tone === 'sky' && classes.emptyStateSky,
				className
			)}
			{...props}
		>
			<span className={classes.mark}>{renderIconSlot(icon)}</span>
			<div>
				<h3 className={classes.emptyTitle}>{title}</h3>
				{body ? <p className={classes.emptyBody}>{body}</p> : null}
			</div>
			{action}
		</div>
	)
}

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
			<span className={cn(classes.tooltipBubble, className)} role="tooltip" {...props}>
				{children}
			</span>
		)
	}

	return (
		<span className={cn(classes.tooltipWrap, className)} {...props}>
			<span className={classes.tooltipAnchor}>{children}</span>
			<span
				className={cn(
					classes.tooltip,
					getTooltipPlacementClass(placement),
					forceOpen && classes.tooltipForceOpen,
					title && classes.tooltipRich
				)}
				role="tooltip"
			>
				{title ? <b>{title}</b> : null}
				{content ? <span>{content}</span> : null}
				{shortcut?.map(shortcutKey => (
					<span className={classes.tooltipKbd} key={shortcutKey}>
						{formatShortcutKey(shortcutKey)}
					</span>
				))}
			</span>
		</span>
	)
}

export type FrameProps = HTMLAttributes<HTMLDivElement> & {
	bodyClassName?: string
	footer?: ReactNode
	footerMeta?: ReactNode
	header?: ReactNode
	headerMeta?: ReactNode
	texture?: TextureVariant
}

export function Frame({
	bodyClassName,
	children,
	className,
	footer,
	footerMeta,
	header,
	headerMeta,
	texture,
	...props
}: FrameProps) {
	return (
		<div className={cn(classes.frame, className)} {...props}>
			{header || headerMeta ? (
				<div className={classes.frameHead}>
					<span className={classes.frameEyebrow}>{header}</span>
					{headerMeta ? <span className={classes.frameMeta}>{headerMeta}</span> : null}
				</div>
			) : null}
			<div className={cn(classes.frameBody, texture && getTextureClass(texture), bodyClassName)}>
				{children}
			</div>
			{footer || footerMeta ? (
				<div className={classes.frameFoot}>
					<span className={classes.frameEyebrow}>{footer}</span>
					{footerMeta ? <span className={classes.frameMeta}>{footerMeta}</span> : null}
				</div>
			) : null}
		</div>
	)
}

function getAvatarSizeClass(size: AvatarSize): string | undefined {
	switch (size) {
		case 'large':
			return classes.avatarLarge
		case 'medium':
			return undefined
		case 'small':
			return classes.avatarSmall
	}
}

function getEmptyStateSizeClass(size: EmptyStateSize): string | undefined {
	switch (size) {
		case 'large':
			return classes.emptyStateLarge
		case 'medium':
			return undefined
		case 'small':
			return classes.emptyStateSmall
	}
}

function getTooltipPlacementClass(placement: TooltipPlacement): string | undefined {
	switch (placement) {
		case 'bottom':
			return classes.tooltipBottom
		case 'left':
			return classes.tooltipLeft
		case 'right':
			return classes.tooltipRight
		case 'top':
			return classes.tooltipTop
	}
}

function renderIconSlot(icon: IconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
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
