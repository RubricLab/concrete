import type { ReactNode } from 'react'
import { ChartMessage } from '../primitives'
import type { chartSchema } from '../schemas'
import { renderBarChart } from './bar-chart-rendering'
import { getChartStateMessage } from './chart-core-rendering'
import { renderDonutChart } from './donut-chart-rendering'
import { renderHeatmapChart } from './heatmap-rendering'
import { renderLineChart } from './line-chart-rendering'
import { renderStackedBarChart } from './stacked-bar-rendering'

export function renderChartBody(parsedProps: ReturnType<typeof chartSchema.parse>): ReactNode {
	if (parsedProps.state !== 'ready') {
		return (
			<ChartMessage>{parsedProps.message ?? getChartStateMessage(parsedProps.state)}</ChartMessage>
		)
	}

	switch (parsedProps.kind) {
		case 'area':
		case 'line':
			return renderLineChart(parsedProps)
		case 'bar':
			return renderBarChart(
				parsedProps.points,
				parsedProps.comparisonPoints,
				parsedProps.orientation,
				parsedProps.height,
				parsedProps
			)
		case 'donut':
			return renderDonutChart(
				parsedProps.segments,
				parsedProps.centerLabel,
				parsedProps.showCenterLabel,
				parsedProps.thickness
			)
		case 'heatmap':
			return renderHeatmapChart(parsedProps.cells, parsedProps.showValues)
		case 'stacked-bar':
			return renderStackedBarChart(
				parsedProps.groups,
				parsedProps.normalized,
				parsedProps.orientation,
				parsedProps.height,
				parsedProps
			)
	}
}
