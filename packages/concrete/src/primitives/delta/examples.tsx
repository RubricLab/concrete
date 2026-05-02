import { defineExamples } from '../../factories/createExamples'
import { Delta } from './component'

export const deltaExamples = defineExamples({
	basis: {
		description: 'Deltas with comparison basis labels.',
		render: () => (
			<>
				<Delta basis="vs last week" intent="positive" value="+18.6%" />
				<Delta basis="over budget" hierarchy="wash" intent="negative" value="-2.4%" />
				<Delta basis="unchanged" value="0.0%" />
			</>
		)
	},
	default: {
		description: 'Positive, negative, and neutral deltas.',
		render: () => (
			<>
				<Delta intent="positive" value="+18.6%" />
				<Delta intent="negative" value="-2.4%" />
				<Delta value="0.0%" />
			</>
		)
	},
	density: {
		description: 'Delta density scale for metric lockups.',
		render: () => (
			<>
				<Delta density="compact" intent="positive" value="+4.2%" />
				<Delta density="comfortable" intent="positive" value="+9.8%" />
				<Delta density="editorial" intent="positive" value="+18.6%" />
				<Delta density="display" intent="positive" value="+24.1%" />
			</>
		)
	},
	wash: {
		description: 'Soft filled delta treatment.',
		render: () => (
			<>
				<Delta hierarchy="wash" intent="positive" value="+18.6%" />
				<Delta hierarchy="wash" intent="negative" value="-2.4%" />
				<Delta hierarchy="wash" value="0.0%" />
			</>
		)
	}
})
