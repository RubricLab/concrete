import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DrawerSurfaceMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const drawerSurfaceMeta = {
	category: 'surface',
	description: 'Drawer panel sizing and dialog semantics for side-panel workflows.',
	guidance:
		'Use DrawerSurface inside Overlay for side workflows. Keep drawer state and form behavior in components.',
	name: 'DrawerSurface',
	pressure: ['product', 'generative'],
	props: [
		prop('side', "'left' | 'right'", 'Logical drawer side.'),
		prop('size', "'compact' | 'default' | 'wide'", 'Drawer width role.'),
		prop('children', 'ReactNode', 'Drawer content, usually Panel.')
	]
} as const satisfies DrawerSurfaceMeta
