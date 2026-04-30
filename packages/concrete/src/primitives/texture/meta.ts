import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TextureMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const textureMeta = {
	category: 'foundation',
	description: 'Lattice, dot, and line grounds from the foundation tokens.',
	guidance:
		'Textures are subtle instructional grounds. Keep them inside frames or small surfaces and avoid full-page decorative use.',
	name: 'Texture',
	pressure: ['editorial', 'educational'],
	props: [
		prop('texture', "'lattice' | 'dots' | 'lines'", 'Optional tokenized ground pattern.'),
		prop('children', 'never', 'Texture renders only its background treatment.')
	]
} as const satisfies TextureMeta
