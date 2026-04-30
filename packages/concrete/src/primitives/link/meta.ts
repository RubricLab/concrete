import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type LinkMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const linkMeta = {
	category: 'navigation',
	description: 'Ink-first text link with restrained underline treatment.',
	guidance:
		'Links should read as text first. Use nav for compact navigation lists and external only when destination context changes.',
	name: 'Link',
	pressure: ['editorial', 'product'],
	props: [
		prop('href', 'string', 'Native anchor destination.'),
		prop('tone', "'default' | 'sky' | 'muted'", 'Inline link tone.', 'default'),
		prop('variant', "'inline' | 'nav'", 'Prose underline or nav-link treatment.', 'inline'),
		prop('current', 'boolean', 'Marks the link as the current page and sets aria-current.', 'false'),
		prop('external', 'boolean', 'Appends an external-link glyph.', 'false'),
		prop('children', 'ReactNode', 'Link text.')
	]
} as const satisfies LinkMeta
