import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ScrollAreaMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const scrollAreaMeta = {
	category: 'layout',
	description: 'Bounded overflow primitive for tables, menus, traces, and upload lists.',
	guidance:
		'Use ScrollArea before local max-height and overflow rules. Extent is tokenized through the sizing foundation.',
	name: 'Scroll Area',
	pressure: ['product', 'generative'],
	props: [
		prop('extent', "'small' | 'medium' | 'large' | 'viewport'", 'Maximum block-extent recipe.'),
		prop('children', 'ReactNode', 'Scrollable content.')
	]
} as const satisfies ScrollAreaMeta
