import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DiagramEdgeMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const diagramEdgeMeta = {
	category: 'diagram',
	description: 'SVG edge anatomy for diagram canvas and flow graphs.',
	guidance:
		'Use DiagramEdge primitives for routed SVG paths, edge labels, selected states, tone classes, and marker vocabulary. Keep graph validation and route calculation in schemas and utilities.',
	name: 'Diagram Edge',
	pressure: ['product', 'educational'],
	props: [
		prop('path', 'string', 'Computed SVG path data.', undefined, true),
		prop('label', 'string', 'Optional edge label.'),
		prop('labelPoint', '{ x: number; y: number }', 'Computed edge label anchor.', undefined, true),
		prop('variant', 'Diagram edge variant', 'Stroke style or path role.', 'solid'),
		prop('tone', 'DiagramTone | DataTone', 'Edge color tone.', 'muted'),
		prop('selected', 'boolean', 'Selected edge state.', 'false')
	]
} as const satisfies DiagramEdgeMeta
