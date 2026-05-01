import { defineExamples } from '../../factories/createExamples'
import { ProgressRing } from './component'

export const progressRingExamples = defineExamples({
	default: {
		description: 'Circular completion summary.',
		render: () => (
			<>
				<ProgressRing intent="sky" value={68} />
				<ProgressRing density="compact" intent="terminal" value={42} />
				<ProgressRing density="compact" value={81} />
			</>
		)
	},
	signals: {
		description: 'Circular signal intents.',
		render: () => (
			<>
				<ProgressRing intent="sky" value={68} />
				<ProgressRing intent="terminal" value={42} />
				<ProgressRing intent="ultra" value={58} />
				<ProgressRing intent="danger" value={22} />
			</>
		)
	}
})
