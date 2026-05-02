import { defineExamples } from '../../factories/createExamples'
import { ConceptConnector } from './component'

const conceptConnectorKindValues = [
	'straight',
	'elbow',
	'curved',
	'dashed-relation',
	'bidirectional',
	'branch',
	'feedback-loop',
	'annotation-leader'
] as const

const connectorIntents = ['ink', 'sky', 'terminal', 'ultra', 'error'] as const

export const conceptConnectorExamples = defineExamples({
	default: {
		description: 'Connector atlas for flow, relation, and callouts.',
		render: () => renderConceptConnectorExample()
	},
	intents: {
		description: 'Concrete-native connector intents.',
		render: () => renderConceptConnectorExample('intents')
	},
	selected: {
		description: 'Highlighted relation.',
		render: () => renderConceptConnectorExample('selected')
	}
})

function renderConceptConnectorExample(state = 'default') {
	return (
		<>
			{conceptConnectorKindValues.map((kind, index) => (
				<ConceptConnector
					key={kind}
					kind={kind}
					selected={state === 'selected' && index === 1}
					intent={
						state === 'intents' ? (connectorIntents[index % connectorIntents.length] ?? 'ink') : 'muted'
					}
				/>
			))}
		</>
	)
}
