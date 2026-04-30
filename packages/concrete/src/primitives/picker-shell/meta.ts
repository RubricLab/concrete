import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PickerShellMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const pickerShellMeta = {
	category: 'form',
	description: 'Positioned picker root shell for date, time, and multi-select popover controls.',
	guidance:
		'PickerShell owns the root positioning and picker width only. Controls, panels, lists, selected values, and option rendering belong to narrower primitives or components.',
	name: 'Picker shell',
	pressure: ['product'],
	props: [
		prop('children', 'ReactNode', 'Picker control and popover content.', '', true),
		prop('kind', "'date' | 'multi-select' | 'time'", 'Compatibility root class kind.', 'date'),
		prop('open', 'boolean', 'Open state marker for descendant primitives.', 'false')
	]
} as const satisfies PickerShellMeta
