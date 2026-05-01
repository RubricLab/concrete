import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import type { LabelIconSlot, LabelIntent } from '../label-helpers'
import { getLabelIntentClass, renderLabelIconSlot } from '../label-helpers'
import { cn } from '../utils'
import type { LabelPurpose } from './schema'

type LabelElementProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style'>

export type ConcreteLabelProps = LabelElementProps & {
	children?: ReactNode
	intent?: LabelIntent
	leadingIcon?: LabelIconSlot
	marker?: boolean
	purpose?: LabelPurpose
}

export function Label({
	children,
	className,
	intent = 'neutral',
	leadingIcon,
	marker = false,
	purpose = 'compact',
	...props
}: ConcreteLabelProps) {
	return (
		<span
			className={cn(concreteClassNames.label, getLabelIntentClass(intent), className)}
			data-intent={intent}
			data-marker={marker ? 'true' : undefined}
			data-purpose={purpose}
			{...props}
		>
			{marker ? <span aria-hidden /> : null}
			{renderLabelIconSlot(leadingIcon)}
			{children}
		</span>
	)
}
