import { prop } from '../../registry/props'

export const areaChartMeta = {
	category: 'data',
	description: 'Soft filled trend chart for volume, confidence, and generated UI previews.',
	guidance:
		'Area chart should stay light. It is useful when the signal is cumulative or atmospheric, not when exact comparison is the main task.',
	name: 'Area chart',
	pressure: ['generative', 'product'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('series', 'readonly DataSeries[]', 'One or more typed data series.', '[]'),
		prop('target', 'number', 'Optional horizontal reference line.'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('showDots', 'boolean', 'Shows every point marker for inspection states.', 'false'),
		prop('showEndLabels', 'boolean', 'Labels each series endpoint.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules.', 'true'),
		prop('showXAxis', 'boolean', 'Shows sparse x-axis labels.', 'true'),
		prop('showYAxis', 'boolean', 'Shows y-axis tick labels.', 'true'),
		prop('stacked', 'boolean', 'Reserved for stacked area compositions.', 'false'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	]
} as const
