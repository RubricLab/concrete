import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PlotMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const plotMeta = {
	category: 'data',
	description: 'SVG plot root with accessibility title and Concrete sizing contract.',
	guidance:
		'Use Plot for the chart SVG root. Compose it with Chart Grid, Axis, Target Line, and series primitives after geometry utilities produce coordinates.',
	name: 'Plot',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('ChartSvg.title', 'ReactNode', 'Accessible SVG title text.'),
		prop('ChartSvg.viewBox', 'string', 'SVG coordinate system.', '0 0 160 96'),
		prop('ChartSvg.children', 'ReactNode', 'Chart primitive marks and groups.')
	]
} as const satisfies PlotMeta
