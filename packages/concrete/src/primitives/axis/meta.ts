import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type AxisMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const axisMeta = {
	category: 'data',
	description:
		'Chart axis, baseline, tick label, axis label, row label, value label, and end label marks.',
	guidance:
		'Use Axis primitives after scale utilities produce coordinates. Components and utilities own ticks, extents, and formatting.',
	name: 'Axis',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('ChartAxis.x1/y1/x2/y2', 'number | string', 'Axis line coordinates.', undefined, true),
		prop('ChartBaseline.x1/y1/x2/y2', 'number | string', 'Baseline coordinates.'),
		prop('ChartTickLabel.children', 'ReactNode', 'Tick label content.'),
		prop('ChartAxisLabel.children', 'ReactNode', 'Axis label content.'),
		prop('ChartRowLabel.children', 'ReactNode', 'Horizontal chart row label content.'),
		prop('ChartValueLabel.children', 'ReactNode', 'Chart value label content.'),
		prop('ChartEndLabel.children', 'ReactNode', 'Line endpoint label content.')
	]
} as const satisfies AxisMeta
