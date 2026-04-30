import { defineExamples } from '../../factories/createExamples'
import { Cluster } from '../cluster'
import { Token } from './component'

export const tokenExamples = defineExamples({
	default: {
		description: 'Generic removable value token.',
		render: () => <Token removable>Workspace</Token>
	},
	group: {
		description: 'Mixed token set for filters, mentions, scopes, and attachments.',
		render: () => (
			<Cluster density="compact">
				<Token kind="scope" leadingIcon="folder" removable tone="sky">
					Research
				</Token>
				<Token kind="mention" leadingIcon="at-sign" tone="ultra">
					Arihan
				</Token>
				<Token kind="attachment" leadingIcon="paperclip" removable>
					brief.pdf
				</Token>
			</Cluster>
		)
	},
	signal: {
		description: 'High-signal token for generated agent scopes.',
		render: () => (
			<Token kind="value" leadingIcon="sparkles" tone="terminal">
				Agent runs
			</Token>
		)
	}
})
