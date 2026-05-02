import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ChartFrameMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const chartFrameMeta = {
	category: 'data',
	description:
		'Framed chart output region with surface state, chart-kind hooks, and state messages.',
	guidance:
		'Use ChartFrame for the visible plot container. Components own data, scaling, routing, and chart state; lower chart primitives own SVG marks and non-SVG chart grids.',
	name: 'Chart Frame',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('ChartFrame.surface', "'raised' | 'sunken' | 'transparent'", 'Surface treatment.', 'raised'),
		prop('ChartFrame.kind', 'ChartFrameKind', 'Chart kind marker for styling hooks.', 'line'),
		prop('ChartFrame.height', 'number | string', 'Surface height token or runtime chart height.'),
		prop('ChartMessage.children', 'ReactNode', 'Empty, loading, or error message.')
	]
} as const satisfies ChartFrameMeta
