import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SelectMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const selectMeta = {
	category: 'form',
	description: 'Native option picker styled to the Concrete field rhythm.',
	guidance:
		'Select keeps choice semantics native. Use components only when search or multiple selection is required.',
	name: 'Select',
	pressure: ['product'],
	props: [
		prop(
			'options',
			'readonly { label: string; value: string; disabled?: boolean }[]',
			'Native select options.',
			'',
			true
		),
		prop('label', 'ReactNode', 'Optional field label.'),
		prop('help', 'ReactNode', 'Muted helper text.'),
		prop('error', 'ReactNode', 'Error copy and invalid treatment.')
	]
} as const satisfies SelectMeta
