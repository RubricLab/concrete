import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type WordmarkMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const wordmarkMeta = {
	category: 'brand',
	description: 'Rubric wordmark text treatment for docs and product chrome.',
	guidance:
		'Use the wordmark in brand chrome only. Keep it unmodified and avoid pairing it with competing decorative marks.',
	name: 'Wordmark',
	pressure: ['editorial', 'product'],
	props: [prop('children', 'never', 'The wordmark renders the Rubric text treatment.')]
} as const satisfies WordmarkMeta
