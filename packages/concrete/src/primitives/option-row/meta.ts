import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type OptionRowMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const optionRowMeta = {
	category: 'control',
	description: 'Reusable button row for command menus and selectable listbox options.',
	guidance:
		'OptionRow owns dense option-row DOM, icon/copy/aside slots, active/selected states, and command or select row sizing. Parent components own filtering, active-index movement, and selection state.',
	name: 'Option row',
	pressure: ['product', 'generative'],
	props: [
		prop('kind', "'command' | 'select'", 'Row density and slot treatment.', 'select'),
		prop('children', 'ReactNode', 'Visible row label.', '', true),
		prop('description', 'ReactNode', 'Optional secondary copy.'),
		prop('leadingIcon', 'IconName', 'Optional leading glyph.'),
		prop('meta', 'ReactNode', 'Optional right-side metadata.'),
		prop('active', 'boolean', 'Command active highlight.', 'false'),
		prop('selected', 'boolean', 'Selected option highlight.', 'false'),
		prop(
			'intent',
			"'default' | 'error' | 'sky' | 'terminal' | 'ultra'",
			'Semantic command intent.',
			'default'
		)
	]
} as const satisfies OptionRowMeta
