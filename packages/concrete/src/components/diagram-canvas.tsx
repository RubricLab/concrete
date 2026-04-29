import type { ReactNode } from 'react'
import { booleanControl, numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { type DiagramCanvasProps, diagramCanvasPropsSchema } from '../schemas'
import { DataWideStage, diagramCanvasGraph } from './data-fixtures'
import { DiagramCanvas } from './diagram-canvas-view'

export * from './diagram-canvas-view'

export const diagramCanvasComponentDefinition = defineConcreteComponent({
	category: 'diagram',
	component: DiagramCanvas,
	controls: [
		selectControl('fixture', 'Fixture', 'default', ['default', 'selected', 'interactive', 'compact']),
		textControl('title', 'Title', 'Request flow'),
		numberControl('width', 'Width', '820'),
		numberControl('height', 'Height', '360'),
		booleanControl('controls', 'Controls', 'true'),
		booleanControl('minimap', 'Minimap', 'false')
	],
	description:
		'Interactive explainer canvas with DOM nodes, supporting items, SVG edges, pan, zoom, fit, and minimap.',
	guidance:
		'Diagram canvas is the editorial counterpart to FlowDiagram. It explains ideas and relationships, not product graph persistence.',
	kind: 'component',
	name: 'Diagram canvas',
	pressure: ['educational', 'editorial', 'generative'],
	props: [
		prop('graph', 'DiagramCanvasGraph', 'Validated nodes, items, and routed edges.', undefined, true),
		prop('title', 'string', 'Diagram title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('selectedId', 'string', 'Highlights a node, item, or edge.'),
		prop('controls', 'boolean', 'Shows zoom and fit controls.', 'true'),
		prop('minimap', 'boolean', 'Shows a small node overview map.', 'false'),
		prop('pannable', 'boolean', 'Allows local pan interaction.', 'true'),
		prop('zoomable', 'boolean', 'Allows local zoom interaction.', 'true'),
		prop('height', 'number', 'Canvas stage height.', '360'),
		prop('width', 'number', 'Canvas design coordinate width.', '1000'),
		prop(
			'onSelectionChange',
			'(selectedId: string) => void',
			'Receives local node, item, or edge selection.'
		),
		prop('onViewportChange', '(viewport: DiagramViewport) => void', 'Receives pan and zoom changes.')
	],
	renderExample: renderDiagramCanvasExample,
	schema: diagramCanvasPropsSchema,
	slug: 'diagram-canvas',
	states: states([
		['default', 'Request-flow explainer with nodes, items, and labels.'],
		['selected', 'Selected node, item, and edge states.'],
		['interactive', 'Pan, zoom, fit controls, and minimap enabled.'],
		['compact', 'Smaller educational composition.']
	])
})

function renderDiagramCanvasExample(state = 'default'): ReactNode {
	const graph: DiagramCanvasProps['graph'] =
		state === 'compact'
			? {
					edges: diagramCanvasGraph.edges.slice(0, 2),
					items: [],
					nodes: diagramCanvasGraph.nodes.slice(0, 3)
				}
			: diagramCanvasGraph

	return (
		<DataWideStage>
			<DiagramCanvas
				controls={state !== 'compact'}
				description="Editorial explainer graph for request routing, context, model synthesis, and streamed output."
				graph={graph}
				height={state === 'compact' ? 260 : 360}
				minimap={state === 'interactive'}
				selectedId={
					state === 'selected' ? 'model' : state === 'interactive' ? 'edge-synthesize' : undefined
				}
				title="Request flow"
				width={state === 'compact' ? 720 : 820}
				zoomable={state !== 'compact'}
			/>
		</DataWideStage>
	)
}
