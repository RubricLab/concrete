import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { stackedChartGroups } from '../../utilities/data-fixtures'
import { StackedBarChart } from './component'

export const stackedBarChartExamples = defineExamples({
	compact: {
		description: 'Headerless normalized rails for dense summaries.',
		render: () => renderStackedBarChartExample('compact')
	},
	default: {
		description: 'Vertical stacked composition.',
		render: () => renderStackedBarChartExample('default')
	},
	empty: {
		description: 'No-data state inside the stacked bar shell.',
		render: () => renderStackedBarChartExample('empty')
	},
	error: {
		description: 'Failed data state with an explicit message.',
		render: () => renderStackedBarChartExample('error')
	},
	horizontal: {
		description: 'Rail layout for compact summaries.',
		render: () => renderStackedBarChartExample('horizontal')
	},
	loading: {
		description: 'Stable loading state for async generated output.',
		render: () => renderStackedBarChartExample('loading')
	},
	normalized: {
		description: 'Normalized 100% composition.',
		render: () => renderStackedBarChartExample('normalized')
	}
})

function renderStackedBarChartExample(state = 'default'): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<StackedBarChart
				groups={[]}
				message={state === 'error' ? 'Could not load run composition.' : undefined}
				state={state}
				title="Run composition"
			/>
		)
	}

	if (state === 'compact') {
		return (
			<StackedBarChart
				compact
				groups={stackedChartGroups}
				height={150}
				legend={false}
				normalized
				orientation="horizontal"
				showHeader={false}
				showValues={false}
				surface="sunken"
				title="Run composition"
			/>
		)
	}

	return (
		<StackedBarChart
			groups={stackedChartGroups}
			normalized={state === 'normalized'}
			orientation={state === 'horizontal' ? 'horizontal' : 'vertical'}
			title="Run composition"
		/>
	)
}
