import { defineExamples } from '../../factories/createExamples'
import { Indicator } from './component'

export const indicatorExamples = defineExamples({
	default: {
		description: 'Status indicators.',
		render: () => (
			<>
				<Indicator intent="terminal">Running</Indicator>
				<Indicator intent="sky">Queued</Indicator>
				<Indicator intent="danger">Failed</Indicator>
			</>
		)
	},
	muted: {
		description: 'Muted legend indicators.',
		render: () => (
			<>
				<Indicator intent="terminal">Running</Indicator>
				<Indicator intent="sky">Queued</Indicator>
				<Indicator intent="danger">Failed</Indicator>
				<Indicator intent="muted">Background</Indicator>
			</>
		)
	}
})
