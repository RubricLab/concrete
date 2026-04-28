import type { ButtonHTMLAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react'
import { ConcreteIcon, type IconName } from '../icons'
import type { ConcreteSignal } from '../schemas'
import classes from './primitives.module.css'
import { cn } from './utils'

export type BadgeVariant = 'count' | 'ghost' | 'soft' | 'solid'

type IconSlot = IconName | ReactElement

export type LabelTone = 'default' | 'ink' | 'sky' | 'sunken' | ConcreteSignal

export type LabelProps = HTMLAttributes<HTMLSpanElement> & {
	leadingIcon?: IconSlot
	tone?: LabelTone
}

export function Pill({ children, className, leadingIcon, tone = 'default', ...props }: LabelProps) {
	return (
		<span className={cn(classes.pill, getLabelToneClass(tone), className)} {...props}>
			{renderIconSlot(leadingIcon)}
			{children}
		</span>
	)
}

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	children?: ReactNode
	leadingIcon?: IconSlot
	selected?: boolean
	tone?: LabelTone
}

export function Chip({
	children,
	className,
	leadingIcon,
	selected = false,
	tone = 'default',
	...props
}: ChipProps) {
	return (
		<button
			className={cn(
				classes.chip,
				selected ? classes.chipSelected : getLabelToneClass(tone),
				className
			)}
			type="button"
			{...props}
		>
			{selected && !leadingIcon ? <ConcreteIcon name="check" /> : renderIconSlot(leadingIcon)}
			{children}
		</button>
	)
}

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
	signal?: ConcreteSignal
	variant?: BadgeVariant
}

export function Badge({
	children,
	className,
	signal = 'terminal',
	variant = 'soft',
	...props
}: BadgeProps) {
	return (
		<span
			className={cn(
				classes.badge,
				getBadgeSignalClass(signal),
				getBadgeVariantClass(variant),
				className
			)}
			{...props}
		>
			{children}
		</span>
	)
}

export type TagSize = 'large' | 'medium' | 'small'
export type TagTone = ConcreteSignal | LabelTone
export type TagVariant = 'active' | 'default' | 'outline' | 'selected'

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
	dismissible?: boolean
	leadingIcon?: IconSlot
	onDismiss?: () => void
	size?: TagSize
	tone?: TagTone
	variant?: TagVariant
}

export function Tag({
	children,
	className,
	dismissible = false,
	leadingIcon,
	onDismiss,
	size = 'medium',
	tone = 'default',
	variant = 'default',
	...props
}: TagProps) {
	return (
		<span
			className={cn(
				classes.tag,
				getTagToneClass(tone),
				getTagVariantClass(variant),
				getTagSizeClass(size),
				className
			)}
			{...props}
		>
			{variant === 'selected' && !leadingIcon ? (
				<ConcreteIcon name="check" />
			) : (
				renderIconSlot(leadingIcon)
			)}
			{children}
			{dismissible || onDismiss ? (
				<button aria-label="Dismiss tag" className={classes.tagClose} onClick={onDismiss} type="button">
					<ConcreteIcon name="x" />
				</button>
			) : null}
		</span>
	)
}

function renderIconSlot(icon: IconSlot | undefined): ReactNode {
	switch (typeof icon) {
		case 'string':
			return <ConcreteIcon name={icon} />
		default:
			return icon
	}
}

function getLabelToneClass(tone: LabelTone): string | undefined {
	switch (tone) {
		case 'default':
			return undefined
		case 'error':
			return classes.labelError
		case 'ink':
			return classes.labelInk
		case 'sky':
			return classes.labelSky
		case 'sunken':
			return classes.labelSunken
		case 'terminal':
			return classes.labelTerminal
		case 'ultra':
			return classes.labelUltra
	}
}

function getTagToneClass(tone: TagTone): string | undefined {
	switch (tone) {
		case 'error':
			return classes.tagError
		case 'sky':
			return classes.tagSky
		case 'terminal':
			return classes.tagTerminal
		case 'ultra':
			return classes.tagUltra
		default:
			return getLabelToneClass(tone)
	}
}

function getTagVariantClass(variant: TagVariant): string | undefined {
	switch (variant) {
		case 'active':
			return classes.tagActive
		case 'default':
			return undefined
		case 'outline':
			return classes.tagOutline
		case 'selected':
			return classes.tagSelected
	}
}

function getTagSizeClass(size: TagSize): string | undefined {
	switch (size) {
		case 'large':
			return classes.tagLarge
		case 'medium':
			return undefined
		case 'small':
			return classes.tagSmall
	}
}

function getBadgeSignalClass(signal: ConcreteSignal): string | undefined {
	switch (signal) {
		case 'error':
			return classes.badgeError
		case 'terminal':
			return classes.badgeTerminal
		case 'ultra':
			return classes.badgeUltra
	}
}

function getBadgeVariantClass(variant: BadgeVariant): string | undefined {
	switch (variant) {
		case 'count':
			return classes.badgeCount
		case 'ghost':
			return classes.badgeGhost
		case 'soft':
			return undefined
		case 'solid':
			return classes.badgeSolid
	}
}
