import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Button } from '../button'
import { Cluster } from './component'

export const clusterExamples = defineExamples({
	actions: {
		description: 'Wrapping action cluster.',
		render: () => (
			<Cluster>
				<Button density="small" hierarchy="primary">
					Accept
				</Button>
				<Button density="small" hierarchy="secondary">
					Comment
				</Button>
				<Button density="small" hierarchy="ghost">
					Archive
				</Button>
			</Cluster>
		)
	},
	between: {
		description: 'Wrapped group with edge distribution.',
		render: () => (
			<Cluster justify="between">
				<Badge intent="terminal">Ready</Badge>
				<Badge intent="ultra">12 traces</Badge>
				<Badge intent="danger">2 failed</Badge>
			</Cluster>
		)
	},
	default: {
		description: 'Wrapping token group.',
		render: () => (
			<Cluster density="compact">
				<Badge intent="terminal">Product</Badge>
				<Badge intent="terminal">Editorial</Badge>
				<Badge intent="ultra">Generative</Badge>
				<Badge intent="ultra">Educational</Badge>
			</Cluster>
		)
	}
})
