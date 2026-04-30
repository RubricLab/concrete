import { prop } from '../../registry/props'

export const heatmapMeta = {
	category: 'data',
	description: 'Two-axis intensity grid for compact activity and density summaries.',
	guidance:
		'Heatmap should use one accent scale with restrained contrast. Use it when relative density matters more than exact values.',
	name: 'Heatmap',
	pressure: ['product', 'educational', 'generative'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('cells', 'readonly HeatmapCell[]', 'Two-axis intensity cells.', '[]'),
		prop('showValues', 'boolean', 'Shows cell values.', 'true'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('height', 'number', 'Grid stage height.', '220'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Grid stage surface.', 'raised')
	]
} as const
