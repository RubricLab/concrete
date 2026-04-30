import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type IconographyMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const iconographyMeta = {
	category: 'foundation',
	description: 'Icon roles, alias policy, stroke policy, and semantic glyph categories.',
	guidance:
		'Use iconography as semantic policy. The public icons subpath remains the renderer and asset registry.',
	name: 'Iconography',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: []
} as const satisfies IconographyMeta
