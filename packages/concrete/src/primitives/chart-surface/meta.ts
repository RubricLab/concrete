import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ChartSurfaceMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const chartSurfaceMeta = {
	category: 'data',
	description: 'Chart shell, output surface, state message, SVG plot, donut, and heatmap anatomy.',
	guidance:
		'Use ChartSurface for focused generated chart output inside product surfaces. The primitive owns visual chrome and plot styling; components own schema parsing, geometry, data scaling, and state decisions.',
	name: 'Chart Surface',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('ChartShell.children', 'ReactNode', 'Header, surface, and legend content.'),
		prop(
			'ChartSurface.surface',
			"'raised' | 'sunken' | 'transparent'",
			'Surface treatment.',
			'raised'
		),
		prop(
			'ChartSurface.variant',
			'ChartSurfaceVariant',
			'Chart variant marker for styling hooks.',
			'line'
		),
		prop('ChartSurface.height', 'number | string', 'Surface height token or runtime chart height.'),
		prop('ChartSvg.title', 'ReactNode', 'Accessible SVG title text.'),
		prop('ChartMessage.children', 'ReactNode', 'Empty, loading, or error message.'),
		prop('DonutPlot.thickness', "'thin' | 'medium' | 'thick'", 'Donut stroke token.', 'medium'),
		prop('HeatmapGrid.columnCount', 'number', 'Column count for the heatmap grid.', undefined, true),
		prop('HeatmapCell.intensity', 'number', 'Computed heatmap opacity scalar.')
	]
} as const satisfies ChartSurfaceMeta
