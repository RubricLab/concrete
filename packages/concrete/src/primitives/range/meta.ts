import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type RangeMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const rangeMeta = {
	category: 'form',
	description: 'Two-thumb range control anatomy with filled rail and value row.',
	guidance:
		'Use Range when a workflow coordinates two native range inputs over one visual rail. Keep ordering, min/max, clamping, and controlled tuple state in the owning component.',
	name: 'Range',
	pressure: ['product', 'generative'],
	props: [
		prop('start', 'number | string', 'Start fill percentage token/value.', undefined, true),
		prop('end', 'number | string', 'End fill percentage token/value.', undefined, true),
		prop('RangeInput.label', 'string', 'Accessible native range input label.', undefined, true),
		prop('RangeValues.start', 'ReactNode', 'Displayed lower value.'),
		prop('RangeValues.end', 'ReactNode', 'Displayed upper value.')
	]
} as const satisfies RangeMeta
