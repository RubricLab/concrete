import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Divider } from './component'

export const dividerExamples = defineExamples({
	default: {
		description: 'Unlabeled rule.',
		render: () => (
			<Frame>
				<Divider />
			</Frame>
		)
	},
	label: {
		description: 'Labeled section separator.',
		render: () => (
			<Frame>
				<Divider label="Signals" />
			</Frame>
		)
	}
})
