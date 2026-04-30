import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { DataWideStage, stackedChartGroups } from '../../utilities/data-fixtures'
import { StackedBarChart } from './component'

export const stackedBarChartExamples = defineExamples({
	default: {
		description: 'Vertical stacked composition.',
		render: () => renderStackedBarChartExample('default')
	},
	horizontal: {
		description: 'Rail layout for compact summaries.',
		render: () => renderStackedBarChartExample('horizontal')
	},
	normalized: {
		description: 'Normalized 100% composition.',
		render: () => renderStackedBarChartExample('normalized')
	}
})

function renderStackedBarChartExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
			<StackedBarChart
				groups={stackedChartGroups}
				normalized={state === 'normalized'}
				orientation={state === 'horizontal' ? 'horizontal' : 'vertical'}
				title="Run composition"
			/>
		</DataWideStage>
	)
}
