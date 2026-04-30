import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type NavMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const navMeta = {
	category: 'navigation',
	description: 'Responsive top-level navigation assembled from Concrete layout and link primitives.',
	guidance:
		'Use Nav for product or docs chrome when links are known data. It owns item mapping and current-link semantics, not route policy or app state.',
	name: 'Nav',
	pressure: ['product', 'editorial'],
	props: [
		prop('items', 'readonly NavItem[]', 'Primary navigation items.', '', true),
		prop('actions', 'readonly NavItem[]', 'Optional trailing navigation or external action links.'),
		prop('activeId', 'string', 'Marks the matching item current.'),
		prop('brand', 'ReactNode', 'Optional brand slot. Defaults to Concrete mark and word.'),
		prop('brandHref', 'string', 'Brand destination.', '/'),
		prop(
			'density',
			"'compact' | 'comfortable' | 'editorial'",
			'Container and cluster density.',
			'compact'
		),
		prop('label', 'string', 'Accessible nav landmark label.', 'Primary')
	]
} as const satisfies NavMeta
