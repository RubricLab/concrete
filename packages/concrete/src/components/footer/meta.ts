import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FooterMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const footerMeta = {
	category: 'navigation',
	description:
		'Generic footer composition for brand copy, grouped links, actions, and an aside slot.',
	guidance:
		'Use Footer for package, product, and documentation footers. Route files provide copy and links; Footer provides Concrete hierarchy and layout.',
	name: 'Footer',
	pressure: ['product', 'editorial'],
	props: [
		prop('title', 'ReactNode', 'Primary footer heading.'),
		prop('description', 'ReactNode', 'Supporting brand or page copy.'),
		prop('brand', 'ReactNode', 'Optional brand slot.'),
		prop('meta', 'ReactNode', 'Small secondary metadata.'),
		prop('columns', 'readonly FooterColumn[]', 'Grouped footer navigation links.'),
		prop('actions', 'readonly FooterLink[]', 'Inline footer action links.'),
		prop('aside', 'ReactNode', 'Optional supporting surface such as a command block.'),
		prop(
			'density',
			"'compact' | 'comfortable' | 'editorial'",
			'Footer composition density.',
			'compact'
		)
	]
} as const satisfies FooterMeta
