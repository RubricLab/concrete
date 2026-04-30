import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type AccessibilityMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly []
}

export const accessibilityMeta = {
	category: 'foundation',
	description: 'Reset-level accessibility utilities and interaction constraints.',
	guidance:
		'Accessibility utilities sit below primitives. Components consume them through primitives, not bespoke CSS.',
	name: 'Accessibility',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: []
} as const satisfies AccessibilityMeta
