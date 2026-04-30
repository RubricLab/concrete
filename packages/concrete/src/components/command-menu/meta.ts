import { prop } from '../../registry/props'

export const commandMenuMeta = {
	category: 'navigation',
	description:
		'Searchable action and navigation listbox with grouped items, keyboard navigation, shortcuts, loading, and empty states.',
	guidance:
		'Command menu is the shared substrate for palettes, / commands, @ suggestions, quick switchers, and model/action pickers.',
	name: 'Command menu',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'items',
			'readonly CommandMenuItem[]',
			'Grouped command items with labels, metadata, shortcuts, and disabled state.',
			undefined,
			true
		),
		prop('query', 'string', 'Controlled search query.'),
		prop('defaultActiveId', 'string', 'Initial active item id for uncontrolled navigation.'),
		prop('activeId', 'string', 'Controlled active item id.'),
		prop('searchable', 'boolean', 'Renders the search input header.', 'true'),
		prop('loading', 'boolean', 'Shows a pending remote results row.', 'false'),
		prop(
			'onSelect',
			'(item: CommandMenuItem) => void',
			'Called when Enter, Tab, or click selects an enabled item.'
		),
		prop('onEscape', '() => void', 'Called when Escape closes the menu.')
	]
} as const
