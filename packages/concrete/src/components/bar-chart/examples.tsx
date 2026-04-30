import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { chartComparisonPoints, chartPoints, DataWideStage } from '../../utilities/data-fixtures'
import { BarChart } from './component'

export const barChartExamples = defineExamples({
	comparison: {
		description: 'Muted comparison bars behind the primary series.',
		render: () => renderBarChartExample('comparison')
	},
	default: {
		description: 'Vertical bars with value labels.',
		render: () => renderBarChartExample('default')
	},
	horizontal: {
		description: 'Horizontal rail layout for ranked lists.',
		render: () => renderBarChartExample('horizontal')
	},
	quiet: {
		description: 'No value labels for dense cards.',
		render: () => renderBarChartExample('quiet')
	}
})

function renderBarChartExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
			<BarChart
				comparisonPoints={state === 'comparison' ? chartComparisonPoints : []}
				orientation={state === 'horizontal' ? 'horizontal' : 'vertical'}
				points={chartPoints}
				showValues={state !== 'quiet'}
				title="Capability score"
			/>
		</DataWideStage>
	)
}
