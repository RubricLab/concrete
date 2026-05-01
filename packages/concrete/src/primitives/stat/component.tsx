import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type StatDensity = 'compact' | 'comfortable' | 'display' | 'editorial' | 'micro'
export type StatIntent = 'muted' | 'neutral' | 'sky'
export type StatPurpose = 'display' | 'lockup' | 'numeric'

export type StatProps = HTMLAttributes<HTMLDivElement> & {
	density?: StatDensity
	delta?: ReactNode
	intent?: StatIntent
	label?: ReactNode
	meta?: ReactNode
	purpose?: StatPurpose
	unit?: ReactNode
	value: ReactNode
}

const statDensityClassNames = {
	comfortable: undefined,
	compact: concreteClassNames.statSmall,
	display: concreteClassNames.statXlarge,
	editorial: concreteClassNames.statLarge,
	micro: concreteClassNames.statXsmall
} satisfies Record<StatDensity, string | undefined>

const statIntentClassNames = {
	muted: concreteClassNames.statMuted,
	neutral: undefined,
	sky: concreteClassNames.statSky
} satisfies Record<StatIntent, string | undefined>

export function Stat({
	className,
	density = 'comfortable',
	delta,
	intent = 'neutral',
	label,
	meta,
	purpose = 'lockup',
	unit,
	value,
	...props
}: StatProps) {
	if (purpose === 'numeric' || purpose === 'display') {
		return (
			<div
				className={cn(
					concreteClassNames.statNumber,
					purpose === 'display' && concreteClassNames.statDisplay,
					statDensityClassNames[density],
					statIntentClassNames[intent],
					className
				)}
				data-density={density}
				data-intent={intent}
				data-purpose={purpose}
				{...props}
			>
				{value}
				{unit ? <span className={concreteClassNames.statUnit}>{unit}</span> : null}
			</div>
		)
	}

	return (
		<div
			className={cn(concreteClassNames.stat, statIntentClassNames[intent], className)}
			data-density={density}
			data-intent={intent}
			data-purpose={purpose}
			{...props}
		>
			{label ? <span className={concreteClassNames.statLabel}>{label}</span> : null}
			<span className={cn(concreteClassNames.statValue, statDensityClassNames[density])}>
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
