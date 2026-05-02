import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { chartSeries } from '../../utilities/data-fixtures'
import { AreaChart } from './component'

export const areaChartExamples = defineExamples({
	compact: {
		description: 'Headerless compact area for generated panels.',
		render: () => renderAreaChartExample('compact')
	},
	default: {
		description: 'Soft area chart with endpoint labels.',
		render: () => renderAreaChartExample('default')
	},
	dots: {
		description: 'Inspection state with point markers.',
		render: () => renderAreaChartExample('dots')
	},
	empty: {
		description: 'No-data state inside the area chart shell.',
		render: () => renderAreaChartExample('empty')
	},
	error: {
		description: 'Failed data state with an explicit message.',
		render: () => renderAreaChartExample('error')
	},
	loading: {
		description: 'Stable loading state for async generated output.',
		render: () => renderAreaChartExample('loading')
	},
	quiet: {
		description: 'Transparent surface and hidden axes for compact generated UI.',
		render: () => renderAreaChartExample('quiet')
	}
})

function renderAreaChartExample(state = 'default'): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<AreaChart
				message={state === 'error' ? 'Could not load execution trend.' : undefined}
				series={[]}
				state={state}
				title="Execution trend"
			/>
		)
	}

	if (state === 'compact') {
		return (
			<AreaChart
				compact
				height={150}
				legend={false}
				series={chartSeries}
				showHeader={false}
				showYAxis={false}
				stacked
				surface="sunken"
				title="Execution trend"
			/>
		)
	}

	return (
		<AreaChart
			description={state === 'quiet' ? undefined : 'Accepted runs and total executions.'}
			series={chartSeries}
			showDots={state === 'dots'}
			showEndLabels={state !== 'quiet'}
			showGrid={state !== 'quiet'}
			showXAxis={state !== 'quiet'}
			showYAxis={state !== 'quiet'}
			surface={state === 'quiet' ? 'transparent' : 'raised'}
			target={state === 'quiet' ? undefined : 58}
			title="Execution trend"
		/>
	)
}
