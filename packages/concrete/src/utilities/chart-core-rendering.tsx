import type { ReactNode } from 'react'
import {
	ChartAxis,
	ChartAxisLabel as ChartAxisLabelPrimitive,
	ChartGrid,
	ChartPlotBackground,
	ChartTarget,
	ChartTickLabel
} from '../primitives'
import type { chartSchema, DataIntent, DataPoint } from '../schemas'
import { createChartTicks, createLinearScale, getNumericExtent } from './data-geometry'

export type ChartPlotBox = {
	bottom: number
	height: number
	left: number
	right: number
	top: number
	width: number
}

export type ChartPlotPadding = {
	bottom: number
	left: number
	right: number
	top: number
}

export type ChartAxisLabelDatum = { label: string; x: number }

export type ScaledChartPoint = DataPoint & {
	x: number
	y: number
}

export type ChartBarRectangle = { height: number; width: number; x: number; y: number }

type ChartState = 'empty' | 'error' | 'loading' | 'ready'
type ChartStateIntent = 'danger' | 'muted' | 'sky' | 'terminal'
type ChartLegendDatum = { label: string; intent: DataIntent; value?: string | undefined }

const chartStateMessages = {
	empty: 'No data',
	error: 'Chart failed',
	loading: 'Loading data',
	ready: ''
} satisfies Record<ChartState, string>

const chartStateTones = {
	empty: 'muted',
	error: 'danger',
	loading: 'sky',
	ready: 'terminal'
} satisfies Record<ChartState, ChartStateIntent>

export function createChartPlotBox(
	width: number,
	height: number,
	padding: ChartPlotPadding
): ChartPlotBox {
	const left = padding.left
	const right = width - padding.right
	const top = padding.top
	const bottom = height - padding.bottom

	return {
		bottom,
		height: bottom - top,
		left,
		right,
		top,
		width: right - left
	}
}

export function getPaddedChartExtent(
	values: readonly number[],
	baseline?: number
): readonly [number, number] {
	const numericValues = baseline === undefined ? values : [...values, baseline]
	const extent = getNumericExtent(numericValues.length > 0 ? numericValues : [0, 1])
	const range = extent[1] - extent[0]
	const padding = range * 0.08

	return [extent[0] - padding, extent[1] + padding]
}

export function createScaledChartPoints(
	points: readonly DataPoint[],
	plotBox: ChartPlotBox,
	scaleY: (value: number) => number
): readonly ScaledChartPoint[] {
	const scaleX = createLinearScale(
		[0, Math.max(points.length - 1, 1)],
		[plotBox.left, plotBox.right]
	)

	return points.map((point, pointIndex) => ({
		...point,
		x: scaleX(pointIndex),
		y: scaleY(point.value)
	}))
}

export function createSparseXAxisLabels(
	points: readonly DataPoint[],
	plotBox: ChartPlotBox
): readonly ChartAxisLabelDatum[] {
	if (points.length === 0) {
		return []
	}

	const scaleX = createLinearScale(
		[0, Math.max(points.length - 1, 1)],
		[plotBox.left, plotBox.right]
	)
	const indexes = new Set<number>([0, Math.floor((points.length - 1) / 2), points.length - 1])

	if (points.length <= 4) {
		points.forEach((_point, pointIndex) => {
			indexes.add(pointIndex)
		})
	}

	return [...indexes]
		.sort((firstIndex, secondIndex) => firstIndex - secondIndex)
		.map(pointIndex => ({
			label: points[pointIndex]?.label ?? '',
			x: scaleX(pointIndex)
		}))
}

export function createChartBarRectangle(
	value: number,
	x: number,
	width: number,
	scaleY: (value: number) => number,
	zero: number
): ChartBarRectangle {
	const y = scaleY(value)

	return {
		height: Math.max(Math.abs(zero - y), 1),
		width,
		x,
		y: Math.min(y, zero)
	}
}

export function getStackedTotal(group: { segments: readonly DataPoint[] }): number {
	return group.segments.reduce((sum, segment) => sum + Math.max(segment.value, 0), 0)
}

export function renderCartesianGrid(
	plotBox: ChartPlotBox,
	extent: readonly [number, number],
	xLabels: readonly ChartAxisLabelDatum[] = [],
	options: {
		showGrid?: boolean
		showXAxis?: boolean
		showYAxis?: boolean
	} = {}
): ReactNode {
	const scaleY = createLinearScale(extent, [plotBox.bottom, plotBox.top])
	const ticks = createChartTicks(extent, 4)
	const showGrid = options.showGrid ?? true
	const showXAxis = options.showXAxis ?? true
	const showYAxis = options.showYAxis ?? true

	return (
		<ChartGrid>
			<ChartPlotBackground
				height={plotBox.height}
				rx="8"
				width={plotBox.width}
				x={plotBox.left}
				y={plotBox.top}
			/>
			{ticks.map(tick => {
				const y = scaleY(tick)

				return (
					<g key={tick}>
						{showGrid ? <line x1={plotBox.left} x2={plotBox.right} y1={y} y2={y} /> : null}
						{showYAxis ? (
							<ChartTickLabel textAnchor="end" x={plotBox.left - 9} y={y + 3}>
								{formatChartValue(tick)}
							</ChartTickLabel>
						) : null}
					</g>
				)
			})}
			{showXAxis ? (
				<ChartAxis x1={plotBox.left} x2={plotBox.right} y1={plotBox.bottom} y2={plotBox.bottom} />
			) : null}
			{showXAxis
				? xLabels.map(label => (
						<ChartAxisLabelPrimitive
							key={`${label.label}-${label.x}`}
							textAnchor="middle"
							x={label.x}
							y={plotBox.bottom + 18}
						>
							{label.label}
						</ChartAxisLabelPrimitive>
					))
				: null}
		</ChartGrid>
	)
}

export function renderTarget(
	target: number,
	extent: readonly [number, number],
	plotBox: ChartPlotBox
): ReactNode {
	const scaleY = createLinearScale(extent, [plotBox.bottom, plotBox.top])
	const y = scaleY(target)

	return (
		<ChartTarget>
			<line x1={plotBox.left} x2={plotBox.right} y1={y} y2={y} />
			<text textAnchor="end" x={plotBox.right - 4} y={y - 7}>
				target {formatChartValue(target)}
			</text>
		</ChartTarget>
	)
}

export function formatChartValue(value: number): string {
	const absoluteValue = Math.abs(value)

	if (absoluteValue >= 1000) {
		return `${Math.round(value / 100) / 10}k`
	}

	if (Number.isInteger(value)) {
		return String(value)
	}

	return value.toFixed(1)
}

export function getChartStateMessage(state: ChartState): string {
	return chartStateMessages[state]
}

export function getChartStateIntent(state: ChartState): ChartStateIntent {
	return chartStateTones[state]
}

export function getChartLegendItems(
	parsedProps: ReturnType<typeof chartSchema.parse>
): ChartLegendDatum[] {
	switch (parsedProps.kind) {
		case 'area':
		case 'line':
			return parsedProps.series.map(series => ({
				intent: series.intent,
				label: series.label
			}))
		case 'bar':
			return parsedProps.points.slice(0, 4).map(point => ({
				intent: point.intent,
				label: point.label
			}))
		case 'donut':
			return parsedProps.segments.map(segment => ({
				intent: segment.intent,
				label: segment.label,
				value: String(segment.value)
			}))
		case 'heatmap':
			return []
		case 'stacked-bar':
			return (
				parsedProps.groups[0]?.segments.map(segment => ({
					intent: segment.intent,
					label: segment.label
				})) ?? []
			)
	}
}
