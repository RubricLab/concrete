import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TokenRailMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const tokenRailMeta = {
	category: 'control',
	description: 'Compact token rail for mentions, commands, attachments, and scoped context.',
	guidance:
		'Use TokenRail to expose committed context inside composer, search, and generated-input workflows. Inline serialization, token commits, and removal behavior stay workflow-owned.',
	name: 'Token Rail',
	pressure: ['product', 'generative'],
	props: [
		prop('items', 'readonly TokenRailItemData[]', 'Committed context items to render.'),
		prop('TokenRailItem.kind', "'attachment' | 'command' | 'mention'", 'Token semantic role.'),
		prop('TokenRailItem.onRemove', '() => void', 'Optional remove command.')
	]
} as const satisfies TokenRailMeta
