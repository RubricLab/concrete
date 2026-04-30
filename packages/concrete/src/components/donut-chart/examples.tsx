import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { chartPoints, DataWideStage } from '../../utilities/data-fixtures'
import { DonutChart } from './component'

export const donutChartExamples = defineExamples({
	default: {
		description: 'Medium ring with center label.',
		render: () => renderDonutChartExample('default')
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
	return (
		<DataWideStage>
			<DonutChart
				centerLabel="64%"
				segments={chartPoints.slice(0, 4)}
				showCenterLabel={state !== 'plain'}
				thickness={state === 'thin' ? 'thin' : state === 'thick' ? 'thick' : 'medium'}
				title="Workload split"
			/>
		</DataWideStage>
	)
}
