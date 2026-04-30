import { defineExamples } from '../../factories/createExamples'
import { Badge } from './component'

export const badgeExamples = defineExamples({
	count: {
		description: 'Notification count treatment.',
		render: () => (
			<>
				<Badge signal="terminal" variant="count">
					24
				</Badge>
				<Badge signal="error" variant="count">
					3
				</Badge>
				<Badge signal="ultra" variant="ghost">
					v2.4.1
				</Badge>
			</>
		)
	},
	default: {
		description: 'Soft signal badges.',
		render: () => (
			<>
				<Badge signal="terminal">Live</Badge>
				<Badge signal="ultra">Featured</Badge>
				<Badge signal="error">Blocked</Badge>
			</>
		)
	},
	solid: {
		description: 'Reserved high-emphasis badges.',
		render: () => (
			<>
				<Badge signal="terminal" variant="solid">
					Live
				</Badge>
				<Badge signal="ultra" variant="solid">
					Pro
				</Badge>
				<Badge signal="error" variant="solid">
					Delete
				</Badge>
			</>
		)
	}
})
