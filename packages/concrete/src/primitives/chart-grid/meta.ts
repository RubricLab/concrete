import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ChartGridMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const chartGridMeta = {
	category: 'data',
	description: 'SVG chart gridline group and plot background anatomy.',
	guidance:
		'Use Chart Grid after chart geometry has produced plot bounds and gridline coordinates. It owns grid styling, not scale or tick calculation.',
	name: 'Chart Grid',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('ChartGrid.children', 'ReactNode', 'Grid lines and optional plot background.'),
		prop('ChartPlotBackground.x/y/width/height', 'number | string', 'Plot background geometry.')
	]
} as const satisfies ChartGridMeta
