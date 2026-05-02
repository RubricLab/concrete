import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TokenMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const tokenMeta = {
	category: 'control',
	description: 'Generic compact token for selected values, scopes, mentions, and attachments.',
	guidance:
		'Use Token instead of search-, composer-, or select-specific token vocabulary unless behavior is truly domain-specific.',
	name: 'Token',
	pressure: ['product', 'generative'],
	props: [
		prop('kind', "'attachment' | 'entity' | 'mention' | 'scope' | 'value'", 'Semantic token kind.'),
		prop('intent', 'CommandItemIntent', 'Semantic intent from shared state.'),
		prop('leadingIcon', 'IconName', 'Optional semantic leading icon.'),
		prop('removable', 'boolean', 'Whether to render the remove affordance.')
	]
} as const satisfies TokenMeta
