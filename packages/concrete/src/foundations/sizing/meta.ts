import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SizingMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const sizingMeta = {
	category: 'foundation',
	description: 'Dimension tokens for controls, icons, tracks, media, viewports, and measures.',
	guidance:
		'Use sizing tokens for intrinsic dimensions. Use spacing tokens for rhythm and layout tokens for composition.',
	name: 'Sizing',
	pressure: ['product', 'generative', 'educational'],
	props: []
} as const satisfies SizingMeta
