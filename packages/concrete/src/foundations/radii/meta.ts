import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type RadiiMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const radiiMeta = {
	category: 'foundation',
	description: 'Tight corner tokens for calm product surfaces.',
	guidance: 'Use small radii by default; reserve pill radius for explicit chips and badges.',
	name: 'Radii',
	pressure: ['product', 'generative', 'educational'],
	props: []
} as const satisfies RadiiMeta
