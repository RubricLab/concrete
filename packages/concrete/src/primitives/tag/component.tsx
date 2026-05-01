import type { HTMLAttributes } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import {
	getLabelIntentClass,
	type LabelIconSlot,
	type LabelIntent,
	renderLabelIconSlot
} from '../label-helpers'
import { cn } from '../utils'

export type TagDensity = 'compact' | 'comfortable' | 'editorial'
export type TagHierarchy = 'outline' | 'soft'
export type TagIntent = LabelIntent

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
	active?: boolean
	density?: TagDensity
	dismissible?: boolean
	hierarchy?: TagHierarchy
	intent?: TagIntent
	leadingIcon?: LabelIconSlot
	onDismiss?: () => void
	selected?: boolean
}

export function Tag({
	active = false,
	children,
	className,
	density = 'comfortable',
	dismissible = false,
	hierarchy = 'soft',
	intent = 'neutral',
	leadingIcon,
	onDismiss,
	selected = false,
	...props
}: TagProps) {
	return (
		<span
			className={cn(
				concreteClassNames.tag,
				getTagIntentClass(intent),
				getTagHierarchyClass(hierarchy),
				getTagDensityClass(density),
				active && concreteClassNames.tagActive,
				selected && concreteClassNames.tagSelected,
				className
			)}
			data-active={active ? 'true' : undefined}
			data-density={density}
			data-hierarchy={hierarchy}
			data-intent={intent}
			data-selected={selected ? 'true' : undefined}
			{...props}
		>
			{selected && !leadingIcon ? <ConcreteIcon name="check" /> : renderLabelIconSlot(leadingIcon)}
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

function getTagIntentClass(intent: TagIntent): string | undefined {
	switch (intent) {
		case 'danger':
			return concreteClassNames.tagError
		case 'sky':
			return concreteClassNames.tagSky
		case 'terminal':
			return concreteClassNames.tagTerminal
		case 'ultra':
			return concreteClassNames.tagUltra
		default:
			return getLabelIntentClass(intent)
	}
}

function getTagHierarchyClass(hierarchy: TagHierarchy): string | undefined {
	switch (hierarchy) {
		case 'outline':
			return concreteClassNames.tagOutline
		case 'soft':
			return undefined
	}
}

function getTagDensityClass(density: TagDensity): string | undefined {
	switch (density) {
		case 'editorial':
			return concreteClassNames.tagLarge
		case 'comfortable':
			return undefined
		case 'compact':
			return concreteClassNames.tagSmall
	}
}
