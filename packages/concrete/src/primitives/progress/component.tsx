import type { CSSProperties, HTMLAttributes } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { clampPercent, cn } from '../utils'

export type ProgressDensity = 'compact' | 'comfortable' | 'editorial'
export type ProgressIndeterminate = 'lined' | 'shuttle'
export type ProgressIntent = 'danger' | 'neutral' | 'sky' | 'terminal' | 'ultra'

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
	density?: ProgressDensity
	indeterminate?: ProgressIndeterminate
	intent?: ProgressIntent
	value?: number
}

type ProgressStyle = CSSProperties & {
	'--concrete-progress-value': string
}

const progressDensityClassNames = {
	comfortable: undefined,
	compact: concreteClassNames.progressThin,
	editorial: concreteClassNames.progressThick
} satisfies Record<ProgressDensity, string | undefined>

const progressIntentClassNames = {
	danger: concreteClassNames.progressError,
	neutral: undefined,
	sky: concreteClassNames.progressSky,
	terminal: concreteClassNames.progressTerminal,
	ultra: concreteClassNames.progressUltra
} satisfies Record<ProgressIntent, string | undefined>

export function Progress({
	className,
	density = 'comfortable',
	indeterminate,
	intent = 'neutral',
	value = 0,
	...props
}: ProgressProps) {
	const percent = indeterminate ? 100 : clampPercent(value)
	const style: ProgressStyle = { '--concrete-progress-value': `${percent}%` }

	return (
		<div
			aria-valuemax={100}
			aria-valuemin={0}
			aria-valuenow={indeterminate ? undefined : percent}
			className={cn(
				concreteClassNames.progressTrack,
				progressDensityClassNames[density],
				indeterminate === 'lined' && concreteClassNames.progressLined,
				className
			)}
			data-density={density}
			data-intent={intent}
			role="progressbar"
			{...props}
		>
			{indeterminate === 'lined' ? null : (
				<span
					className={cn(
						concreteClassNames.progressFill,
						progressIntentClassNames[intent],
						indeterminate === 'shuttle' && concreteClassNames.progressShuttle
					)}
					style={style}
				/>
			)}
		</div>
	)
}
