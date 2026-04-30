import { defineExamples } from '../../factories/createExamples'
import { Frame } from '../frame/component'
import { DiagramItem } from './component'

const diagramItemTones = ['sky', 'ink', 'terminal', 'ultra'] as const

export const diagramItemExamples = defineExamples({
	default: {
		description: 'Supporting evidence item atlas.',
		render: () => renderDiagramItemExample()
	},
	selected: {
		description: 'Selected item state.',
		render: () => renderDiagramItemExample('selected')
	},
	tones: {
		description: 'Metric, code, status, and note tones.',
		render: () => renderDiagramItemExample('tones')
	}
})

function renderDiagramItemExample(state = 'default') {
	const items = [
		['metric', 'Trace', '184ms', 'p95'],
		['code', 'Hydrate', undefined, 'ts'],
		['status', 'Ready', undefined, 'live'],
		['note', 'Constraint', undefined, 'policy']
	] as const

	return (
		<Frame>
			<div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
				{items.map(([kind, title, value, meta], index) => (
					<DiagramItem
						key={kind}
						kind={kind}
						meta={meta}
						selected={state === 'selected' && index === 0}
						title={title}
						tone={state === 'tones' ? (diagramItemTones[index] ?? 'ink') : 'ink'}
						{...(value ? { value } : {})}
					/>
				))}
			</div>
		</Frame>
	)
}
