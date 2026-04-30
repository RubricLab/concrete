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

const connectorTones = ['ink', 'sky', 'terminal', 'ultra', 'error'] as const

export const conceptConnectorExamples = defineExamples({
	default: {
		description: 'Connector atlas for flow, relation, and callouts.',
		render: () => renderConceptConnectorExample()
	},
	selected: {
		description: 'Highlighted relation.',
		render: () => renderConceptConnectorExample('selected')
	},
	tones: {
		description: 'Concrete-native connector tones.',
		render: () => renderConceptConnectorExample('tones')
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
					tone={state === 'tones' ? (connectorTones[index % connectorTones.length] ?? 'ink') : 'muted'}
				/>
			))}
		</>
	)
}
