import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame'
import { Badge } from './component'

export const badgeExamples = defineExamples({
	count: {
		description: 'Notification count treatment.',
		render: () => (
			<Frame>
				<Badge signal="terminal" variant="count">
					24
				</Badge>
				<Badge signal="error" variant="count">
					3
				</Badge>
				<Badge signal="ultra" variant="ghost">
					v2.4.1
				</Badge>
			</Frame>
		)
	},
	default: {
		description: 'Soft signal badges.',
		render: () => (
			<Frame>
				<Badge signal="terminal">Live</Badge>
				<Badge signal="ultra">Featured</Badge>
				<Badge signal="error">Blocked</Badge>
			</Frame>
		)
	},
	solid: {
		description: 'Reserved high-emphasis badges.',
		render: () => (
			<Frame>
				<Badge signal="terminal" variant="solid">
					Live
				</Badge>
				<Badge signal="ultra" variant="solid">
					Pro
				</Badge>
				<Badge signal="error" variant="solid">
					Delete
				</Badge>
			</Frame>
		)
	}
})
