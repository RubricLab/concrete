import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { DiagramNode } from './component'

export const diagramNodeExamples = defineExamples({
	default: {
		description: 'Node role atlas.',
		render: () => renderDiagramNodeExample()
	},
	muted: {
		description: 'Subdued background node state.',
		render: () => renderDiagramNodeExample('muted')
	},
	selected: {
		description: 'Selected node state.',
		render: () => renderDiagramNodeExample('selected')
	}
})

function renderDiagramNodeExample(state = 'default') {
	const nodes = [
		['external', 'User input', 'HTTPS'],
		['decision', 'Router', 'intent'],
		['data', 'Context', 'memory'],
		['compute', 'Model', 'reasoning'],
		['process', 'Stream', 'SSE'],
		['error', 'Reject', 'policy']
	] as const

	return (
		<Frame>
			<div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
				{nodes.map(([role, title, meta]) => (
					<DiagramNode
						key={role}
						meta={meta}
						muted={state === 'muted' && role !== 'compute'}
						role={role}
						selected={state === 'selected' && role === 'compute'}
						title={title}
					/>
				))}
			</div>
		</Frame>
	)
}
