import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import {
	getLabelIntentClass,
	type LabelIconSlot,
	type LabelIntent,
	renderLabelIconSlot
} from '../label-helpers'
import { cn } from '../utils'

export type PillProps = HTMLAttributes<HTMLSpanElement> & {
	intent?: LabelIntent
	leadingIcon?: LabelIconSlot
}

export function Pill({
	children,
	className,
	intent = 'neutral',
	leadingIcon,
	...props
}: PillProps) {
	return (
		<span
			className={cn(concreteClassNames.pill, getLabelIntentClass(intent), className)}
			data-intent={intent}
			{...props}
		>
			{renderLabelIconSlot(leadingIcon)}
			{children}
		</span>
	)
}
