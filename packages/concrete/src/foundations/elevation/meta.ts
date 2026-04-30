import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ElevationMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const elevationMeta = {
	category: 'foundation',
	description: 'Restrained shadows and borders for Concrete surfaces.',
	guidance: 'Prefer hairlines first; add shadow only when a surface must separate from its plane.',
	name: 'Elevation',
	pressure: ['product', 'generative'],
	props: []
} as const satisfies ElevationMeta
