import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SelectMenuMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const selectMenuMeta = {
	category: 'control',
	description: 'Popover menu and optional filter field for selectable option rows.',
	guidance:
		'SelectMenu owns the popover panel, filter input, and listbox stack. Components own filtering, selected values, and option data.',
	name: 'Select menu',
	pressure: ['product'],
	props: [
		prop('children', 'ReactNode', 'Option row children.', '', true),
		prop('filterInputProps', 'InputHTMLAttributes<HTMLInputElement>', 'Optional filter input props.'),
		prop('listboxProps', 'HTMLAttributes<HTMLDivElement>', 'Native listbox props.'),
		prop(
			'placement',
			"'floating' | 'inline'",
			'Panel placement mode for popover or specimen usage.',
			'floating'
		)
	]
} as const satisfies SelectMenuMeta
