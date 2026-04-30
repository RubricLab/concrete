import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SurfaceMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const surfaceMeta = {
	category: 'surface',
	description: 'Base Concrete surface with tokenized depth, tone, density, and state.',
	guidance:
		'Use Surface before inventing item-local card chrome. It owns shell treatment, not layout orchestration.',
	name: 'Surface',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('depth', "'flat' | 'raised' | 'sunken'", 'Surface depth recipe.'),
		prop('tone', "'default' | 'muted' | 'inverse' | signal", 'Semantic surface tone.'),
		prop('density', "'compact' | 'comfortable' | 'editorial'", 'Surface padding density.'),
		prop('children', 'ReactNode', 'Surface content.')
	]
} as const satisfies SurfaceMeta
