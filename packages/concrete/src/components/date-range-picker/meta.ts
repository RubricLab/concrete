import { prop } from '../../registry/props'

export const dateRangePickerMeta = {
	category: 'form',
	description:
		'Range picker for start/end ISO dates with calendar selection and in-range treatment.',
	guidance:
		'Date range picker returns a small object boundary and keeps range intent visible without introducing a date runtime dependency.',
	name: 'Date range picker',
	pressure: ['product'],
	props: [
		prop('value', 'DateRangeValue', 'Controlled start/end ISO date object.'),
		prop('defaultValue', 'DateRangeValue', 'Uncontrolled initial range value.'),
		prop('defaultOpen', 'boolean', 'Initial calendar popdown state.', 'false'),
		prop('min', 'DateValue', 'Minimum selectable ISO date.'),
		prop('max', 'DateValue', 'Maximum selectable ISO date.'),
		prop('onValueChange', '(value: DateRangeValue) => void', 'Receives the selected range.'),
		prop('label', 'ReactNode', 'Field label.')
	]
} as const
