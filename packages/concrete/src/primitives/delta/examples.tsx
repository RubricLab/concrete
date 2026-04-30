import { defineExamples } from '../../factories/createExamples'
import { Delta } from './component'

export const deltaExamples = defineExamples({
	basis: {
		description: 'Deltas with comparison basis labels.',
		render: () => (
			<>
				<Delta basis="vs last week" intent="positive" value="+18.6%" />
				<Delta basis="over budget" intent="negative" value="-2.4%" variant="wash" />
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
	sizes: {
		description: 'Delta size scale for metric lockups.',
		render: () => (
			<>
				<Delta intent="positive" size="small" value="+4.2%" />
				<Delta intent="positive" size="medium" value="+9.8%" />
				<Delta intent="positive" size="large" value="+18.6%" />
				<Delta intent="positive" size="xlarge" value="+24.1%" />
			</>
		)
	},
	wash: {
		description: 'Soft filled delta treatment.',
		render: () => (
			<>
				<Delta intent="positive" value="+18.6%" variant="wash" />
				<Delta intent="negative" value="-2.4%" variant="wash" />
				<Delta value="0.0%" variant="wash" />
			</>
		)
	}
})
