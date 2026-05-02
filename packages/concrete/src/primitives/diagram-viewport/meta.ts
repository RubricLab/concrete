import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DiagramViewportMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const diagramViewportMeta = {
	category: 'diagram',
	description: 'Diagram canvas and flow viewport shell anatomy.',
	guidance:
		'Use DiagramViewport primitives for diagram shells, headers, pan surfaces, stages, element placement, footers, and compact SVG viewports. Keep selection, pan, zoom, and graph routing in the owning component.',
	name: 'Diagram Viewport',
	pressure: ['product', 'educational'],
	props: [
		prop('display', '"canvas" | "flow"', 'Diagram viewport presentation mode.'),
		prop('title', 'ReactNode', 'Canvas header title.', undefined, true),
		prop('description', 'ReactNode', 'Optional header status copy.'),
		prop('width', 'number | string', 'Stage or graph width token/value.'),
		prop('height', 'number | string', 'Stage or graph height token/value.'),
		prop('transform', 'string', 'Computed pan/zoom transform for the canvas stage.'),
		prop('children', 'ReactNode', 'Primitive-owned viewport or stage contents.')
	]
} as const satisfies DiagramViewportMeta
