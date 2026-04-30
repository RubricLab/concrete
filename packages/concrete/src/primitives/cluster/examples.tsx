import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Button } from '../button'
import { Cluster } from './component'

export const clusterExamples = defineExamples({
	actions: {
		description: 'Wrapping action cluster.',
		render: () => (
			<Cluster>
				<Button size="small" variant="primary">
					Accept
				</Button>
				<Button size="small" variant="secondary">
					Comment
				</Button>
				<Button size="small" variant="ghost">
					Archive
				</Button>
			</Cluster>
		)
	},
	between: {
		description: 'Wrapped group with edge distribution.',
		render: () => (
			<Cluster justify="between">
				<Badge signal="terminal">Ready</Badge>
				<Badge signal="ultra">12 traces</Badge>
				<Badge signal="error">2 failed</Badge>
			</Cluster>
		)
	},
	default: {
		description: 'Wrapping token group.',
		render: () => (
			<Cluster density="compact">
				<Badge signal="terminal">Product</Badge>
				<Badge signal="terminal">Editorial</Badge>
				<Badge signal="ultra">Generative</Badge>
				<Badge signal="ultra">Educational</Badge>
			</Cluster>
		)
	}
})
