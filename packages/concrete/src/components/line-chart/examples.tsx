import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { chartSeries, DataWideStage } from '../../utilities/data-fixtures'
import { LineChart } from './component'

export const lineChartExamples = defineExamples({
	default: {
		description: 'Multi-series line chart with endpoint labels.',
		render: () => renderLineChartExample('default')
	},
	empty: {
		description: 'No-data state.',
		render: () => renderLineChartExample('empty')
	},
	error: {
		description: 'Failed data state.',
		render: () => renderLineChartExample('error')
	},
	inspect: {
		description: 'Point markers enabled for inspection.',
		render: () => renderLineChartExample('inspect')
	},
	loading: {
		description: 'Stable loading state.',
		render: () => renderLineChartExample('loading')
	},
	target: {
		description: 'Trend with a horizontal reference target.',
		render: () => renderLineChartExample('target')
	}
})

function renderLineChartExample(state = 'default'): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<DataWideStage>
				<LineChart
					height={220}
					message={state === 'error' ? 'Could not load the run summary.' : undefined}
					series={[]}
					state={state}
					title="Agent runs"
				/>
			</DataWideStage>
		)
	}

	return (
		<DataWideStage>
			<LineChart
				description="Agent run volume with accepted output overlay."
				series={chartSeries}
				showDots={state === 'inspect'}
				target={state === 'target' ? 58 : undefined}
				title="Agent runs"
			/>
		</DataWideStage>
	)
}
