import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ChipMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const chipMeta = {
	category: 'control',
	description: 'Selectable inline filter or segmented choice atom.',
	guidance:
		'Chips are compact choices. Use selected for active filters and keep non-selected tone quiet unless the filter group needs a visual anchor.',
	name: 'Chip',
	pressure: ['product'],
	props: [
		prop('selected', 'boolean', 'Promotes the chip into the active ink state.', 'false'),
		prop(
			'intent',
			"'neutral' | 'strong' | 'subtle' | 'sky' | 'terminal' | 'ultra' | 'danger'",
			'Non-selected semantic intent.',
			'neutral'
		),
		prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
		prop('children', 'ReactNode', 'Chip label.')
	]
} as const satisfies ChipMeta
