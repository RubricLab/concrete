import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type MenuSurfaceMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const menuSurfaceMeta = {
	category: 'navigation',
	description: 'Generic menu surface for command, suggestion, and option workflows.',
	guidance:
		'Use MenuSurface for the shell only. Search, grouping, filtering, and keyboard orchestration stay in components.',
	name: 'MenuSurface',
	pressure: ['product', 'generative'],
	props: [
		prop('density', 'Density', 'Menu density role.'),
		prop('role', "'menu' | 'listbox'", 'ARIA role for the option region.'),
		prop('children', 'ReactNode', 'Menu content.')
	]
} as const satisfies MenuSurfaceMeta
