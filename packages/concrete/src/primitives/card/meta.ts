import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type CardMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const cardMeta = {
	category: 'surface',
	description: 'Hairline surface primitive with raised, sunken, and interactive variants.',
	guidance:
		'Cards are bounded content surfaces. Prefer bare sections for page structure and cards only for repeated items, modals, or framed tools.',
	name: 'Card',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [
		prop('variant', "'default' | 'raised' | 'sunken'", 'Surface depth treatment.', 'default'),
		prop('interactive', 'boolean', 'Adds hover affordance for clickable card compositions.', 'false'),
		prop('title', 'ReactNode', 'Optional compact title.'),
		prop('description', 'ReactNode', 'Optional supporting copy.'),
		prop('children', 'ReactNode', 'Card content slot.')
	]
} as const satisfies CardMeta
