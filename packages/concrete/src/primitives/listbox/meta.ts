import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ListboxMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const listboxMeta = {
	category: 'control',
	description: 'Selectable option listbox surface for picker, menu, and select workflows.',
	guidance:
		'Use Listbox for selectable option regions; keep filtering, selection state, and keyboard flow in components.',
	name: 'Listbox',
	pressure: ['product', 'generative'],
	props: [
		prop('size', "'compact' | 'default' | 'loose'", 'Option density.'),
		prop('emptyLabel', 'ReactNode', 'Empty state label.'),
		prop('children', 'ReactNode', 'Option rows or command rows.')
	]
} as const satisfies ListboxMeta
