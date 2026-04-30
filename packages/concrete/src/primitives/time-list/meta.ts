import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TimeListMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const timeListMeta = {
	category: 'form',
	description: 'Scrollable time option listbox for compact picker workflows.',
	guidance:
		'TimeList owns the listbox and option chrome. Higher-level components generate valid intervals, format labels, and commit selected values.',
	name: 'Time list',
	pressure: ['product'],
	props: [
		prop('options', 'readonly string[]', 'Available time values.', '', true),
		prop('value', 'string', 'Selected time value.'),
		prop('onSelect', '(value: string) => void', 'Selection callback.', '', true),
		prop('formatOption', '(value: string) => ReactNode', 'Optional visible label formatter.')
	]
} as const satisfies TimeListMeta
