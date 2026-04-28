import type { HTMLAttributes, ReactNode } from 'react'
import { Progress, type ProgressTone } from './feedback'
import classes from './primitives.module.css'
import { cn } from './utils'

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
					classes.statNumber,
					variant === 'display' && classes.statDisplay,
					getStatSizeClass(size),
					getStatToneClass(tone),
					className
				)}
				{...props}
			>
				{value}
				{unit ? <span className={classes.statUnit}>{unit}</span> : null}
			</div>
		)
	}

	return (
		<div className={cn(classes.stat, getStatToneClass(tone), className)} {...props}>
			{label ? <span className={classes.statLabel}>{label}</span> : null}
			<span className={cn(classes.statValue, getStatSizeClass(size))}>
				{value}
				{unit ? <span className={classes.statUnit}>{unit}</span> : null}
			</span>
			{delta || meta ? (
				<span className={classes.statMeta}>
					{delta}
					{meta}
				</span>
			) : null}
		</div>
	)
}

export type DeltaIntent = 'negative' | 'neutral' | 'positive'
export type DeltaSize = 'large' | 'medium' | 'small' | 'xlarge'
export type DeltaVariant = 'bare' | 'wash'

export type DeltaProps = HTMLAttributes<HTMLSpanElement> & {
	basis?: ReactNode
	intent?: DeltaIntent
	size?: DeltaSize
	value: string
	variant?: DeltaVariant
}

export function Delta({
	basis,
	className,
	intent = 'neutral',
	size = 'medium',
	value,
	variant = 'bare',
	...props
}: DeltaProps) {
	return (
		<span
			className={cn(
				classes.delta,
				getDeltaIntentClass(intent),
				getDeltaSizeClass(size),
				variant === 'wash' && classes.deltaWash,
				className
			)}
			{...props}
		>
			<span aria-hidden className={classes.deltaIcon}>
				{renderDeltaIcon(intent)}
			</span>
			<span>{value}</span>
			{basis ? <span className={classes.deltaBasis}>{basis}</span> : null}
		</span>
	)
}

export type SparklineVariant = 'bar' | 'dot' | 'line'
export type SparklineTone = 'error' | 'neutral' | 'sky' | 'terminal'

export type SparklineProps = HTMLAttributes<SVGSVGElement> & {
	area?: boolean
	showEndpoint?: boolean
	tone?: SparklineTone
	values: readonly number[]
	variant?: SparklineVariant
}

export function Sparkline({
	area = false,
	className,
	showEndpoint = true,
	tone = 'sky',
	values,
	variant = 'line',
	...props
}: SparklineProps) {
	const safeValues = values.length > 0 ? values : [0]
	const coordinates = getSparklineCoordinates(safeValues)
	const points = getSparklinePoints(coordinates)
	const endpoint = coordinates.at(-1)

	return (
		<svg
			className={cn(classes.sparkline, getSparklineToneClass(tone), className)}
			preserveAspectRatio="none"
			viewBox="0 0 100 28"
			{...props}
		>
			<title>Sparkline</title>
			{renderSparklineMarks({
				area,
				coordinates,
				endpoint,
				points,
				safeValues,
				showEndpoint,
				variant
			})}
		</svg>
	)
}

export type DistributionDatum = {
	label: string
	tone?: ProgressTone
	value: number
}

export type DistributionProps = HTMLAttributes<HTMLDivElement> & {
	data: readonly DistributionDatum[]
}

export function Distribution({ className, data, ...props }: DistributionProps) {
	return (
		<div className={cn(classes.distribution, className)} {...props}>
			{data.map(datum => (
				<div className={classes.distributionRow} key={datum.label}>
					<span>{datum.label}</span>
					<Progress tone={datum.tone ?? 'default'} value={datum.value} />
					<span className={classes.distributionValue}>{datum.value}%</span>
				</div>
			))}
		</div>
	)
}

function renderDeltaIcon(intent: DeltaIntent): ReactNode {
	switch (intent) {
		case 'negative':
			return (
				<svg aria-hidden="true" viewBox="0 0 12 12">
					<path d="M3 3L9 9" />
					<path d="M5 9h4V5" />
				</svg>
			)
		case 'neutral':
			return (
				<svg aria-hidden="true" viewBox="0 0 12 12">
					<path d="M2.5 6h7" />
				</svg>
			)
		case 'positive':
			return (
				<svg aria-hidden="true" viewBox="0 0 12 12">
					<path d="M3 9L9 3" />
					<path d="M5 3h4v4" />
				</svg>
			)
	}
}

function getSparklineToneClass(tone: SparklineTone): string | undefined {
	switch (tone) {
		case 'error':
			return classes.sparklineError
		case 'neutral':
			return classes.sparklineNeutral
		case 'sky':
			return undefined
		case 'terminal':
			return classes.sparklineTerminal
	}
}

function getDeltaIntentClass(intent: DeltaIntent): string | undefined {
	switch (intent) {
		case 'negative':
			return classes.deltaNegative
		case 'neutral':
			return classes.deltaNeutral
		case 'positive':
			return classes.deltaPositive
	}
}

function getDeltaSizeClass(size: DeltaSize): string | undefined {
	switch (size) {
		case 'large':
			return classes.deltaLarge
		case 'medium':
			return undefined
		case 'small':
			return classes.deltaSmall
		case 'xlarge':
			return classes.deltaXlarge
	}
}

function getStatSizeClass(size: StatSize): string | undefined {
	switch (size) {
		case 'large':
			return classes.statLarge
		case 'medium':
			return undefined
		case 'small':
			return classes.statSmall
		case 'xlarge':
			return classes.statXlarge
		case 'xsmall':
			return classes.statXsmall
	}
}

function getStatToneClass(tone: StatTone): string | undefined {
	switch (tone) {
		case 'default':
			return undefined
		case 'muted':
			return classes.statMuted
		case 'sky':
			return classes.statSky
	}
}

type SparklineCoordinate = {
	x: number
	y: number
}

function getSparklineCoordinates(values: readonly number[]): readonly SparklineCoordinate[] {
	const minimum = Math.min(...values)
	const maximum = Math.max(...values)
	const range = maximum - minimum
	const divisor = values.length > 1 ? values.length - 1 : 1

	return values.map((value, index) => {
		const normalized = range === 0 ? 0.5 : (value - minimum) / range
		const x = 2 + (index / divisor) * 90
		const y = 26 - normalized * 24

		return { x: roundPoint(x), y: roundPoint(y) }
	})
}

function getSparklinePoints(coordinates: readonly SparklineCoordinate[]): string {
	return coordinates.map(coordinate => `${coordinate.x},${coordinate.y}`).join(' ')
}

function getSparklineAreaPath(coordinates: readonly SparklineCoordinate[]): string {
	const points = coordinates.map(coordinate => `L${coordinate.x},${coordinate.y}`).join(' ')
	return `M2,28 ${points} L92,28 Z`
}

type RenderSparklineMarksInput = {
	area: boolean
	coordinates: readonly SparklineCoordinate[]
	endpoint: SparklineCoordinate | undefined
	points: string
	safeValues: readonly number[]
	showEndpoint: boolean
	variant: SparklineVariant
}

function renderSparklineMarks({
	area,
	coordinates,
	endpoint,
	points,
	safeValues,
	showEndpoint,
	variant
}: RenderSparklineMarksInput): ReactNode {
	switch (variant) {
		case 'bar':
			return renderBars(safeValues)
		case 'dot':
			return renderDots(coordinates)
		case 'line':
			return (
				<>
					{area ? (
						<>
							<defs>
								<linearGradient id="concrete-sparkline-area" x1="0" x2="0" y1="0" y2="1">
									<stop offset="0%" stopColor="currentColor" stopOpacity="0.28" />
									<stop offset="100%" stopColor="currentColor" stopOpacity="0" />
								</linearGradient>
							</defs>
							<path className={classes.sparklineArea} d={getSparklineAreaPath(coordinates)} />
						</>
					) : null}
					<polyline className={classes.sparklineLine} points={points} />
					{showEndpoint && endpoint ? (
						<circle className={classes.sparklineEndpoint} cx={endpoint.x} cy={endpoint.y} r="2.2" />
					) : null}
				</>
			)
	}
}

function renderBars(values: readonly number[]): ReactNode {
	const maximum = Math.max(...values, 1)
	const width = 100 / values.length

	return values.map((value, index) => {
		const height = (value / maximum) * 26
		const x = index * width + 1
		const y = 28 - height

		return (
			<rect
				className={classes.sparklineBar}
				height={roundPoint(height)}
				key={`${index}-${value}`}
				width={Math.max(width - 2, 1)}
				x={roundPoint(x)}
				y={roundPoint(y)}
			/>
		)
	})
}

function renderDots(coordinates: readonly SparklineCoordinate[]): ReactNode {
	return coordinates.map((coordinate, index) => (
		<circle
			className={classes.sparklineDot}
			cx={coordinate.x}
			cy={coordinate.y}
			key={`${index}-${coordinate.x}-${coordinate.y}`}
			r="1.65"
		/>
	))
}

function roundPoint(value: number): number {
	return Math.round(value * 100) / 100
}
