import { prop } from '../../registry/props'

export const multiSelectMeta = {
	category: 'form',
	description:
		'Tag-backed option picker with local filtering, disabled options, max selection, and removable values.',
	guidance:
		'Multi select composes Field, Tag, and menu rows. It owns local picker interaction; product code owns option sourcing and persistence.',
	name: 'Multi select',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'options',
			'readonly MultiSelectOption[]',
			'Options validated by multiSelectOptionSchema.',
			'',
			true
		),
		prop('value', 'readonly string[]', 'Controlled selected option values.'),
		prop('defaultValue', 'readonly string[]', 'Uncontrolled initial selected values.', '[]'),
		prop('defaultOpen', 'boolean', 'Initial menu state for demos and screenshots.', 'false'),
		prop('maxSelected', 'number', 'Optional maximum selected item count.'),
		prop('placeholder', 'string', 'Placeholder when no values are selected.', 'Select options...'),
		prop('onValueChange', '(value: readonly string[]) => void', 'Receives the selected value ids.'),
		prop('label', 'ReactNode', 'Field label.')
	]
} as const
