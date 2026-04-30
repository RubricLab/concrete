import { prop } from '../../registry/props'

export const donutChartMeta = {
	category: 'data',
	description: 'Part-to-whole ring summary with controlled center metric and thickness.',
	guidance:
		'Donut chart works best for a small number of stable segments. It should summarize, not explain an entire distribution.',
	name: 'Donut chart',
	pressure: ['generative', 'product'],
	props: [
		prop('title', 'string', 'Chart title.', undefined, true),
		prop('description', 'string', 'Muted supporting copy.'),
		prop('segments', 'readonly DataPoint[]', 'Part-to-whole segments.', '[]'),
		prop('centerLabel', 'string', 'Optional center metric override.'),
		prop('showCenterLabel', 'boolean', 'Shows the center metric and leading segment label.', 'true'),
		prop('thickness', "'thin' | 'medium' | 'thick'", 'Ring stroke thickness.', 'medium'),
		prop('state', "'ready' | 'loading' | 'empty' | 'error'", 'Async data state.', 'ready'),
		prop('height', 'number', 'Plot stage height.', '220'),
		prop('legend', 'boolean', 'Shows derived legend indicators.', 'true'),
		prop('surface', "'raised' | 'sunken' | 'transparent'", 'Plot stage surface.', 'raised')
	]
} as const
