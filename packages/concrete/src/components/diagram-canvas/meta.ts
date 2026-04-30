import { prop } from '../../registry/props'

export const diagramCanvasMeta = {
	category: 'diagram',
	description:
		'Interactive explainer canvas with DOM nodes, supporting items, SVG edges, pan, zoom, fit, and minimap.',
	guidance:
		'Diagram canvas is the editorial counterpart to FlowDiagram. It explains ideas and relationships, not product graph persistence.',
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
	]
} as const
