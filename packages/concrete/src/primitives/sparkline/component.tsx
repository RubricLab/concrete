import type { HTMLAttributes, ReactNode } from 'react'
import { concreteClassNames } from '../../styles/class-names'
import { cn } from '../utils'

export type SparklineIntent = 'error' | 'neutral' | 'sky' | 'terminal'
export type SparklineDisplay = 'bar' | 'dot' | 'line'

export type SparklineProps = HTMLAttributes<SVGSVGElement> & {
	area?: boolean
	showEndpoint?: boolean
	intent?: SparklineIntent
	values: readonly number[]
	display?: SparklineDisplay
}

type SparklineCoordinate = {
	x: number
	y: number
}

type RenderSparklineMarksInput = {
	area: boolean
	coordinates: readonly SparklineCoordinate[]
	endpoint: SparklineCoordinate | undefined
	points: string
	safeValues: readonly number[]
	showEndpoint: boolean
	display: SparklineDisplay
}

const sparklineIntentClassNames = {
	error: concreteClassNames.sparklineError,
	neutral: concreteClassNames.sparklineNeutral,
	sky: undefined,
	terminal: concreteClassNames.sparklineTerminal
} satisfies Record<SparklineIntent, string | undefined>

export function Sparkline({
	area = false,
	className,
	showEndpoint = true,
	intent = 'sky',
	values,
	display = 'line',
	...props
}: SparklineProps) {
	const safeValues = values.length > 0 ? values : [0]
	const coordinates = getSparklineCoordinates(safeValues)
	const points = getSparklinePoints(coordinates)
	const endpoint = coordinates.at(-1)

	return (
		<svg
			className={cn(concreteClassNames.sparkline, sparklineIntentClassNames[intent], className)}
			preserveAspectRatio="none"
			viewBox="0 0 100 28"
			{...props}
		>
			<title>Sparkline</title>
			{renderSparklineMarks({
				area,
				coordinates,
				display,
				endpoint,
				points,
				safeValues,
				showEndpoint
			})}
		</svg>
	)
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

function renderSparklineMarks({
	area,
	coordinates,
	endpoint,
	points,
	safeValues,
	showEndpoint,
	display
}: RenderSparklineMarksInput): ReactNode {
	switch (display) {
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
							<path className={concreteClassNames.sparklineArea} d={getSparklineAreaPath(coordinates)} />
						</>
					) : null}
					<polyline className={concreteClassNames.sparklineLine} points={points} />
					{showEndpoint && endpoint ? (
						<circle
							className={concreteClassNames.sparklineEndpoint}
							cx={endpoint.x}
							cy={endpoint.y}
							r="2.2"
						/>
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
				className={concreteClassNames.sparklineBar}
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
			className={concreteClassNames.sparklineDot}
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
