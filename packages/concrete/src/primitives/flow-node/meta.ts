import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FlowNodeMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const flowNodeMeta = {
	category: 'diagram',
	description: 'SVG node primitive for compact flow diagrams.',
	guidance:
		'Use FlowNode for SVG graph nodes inside compact flow diagrams. It owns node rect and label anatomy; components own drag state, hit testing, and graph data.',
	name: 'Flow Node',
	pressure: ['product', 'educational'],
	props: [
		prop('title', 'string', 'Primary node label.', undefined, true),
		prop('subtitle', 'string', 'Optional secondary node label.'),
		prop('hierarchy', "'surface' | 'accent' | 'inverse'", 'Node surface hierarchy.', 'surface'),
		prop('selected', 'boolean', 'Selected node state.', 'false'),
		prop('x, y, width, height', 'number', 'SVG node geometry.', undefined, true)
	]
} as const satisfies FlowNodeMeta
