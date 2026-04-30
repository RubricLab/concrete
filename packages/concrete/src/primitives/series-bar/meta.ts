import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SeriesBarMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const seriesBarMeta = {
	category: 'data',
	description: 'SVG bar, track, comparison, and stack segment marks.',
	guidance:
		'Use Series Bar marks after chart geometry has produced rectangle coordinates. This primitive owns mark styling only.',
	name: 'Series Bar',
	pressure: ['product', 'generative'],
	props: [
		prop('ChartBar.x/y/width/height', 'number | string', 'Bar rectangle geometry.', undefined, true),
		prop('ChartBarTrack.x/y/width/height', 'number | string', 'Track rectangle geometry.'),
		prop('ChartBarComparison.x/y/width/height', 'number | string', 'Comparison rectangle geometry.'),
		prop('ChartStackSegment.x/y/width/height', 'number | string', 'Stack segment geometry.')
	]
} as const satisfies SeriesBarMeta
