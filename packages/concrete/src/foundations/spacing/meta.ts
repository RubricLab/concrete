import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SpacingMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const spacingMeta = {
	category: 'layout',
	description: 'Compact spacing steps for dense but legible composition.',
	guidance:
		'Prefer smaller repeated steps over bespoke gaps; pressure comes from composition density.',
	name: 'Spacing',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: []
} as const satisfies SpacingMeta
