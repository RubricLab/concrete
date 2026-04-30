import { prop } from '../../registry/props'

export const rangeSliderMeta = {
	category: 'form',
	description: 'Two-thumb range adjustment with an aligned filled rail and controlled tuple value.',
	guidance:
		'Range slider is a component because it coordinates two native range inputs while keeping the visual rail deterministic.',
	name: 'Range slider',
	pressure: ['product', 'generative'],
	props: [
		prop('value', 'RangeSliderValue', 'Controlled lower/upper tuple.'),
		prop('defaultValue', 'RangeSliderValue', 'Uncontrolled initial tuple.', '[20, 80]'),
		prop('min', 'number', 'Minimum scale value.', '0'),
		prop('max', 'number', 'Maximum scale value.', '100'),
		prop('step', 'number', 'Native range step.', '1'),
		prop('onValueChange', '(value: RangeSliderValue) => void', 'Receives the ordered tuple.'),
		prop('label', 'ReactNode', 'Field label.')
	]
} as const
