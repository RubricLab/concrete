import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { Delta } from './component'

export const deltaExamples = defineExamples({
	default: {
		description: 'Positive, negative, and neutral deltas.',
		render: () => (
			<Frame>
				<Delta intent="positive" value="18.6%" />
				<Delta intent="negative" value="-2.4%" />
				<Delta value="0.0%" />
			</Frame>
		)
	},
	wash: {
		description: 'Soft filled delta treatment.',
		render: () => (
			<Frame>
				<Delta intent="positive" value="18.6%" variant="wash" />
				<Delta intent="negative" value="-2.4%" variant="wash" />
				<Delta value="0.0%" />
			</Frame>
		)
	}
})
