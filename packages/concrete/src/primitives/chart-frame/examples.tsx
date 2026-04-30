import { defineExamples } from '../../factories/createExamples'
import { ChartFrame, ChartMessage } from './component'

export const chartFrameExamples = defineExamples({
	default: {
		description: 'Raised chart frame for generated chart output.',
		render: () => <ChartFrame />
	},
	message: {
		description: 'State message inside a chart frame.',
		render: () => (
			<ChartFrame surface="sunken">
				<ChartMessage>Loading data</ChartMessage>
			</ChartFrame>
		)
	}
})
