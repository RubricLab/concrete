import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type StackMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const stackMeta = {
	category: 'layout',
	description: 'Vertical rhythm primitive for dense groups, forms, traces, and editorial blocks.',
	guidance:
		'Use Stack before inventing component-local vertical spacing. Density chooses the rhythm; divided adds low-noise separation.',
	name: 'Stack',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [
		prop('density', "'compact' | 'comfortable' | 'editorial'", 'Vertical rhythm density.'),
		prop('align', "'start' | 'center' | 'end' | 'stretch'", 'Cross-axis alignment.'),
		prop('divided', 'boolean', 'Adds separators between direct children.', 'false'),
		prop('children', 'ReactNode', 'Stacked content.')
	]
} as const satisfies StackMeta
