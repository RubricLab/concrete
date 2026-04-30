import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DiagramLegendMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const diagramLegendMeta = {
	category: 'diagram',
	description: 'Diagram-specific legend marks for node and edge vocabularies.',
	guidance:
		'Use DiagramLegend when a canvas needs visual explanation for node categories and edge line styles. Use ChartLegend for data-tone legends; this primitive is specifically for diagram grammar.',
	name: 'Diagram Legend',
	pressure: ['product', 'educational'],
	props: [
		prop('items', 'readonly DiagramLegendItem[]', 'Legend item labels and mark kinds.'),
		prop('children', 'never', 'Legend anatomy is fixed through item data.')
	]
} as const satisfies DiagramLegendMeta
