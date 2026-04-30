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
				variant="line"
			/>
		)
	}

	switch (state) {
		case 'area':
			return (
				<Chart
					description="Accepted runs and total executions."
					height={230}
					series={chartSeries}
					target={58}
					title="Execution trend"
					variant="area"
				/>
			)
		case 'bar':
			return (
				<Chart
					comparisonPoints={chartComparisonPoints}
					points={chartPoints}
					title="Capability score"
					variant="bar"
				/>
			)
		case 'stacked':
			return <Chart groups={stackedChartGroups} title="Run composition" variant="stacked-bar" />
		case 'donut':
			return (
				<Chart
					centerLabel="64%"
					segments={chartPoints.slice(0, 4)}
					title="Workload split"
					variant="donut"
				/>
			)
		case 'heatmap':
			return <Chart cells={heatmapCells} title="Run intensity" variant="heatmap" />
		default:
			return (
				<Chart
					description="Agent run volume with accepted output overlay."
					series={chartSeries}
					target={58}
					title="Agent runs"
					variant="line"
				/>
			)
	}
}
