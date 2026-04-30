import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SeriesPointMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const seriesPointMeta = {
	category: 'data',
	description: 'SVG point and endpoint marks for line and scatter-like chart series.',
	guidance:
		'Use Series Point after chart geometry has produced point coordinates. Series Line owns paths; Series Point owns circular marks.',
	name: 'Series Point',
	pressure: ['product', 'generative'],
	props: [
		prop('ChartPoint.cx/cy/r', 'number | string', 'Point circle geometry.', undefined, true),
		prop('ChartEndpoint.cx/cy/r', 'number | string', 'Emphasized endpoint circle geometry.')
	]
} as const satisfies SeriesPointMeta
