import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type HeadingMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const headingMeta = {
	category: 'typography',
	description: 'Semantic heading primitive with Concrete hierarchy roles.',
	guidance:
		'Use Heading when hierarchy is needed. Level is document structure; hierarchy is visual hierarchy.',
	name: 'Heading',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [
		prop('level', "'1' | '2' | '3' | '4' | '5' | '6'", 'Semantic heading level.'),
		prop(
			'hierarchy',
			"'display' | 'title' | 'section' | 'subsection' | 'label'",
			'Visual hierarchy role.'
		),
		prop('intent', "'default' | 'muted' | 'inverse'", 'Heading intent.'),
		prop('children', 'ReactNode', 'Heading content.')
	]
} as const satisfies HeadingMeta
