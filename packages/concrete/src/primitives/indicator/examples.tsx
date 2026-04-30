import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Indicator } from './component'

export const indicatorExamples = defineExamples({
	default: {
		description: 'Status indicators.',
		render: () => (
			<Frame>
				<Indicator tone="terminal">Running</Indicator>
				<Indicator tone="sky">Queued</Indicator>
				<Indicator tone="error">Failed</Indicator>
			</Frame>
		)
	},
	muted: {
		description: 'Muted legend indicators.',
		render: () => (
			<Frame>
				<Indicator tone="terminal">Running</Indicator>
				<Indicator tone="sky">Queued</Indicator>
				<Indicator tone="error">Failed</Indicator>
				<Indicator tone="muted">Background</Indicator>
			</Frame>
		)
	}
})
