import type { CSSProperties, HTMLAttributes } from 'react'
import type { ConcreteSignal } from '../schemas'
import classes from './primitives.module.css'
import { clampPercent, cn } from './utils'

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
				classes.progressTrack,
				getProgressSizeClass(size),
				indeterminate === 'lined' && classes.progressLined,
				className
			)}
			data-tone={tone}
			role="progressbar"
			{...props}
		>
			{indeterminate === 'lined' ? null : (
				<span
					className={cn(
						classes.progressFill,
						getProgressToneClass(tone),
						indeterminate === 'shuttle' && classes.progressShuttle
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
			className={cn(classes.segmentedProgress, className)}
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
	size?: number
	strokeWidth?: number
	tone?: ProgressTone
	value: number
}

type RingStyle = CSSProperties & {
	'--concrete-ring-size': string
	'--concrete-ring-stroke': string
}

export function ProgressRing({
	className,
	size = 96,
	strokeWidth = 6,
	tone = 'default',
	value,
	...props
}: ProgressRingProps) {
	const percent = clampPercent(value)
	const radius = 42
	const circumference = 2 * Math.PI * radius
	const dash = (percent / 100) * circumference
	const style: RingStyle = {
		'--concrete-ring-size': `${size}px`,
		'--concrete-ring-stroke': `${strokeWidth}px`
	}

	return (
		<div
			aria-label={`${percent}%`}
			className={cn(classes.progressRing, getProgressToneClass(tone), className)}
			role="img"
			style={style}
			{...props}
		>
			<svg viewBox="0 0 96 96">
				<title>{`${percent}%`}</title>
				<circle className={classes.progressRingTrack} cx="48" cy="48" r={radius} />
				<circle
					className={classes.progressRingFill}
					cx="48"
					cy="48"
					r={radius}
					strokeDasharray={`${dash} ${circumference}`}
				/>
			</svg>
			<span className={classes.progressRingCenter}>
				{percent}
				<span className={classes.progressRingUnit}>%</span>
			</span>
		</div>
	)
}

export type IndicatorTone = 'default' | ConcreteSignal | 'muted' | 'sky'

export type IndicatorProps = HTMLAttributes<HTMLSpanElement> & {
	tone?: IndicatorTone
}

export function Indicator({ children, className, tone = 'default', ...props }: IndicatorProps) {
	return (
		<span className={cn(classes.indicator, className)} {...props}>
			<span className={cn(classes.indicatorDot, getProgressToneClass(tone))} />
			{children}
		</span>
	)
}

export type SkeletonProps = HTMLAttributes<HTMLSpanElement> & {
	height?: number | string
	width?: number | string
}

export function Skeleton({
	className,
	height = 12,
	style,
	width = '100%',
	...props
}: SkeletonProps) {
	return (
		<span
			className={cn(classes.skeleton, className)}
			style={{ height, width, ...style }}
			{...props}
		/>
	)
}

function getProgressToneClass(tone: IndicatorTone | ProgressTone | undefined): string | undefined {
	switch (tone) {
		case 'error':
			return classes.progressError
		case 'muted':
			return classes.indicatorMuted
		case 'sky':
			return classes.progressSky
		case 'terminal':
			return classes.progressTerminal
		case 'ultra':
			return classes.progressUltra
		case 'default':
		case undefined:
			return undefined
	}
}

function getProgressSizeClass(size: ProgressSize): string | undefined {
	switch (size) {
		case 'medium':
			return undefined
		case 'thick':
			return classes.progressThick
		case 'thin':
			return classes.progressThin
	}
}
