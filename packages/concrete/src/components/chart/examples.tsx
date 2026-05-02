import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import {
	chartComparisonPoints,
	chartPoints,
	chartSeries,
	heatmapCells,
	stackedChartGroups
} from '../../utilities/data-fixtures'
import { Chart } from './component'

export const chartExamples = defineExamples({
	area: {
		description: 'Soft area chart for trend previews.',
		render: () => renderChartExample('area')
	},
	bar: {
		description: 'Grouped bar comparison.',
		render: () => renderChartExample('bar')
	},
	compact: {
		description: 'Headerless compact chart surface.',
		render: () => renderChartExample('compact')
	},
	default: {
		description: 'Multi-series line chart with a target marker.',
		render: () => renderChartExample('line')
	},
	donut: {
		description: 'Part-to-whole ring summary.',
		render: () => renderChartExample('donut')
	},
	empty: {
		description: 'No-data state.',
		render: () => renderChartExample('empty')
	},
	error: {
		description: 'Failed data state.',
		render: () => renderChartExample('error')
	},
	heatmap: {
		description: 'Compact two-axis intensity grid.',
		render: () => renderChartExample('heatmap')
	},
	line: {
		description: 'Multi-series line chart with a target marker.',
		render: () => renderChartExample('line')
	},
	loading: {
		description: 'Stable loading state.',
		render: () => renderChartExample('loading')
	},
	stacked: {
		description: 'Stacked bar composition.',
		render: () => renderChartExample('stacked')
	}
})

function renderChartExample(state = 'line'): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<Chart
				height={220}
				message={state === 'error' ? 'Could not load the run summary.' : undefined}
				series={[]}
				state={state}
				title="Agent runs"
				kind="line"
			/>
		)
	}

	switch (state) {
		case 'compact':
			return (
				<Chart
					compact
					height={150}
					legend={false}
					series={chartSeries}
					showHeader={false}
					showYAxis={false}
					surface="sunken"
					title="Agent runs"
					kind="line"
				/>
			)
		case 'area':
			return (
				<Chart
					description="Accepted runs and total executions."
					height={230}
					series={chartSeries}
					target={58}
					title="Execution trend"
					kind="area"
				/>
			)
		case 'bar':
			return (
				<Chart
					comparisonPoints={chartComparisonPoints}
					points={chartPoints}
					title="Capability score"
					kind="bar"
				/>
			)
		case 'stacked':
			return <Chart groups={stackedChartGroups} title="Run composition" kind="stacked-bar" />
		case 'donut':
			return (
				<Chart
					centerLabel="64%"
					segments={chartPoints.slice(0, 4)}
					title="Workload split"
					kind="donut"
				/>
			)
		case 'heatmap':
			return <Chart cells={heatmapCells} title="Run intensity" kind="heatmap" />
		default:
			return (
				<Chart
					description="Agent run volume with accepted output overlay."
					series={chartSeries}
					target={58}
					title="Agent runs"
					kind="line"
				/>
			)
	}
}
