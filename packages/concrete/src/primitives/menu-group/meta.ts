import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type MenuGroupMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const menuGroupMeta = {
	category: 'navigation',
	description: 'Labeled group region for menu, command, and listbox surfaces.',
	guidance:
		'Use MenuGroup to group options. It owns section anatomy, not filtering or command behavior.',
	name: 'MenuGroup',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Group title.'),
		prop('children', 'ReactNode', 'Option or command rows.')
	]
} as const satisfies MenuGroupMeta
