import { defineExamples } from '../../factories/createExamples'
import { Badge } from './component'

export const badgeExamples = defineExamples({
	count: {
		description: 'Notification count treatment.',
		render: () => (
			<>
				<Badge intent="terminal" purpose="count">
					24
				</Badge>
				<Badge intent="danger" purpose="count">
					3
				</Badge>
				<Badge hierarchy="ghost" intent="ultra">
					v2.4.1
				</Badge>
			</>
		)
	},
	default: {
		description: 'Soft signal badges.',
		render: () => (
			<>
				<Badge intent="terminal">Live</Badge>
				<Badge intent="ultra">Featured</Badge>
				<Badge intent="danger">Blocked</Badge>
			</>
		)
	},
	solid: {
		description: 'Reserved high-emphasis badges.',
		render: () => (
			<>
				<Badge hierarchy="solid" intent="terminal">
					Live
				</Badge>
				<Badge hierarchy="solid" intent="ultra">
					Pro
				</Badge>
				<Badge hierarchy="solid" intent="danger">
					Delete
				</Badge>
			</>
		)
	}
})
