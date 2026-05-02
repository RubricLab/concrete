import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PickerSurfaceMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const pickerSurfaceMeta = {
	category: 'surface',
	description: 'Relative or floating surface for picker content.',
	guidance:
		'Use PickerSurface for generic picker content placement. Keep domain state and filtering in components.',
	name: 'PickerSurface',
	pressure: ['product', 'generative'],
	props: [
		prop('placement', "'inline' | 'floating'", 'Surface placement.'),
		prop('children', 'ReactNode', 'Picker content.')
	]
} as const satisfies PickerSurfaceMeta
