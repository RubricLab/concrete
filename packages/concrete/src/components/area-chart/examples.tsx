import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { chartSeries, DataWideStage } from '../../utilities/data-fixtures'
import { AreaChart } from './component'

export const areaChartExamples = defineExamples({
	default: {
		description: 'Soft area chart with endpoint labels.',
		render: () => renderAreaChartExample('default')
	},
	dots: {
		description: 'Inspection state with point markers.',
		render: () => renderAreaChartExample('dots')
	},
	quiet: {
		description: 'Transparent surface and hidden axes for compact generated UI.',
		render: () => renderAreaChartExample('quiet')
	}
})

function renderAreaChartExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
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
		</DataWideStage>
	)
}
