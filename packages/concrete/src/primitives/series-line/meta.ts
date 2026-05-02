import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SeriesLineMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const seriesLineMeta = {
	category: 'data',
	description: 'SVG line and area path marks for trend series.',
	guidance:
		'Use Series Line after chart geometry has produced path coordinates. Use Series Point for point and endpoint marks.',
	name: 'Series Line',
	pressure: ['product', 'generative'],
	props: [
		prop('ChartLine.d', 'string', 'Line path data.', undefined, true),
		prop('ChartArea.d', 'string', 'Optional area path data.')
	]
} as const satisfies SeriesLineMeta
