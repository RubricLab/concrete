import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { ConcreteIcon } from '../../icons'
import { concreteClassNames } from '../../styles/class-names'
import {
	getLabelToneClass,
	type LabelIconSlot,
	type LabelTone,
	renderLabelIconSlot
} from '../label-helpers'
import { cn } from '../utils'

export type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
	children?: ReactNode
	leadingIcon?: LabelIconSlot
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
				concreteClassNames.chip,
				selected ? concreteClassNames.chipSelected : getLabelToneClass(tone),
				className
			)}
			type="button"
			{...props}
		>
			{selected && !leadingIcon ? <ConcreteIcon name="check" /> : renderLabelIconSlot(leadingIcon)}
			{children}
		</button>
	)
}
