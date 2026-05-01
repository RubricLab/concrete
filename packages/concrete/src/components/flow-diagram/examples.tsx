import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { flowDiagram } from '../../utilities/data-fixtures'
import { FlowDiagram } from './component'

export const flowDiagramExamples = defineExamples({
	default: {
		description: 'Routed node graph with muted edges.',
		render: () => renderFlowDiagramExample('default')
	},
	empty: {
		description: 'Empty graph state.',
		render: () => renderFlowDiagramExample('empty')
	},
	interactive: {
		description: 'Controls and draggable nodes enabled.',
		render: () => renderFlowDiagramExample('interactive')
	},
	selected: {
		description: 'Selected node and edge states.',
		render: () => renderFlowDiagramExample('selected')
	}
})

function renderFlowDiagramExample(state = 'default'): ReactNode {
	return (
		<FlowDiagram
			controls={state === 'interactive'}
			description="A compact map of context, planning, tool execution, and final synthesis."
			draggableNodes={state === 'interactive'}
			flow={state === 'empty' ? { edges: [], nodes: [] } : flowDiagram}
			legend={[
				{ intent: 'sky', label: 'context' },
				{ intent: 'terminal', label: 'tool path' },
				{ intent: 'ultra', label: 'selected' }
			]}
			selectedEdgeId={state === 'selected' ? 'edge-tools' : undefined}
			selectedNodeId={state === 'selected' ? 'plan' : undefined}
			title="Agent execution flow"
			width={1020}
		/>
	)
}
