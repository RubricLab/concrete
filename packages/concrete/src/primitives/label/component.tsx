import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import type { LabelIconSlot, LabelTone } from '../label-helpers'
import { getLabelToneClass, renderLabelIconSlot } from '../label-helpers'
import { cn } from '../utils'
import type { LabelPurpose } from './schema'

type LabelElementProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style'>

export type ConcreteLabelProps = LabelElementProps & {
	children?: ReactNode
	leadingIcon?: LabelIconSlot
	marker?: boolean
	purpose?: LabelPurpose
	tone?: LabelTone
}

export function Label({
	children,
	className,
	leadingIcon,
	marker = false,
	purpose = 'compact',
	tone = 'default',
	...props
}: ConcreteLabelProps) {
	return (
		<span
			className={cn(concreteClassNames.label, getLabelToneClass(tone), className)}
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
