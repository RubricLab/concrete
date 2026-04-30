import { prop } from '../../registry/props'

export const timePickerMeta = {
	category: 'form',
	description: 'Compact HH:mm picker with interval-generated options and controlled value support.',
	guidance:
		'Time picker stays a focused menu primitive for time-of-day selection; timezone and scheduling rules belong to product code.',
	name: 'Time picker',
	pressure: ['product'],
	props: [
		prop('value', 'TimeValue', 'Controlled HH:mm value.'),
		prop('defaultValue', 'TimeValue', 'Uncontrolled initial HH:mm value.', '14:30'),
		prop('defaultOpen', 'boolean', 'Initial time menu state.', 'false'),
		prop('interval', 'number', 'Minute interval for generated options.', '30'),
		prop('onValueChange', '(value: TimeValue) => void', 'Receives the selected HH:mm value.'),
		prop('label', 'ReactNode', 'Field label.')
	]
} as const
