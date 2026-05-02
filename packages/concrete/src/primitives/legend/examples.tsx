import { defineExamples } from '../../factories/createExamples'
import { Legend, LegendItem } from './component'

export const legendExamples = defineExamples({
	default: {
		description: 'Indicator legend with values.',
		render: () => (
			<Legend>
				<LegendItem intent="terminal" label="Accepted" value="64" />
				<LegendItem intent="sky" label="Review" value="18" />
				<LegendItem intent="danger" label="Blocked" value="4" />
			</Legend>
		)
	},
	plain: {
		description: 'Legend without values for diagram keys.',
		render: () => (
			<Legend>
				<LegendItem intent="sky" label="Input" />
				<LegendItem intent="ultra" label="Compute" />
				<LegendItem intent="terminal" label="Output" />
			</Legend>
		)
	}
})
