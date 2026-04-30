import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DiagramRailMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const diagramRailMeta = {
	category: 'diagram',
	description: 'Passive tool rail for diagram canvas surfaces.',
	guidance:
		'Use DiagramRail for the compact decorative/action hint rail inside canvas viewports. Keep actual tool mode, command routing, and editing state in the owning component.',
	name: 'Diagram Rail',
	pressure: ['product', 'educational'],
	props: [
		prop('activeIndex', 'number', 'Index of the active visual rail item.', '0'),
		prop('tools', 'readonly IconName[]', 'Optional rail icon sequence.')
	]
} as const satisfies DiagramRailMeta
