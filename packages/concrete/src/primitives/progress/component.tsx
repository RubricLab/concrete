import type { CSSProperties, HTMLAttributes } from 'react'
import type { ConcreteSignal } from '../../schemas'
import { concreteClassNames } from '../../styles/class-names'
import { clampPercent, cn } from '../utils'

export type ProgressIndeterminate = 'lined' | 'shuttle'
export type ProgressSize = 'medium' | 'thick' | 'thin'
export type ProgressTone = 'default' | ConcreteSignal | 'sky'

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
	indeterminate?: ProgressIndeterminate
	size?: ProgressSize
	tone?: ProgressTone
	value?: number
}

type ProgressStyle = CSSProperties & {
	'--concrete-progress-value': string
}

const progressSizeClassNames = {
	medium: undefined,
	thick: concreteClassNames.progressThick,
	thin: concreteClassNames.progressThin
} satisfies Record<ProgressSize, string | undefined>

const progressToneClassNames = {
	default: undefined,
	error: concreteClassNames.progressError,
	sky: concreteClassNames.progressSky,
	terminal: concreteClassNames.progressTerminal,
	ultra: concreteClassNames.progressUltra
} satisfies Record<ProgressTone, string | undefined>

export function Progress({
	className,
	indeterminate,
	size = 'medium',
	tone = 'default',
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
				progressSizeClassNames[size],
				indeterminate === 'lined' && concreteClassNames.progressLined,
				className
			)}
			data-tone={tone}
			role="progressbar"
			{...props}
		>
			{indeterminate === 'lined' ? null : (
				<span
					className={cn(
						concreteClassNames.progressFill,
						progressToneClassNames[tone],
						indeterminate === 'shuttle' && concreteClassNames.progressShuttle
					)}
					style={style}
				/>
			)}
		</div>
	)
}

export type SegmentedProgressProps = HTMLAttributes<HTMLDivElement> & {
	segments: number
	value: number
}

export function SegmentedProgress({
	className,
	segments,
	value,
	...props
}: SegmentedProgressProps) {
	const safeSegments = Math.max(1, Math.floor(segments))
	const activeSegments = clampPercent((value / safeSegments) * 100) / (100 / safeSegments)

	return (
		<div
			aria-label={`${value} of ${safeSegments}`}
			className={cn(concreteClassNames.segmentedProgress, className)}
			role="img"
			{...props}
		>
			{Array.from({ length: safeSegments }, (_, index) => (
				<i data-active={index < activeSegments} key={index} />
			))}
		</div>
	)
}

export type ProgressRingProps = HTMLAttributes<HTMLDivElement> & {
	size?: number | string
	strokeWidth?: number | string
	tone?: ProgressTone
	value: number
}

type RingStyle = CSSProperties & {
	'--concrete-ring-size': string
	'--concrete-ring-stroke': string
}

export function ProgressRing({
	className,
	size = 'var(--concrete-size-progress-ring)',
	strokeWidth = 'var(--concrete-size-progress-ring-stroke)',
	tone = 'default',
	value,
	...props
}: ProgressRingProps) {
	const percent = clampPercent(value)
	const radius = 42
	const circumference = 2 * Math.PI * radius
	const dash = (percent / 100) * circumference
	const style: RingStyle = {
		'--concrete-ring-size': formatProgressRingSize(size),
		'--concrete-ring-stroke': formatProgressRingSize(strokeWidth)
	}

	return (
		<div
			aria-label={`${percent}%`}
			className={cn(concreteClassNames.progressRing, progressToneClassNames[tone], className)}
			role="img"
			style={style}
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

function formatProgressRingSize(value: number | string): string {
	return typeof value === 'number' ? `${value}px` : value
}
