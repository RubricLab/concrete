import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SearchTokenMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const searchTokenMeta = {
	category: 'control',
	description: 'Compact removable query scope token for search and command surfaces.',
	guidance:
		'SearchToken owns token chrome, optional leading icon, tone, and remove affordance. Search components own query state and token data.',
	name: 'Search token',
	pressure: ['product', 'generative'],
	props: [
		prop('children', 'ReactNode', 'Visible token label.', '', true),
		prop('leadingIcon', 'IconName', 'Optional leading glyph.'),
		prop('tone', "'default' | 'error' | 'sky' | 'terminal' | 'ultra'", 'Token tone.', 'default'),
		prop('onRemove', '() => void', 'Shows and handles remove affordance.')
	]
} as const satisfies SearchTokenMeta
