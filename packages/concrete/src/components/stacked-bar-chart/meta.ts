import { prop } from '../../registry/props'

export const stackedBarChartMeta = {
	category: 'data',
	description: 'Composition chart for small category stacks across time or groups.',
	guidance:
		'Stacked bar chart is for composition, not precise comparison. Keep the segment count low and prefer normalized bars when the share is more important than total volume.',
	name: 'Stacked bar chart',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('groups', 'readonly StackedBarGroup[]', 'Stacked bar groups.', '[]'),
		prop('normalized', 'boolean', 'Normalizes each group to 100%.', 'false'),
		prop('orientation', "'vertical' | 'horizontal'", 'Column or rail layout.', 'vertical'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('showValues', 'boolean', 'Shows group total labels.', 'true'),
		prop('showGrid', 'boolean', 'Shows horizontal grid rules in vertical mode.', 'true'),
		prop('showXAxis', 'boolean', 'Shows axis labels in vertical mode.', 'true'),
		prop('showYAxis', 'boolean', 'Shows tick labels in vertical mode.', 'true'),
		prop('height', 'number', 'SVG plot height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true')
	]
} as const
