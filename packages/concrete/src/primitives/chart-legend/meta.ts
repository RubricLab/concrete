import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ChartLegendMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const chartLegendMeta = {
	category: 'data',
	description: 'Compact indicator legend for chart and diagram surfaces.',
	guidance:
		'Use ChartLegend for scan-friendly data legends below chart, diagram, and generated visual panels. Keep legend item derivation in the owning renderer and use ChartLegendItem for consistent indicator/value anatomy.',
	name: 'Chart Legend',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('children', 'ReactNode', 'ChartLegendItem nodes or compatible indicator content.'),
		prop('ChartLegendItem.label', 'ReactNode', 'Legend label text.', undefined, true),
		prop('ChartLegendItem.value', 'ReactNode', 'Optional tabular value.'),
		prop(
			'ChartLegendItem.tone',
			'IndicatorTone',
			'Signal tone passed through to Indicator.',
			'default'
		)
	]
} as const satisfies ChartLegendMeta
