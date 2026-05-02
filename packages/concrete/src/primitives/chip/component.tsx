import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import {
	getLabelIntentClass,
	type LabelIconSlot,
	type LabelIntent,
	renderLabelIconSlot
} from '../label-helpers'
import { cn } from '../utils'

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	children?: ReactNode
	intent?: LabelIntent
	leadingIcon?: LabelIconSlot
	selected?: boolean
}

export function Chip({
	children,
	className,
	intent = 'neutral',
	leadingIcon,
	selected = false,
	...props
}: ChipProps) {
	return (
		<button
			className={cn(
				concreteClassNames.chip,
				selected ? concreteClassNames.chipSelected : getLabelIntentClass(intent),
				className
			)}
			data-intent={intent}
			data-selected={selected ? 'true' : undefined}
			type="button"
			{...props}
		>
			{selected && !leadingIcon ? <ConcreteIcon name="check" /> : renderLabelIconSlot(leadingIcon)}
			{children}
		</button>
	)
}
