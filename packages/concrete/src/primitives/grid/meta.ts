import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type GridMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const gridMeta = {
	category: 'layout',
	description: 'Tokenized responsive grid primitive for repeated cards, controls, and specimens.',
	guidance:
		'Use Grid before writing item-local columns. Choose count semantics, never raw track strings.',
	name: 'Grid',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [
		prop('columns', "'auto' | 'one' | 'two' | 'three'", 'Column recipe.'),
		prop('density', "'compact' | 'comfortable' | 'editorial'", 'Grid gap density.'),
		prop('children', 'ReactNode', 'Grid items.')
	]
} as const satisfies GridMeta
