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
	description: 'Semantic heading primitive with Concrete size roles.',
	guidance:
		'Use Heading when hierarchy is needed. Level is document structure; size is visual hierarchy.',
	name: 'Heading',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [
		prop('level', "'1' | '2' | '3' | '4' | '5' | '6'", 'Semantic heading level.'),
		prop('size', "'display' | 'title' | 'section' | 'subsection' | 'label'", 'Visual size role.'),
		prop('tone', "'default' | 'muted' | 'inverse'", 'Heading tone.'),
		prop('children', 'ReactNode', 'Heading content.')
	]
} as const satisfies HeadingMeta
