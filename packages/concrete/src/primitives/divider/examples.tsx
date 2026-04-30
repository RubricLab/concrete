import { defineExamples } from '../../factories/createExamples'
import { Divider } from './component'

export const dividerExamples = defineExamples({
	default: {
		description: 'Unlabeled rule.',
		render: () => (
			<>
				<Divider />
			</>
		)
	},
	label: {
		description: 'Labeled section separator.',
		render: () => (
			<>
				<Divider label="Signals" />
			</>
		)
	}
})
