import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DiagramMiniMapMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const diagramMiniMapMeta = {
	category: 'diagram',
	description: 'Compact minimap overlay for diagram canvas nodes.',
	guidance:
		'Use DiagramMiniMap as a passive viewport orientation aid. It owns the minimap chrome and node marks; components own viewport math and selected node resolution.',
	name: 'Diagram MiniMap',
	pressure: ['product'],
	props: [
		prop('nodes', 'readonly DiagramMiniMapNode[]', 'Minimap node marks.', undefined, true),
		prop('selectedId', 'string', 'Optional selected node id.')
	]
} as const satisfies DiagramMiniMapMeta
