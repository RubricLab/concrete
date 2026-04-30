import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PickerButtonMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const pickerButtonMeta = {
	category: 'control',
	description: 'Generic disclosure button for picker workflows.',
	guidance:
		'Use PickerButton for date, time, select, and generated picker triggers. Keep picker state in components.',
	name: 'PickerButton',
	pressure: ['product', 'generative'],
	props: [
		prop('open', 'boolean', 'Open disclosure state.'),
		prop('icon', 'IconName', 'Semantic trailing icon.'),
		prop('children', 'ReactNode', 'Visible picker value.')
	]
} as const satisfies PickerButtonMeta
