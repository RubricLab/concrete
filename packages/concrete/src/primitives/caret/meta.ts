import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type CaretMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const caretMeta = {
	category: 'control',
	description: 'Disclosure chevron with open, directional, and scale states.',
	guidance:
		'Caret is an affordance, not decoration. Keep it currentColor, small, and baseline-aligned beside tree rows, accordions, and selects.',
	name: 'Caret',
	pressure: ['product'],
	props: [
		prop('direction', "'right' | 'down' | 'up'", 'Base chevron orientation.', 'right'),
		prop('open', 'boolean', 'Rotates the caret to the disclosure-open state.', 'false'),
		prop('scale', "'small' | 'medium' | 'large'", 'Caret box and stroke rhythm.', 'medium')
	]
} as const satisfies CaretMeta
