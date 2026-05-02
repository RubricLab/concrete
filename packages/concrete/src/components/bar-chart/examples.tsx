import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { chartComparisonPoints, chartPoints } from '../../utilities/data-fixtures'
import { BarChart } from './component'

export const barChartExamples = defineExamples({
	compact: {
		description: 'Headerless horizontal bars for dense scorecards.',
		render: () => renderBarChartExample('compact')
	},
	comparison: {
		description: 'Muted comparison bars behind the primary series.',
		render: () => renderBarChartExample('comparison')
	},
	default: {
		description: 'Vertical bars with value labels.',
		render: () => renderBarChartExample('default')
	},
	empty: {
		description: 'No-data state inside the bar chart shell.',
		render: () => renderBarChartExample('empty')
	},
	error: {
		description: 'Failed data state with an explicit message.',
		render: () => renderBarChartExample('error')
	},
	horizontal: {
		description: 'Horizontal rail layout for ranked lists.',
		render: () => renderBarChartExample('horizontal')
	},
	loading: {
		description: 'Stable loading state for async generated output.',
		render: () => renderBarChartExample('loading')
	},
	quiet: {
		description: 'No value labels for dense cards.',
		render: () => renderBarChartExample('quiet')
	}
})

function renderBarChartExample(state = 'default'): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<BarChart
				message={state === 'error' ? 'Could not load capability scores.' : undefined}
				points={[]}
				state={state}
				title="Capability score"
			/>
		)
	}

	if (state === 'compact') {
		return (
			<BarChart
				compact
				height={150}
				legend={false}
				orientation="horizontal"
				points={chartPoints.slice(0, 4)}
				showHeader={false}
				showValues={false}
				surface="sunken"
				title="Capability score"
			/>
		)
	}

	return (
		<BarChart
			comparisonPoints={state === 'comparison' ? chartComparisonPoints : []}
			orientation={state === 'horizontal' ? 'horizontal' : 'vertical'}
			points={chartPoints}
			showValues={state !== 'quiet'}
			title="Capability score"
		/>
	)
}
