import { prop } from '../../registry/props'

export const barChartMeta = {
	category: 'data',
	description: 'Categorical comparison chart with optional comparison bars and horizontal rails.',
	guidance:
		'Bar chart is for ranked or categorical values. Keep labels sparse and use comparison bars only when they answer a direct before/after question.',
	name: 'Bar chart',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('points', 'readonly DataPoint[]', 'Primary bar data.', '[]'),
		prop('comparisonPoints', 'readonly DataPoint[]', 'Muted comparison bars.', '[]'),
		prop('baseline', 'number', 'Value used as the zero rail for positive or negative bars.', '0'),
		prop('orientation', "'vertical' | 'horizontal'", 'Column or rail layout.', 'vertical'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('showValues', 'boolean', 'Shows value labels.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules in vertical mode.', 'true'),
		prop('showXAxis', 'boolean', 'Shows axis labels in vertical mode.', 'true'),
		prop('showYAxis', 'boolean', 'Shows tick labels in vertical mode.', 'true'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	]
} as const
