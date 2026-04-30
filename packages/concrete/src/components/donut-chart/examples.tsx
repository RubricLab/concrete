import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { chartPoints } from '../../utilities/data-fixtures'
import { DonutChart } from './component'

export const donutChartExamples = defineExamples({
	default: {
		description: 'Medium ring with center label.',
		render: () => renderDonutChartExample('default')
	},
	empty: {
		description: 'No-data state inside the donut shell.',
		render: () => renderDonutChartExample('empty')
	},
	error: {
		description: 'Failed data state with an explicit message.',
		render: () => renderDonutChartExample('error')
	},
	loading: {
		description: 'Stable loading state for async generated output.',
		render: () => renderDonutChartExample('loading')
	},
	plain: {
		description: 'Ring without center label.',
		render: () => renderDonutChartExample('plain')
	},
	thick: {
		description: 'Thick ring for primary scorecards.',
		render: () => renderDonutChartExample('thick')
	},
	thin: {
		description: 'Thin ring for quiet summaries.',
		render: () => renderDonutChartExample('thin')
	}
})

function renderDonutChartExample(state = 'default'): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<DonutChart
				message={state === 'error' ? 'Could not load workload split.' : undefined}
				segments={[]}
				state={state}
				title="Workload split"
			/>
		)
	}

	return (
		<DonutChart
			centerLabel="64%"
			segments={chartPoints.slice(0, 4)}
			showCenterLabel={state !== 'plain'}
			thickness={state === 'thin' ? 'thin' : state === 'thick' ? 'thick' : 'medium'}
			title="Workload split"
		/>
	)
}
