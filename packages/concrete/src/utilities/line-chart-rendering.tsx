import type { ReactNode } from 'react'
import {
	ChartArea,
	ChartEndLabel,
	ChartEndpoint,
	ChartLine,
	ChartMessage,
	ChartPoint,
	ChartSvg
} from '../primitives'
import type { chartSchema } from '../schemas'
import {
	createChartPlotBox,
	createScaledChartPoints,
	createSparseXAxisLabels,
	formatChartValue,
	getPaddedChartExtent,
	renderCartesianGrid,
	renderTarget
} from './chart-core-rendering'
import { clamp, createLinearScale, createSmoothAreaPath, createSmoothPath } from './data-geometry'
import { getDataToneClass } from './data-tone'

export function renderLineChart(
	parsedProps: Extract<ReturnType<typeof chartSchema.parse>, { variant: 'area' | 'line' }>
): ReactNode {
	const width = 640
	const height = parsedProps.height
	const plotBox = createChartPlotBox(width, height, {
		bottom: 34,
		left: 46,
		right: 18,
		top: 22
	})
	const allValues = parsedProps.series.flatMap(series => series.points.map(point => point.value))
	const extent = getPaddedChartExtent([
		...allValues,
		...(parsedProps.target === undefined ? [] : [parsedProps.target])
	])
	const scaleY = createLinearScale(extent, [plotBox.bottom, plotBox.top])
	const xLabels = createSparseXAxisLabels(parsedProps.series[0]?.points ?? [], plotBox)

	if (allValues.length === 0) {
		return <ChartMessage>No data</ChartMessage>
	}

	return (
		<ChartSvg title="Line chart" viewBox={`0 0 ${width} ${height}`}>
			{renderCartesianGrid(plotBox, extent, xLabels, parsedProps)}
			{parsedProps.target === undefined ? null : renderTarget(parsedProps.target, extent, plotBox)}
			{parsedProps.series.map(series => {
				const points = createScaledChartPoints(series.points, plotBox, scaleY)
				const endpoint = points.at(-1)

				return (
					<g className={getDataToneClass(series.tone)} key={series.id}>
						{parsedProps.variant === 'area' ? (
							<ChartArea d={createSmoothAreaPath(points, plotBox.bottom)} />
						) : null}
						<ChartLine d={createSmoothPath(points)} />
						{parsedProps.showDots
							? points.map((point, pointIndex) => (
									<ChartPoint
										cx={point.x}
										cy={point.y}
										key={`${series.id}-${point.label}-${pointIndex}`}
										r="2"
									/>
								))
							: null}
						{endpoint ? <ChartEndpoint cx={endpoint.x} cy={endpoint.y} r="3" /> : null}
						{endpoint && parsedProps.showEndLabels ? (
							<ChartEndLabel
								textAnchor="end"
								x={plotBox.right}
								y={clamp(endpoint.y - 8, plotBox.top + 4, plotBox.bottom - 4)}
							>
								{formatChartValue(endpoint.value)}
							</ChartEndLabel>
						) : null}
					</g>
				)
			})}
		</ChartSvg>
	)
}
