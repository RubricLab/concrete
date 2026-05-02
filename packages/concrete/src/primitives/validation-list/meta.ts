import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ValidationListMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const validationListMeta = {
	category: 'feedback',
	description: 'Structured validation issue list for forms, settings, and generated panels.',
	guidance:
		'Use ValidationList for issue anatomy only. Validation derivation and submit behavior belong in components.',
	name: 'ValidationList',
	pressure: ['product', 'generative'],
	props: [
		prop('items', 'ValidationListItem[]', 'Validation issue rows.'),
		prop('status', 'FieldStatus', 'Default row status.')
	]
} as const satisfies ValidationListMeta
