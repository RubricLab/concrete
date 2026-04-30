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
						{ label: 'Review queue', tone: 'sky', value: 28 },
						{ label: 'Autonomous handoff', tone: 'terminal', value: 18 }
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
						{ label: 'Accepted', tone: 'terminal', value: 64 },
						{ label: 'Needs review', tone: 'sky', value: 22 },
						{ label: 'Escalated', tone: 'ultra', value: 9 },
						{ label: 'Blocked', tone: 'error', value: 5 }
					]}
				/>
			</>
		)
	}
})
