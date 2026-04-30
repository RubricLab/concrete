import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type BrandMarkMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const brandMarkMeta = {
	category: 'brand',
	description: 'Concrete C-glyph in a compact mark tile.',
	guidance:
		'Use the mark sparingly in navigation, docs chrome, and branded empty surfaces. Do not recolor or decorate it locally.',
	name: 'Brand mark',
	pressure: ['editorial', 'product'],
	props: [prop('inverse', 'boolean', 'Flips the mark tile for dark or inverse contexts.', 'false')]
} as const satisfies BrandMarkMeta
