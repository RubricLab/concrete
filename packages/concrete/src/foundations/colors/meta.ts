import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ColorsMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const colorsMeta = {
	category: 'foundation',
	description: 'Color tokens for ink, surfaces, accents, and the three Concrete signals.',
	guidance:
		'Use tokens directly through Concrete CSS variables; do not create component-local palettes.',
	name: 'Colors',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: []
} as const satisfies ColorsMeta
