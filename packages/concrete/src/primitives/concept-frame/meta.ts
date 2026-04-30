import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ConceptFrameMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const conceptFrameMeta = {
	category: 'diagram',
	description: 'Symbolic currentColor SVG frame for editorial and educational explainers.',
	guidance:
		'Concept frames identify an interface, artifact, model, or system without pretending to be a product screenshot.',
	name: 'Concept frame',
	pressure: ['editorial', 'educational'],
	props: [
		prop('kind', 'ConceptFrameKind', 'Symbolic frame asset name.', 'browser-window'),
		prop('size', "'small' | 'medium' | 'large'", 'SVG display scale.', 'medium'),
		prop('selected', 'boolean', 'Promotes the frame for focused explainer states.', 'false'),
		prop('muted', 'boolean', 'Subdues the frame for background context.', 'false'),
		prop('title', 'string', 'Optional accessible title.')
	]
} as const satisfies ConceptFrameMeta
