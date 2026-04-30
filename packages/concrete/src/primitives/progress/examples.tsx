import { defineExamples } from '../../factories/createExamples'
import { Progress, ProgressRing, SegmentedProgress } from './component'

export const progressExamples = defineExamples({
	default: {
		description: 'Linear progress.',
		render: () => (
			<>
				<Progress value={62} />
				<Progress size="thin" tone="sky" value={38} />
				<Progress size="thick" tone="terminal" value={82} />
			</>
		)
	},
	indeterminate: {
		description: 'Unknown-duration shuttle and lined states.',
		render: () => (
			<>
				<Progress indeterminate="shuttle" />
				<Progress indeterminate="shuttle" tone="sky" />
				<Progress indeterminate="lined" />
			</>
		)
	},
	ring: {
		description: 'Circular progress composition.',
		render: () => (
			<>
				<ProgressRing tone="sky" value={68} />
				<ProgressRing size={72} tone="terminal" value={42} />
				<ProgressRing size={72} value={81} />
			</>
		)
	},
	segmented: {
		description: 'Step-based completion.',
		render: () => (
			<>
				<SegmentedProgress segments={8} value={5} />
				<SegmentedProgress segments={12} value={2} />
			</>
		)
	},
	signals: {
		description: 'Signal tone variants.',
		render: () => (
			<>
				<Progress tone="sky" value={68} />
				<Progress tone="terminal" value={42} />
				<Progress tone="ultra" value={58} />
				<Progress tone="error" value={22} />
			</>
		)
	}
})
