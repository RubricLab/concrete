import { defineExamples } from '../../factories/createExamples'
import { ConceptFrame } from './component'

const conceptFrameKindValues = [
	'browser-window',
	'model-card',
	'database-panel',
	'code-editor',
	'chart-frame',
	'assistant-response',
	'workflow-canvas',
	'mobile-screen'
] as const

export const conceptFrameExamples = defineExamples({
	default: {
		description: 'Frame atlas with generic symbolic content.',
		render: () => renderConceptFrameExample()
	},
	muted: {
		description: 'Background context state.',
		render: () => renderConceptFrameExample('muted')
	},
	selected: {
		description: 'Focused frame state.',
		render: () => renderConceptFrameExample('selected')
	},
	sizes: {
		description: 'Concept frame scale scale for explainers.',
		render: () => (
			<>
				<ConceptFrame kind="browser-window" scale="small" />
				<ConceptFrame kind="workflow-canvas" scale="medium" selected />
				<ConceptFrame kind="assistant-response" scale="large" />
			</>
		)
	}
})

function renderConceptFrameExample(state = 'default') {
	return (
		<>
			{conceptFrameKindValues.map(kind => (
				<ConceptFrame
					key={kind}
					kind={kind}
					muted={state === 'muted'}
					selected={state === 'selected' && kind === 'model-card'}
				/>
			))}
		</>
	)
}
