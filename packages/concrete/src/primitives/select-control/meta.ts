import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SelectControlMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const selectControlMeta = {
	category: 'control',
	description: 'Closed multi-value select control with value rail and toggle affordance.',
	guidance:
		'SelectControl owns the closed control shell, value rail, placeholder state, and toggle button. MultiSelect owns selected value data and open state.',
	name: 'Select control',
	pressure: ['product'],
	props: [
		prop('children', 'ReactNode', 'Selected value rail or placeholder text.', '', true),
		prop('empty', 'boolean', 'Applies placeholder treatment.', 'false'),
		prop('open', 'boolean', 'Applies open focus and toggle rotation.', 'false'),
		prop('onToggle', 'MouseEventHandler<HTMLButtonElement>', 'Toggle click handler.')
	]
} as const satisfies SelectControlMeta
