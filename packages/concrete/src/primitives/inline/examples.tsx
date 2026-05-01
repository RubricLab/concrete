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
				<Badge intent="terminal">42ms</Badge>
			</Inline>
		)
	},
	between: {
		description: 'Title/action distribution.',
		render: () => (
			<Inline justify="between">
				<Badge intent="ultra">Draft</Badge>
				<Button density="small" hierarchy="secondary">
					Review
				</Button>
			</Inline>
		)
	},
	default: {
		description: 'Non-wrapping inline group.',
		render: () => (
			<Inline>
				<Badge intent="terminal">Live</Badge>
				<Badge intent="ultra">Agent</Badge>
				<Badge intent="danger">Needs review</Badge>
			</Inline>
		)
	}
})
