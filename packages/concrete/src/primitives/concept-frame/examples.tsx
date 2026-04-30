import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
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
	}
})

function renderConceptFrameExample(state = 'default') {
	return (
		<Frame>
			{conceptFrameKindValues.map(kind => (
				<ConceptFrame
					key={kind}
					kind={kind}
					muted={state === 'muted'}
					selected={state === 'selected' && kind === 'model-card'}
				/>
			))}
		</Frame>
	)
}
