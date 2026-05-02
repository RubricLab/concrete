import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SegmentedProgressMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const segmentedProgressMeta = {
	category: 'data',
	description: 'Segmented completion primitive for discrete steps.',
	guidance:
		'SegmentedProgress shows bounded step completion when each completed unit matters more than exact percent precision.',
	name: 'SegmentedProgress',
	pressure: ['product', 'generative'],
	props: [
		prop('segments', 'number', 'Total segment count.', '8'),
		prop('value', 'number', 'Completed segment count.', '5')
	]
} as const satisfies SegmentedProgressMeta
