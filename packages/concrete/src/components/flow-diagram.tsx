import type { ReactNode } from 'react'
import { booleanControl, numberControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { flowDiagramPropsSchema } from '../schemas'
import { FlowDiagram } from './flow-diagram-view'

export * from './flow-diagram-view'

import { DataWideStage, flowDiagram } from './data-fixtures'

export const flowDiagramComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: FlowDiagram,
	controls: [
		selectControl('fixture', 'Fixture', 'default', ['default', 'selected', 'interactive', 'empty']),
		textControl('title', 'Title', 'Agent execution flow'),
		numberControl('width', 'Width', '1020'),
		numberControl('height', 'Height', '320'),
		booleanControl('controls', 'Controls', 'false')
	],
	description:
		'Routed node and edge diagram for agent plans, systems, memory flows, and tool pipelines.',
	guidance:
		'Flow diagram is a deterministic SVG map for explainers and product inspectors. It exposes selection and local node movement without owning graph persistence.',
	kind: 'component',
	name: 'Flow diagram',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('flow', 'FlowDiagramFlow', 'Validated node and edge graph.', undefined, true),
		prop('title', 'string', 'Diagram title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('selectedNodeId', 'string', 'Highlights one node.'),
		prop('selectedEdgeId', 'string', 'Highlights one routed edge.'),
		prop('controls', 'boolean', 'Shows zoom controls.', 'false'),
		prop('draggableNodes', 'boolean', 'Allows local node dragging.', 'false'),
		prop('pannable', 'boolean', 'Reserved for product-level pan orchestration.', 'false'),
		prop('zoomable', 'boolean', 'Reserved for product-level zoom orchestration.', 'false'),
		prop('legend', 'readonly DataLegendItem[]', 'Optional legend indicators.', '[]'),
		prop('width', 'number', 'SVG viewBox width.', '760'),
		prop('height', 'number', 'SVG viewBox height.', '320'),
		prop('onNodeSelect', '(nodeId: string) => void', 'Node click callback.'),
		prop('onNodeMove', '(nodeId: string, position: Point) => void', 'Drag position callback.'),
		prop('onViewportChange', '(viewport: DiagramViewport) => void', 'Receives pan and zoom changes.')
	],
	renderExample: renderFlowDiagramExample,
	schema: flowDiagramPropsSchema,
	slug: 'flow-diagram',
	states: states([
		['default', 'Routed node graph with muted edges.'],
		['selected', 'Selected node and edge states.'],
		['interactive', 'Controls and draggable nodes enabled.'],
		['empty', 'Empty graph state.']
	])
})

function renderFlowDiagramExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
			<FlowDiagram
				controls={state === 'interactive'}
				description="A compact map of context, planning, tool execution, and final synthesis."
				draggableNodes={state === 'interactive'}
				flow={state === 'empty' ? { edges: [], nodes: [] } : flowDiagram}
				legend={[
					{ label: 'context', tone: 'sky' },
					{ label: 'tool path', tone: 'terminal' },
					{ label: 'selected', tone: 'ultra' }
				]}
				selectedEdgeId={state === 'selected' ? 'edge-tools' : undefined}
				selectedNodeId={state === 'selected' ? 'plan' : undefined}
				title="Agent execution flow"
				width={1020}
			/>
		</DataWideStage>
	)
}
