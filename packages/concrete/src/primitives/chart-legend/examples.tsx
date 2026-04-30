import { defineExamples } from '../../factories/createExamples'
import { ChartLegend, ChartLegendItem } from './component'

export const chartLegendExamples = defineExamples({
	default: {
		description: 'Indicator legend with values.',
		render: () => (
			<>
				<ChartLegend>
					<ChartLegendItem label="Accepted" tone="terminal" value="64" />
					<ChartLegendItem label="Review" tone="sky" value="18" />
					<ChartLegendItem label="Blocked" tone="error" value="4" />
				</ChartLegend>
			</>
		)
	},
	plain: {
		description: 'Legend without values for diagram keys.',
		render: () => (
			<>
				<ChartLegend>
					<ChartLegendItem label="Input" tone="sky" />
					<ChartLegendItem label="Compute" tone="ultra" />
					<ChartLegendItem label="Output" tone="terminal" />
				</ChartLegend>
			</>
		)
	}
})
