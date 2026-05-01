import type { HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { clampPercent, cn } from '../utils'

export type ProgressRingDensity = 'compact' | 'comfortable' | 'editorial'
export type ProgressRingIntent = 'danger' | 'neutral' | 'sky' | 'terminal' | 'ultra'

export type ProgressRingProps = HTMLAttributes<HTMLDivElement> & {
	density?: ProgressRingDensity
	intent?: ProgressRingIntent
	value: number
}

const progressRingDensityClassNames = {
	comfortable: undefined,
	compact: concreteClassNames.progressRingCompact,
	editorial: concreteClassNames.progressRingEditorial
} satisfies Record<ProgressRingDensity, string | undefined>

const progressRingIntentClassNames = {
	danger: concreteClassNames.progressError,
	neutral: undefined,
	sky: concreteClassNames.progressSky,
	terminal: concreteClassNames.progressTerminal,
	ultra: concreteClassNames.progressUltra
} satisfies Record<ProgressRingIntent, string | undefined>

export function ProgressRing({
	className,
	density = 'comfortable',
	intent = 'neutral',
	value,
	...props
}: ProgressRingProps) {
	const percent = clampPercent(value)
	const radius = 42
	const circumference = 2 * Math.PI * radius
	const dash = (percent / 100) * circumference

	return (
		<div
			aria-label={`${percent}%`}
			className={cn(
				concreteClassNames.progressRing,
				progressRingDensityClassNames[density],
				progressRingIntentClassNames[intent],
				className
			)}
			data-density={density}
			data-intent={intent}
			role="img"
			{...props}
		>
			<svg viewBox="0 0 96 96">
				<title>{`${percent}%`}</title>
				<circle className={concreteClassNames.progressRingTrack} cx="48" cy="48" r={radius} />
				<circle
					className={concreteClassNames.progressRingFill}
					cx="48"
					cy="48"
					r={radius}
					strokeDasharray={`${dash} ${circumference}`}
				/>
			</svg>
			<span className={concreteClassNames.progressRingCenter}>
				{percent}
				<span className={concreteClassNames.progressRingUnit}>%</span>
			</span>
		</div>
	)
}
