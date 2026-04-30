import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ScaleFrameMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const scaleFrameMeta = {
	category: 'surface',
	description: 'Fixed-bounds preview container for scaled product surfaces.',
	guidance:
		'Use ScaleFrame when a real primitive, component, or interface must fit a constrained preview without changing its internal layout.',
	name: 'ScaleFrame',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('scale', 'number', 'Visual scale applied inside stable frame bounds.', '1'),
		prop('align', "'start' | 'center' | 'end'", 'Content alignment inside the frame.', 'center'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Optional frame surface.', 'transparent'),
		prop('children', 'ReactNode', 'Scaled frame content.')
	]
} as const satisfies ScaleFrameMeta
