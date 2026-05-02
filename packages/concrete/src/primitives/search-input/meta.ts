import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SearchInputMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const searchInputMeta = {
	category: 'control',
	description: 'Search input anatomy with icon, token, shortcut, action, and trailing slots.',
	guidance:
		'Use SearchInput for the input chrome. Keep query state, submit behavior, and suggestions in components.',
	name: 'SearchInput',
	pressure: ['product', 'generative'],
	props: [
		prop('inputProps', 'InputHTMLAttributes<HTMLInputElement>', 'Native input props.'),
		prop('tokens', 'ReactNode', 'Selected token slot.'),
		prop('shortcut', 'ReactNode[]', 'Shortcut hint slot.'),
		prop('wrap', 'boolean', 'Whether tokens can wrap.')
	]
} as const satisfies SearchInputMeta
