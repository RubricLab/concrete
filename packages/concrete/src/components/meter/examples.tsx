import { defineExamples } from '../../factories/createExamples'
import { DataGridStage } from '../../utilities/data-fixtures'
import { Meter } from './component'

export const meterExamples = defineExamples({
	bar: {
		description: 'Linear progress summary with target copy.',
		render: () => (
			<DataGridStage>
				<Meter
					description="Workspace command budget"
					label="Usage"
					target={80}
					tone="sky"
					value={{ max: 100, min: 0, value: 72 }}
				/>
				<Meter
					description="Policy confidence"
					label="Review"
					tone="ultra"
					value={{ max: 100, min: 0, value: 58 }}
					variant="ring"
				/>
			</DataGridStage>
		)
	},
	ring: {
		description: 'Circular progress summary for compact scorecards.',
		render: () => (
			<DataGridStage>
				<Meter
					description="Workspace command budget"
					label="Usage"
					target={80}
					tone="sky"
					value={{ max: 100, min: 0, value: 72 }}
					variant="ring"
				/>
				<Meter
					description="Policy confidence"
					label="Review"
					tone="ultra"
					value={{ max: 100, min: 0, value: 58 }}
					variant="ring"
				/>
			</DataGridStage>
		)
	},
	signal: {
		description: 'Terminal, ultra, and error signal meters.',
		render: () => (
			<DataGridStage>
				<Meter
					description="Workspace command budget"
					label="Usage"
					target={80}
					tone="terminal"
					value={{ max: 100, min: 0, value: 72 }}
				/>
				<Meter
					description="Policy confidence"
					label="Review"
					tone="error"
					value={{ max: 100, min: 0, value: 34 }}
					variant="ring"
				/>
			</DataGridStage>
		)
	}
})
