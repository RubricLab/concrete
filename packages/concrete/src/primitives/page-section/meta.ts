import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PageSectionMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const pageSectionMeta = {
	category: 'layout',
	description: 'Page-level rhythm primitive for hero, chapter, and standard content bands.',
	guidance:
		'Use PageSection when a page needs full-width rhythm or a generic texture ground before composing Container and other layout primitives inside it.',
	name: 'PageSection',
	pressure: ['editorial', 'product', 'generative', 'educational'],
	props: [
		prop('rhythm', "'standard' | 'hero' | 'chapter'", 'Section spacing and minimum block rhythm.'),
		prop(
			'ground',
			"'plain' | 'field' | 'perspective' | 'depth'",
			'Optional foundation-backed texture ground.'
		),
		prop('intent', "'default' | 'inverse'", 'Foreground and background intent.'),
		prop('separated', 'boolean', 'Adds a token-backed boundary after the section.'),
		prop('children', 'ReactNode', 'Page section content.')
	]
} as const satisfies PageSectionMeta
