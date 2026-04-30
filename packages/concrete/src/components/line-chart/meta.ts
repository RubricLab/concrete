import { prop } from '../../registry/props'

export const lineChartMeta = {
	category: 'data',
	description: 'Multi-series trend chart with Concrete grid, endpoint, target, and legend language.',
	guidance:
		'Line chart is the default trend primitive for product summaries. Use dots only for inspection states; let the line and endpoint carry the hierarchy.',
	name: 'Line chart',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('series', 'readonly DataSeries[]', 'One or more typed data series.', '[]'),
		prop('target', 'number', 'Optional horizontal reference line.'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('message', 'string', 'Optional async state message override.'),
		prop('showDots', 'boolean', 'Shows every point marker for inspection states.', 'false'),
		prop('showEndLabels', 'boolean', 'Labels each series endpoint.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules.', 'true'),
		prop('showXAxis', 'boolean', 'Shows sparse x-axis labels.', 'true'),
		prop('showYAxis', 'boolean', 'Shows y-axis tick labels.', 'true'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	]
} as const
