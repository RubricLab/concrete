import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type SectionMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const sectionMeta = {
	category: 'layout',
	description: 'Titled section primitive for content groups inside panels, pages, and docs.',
	guidance: 'Use Section when the group needs a heading and body but not its own surface treatment.',
	name: 'Section',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [
		prop('title', 'ReactNode', 'Section title.'),
		prop('description', 'ReactNode', 'Optional supporting copy.'),
		prop('separated', 'boolean', 'Adds a boundary before the body.'),
		prop('children', 'ReactNode', 'Section body content.')
	]
} as const satisfies SectionMeta
