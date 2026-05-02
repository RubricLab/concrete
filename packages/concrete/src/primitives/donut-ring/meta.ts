import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DonutRingMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const donutRingMeta = {
	category: 'data',
	description: 'Donut chart ring, track, segment, and centered value anatomy.',
	guidance:
		'Use Donut Ring primitives for circular progress and part-to-whole chart marks. Components own segment math and accessibility copy.',
	name: 'Donut Ring',
	pressure: ['product', 'generative'],
	props: [
		prop('DonutPlot.thickness', "'thin' | 'medium' | 'thick'", 'Donut stroke token.', 'medium'),
		prop('DonutTrack.cx/cy/r', 'number | string', 'Track circle geometry.', undefined, true),
		prop('DonutSegment.strokeDasharray', 'string', 'Segment arc ratio.'),
		prop('DonutCenter.value', 'ReactNode', 'Centered value.', undefined, true)
	]
} as const satisfies DonutRingMeta
