import { prop } from '../../registry/props'

export const meterMeta = {
	category: 'data',
	description: 'Progress summary card that composes Concrete linear and ring progress primitives.',
	guidance:
		'Meter is a bounded progress summary, not a charting framework. Use it for quotas, completion, utilization, and health summaries.',
	name: 'Meter',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'string', 'Meter label shown in the card header.', undefined, true),
		prop('value', 'DataProgressValue', 'Bounded value object parsed at runtime.', undefined, true),
		prop('variant', "'bar' | 'ring'", 'Linear or circular meter rendering.', 'bar'),
		prop('tone', 'DataTone', 'Progress tone mapped to Concrete signals.', 'sky'),
		prop('target', 'number', 'Optional target value called out in the footer.'),
		prop('unit', 'string', 'Rendered value unit.', '%'),
		prop('description', 'string', 'Optional supporting text in the footer.'),
		prop('compact', 'boolean', 'Tighter rail/ring dimensions.', 'false')
	]
} as const
