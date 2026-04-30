import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type StatSize = 'large' | 'medium' | 'small' | 'xlarge' | 'xsmall'
export type StatTone = 'default' | 'muted' | 'sky'
export type StatVariant = 'display' | 'lockup' | 'numeric'

export type StatProps = HTMLAttributes<HTMLDivElement> & {
	delta?: ReactNode
	label?: ReactNode
	meta?: ReactNode
	size?: StatSize
	tone?: StatTone
	unit?: ReactNode
	value: ReactNode
	variant?: StatVariant
}

const statSizeClassNames = {
	large: concreteClassNames.statLarge,
	medium: undefined,
	small: concreteClassNames.statSmall,
	xlarge: concreteClassNames.statXlarge,
	xsmall: concreteClassNames.statXsmall
} satisfies Record<StatSize, string | undefined>

const statToneClassNames = {
	default: undefined,
	muted: concreteClassNames.statMuted,
	sky: concreteClassNames.statSky
} satisfies Record<StatTone, string | undefined>

export function Stat({
	className,
	delta,
	label,
	meta,
	size = 'medium',
	tone = 'default',
	unit,
	value,
	variant = 'lockup',
	...props
}: StatProps) {
	if (variant === 'numeric' || variant === 'display') {
		return (
			<div
				className={cn(
					concreteClassNames.statNumber,
					variant === 'display' && concreteClassNames.statDisplay,
					statSizeClassNames[size],
					statToneClassNames[tone],
					className
				)}
				{...props}
			>
				{value}
				{unit ? <span className={concreteClassNames.statUnit}>{unit}</span> : null}
			</div>
		)
	}

	return (
		<div className={cn(concreteClassNames.stat, statToneClassNames[tone], className)} {...props}>
			{label ? <span className={concreteClassNames.statLabel}>{label}</span> : null}
			<span className={cn(concreteClassNames.statValue, statSizeClassNames[size])}>
				{value}
				{unit ? <span className={concreteClassNames.statUnit}>{unit}</span> : null}
			</span>
			{delta || meta ? (
				<span className={concreteClassNames.statMeta}>
					{delta}
					{meta}
				</span>
			) : null}
		</div>
	)
}
