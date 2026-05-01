import { prop } from '../../registry/props'

export const chartMeta = {
	category: 'data',
	description: 'Backward-compatible discriminated union wrapper for every focused chart component.',
	guidance:
		'Chart is a convenience wrapper. Prefer LineChart, BarChart, DonutChart, and Heatmap in product code when the chart type is known.',
	name: 'Chart',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'kind',
			"'line' | 'area' | 'bar' | 'stacked-bar' | 'donut' | 'heatmap'",
			'Chart renderer selected by the discriminated schema.',
			'line',
			true
		),
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('message', 'string', 'Optional async state message override.'),
		prop('height', 'number', 'SVG or grid stage height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('showHeader', 'boolean', 'Shows title, description, and async state indicator.', 'true'),
		prop(
			'surface',
			"'raised' | 'sunken' | 'transparent'",
			'Foundation surface treatment for the plot stage.',
			'raised'
		),
		prop('series', 'readonly DataSeries[]', 'Line and area series data.'),
		prop('points', 'readonly DataPoint[]', 'Bar chart points.'),
		prop('groups', 'readonly StackedBarGroup[]', 'Stacked bar groups.'),
		prop('segments', 'readonly DataPoint[]', 'Donut segments.'),
		prop('cells', 'readonly HeatmapCell[]', 'Heatmap cells.')
	]
} as const
