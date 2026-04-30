import { prop } from '../../registry/props'

export const datePickerMeta = {
	category: 'form',
	description:
		'Single-date picker with calendar panel, month navigation, min/max bounds, and controlled value support.',
	guidance:
		'Date picker is intentionally dependency-free for v1: ISO date strings at the boundary, product-local formatting outside the component when needed.',
	name: 'Date picker',
	pressure: ['product'],
	props: [
		prop('value', 'DateValue', 'Controlled ISO date string.'),
		prop('defaultValue', 'DateValue', 'Uncontrolled initial ISO date string.', 'today'),
		prop('defaultOpen', 'boolean', 'Initial calendar popdown state.', 'false'),
		prop('min', 'DateValue', 'Minimum selectable ISO date.'),
		prop('max', 'DateValue', 'Maximum selectable ISO date.'),
		prop('onValueChange', '(value: DateValue) => void', 'Receives the selected ISO date.'),
		prop('label', 'ReactNode', 'Field label.')
	]
} as const
