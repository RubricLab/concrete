import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ConceptConnectorMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const conceptConnectorMeta = {
	category: 'diagram',
	description: 'Small relation glyphs for flow, sync, branch, loop, and callout diagrams.',
	guidance:
		'Use connectors deliberately: one relation type per meaning, muted by default, highlighted only when the relation is the point.',
	name: 'Concept connector',
	pressure: ['editorial', 'educational'],
	props: [
		prop('kind', 'ConceptConnectorKind', 'Connector grammar asset name.', 'straight'),
		prop(
			'tone',
			"'ink' | 'muted' | 'sky' | 'terminal' | 'ultra' | 'error'",
			'Concrete-native connector tone.',
			'muted'
		),
		prop('selected', 'boolean', 'Highlights the relation.', 'false'),
		prop('muted', 'boolean', 'Subdues the relation.', 'false')
	]
} as const satisfies ConceptConnectorMeta
