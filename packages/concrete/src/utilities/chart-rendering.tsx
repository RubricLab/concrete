import type { ReactNode } from 'react'
import { ChartFrame, ChartMessage, DataSurface, Indicator, Legend, LegendItem } from '../primitives'
import type { chartSchema } from '../schemas'
import { renderBarChart } from './bar-chart-rendering'
import {
	getChartLegendItems,
	getChartStateMessage,
	getChartStateTone
} from './chart-core-rendering'
import { toIndicatorTone } from './data-tone'
import { renderDonutChart } from './donut-chart-rendering'
import { renderHeatmapChart } from './heatmap-rendering'
import { renderLineChart } from './line-chart-rendering'
import { renderStackedBarChart } from './stacked-bar-rendering'

// DX-TODO(chart): This shared render engine still owns chart body routing and geometry
// delegation. Keep styling primitive-owned; revisit only if chart components need
// variant-specific controller logic that cannot stay in this utility.
export function renderParsedChart(
	parsedProps: ReturnType<typeof chartSchema.parse>,
	className: string | undefined
): ReactNode {
	const legendItems = getChartLegendItems(parsedProps)

	return (
		<DataSurface
			actions={
				parsedProps.showHeader ? (
					<Indicator tone={getChartStateTone(parsedProps.state)}>{parsedProps.state}</Indicator>
				) : undefined
			}
			className={className}
			description={parsedProps.showHeader ? parsedProps.description : undefined}
			purpose="chart"
			title={parsedProps.showHeader ? parsedProps.title : undefined}
		>
			<ChartFrame
				height={parsedProps.height}
				surface={parsedProps.surface}
				variant={parsedProps.variant}
			>
				{renderChartBody(parsedProps)}
			</ChartFrame>
			{parsedProps.legend && legendItems.length > 0 ? (
				<Legend>
					{legendItems.map(item => (
						<LegendItem
							key={item.label}
							label={item.label}
							tone={toIndicatorTone(item.tone)}
							value={item.value}
						/>
					))}
				</Legend>
			) : null}
		</DataSurface>
	)
}

function renderChartBody(parsedProps: ReturnType<typeof chartSchema.parse>): ReactNode {
	if (parsedProps.state !== 'ready') {
		return (
			<ChartMessage>{parsedProps.message ?? getChartStateMessage(parsedProps.state)}</ChartMessage>
		)
	}

	switch (parsedProps.variant) {
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
