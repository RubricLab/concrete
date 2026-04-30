import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DiagramNodeMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const diagramNodeMeta = {
	category: 'diagram',
	description: 'Compact typed node for concept graphs, architecture sketches, and agent explainers.',
	guidance:
		'Diagram nodes are primary graph entities. Use role to clarify category and keep labels short.',
	name: 'Diagram node',
	pressure: ['educational', 'editorial', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Primary node label.', '', true),
		prop('meta', 'ReactNode', 'Compact secondary label.'),
		prop(
			'role',
			"'boundary' | 'compute' | 'data' | 'decision' | 'error' | 'external' | 'process'",
			'Node semantic category.',
			'process'
		),
		prop('selected', 'boolean', 'Selected canvas state.', 'false'),
		prop('muted', 'boolean', 'Background canvas state.', 'false')
	]
} as const satisfies DiagramNodeMeta
