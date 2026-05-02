import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type MetricCardMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const metricCardMeta = {
	category: 'data',
	description:
		'KPI tile composed from Stat, Delta, Sparkline, Indicator, and Concrete surface primitives.',
	guidance:
		'Metric card is for compact dashboard summaries. It accepts formatted values at the boundary and leaves business math to product code.',
	name: 'Metric card',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'string', 'Metric label shown above the value.', undefined, true),
		prop('value', 'string', 'Formatted metric value.', undefined, true),
		prop('unit', 'string', 'Optional unit suffix beside the value.'),
		prop('delta', 'DataDelta', 'Optional terminal/error/neutral change indicator.'),
		prop('trend', 'readonly number[]', 'Optional inline sparkline values.', '[]'),
		prop('trendIntent', 'DataIntent', 'Overrides the sparkline intent derived from delta intent.'),
		prop('status', 'DataLegendItem', 'Small status indicator in the header.'),
		prop('compact', 'boolean', 'Tight metric card rhythm for dense dashboards.', 'false')
	]
} as const satisfies MetricCardMeta
