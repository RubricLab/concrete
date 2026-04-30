import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TexturesMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const texturesMeta = {
	category: 'foundation',
	description: 'Quiet texture grounds for diagrams, editorial frames, and educational examples.',
	guidance: 'Use texture as structure, never as decorative noise.',
	name: 'Textures',
	pressure: ['editorial', 'educational'],
	props: []
} as const satisfies TexturesMeta
