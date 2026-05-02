import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SparklineMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const sparklineMeta = {
	category: 'data',
	description: 'Tiny trend primitive rendered as line or bar SVG.',
	guidance:
		'Sparklines show trend shape, not detailed analysis. Keep axes and legends in the surrounding data surface.',
	name: 'Sparkline',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('values', 'readonly number[]', 'Series values normalized into the SVG viewport.', '', true),
		prop('display', "'line' | 'bar' | 'dot'", 'Sparkline mark type.', 'line'),
		prop(
			'intent',
			"'sky' | 'neutral' | 'terminal' | 'error'",
			'Line, endpoint, area, and bar color.',
			'sky'
		),
		prop('area', 'boolean', 'Adds a soft area fill under a line sparkline.', 'false'),
		prop('showEndpoint', 'boolean', 'Shows the last value dot for line sparklines.', 'true')
	]
} as const satisfies SparklineMeta
