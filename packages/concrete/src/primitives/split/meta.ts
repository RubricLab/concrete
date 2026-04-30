import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SplitMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const splitMeta = {
	category: 'layout',
	description: 'Two-region layout primitive for title/actions, body/aside, and inspector patterns.',
	guidance:
		'Use Split when two sibling regions need a deterministic relationship. Keep workflow state in components.',
	name: 'Split',
	pressure: ['product', 'editorial', 'generative'],
	props: [
		prop('ratio', "'auto' | 'even' | 'sidebar'", 'Relationship between body and aside.'),
		prop('density', "'compact' | 'comfortable' | 'editorial'", 'Gap density.'),
		prop('aside', 'ReactNode', 'Secondary region.'),
		prop('children', 'ReactNode', 'Primary region.')
	]
} as const satisfies SplitMeta
