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
	density: {
		description: 'Compact through editorial ring sizes.',
		render: () => (
			<>
				<ProgressRing density="compact" value={42} />
				<ProgressRing value={68} />
				<ProgressRing density="editorial" intent="sky" value={91} />
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
