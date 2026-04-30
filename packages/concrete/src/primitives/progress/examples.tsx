import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { Progress, ProgressRing, SegmentedProgress } from './component'

export const progressExamples = defineExamples({
	default: {
		description: 'Linear progress.',
		render: () => (
			<Frame>
				<Progress value={62} />
				<Progress size="thin" tone="sky" value={38} />
				<Progress size="thick" tone="terminal" value={82} />
			</Frame>
		)
	},
	indeterminate: {
		description: 'Unknown-duration shuttle and lined states.',
		render: () => (
			<Frame>
				<Progress indeterminate="shuttle" />
				<Progress indeterminate="shuttle" tone="sky" />
				<Progress indeterminate="lined" />
			</Frame>
		)
	},
	ring: {
		description: 'Circular progress composition.',
		render: () => (
			<Frame>
				<ProgressRing tone="sky" value={68} />
				<ProgressRing size={72} tone="terminal" value={42} />
				<ProgressRing size={72} value={81} />
			</Frame>
		)
	},
	segmented: {
		description: 'Step-based completion.',
		render: () => (
			<Frame>
				<SegmentedProgress segments={8} value={5} />
				<SegmentedProgress segments={12} value={2} />
			</Frame>
		)
	},
	signals: {
		description: 'Signal tone variants.',
		render: () => (
			<Frame>
				<Progress tone="sky" value={68} />
				<Progress tone="terminal" value={42} />
				<Progress tone="ultra" value={58} />
				<Progress tone="error" value={22} />
			</Frame>
		)
	}
})
