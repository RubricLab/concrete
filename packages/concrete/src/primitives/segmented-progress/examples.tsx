import { defineExamples } from '../../factories/createExamples'
import { SegmentedProgress } from './component'

export const segmentedProgressExamples = defineExamples({
	complete: {
		description: 'Complete segmented state.',
		render: () => <SegmentedProgress segments={8} value={8} />
	},
	default: {
		description: 'Step-based completion at partial and early progress.',
		render: () => (
			<>
				<SegmentedProgress segments={8} value={5} />
				<SegmentedProgress segments={12} value={2} />
			</>
		)
	},
	empty: {
		description: 'Empty segmented state.',
		render: () => <SegmentedProgress segments={8} value={0} />
	}
})
