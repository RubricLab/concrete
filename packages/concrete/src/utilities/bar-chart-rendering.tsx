import type { ReactNode } from 'react'
import type { barChartSchema, DataPoint } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
import {
	createChartBarRectangle,
	createChartPlotBox,
	formatChartValue,
	getPaddedChartExtent,
	renderCartesianGrid
} from './chart-core-rendering'
import { createLinearScale } from './data-geometry'
import { getDataToneClass } from './data-tone'

export function renderBarChart(
	points: readonly DataPoint[],
	comparisonPoints: readonly DataPoint[],
	orientation: 'horizontal' | 'vertical',
	height: number,
	options: Pick<
		ReturnType<typeof barChartSchema.parse>,
		'baseline' | 'showGrid' | 'showValues' | 'showXAxis' | 'showYAxis'
	>
): ReactNode {
	const width = 640

	if (points.length === 0) {
		return <div className={concreteClassNames.chartMessage}>No data</div>
	}

	if (orientation === 'horizontal') {
		return renderHorizontalBarChart(points, width, height, options)
	}

	const plotBox = createChartPlotBox(width, height, {
		bottom: 34,
		left: 46,
		right: 18,
		top: 22
	})
	const extent = getPaddedChartExtent(
		[...points, ...comparisonPoints].map(point => point.value),
		options.baseline
	)
	const scaleY = createLinearScale(extent, [plotBox.bottom, plotBox.top])
	const zero = scaleY(options.baseline)
	const slotWidth = plotBox.width / Math.max(points.length, 1)
	const barWidth = Math.max(slotWidth * (comparisonPoints.length > 0 ? 0.26 : 0.42), 4)
	const comparisonWidth = Math.max(slotWidth * 0.5, 6)
	const xLabels = points.map((point, pointIndex) => ({
		label: point.label,
		x: plotBox.left + pointIndex * slotWidth + slotWidth / 2
	}))

	return (
		<svg aria-hidden className={concreteClassNames.chartSvg} viewBox={`0 0 ${width} ${height}`}>
			<title>Bar chart</title>
			{renderCartesianGrid(plotBox, extent, xLabels, options)}
			<line
				className={concreteClassNames.chartBaseline}
				x1={plotBox.left}
				x2={plotBox.right}
				y1={zero}
				y2={zero}
			/>
			{comparisonPoints.map((point, pointIndex) => {
				const x = plotBox.left + pointIndex * slotWidth + (slotWidth - comparisonWidth) / 2
				const rect = createChartBarRectangle(point.value, x, comparisonWidth, scaleY, zero)

				return (
					<rect
						className={concreteClassNames.chartBarComparison}
						height={rect.height}
						key={`comparison-${point.label}`}
						rx="3"
						width={rect.width}
						x={rect.x}
						y={rect.y}
					/>
				)
			})}
			{points.map((point, pointIndex) => {
				const x = plotBox.left + pointIndex * slotWidth + (slotWidth - barWidth) / 2
				const rect = createChartBarRectangle(point.value, x, barWidth, scaleY, zero)

				return (
					<g className={getDataToneClass(point.tone)} key={point.label}>
						<rect
							className={concreteClassNames.chartBar}
							height={rect.height}
							rx="3"
							width={rect.width}
							x={rect.x}
							y={rect.y}
						/>
						{options.showValues ? (
							<text
								className={concreteClassNames.chartValueLabel}
								textAnchor="middle"
								x={x + barWidth / 2}
								y={rect.y - 7}
							>
								{formatChartValue(point.value)}
							</text>
						) : null}
					</g>
				)
			})}
		</svg>
	)
}

function renderHorizontalBarChart(
	points: readonly DataPoint[],
	width: number,
	height: number,
	options: Pick<ReturnType<typeof barChartSchema.parse>, 'showValues'>
): ReactNode {
	const plotBox = createChartPlotBox(width, height, {
		bottom: 20,
		left: 98,
		right: 54,
		top: 20
	})
	const extent = getPaddedChartExtent(
		points.map(point => point.value),
		0
	)
	const scaleX = createLinearScale([0, extent[1]], [plotBox.left, plotBox.right])
	const rowStep = plotBox.height / Math.max(points.length, 1)
	const barHeight = Math.min(12, Math.max(rowStep * 0.36, 7))

	return (
		<svg aria-hidden className={concreteClassNames.chartSvg} viewBox={`0 0 ${width} ${height}`}>
			<title>Horizontal bar chart</title>
			<rect
				className={concreteClassNames.chartPlotBackground}
				height={plotBox.height}
				rx="8"
				width={plotBox.width}
				x={plotBox.left}
				y={plotBox.top}
			/>
			{points.map((point, pointIndex) => {
				const y = plotBox.top + pointIndex * rowStep + (rowStep - barHeight) / 2
				const barWidth = Math.max(scaleX(point.value) - plotBox.left, 1)

				return (
					<g className={getDataToneClass(point.tone)} key={point.label}>
						<text
							className={concreteClassNames.chartRowLabel}
							textAnchor="end"
							x={plotBox.left - 10}
							y={y + barHeight}
						>
							{point.label}
						</text>
						<rect
							className={concreteClassNames.chartBarTrack}
							height={barHeight}
							rx={barHeight / 2}
							width={plotBox.width}
							x={plotBox.left}
							y={y}
						/>
						<rect
							className={concreteClassNames.chartBar}
							height={barHeight}
							rx={barHeight / 2}
							width={barWidth}
							x={plotBox.left}
							y={y}
						/>
						{options.showValues ? (
							<text className={concreteClassNames.chartValueLabel} x={plotBox.right + 9} y={y + barHeight}>
								{formatChartValue(point.value)}
							</text>
						) : null}
					</g>
				)
			})}
		</svg>
	)
}
