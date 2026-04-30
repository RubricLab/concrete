import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ContainerMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const containerMeta = {
	category: 'layout',
	description: 'Tokenized page-width wrapper with responsive inline padding.',
	guidance:
		'Use Container for page and landmark width constraints. It owns max measure and inline padding, not nested layout rhythm.',
	name: 'Container',
	pressure: ['product', 'editorial', 'educational'],
	props: [
		prop('as', 'ContainerElement', 'Semantic wrapper element.', 'div'),
		prop('measure', "'content' | 'wide' | 'full'", 'Maximum inline measure recipe.', 'wide'),
		prop(
			'density',
			"'compact' | 'comfortable' | 'editorial'",
			'Inline padding density.',
			'comfortable'
		),
		prop('children', 'ReactNode', 'Contained page or section content.')
	]
} as const satisfies ContainerMeta
