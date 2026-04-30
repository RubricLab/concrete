import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import type { DiagramCanvasProps } from '../../schemas'
import { diagramCanvasGraph } from '../../utilities/data-fixtures'
import { DiagramCanvas } from './component'

export const diagramCanvasExamples = defineExamples({
	compact: {
		description: 'Smaller educational composition.',
		render: () => renderDiagramCanvasExample('compact')
	},
	default: {
		description: 'Request-flow explainer with nodes, items, and labels.',
		render: () => renderDiagramCanvasExample('default')
	},
	interactive: {
		description: 'Pan, zoom, fit controls, and minimap enabled.',
		render: () => renderDiagramCanvasExample('interactive')
	},
	selected: {
		description: 'Selected node, item, and edge states.',
		render: () => renderDiagramCanvasExample('selected')
	}
})

function renderDiagramCanvasExample(state = 'default'): ReactNode {
	const graph = getDiagramCanvasExampleGraph(state)

	return (
		<DiagramCanvas
			controls={state !== 'compact'}
			description="Editorial explainer graph for request routing, context, model synthesis, and streamed output."
			graph={graph}
			height={state === 'compact' ? 260 : 360}
			minimap={state === 'interactive'}
			selectedId={state === 'interactive' ? 'edge-synthesize' : undefined}
			title="Request flow"
			width={state === 'compact' ? 720 : 820}
			zoomable={state !== 'compact'}
		/>
	)
}

function getDiagramCanvasExampleGraph(state: string): DiagramCanvasProps['graph'] {
	switch (state) {
		case 'compact':
			return {
				edges: diagramCanvasGraph.edges.slice(0, 2),
				items: [],
				nodes: diagramCanvasGraph.nodes.slice(0, 3)
			}
		case 'selected':
			return {
				edges: diagramCanvasGraph.edges.map(edge =>
					edge.id === 'edge-synthesize' ? { ...edge, selected: true } : edge
				),
				items: diagramCanvasGraph.items.map(item =>
					item.id === 'trace' ? { ...item, selected: true } : item
				),
				nodes: diagramCanvasGraph.nodes.map(node =>
					node.id === 'model' ? { ...node, selected: true } : node
				)
			}
		default:
			return diagramCanvasGraph
	}
}
