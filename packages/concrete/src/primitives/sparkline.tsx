import type { HTMLAttributes, ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcretePrimitive } from '../registry/definition'
import { prop, states } from '../registry/props'
import { concreteClassNames } from '../styles/class-names'
import { Frame } from './frame'
import { cn } from './utils'

const sparklineToneValues = ['sky', 'neutral', 'terminal', 'error'] as const
const sparklineVariantValues = ['line', 'bar', 'dot'] as const

export type SparklineVariant = (typeof sparklineVariantValues)[number]
export type SparklineTone = (typeof sparklineToneValues)[number]

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
			className={cn(concreteClassNames.sparkline, getSparklineToneClass(tone), className)}
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

export const sparklinePropsSchema = z
	.object({
		area: z.boolean().default(false),
		showEndpoint: z.boolean().default(true),
		tone: z.enum(sparklineToneValues).default('sky'),
		values: z.array(z.number()).default([12, 18, 16, 24, 22, 31, 28, 36]),
		variant: z.enum(sparklineVariantValues).default('line')
	})
	.strict()

export const sparklinePrimitiveDefinition = defineConcretePrimitive({
	category: 'data',
	component: Sparkline,
	controls: [
		textControl('values', 'Values', '12,18,16,24,22,31,28,36'),
		selectControl('variant', 'Variant', 'line', sparklineVariantValues),
		selectControl('tone', 'Tone', 'sky', sparklineToneValues),
		booleanControl('area', 'Area', 'false'),
		booleanControl('showEndpoint', 'Endpoint', 'true')
	],
	description: 'Tiny trend primitive rendered as line or bar SVG.',
	guidance:
		'Sparklines show trend shape, not detailed analysis. Keep axes and legends in the surrounding data surface.',
	kind: 'primitive',
	name: 'Sparkline',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('values', 'readonly number[]', 'Series values normalized into the SVG viewport.', '', true),
		prop('variant', "'line' | 'bar' | 'dot'", 'Sparkline mark type.', 'line'),
		prop(
			'tone',
			"'sky' | 'neutral' | 'terminal' | 'error'",
			'Line, endpoint, area, and bar color.',
			'sky'
		),
		prop('area', 'boolean', 'Adds a soft area fill under a line sparkline.', 'false'),
		prop('showEndpoint', 'boolean', 'Shows the last value dot for line sparklines.', 'true')
	],
	renderExample: renderSparklineExample,
	schema: sparklinePropsSchema,
	slug: 'sparkline',
	states: states([
		['line', 'Line trend.'],
		['area', 'Line with soft area and endpoint.'],
		['bar', 'Bar density.'],
		['dot', 'Dot distribution.'],
		['volatile', 'High variance trend.']
	])
})

function renderSparklineExample(state = 'line') {
	switch (state) {
		case 'area':
			return (
				<Frame>
					<Sparkline area values={[12, 18, 16, 24, 22, 31, 28, 36]} />
					<Sparkline area tone="terminal" values={[6, 10, 8, 14, 21, 18, 24]} />
					<Sparkline area tone="neutral" values={[14, 13, 15, 14, 13, 15, 14]} />
				</Frame>
			)
		case 'bar':
			return (
				<Frame>
					<Sparkline values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
					<Sparkline tone="neutral" values={[24, 18, 21, 14, 8, 10, 6]} variant="bar" />
				</Frame>
			)
		case 'dot':
			return (
				<Frame>
					<Sparkline values={[8, 12, 18, 16, 22, 24, 28]} variant="dot" />
					<Sparkline tone="neutral" values={[28, 24, 22, 18, 16, 12, 8]} variant="dot" />
				</Frame>
			)
		case 'volatile':
			return (
				<Frame>
					<Sparkline tone="error" values={[14, 5, 28, 9, 32, 11, 26, 7, 22]} />
				</Frame>
			)
		default:
			return (
				<Frame>
					<Sparkline values={[12, 18, 16, 24, 22, 31, 28, 36]} />
					<Sparkline values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
				</Frame>
			)
	}
}

function getSparklineToneClass(tone: SparklineTone): string | undefined {
	switch (tone) {
		case 'error':
			return concreteClassNames.sparklineError
		case 'neutral':
			return concreteClassNames.sparklineNeutral
		case 'sky':
			return undefined
		case 'terminal':
			return concreteClassNames.sparklineTerminal
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
