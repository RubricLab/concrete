import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type StateMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const stateMeta = {
	category: 'foundation',
	description: 'Shared semantic state schemas for tones, statuses, hierarchy, and density.',
	guidance:
		'Use state schemas to close primitive props around semantic intent instead of raw visual overrides.',
	name: 'State',
	pressure: ['product', 'generative', 'educational'],
	props: []
} as const satisfies StateMeta
