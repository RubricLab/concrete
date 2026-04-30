import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import {
	getLabelToneClass,
	type LabelIconSlot,
	type LabelTone,
	renderLabelIconSlot
} from '../label-helpers'
import { cn } from '../utils'

export type LabelProps = HTMLAttributes<HTMLSpanElement> & {
	leadingIcon?: LabelIconSlot
	tone?: LabelTone
}

export function Pill({ children, className, leadingIcon, tone = 'default', ...props }: LabelProps) {
	return (
		<span className={cn(concreteClassNames.pill, getLabelToneClass(tone), className)} {...props}>
			{renderLabelIconSlot(leadingIcon)}
			{children}
		</span>
	)
}
