import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SuggestionMenuMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const suggestionMenuMeta = {
	category: 'control',
	description: 'Composer suggestion popover for mentions, commands, and contextual inserts.',
	guidance:
		'SuggestionMenu owns the composer menu layer, menu panel, title, list, empty state, and option rows. Composer owns trigger detection, filtering, active index, and commit behavior.',
	name: 'Suggestion menu',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Menu title.', '', true),
		prop('trigger', 'ReactNode', 'Trigger label such as @ or /.'),
		prop('children', 'ReactNode', 'Suggestion rows.'),
		prop('active', 'boolean', 'Active row highlight.', 'false')
	]
} as const satisfies SuggestionMenuMeta
