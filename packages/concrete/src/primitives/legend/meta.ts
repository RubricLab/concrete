import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type LegendMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const legendMeta = {
	category: 'data',
	description: 'Compact indicator legend for chart and diagram surfaces.',
	guidance:
		'Use Legend for scan-friendly keys below chart, diagram, and generated visual panels. Keep item derivation in the owning renderer and use LegendItem for consistent indicator/value anatomy.',
	name: 'Legend',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('children', 'ReactNode', 'LegendItem nodes or compatible indicator content.'),
		prop('LegendItem.label', 'ReactNode', 'Legend label text.', undefined, true),
		prop('LegendItem.value', 'ReactNode', 'Optional tabular value.'),
		prop(
			'LegendItem.intent',
			'IndicatorIntent',
			'Signal intent passed through to Indicator.',
			'neutral'
		)
	]
} as const satisfies LegendMeta
