import type { HTMLAttributes } from 'react'
import { ConcreteIcon } from '../../icons'
import type { ConcreteSignal } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import {
	getLabelToneClass,
	type LabelIconSlot,
	type LabelTone,
	renderLabelIconSlot
} from '../label-helpers'
import { cn } from '../utils'

export type TagSize = 'large' | 'medium' | 'small'
export type TagTone = ConcreteSignal | LabelTone
export type TagVariant = 'active' | 'default' | 'outline' | 'selected'

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
	dismissible?: boolean
	leadingIcon?: LabelIconSlot
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
				concreteClassNames.tag,
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
				renderLabelIconSlot(leadingIcon)
			)}
			{children}
			{dismissible || onDismiss ? (
				<button
					aria-label="Dismiss tag"
					className={concreteClassNames.tagClose}
					onClick={onDismiss}
					type="button"
				>
					<ConcreteIcon name="x" />
				</button>
			) : null}
		</span>
	)
}

function getTagToneClass(tone: TagTone): string | undefined {
	switch (tone) {
		case 'error':
			return concreteClassNames.tagError
		case 'sky':
			return concreteClassNames.tagSky
		case 'terminal':
			return concreteClassNames.tagTerminal
		case 'ultra':
			return concreteClassNames.tagUltra
		default:
			return getLabelToneClass(tone)
	}
}

function getTagVariantClass(variant: TagVariant): string | undefined {
	switch (variant) {
		case 'active':
			return concreteClassNames.tagActive
		case 'default':
			return undefined
		case 'outline':
			return concreteClassNames.tagOutline
		case 'selected':
			return concreteClassNames.tagSelected
	}
}

function getTagSizeClass(size: TagSize): string | undefined {
	switch (size) {
		case 'large':
			return concreteClassNames.tagLarge
		case 'medium':
			return undefined
		case 'small':
			return concreteClassNames.tagSmall
	}
}
