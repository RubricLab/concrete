import type { ReactNode } from 'react'
import { numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type ChartProps, chartSchema } from '../schemas'
import { renderParsedChart } from './chart-rendering'
import {
	chartComparisonPoints,
	chartPoints,
	chartSeries,
	DataWideStage,
	heatmapCells,
	stackedChartGroups
} from './data-fixtures'

const chartVariantValues = ['line', 'area', 'bar', 'stacked-bar', 'donut', 'heatmap'] as const
const chartSurfaceValues = ['raised', 'sunken', 'transparent'] as const

export const chartComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: Chart,
	controls: [
		selectControl('fixture', 'Fixture', 'line', [
			'line',
			'area',
			'bar',
			'stacked',
			'donut',
			'heatmap',
			'loading',
			'empty',
			'error'
		]),
		selectControl('variant', 'Variant', 'line', chartVariantValues),
		textControl('title', 'Title', 'Agent runs'),
		numberControl('height', 'Height', '220'),
		selectControl('surface', 'Surface', 'raised', chartSurfaceValues)
	],
	description: 'Backward-compatible discriminated union wrapper for every focused chart component.',
	guidance:
		'Chart is a convenience wrapper. Prefer LineChart, BarChart, DonutChart, and Heatmap in product code when the chart type is known.',
	kind: 'component',
	name: 'Chart',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'variant',
			"'line' | 'area' | 'bar' | 'stacked-bar' | 'donut' | 'heatmap'",
			'Chart renderer selected by the discriminated schema.',
			'line',
			true
		),
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('message', 'string', 'Optional async state message override.'),
		prop('height', 'number', 'SVG or grid stage height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('showHeader', 'boolean', 'Shows title, description, and async state indicator.', 'true'),
		prop(
			'surface',
			"'raised' | 'sunken' | 'transparent'",
			'Foundation surface treatment for the plot stage.',
			'raised'
		),
		prop('series', 'readonly DataSeries[]', 'Line and area series data.'),
		prop('points', 'readonly DataPoint[]', 'Bar chart points.'),
		prop('groups', 'readonly StackedBarGroup[]', 'Stacked bar groups.'),
		prop('segments', 'readonly DataPoint[]', 'Donut segments.'),
		prop('cells', 'readonly HeatmapCell[]', 'Heatmap cells.')
	],
	renderExample: renderChartExample,
	schema: chartSchema,
	slug: 'chart',
	states: states([
		['line', 'Multi-series line chart with a target marker.'],
		['area', 'Soft area chart for trend previews.'],
		['bar', 'Grouped bar comparison.'],
		['stacked', 'Stacked bar composition.'],
		['donut', 'Part-to-whole ring summary.'],
		['heatmap', 'Compact two-axis intensity grid.'],
		['loading', 'Stable loading state.'],
		['empty', 'No-data state.'],
		['error', 'Failed data state.']
	])
})

function renderChartExample(state = 'line'): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<DataWideStage>
				<Chart
					height={220}
					message={state === 'error' ? 'Could not load the run summary.' : undefined}
					series={[]}
					state={state}
					title="Agent runs"
					variant="line"
				/>
			</DataWideStage>
		)
	}

	switch (state) {
		case 'area':
			return (
				<DataWideStage>
					<Chart
						description="Accepted runs and total executions."
						height={230}
						series={chartSeries}
						target={58}
						title="Execution trend"
						variant="area"
					/>
				</DataWideStage>
			)
		case 'bar':
			return (
				<DataWideStage>
					<Chart
						comparisonPoints={chartComparisonPoints}
						points={chartPoints}
						title="Capability score"
						variant="bar"
					/>
				</DataWideStage>
			)
		case 'stacked':
			return (
				<DataWideStage>
					<Chart groups={stackedChartGroups} title="Run composition" variant="stacked-bar" />
				</DataWideStage>
			)
		case 'donut':
			return (
				<DataWideStage>
					<Chart
						centerLabel="64%"
						segments={chartPoints.slice(0, 4)}
						title="Workload split"
						variant="donut"
					/>
				</DataWideStage>
			)
		case 'heatmap':
			return (
				<DataWideStage>
					<Chart cells={heatmapCells} title="Run intensity" variant="heatmap" />
				</DataWideStage>
			)
		default:
			return (
				<DataWideStage>
					<Chart
						description="Agent run volume with accepted output overlay."
						series={chartSeries}
						target={58}
						title="Agent runs"
						variant="line"
					/>
				</DataWideStage>
			)
	}
}

type ComponentShellProps = {
	className?: string
}

export function Chart({ className, ...props }: ChartProps & ComponentShellProps) {
	const parsedProps = chartSchema.parse(props)

	return renderParsedChart(parsedProps, className)
}
