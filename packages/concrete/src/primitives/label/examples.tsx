import { defineExamples } from '../../factories/createExamples'
import { Cluster } from '../cluster'
import { Label } from './component'

export const labelExamples = defineExamples({
	default: {
		description: 'Compact passive label.',
		render: () => <Label marker>Ready</Label>
	},
	field: {
		description: 'Field label text role.',
		render: () => <Label purpose="field">Workspace name</Label>
	},
	intents: {
		description: 'Semantic label intents.',
		render: () => (
			<Cluster density="compact">
				<Label intent="sky" marker>
					Search
				</Label>
				<Label intent="terminal" marker>
					Valid
				</Label>
				<Label intent="ultra" marker>
					AI
				</Label>
				<Label intent="danger" marker>
					Error
				</Label>
			</Cluster>
		)
	}
})
