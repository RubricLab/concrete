import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PickerControlMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const pickerControlMeta = {
	category: 'form',
	description: 'Compact disclosure button for date, range, and time picker controls.',
	guidance:
		'PickerControl owns the closed picker trigger only. Calendar panels, time lists, menus, and selection state belong to higher-level picker primitives or components.',
	name: 'Picker control',
	pressure: ['product', 'generative'],
	props: [
		prop('children', 'ReactNode', 'Visible selected value.', '', true),
		prop('icon', 'IconName', 'Trailing picker glyph.', 'calendar'),
		prop('open', 'boolean', 'Applies open focus treatment.', 'false')
	]
} as const satisfies PickerControlMeta
