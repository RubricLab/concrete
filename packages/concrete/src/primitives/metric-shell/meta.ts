import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type MetricShellMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const metricShellMeta = {
	category: 'data',
	description: 'Scalar card shell for metric and meter summaries.',
	guidance:
		'Use MetricShell for compact KPI and meter cards that share card chrome, header rhythm, scalar content, optional sparkline, and footer copy. Keep metric calculation and schema parsing in components.',
	name: 'Metric Shell',
	pressure: ['product', 'generative'],
	props: [
		prop('kind', "'metric' | 'meter'", 'Selects metric or meter anatomy.', 'metric'),
		prop('compact', 'boolean', 'Tightens card spacing for dense dashboards.', 'false'),
		prop('ring', 'boolean', 'Applies ring meter grid alignment.', 'false'),
		prop('MetricHeader.label', 'ReactNode', 'Primary metric or meter label.'),
		prop('MetricHeader.value', 'ReactNode', 'Meter value lockup.'),
		prop('MetricHeader.end', 'ReactNode', 'Trailing status or action slot.'),
		prop('MetricDescription.children', 'ReactNode', 'Muted scalar caption copy.'),
		prop('MetricFooter.start', 'ReactNode', 'Footer leading copy.'),
		prop('MetricFooter.end', 'ReactNode', 'Footer trailing copy.'),
		prop('children', 'ReactNode', 'Metric stat, sparkline, progress, or ring content.')
	]
} as const satisfies MetricShellMeta
