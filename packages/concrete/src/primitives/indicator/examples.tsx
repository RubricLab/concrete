import { defineExamples } from '../../factories/createExamples'
import { Indicator } from './component'

export const indicatorExamples = defineExamples({
	default: {
		description: 'Status indicators.',
		render: () => (
			<>
				<Indicator tone="terminal">Running</Indicator>
				<Indicator tone="sky">Queued</Indicator>
				<Indicator tone="error">Failed</Indicator>
			</>
		)
	},
	muted: {
		description: 'Muted legend indicators.',
		render: () => (
			<>
				<Indicator tone="terminal">Running</Indicator>
				<Indicator tone="sky">Queued</Indicator>
				<Indicator tone="error">Failed</Indicator>
				<Indicator tone="muted">Background</Indicator>
			</>
		)
	}
})
