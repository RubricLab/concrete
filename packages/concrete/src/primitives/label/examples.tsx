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
	tones: {
		description: 'Semantic label tones.',
		render: () => (
			<Cluster density="compact">
				<Label marker tone="sky">
					Search
				</Label>
				<Label marker tone="terminal">
					Valid
				</Label>
				<Label marker tone="ultra">
					AI
				</Label>
				<Label marker tone="error">
					Error
				</Label>
			</Cluster>
		)
	}
})
