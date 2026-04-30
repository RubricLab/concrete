import { prop } from '../../registry/props'

export const searchBarMeta = {
	category: 'form',
	description:
		'Compact single-line command input with removable scope tokens, keyboard hint, action slots, and optional menu slot.',
	guidance:
		'Search bar is intentionally slot-first: it can stay a search field, become a prompt bar, or host a command menu without changing the primitive contract.',
	name: 'Search bar',
	pressure: ['product', 'generative'],
	props: [
		prop('query', 'string', 'Controlled input query.'),
		prop('defaultValue', 'string', 'Uncontrolled initial query.', "''"),
		prop('tokens', 'readonly SearchToken[]', 'Optional removable scope chips before the input.'),
		prop('actions', 'ReactNode', 'Trailing action slot for submit, filter, or mode controls.'),
		prop('menu', 'ReactNode', 'Popdown slot, commonly a CommandMenu.'),
		prop(
			'menuPlacement',
			"'popdown' | 'inline'",
			'Whether the menu floats over content or reserves flow height.',
			'popdown'
		),
		prop(
			'shortcut',
			'readonly string[]',
			'Keyboard hint rendered as a grouped chord in the field.',
			'[]'
		),
		prop(
			'wrap',
			'boolean',
			'Allows tokens and input to wrap when a composition wants taller search chrome.',
			'false'
		),
		prop('onSubmit', '(query: string) => void', 'Called on form submit.'),
		prop(
			'onTokenRemove',
			'(token: SearchToken) => void',
			'Called when a token close button is clicked.'
		)
	]
} as const
