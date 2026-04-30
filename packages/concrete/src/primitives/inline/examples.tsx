import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Button } from '../button'
import { Inline } from './component'

export const inlineExamples = defineExamples({
	baseline: {
		description: 'Baseline alignment for title and compact metadata.',
		render: () => (
			<Inline align="baseline">
				<strong>Latency</strong>
				<Badge signal="terminal">42ms</Badge>
			</Inline>
		)
	},
	between: {
		description: 'Title/action distribution.',
		render: () => (
			<Inline justify="between">
				<Badge signal="ultra">Draft</Badge>
				<Button size="small" variant="secondary">
					Review
				</Button>
			</Inline>
		)
	},
	default: {
		description: 'Non-wrapping inline group.',
		render: () => (
			<Inline>
				<Badge signal="terminal">Live</Badge>
				<Badge signal="ultra">Agent</Badge>
				<Badge signal="error">Needs review</Badge>
			</Inline>
		)
	}
})
