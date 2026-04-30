import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type HeaderMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const headerMeta = {
	category: 'typography',
	description: 'Title, description, meta, and action header anatomy.',
	guidance:
		'Use Header for local hierarchy before creating data-header, form-header, or route-header variants.',
	name: 'Header',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [
		prop('title', 'ReactNode', 'Primary heading slot.'),
		prop('description', 'ReactNode', 'Supporting description slot.'),
		prop('meta', 'ReactNode', 'Trailing metadata slot.'),
		prop('actions', 'ReactNode', 'Trailing action slot.')
	]
} as const satisfies HeaderMeta
