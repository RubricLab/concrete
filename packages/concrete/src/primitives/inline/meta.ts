import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type InlineMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const inlineMeta = {
	category: 'layout',
	description: 'Single-line alignment primitive for labels, metadata, controls, and actions.',
	guidance:
		'Use Inline for non-wrapping horizontal relationships. Use Cluster when children may wrap.',
	name: 'Inline',
	pressure: ['product', 'editorial', 'generative'],
	props: [
		prop('density', "'compact' | 'comfortable' | 'editorial'", 'Horizontal rhythm density.'),
		prop('align', "'start' | 'center' | 'end' | 'baseline' | 'stretch'", 'Cross-axis alignment.'),
		prop('justify', "'start' | 'center' | 'end' | 'between'", 'Main-axis distribution.'),
		prop('children', 'ReactNode', 'Inline content.')
	]
} as const satisfies InlineMeta
