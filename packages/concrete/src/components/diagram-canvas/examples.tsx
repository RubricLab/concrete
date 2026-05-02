import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import type { DiagramCanvasProps } from '../../schemas'
import { diagramCanvasGraph } from '../../utilities/data-fixtures'
import { DiagramCanvas } from './component'

const compactDiagramCanvasGraph = {
	edges: [
		{
			from: 'input',
			fromAnchor: 'bottom',
			id: 'edge-decide',
			label: 'decide',
			relation: 'control',
			to: 'router',
			toAnchor: 'top'
		},
		{
			from: 'router',
			fromAnchor: 'bottom',
			id: 'edge-synthesize',
			intent: 'ultra',
			label: 'synthesize',
			relation: 'control',
			to: 'model',
			toAnchor: 'top'
		},
		{
			from: 'model',
			fromAnchor: 'bottom',
			id: 'edge-stream',
			intent: 'terminal',
			label: 'stream',
			relation: 'control',
			to: 'stream',
			toAnchor: 'top'
		}
	],
	items: [],
	nodes: [
		{
			id: 'input',
			meta: 'HTTPS / JSON',
			role: 'external',
			title: 'User input',
			width: 148,
			x: 50,
			y: 20
		},
		{
			id: 'router',
			meta: 'intent / policy',
			role: 'decision',
			title: 'Router',
			width: 148,
			x: 50,
			y: 43
		},
		{
			id: 'model',
			meta: 'model / tools',
			role: 'compute',
			title: 'Model',
			width: 148,
			x: 50,
			y: 66
		},
		{
			id: 'stream',
			meta: 'SSE',
			role: 'process',
			title: 'Stream',
			width: 126,
			x: 50,
			y: 86
		}
	]
} satisfies DiagramCanvasProps['graph']

export const diagramCanvasExamples = defineExamples({
	compact: {
		description: 'Smaller educational composition.',
		render: () => renderDiagramCanvasExample('compact')
	},
	default: {
		description: 'Request-flow explainer with nodes and labels.',
		render: () => renderDiagramCanvasExample('default')
	},
	interactive: {
		description: 'Pan, zoom, and reset controls enabled.',
		render: () => renderDiagramCanvasExample('interactive')
	},
	selected: {
		description: 'Selected node and edge states.',
		render: () => renderDiagramCanvasExample('selected')
	},
	wide: {
		description: 'Full-width canvas for desktop explainers.',
		render: () => renderDiagramCanvasExample('wide')
	}
})

function renderDiagramCanvasExample(state = 'default'): ReactNode {
	const graph = getDiagramCanvasExampleGraph(state)
	const isWide = state === 'wide'
	const width = isWide ? 820 : 300
	const height = isWide ? 360 : 270

	return (
		<DiagramCanvas
			controls={state === 'interactive'}
			description="Editorial explainer graph for request routing, context, model synthesis, and streamed output."
			graph={graph}
			height={height}
			minimap={isWide}
			pannable={state === 'interactive'}
			selectedId={state === 'interactive' ? 'edge-synthesize' : undefined}
			title="Request flow"
			width={width}
			zoomable={state === 'interactive'}
		/>
	)
}

function getDiagramCanvasExampleGraph(state: string): DiagramCanvasProps['graph'] {
	switch (state) {
		case 'selected':
			return {
				edges: compactDiagramCanvasGraph.edges.map(edge =>
					edge.id === 'edge-synthesize' ? { ...edge, selected: true } : edge
				),
				items: [],
				nodes: compactDiagramCanvasGraph.nodes.map(node =>
					node.id === 'model' ? { ...node, selected: true } : node
				)
			}
		case 'wide':
			return diagramCanvasGraph
		default:
			return compactDiagramCanvasGraph
	}
}
