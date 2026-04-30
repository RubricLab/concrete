import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SearchFieldMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const searchFieldMeta = {
	category: 'control',
	description: 'Search form shell with leading slot, input, tokens, shortcut hint, and menu slot.',
	guidance:
		'SearchField owns search DOM and chrome. SearchBar owns query state, token data, submission, and menu contents.',
	name: 'Search field',
	pressure: ['product', 'generative'],
	props: [
		prop('inputProps', 'InputHTMLAttributes<HTMLInputElement>', 'Native search input props.'),
		prop('tokens', 'ReactNode', 'Optional token rail content.'),
		prop('shortcut', 'readonly ReactNode[]', 'Shortcut key labels.'),
		prop('menu', 'ReactNode', 'Optional search result menu slot.'),
		prop('menuPlacement', "'inline' | 'popdown'", 'Menu placement mode.', 'popdown'),
		prop('wrap', 'boolean', 'Allow token/input wrapping.', 'false')
	]
} as const satisfies SearchFieldMeta
