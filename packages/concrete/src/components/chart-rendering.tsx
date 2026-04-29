import type { CSSProperties, ReactNode } from 'react'
import { Card, Indicator } from '../primitives'
import { cn } from '../primitives/utils'
import type { chartSchema } from '../schemas'
import { concreteClassNames } from '../styles/class-names'
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

export function renderParsedChart(
	parsedProps: ReturnType<typeof chartSchema.parse>,
	className: string | undefined
): ReactNode {
	const legendItems = getChartLegendItems(parsedProps)

	return (
		<Card className={cn(concreteClassNames.chartCard, className)} variant="raised">
			{parsedProps.showHeader ? (
				<header className={concreteClassNames.dataCardHeader}>
					<div>
						<h3>{parsedProps.title}</h3>
						{parsedProps.description ? <p>{parsedProps.description}</p> : null}
					</div>
					<Indicator tone={getChartStateTone(parsedProps.state)}>{parsedProps.state}</Indicator>
				</header>
			) : null}
			<div
				className={concreteClassNames.chartSurface}
				data-surface={parsedProps.surface}
				data-variant={parsedProps.variant}
				style={{ '--chart-height': `${parsedProps.height}px` } as CSSProperties}
			>
				{renderChartBody(parsedProps)}
			</div>
			{parsedProps.legend && legendItems.length > 0 ? (
				<div className={concreteClassNames.chartLegend}>
					{legendItems.map(item => (
						<Indicator key={item.label} tone={toIndicatorTone(item.tone)}>
							{item.label}
							{item.value === undefined ? null : <span>{item.value}</span>}
						</Indicator>
					))}
				</div>
			) : null}
		</Card>
	)
}

function renderChartBody(parsedProps: ReturnType<typeof chartSchema.parse>): ReactNode {
	if (parsedProps.state !== 'ready') {
		return (
			<div className={concreteClassNames.chartMessage}>
				{parsedProps.message ?? getChartStateMessage(parsedProps.state)}
			</div>
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
