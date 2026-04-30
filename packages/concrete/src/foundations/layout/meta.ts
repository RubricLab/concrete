import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type LayoutMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const layoutMeta = {
	category: 'layout',
	description: 'Composition recipes for grids, layers, offsets, responsive behavior, and templates.',
	guidance:
		'Use layout tokens through layout primitives. Components should not invent grid templates or z-index values.',
	name: 'Layout',
	pressure: ['product', 'generative', 'educational'],
	props: []
} as const satisfies LayoutMeta
