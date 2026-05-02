import { defineExamples } from '../../factories/createExamples'
import { Distribution } from './component'

export const distributionExamples = defineExamples({
	default: {
		description: 'Labeled part-to-whole allocation bars.',
		render: () => (
			<>
				<Distribution
					data={[
						{ label: 'Direct routing', value: 47 },
						{ intent: 'sky', label: 'Review queue', value: 28 },
						{ intent: 'terminal', label: 'Autonomous handoff', value: 18 }
					]}
				/>
			</>
		)
	},
	signals: {
		description: 'Distribution rows using the full progress tone vocabulary.',
		render: () => (
			<>
				<Distribution
					data={[
						{ intent: 'terminal', label: 'Accepted', value: 64 },
						{ intent: 'sky', label: 'Needs review', value: 22 },
						{ intent: 'ultra', label: 'Escalated', value: 9 },
						{ intent: 'danger', label: 'Blocked', value: 5 }
					]}
				/>
			</>
		)
	}
})
