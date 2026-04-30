import { defineExamples } from '../../factories/createExamples'
import { Legend, LegendItem } from './component'

export const legendExamples = defineExamples({
	default: {
		description: 'Indicator legend with values.',
		render: () => (
			<Legend>
				<LegendItem label="Accepted" tone="terminal" value="64" />
				<LegendItem label="Review" tone="sky" value="18" />
				<LegendItem label="Blocked" tone="error" value="4" />
			</Legend>
		)
	},
	plain: {
		description: 'Legend without values for diagram keys.',
		render: () => (
			<Legend>
				<LegendItem label="Input" tone="sky" />
				<LegendItem label="Compute" tone="ultra" />
				<LegendItem label="Output" tone="terminal" />
			</Legend>
		)
	}
})
