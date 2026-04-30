import { prop } from '../../registry/props'

export const flowDiagramMeta = {
	category: 'data',
	description:
		'Routed node and edge diagram for agent plans, systems, memory flows, and tool pipelines.',
	guidance:
		'Flow diagram is a deterministic SVG map for explainers and product inspectors. It exposes selection and local node movement without owning graph persistence.',
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
	]
} as const
