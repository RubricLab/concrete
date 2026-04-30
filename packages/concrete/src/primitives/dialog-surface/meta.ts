import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DialogSurfaceMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const dialogSurfaceMeta = {
	category: 'surface',
	description: 'Dialog panel sizing and dialog semantics for overlay workflows.',
	guidance:
		'Use DialogSurface inside Overlay. Keep form behavior and state in components, not in the dialog primitive.',
	name: 'DialogSurface',
	pressure: ['product', 'generative'],
	props: [
		prop('size', "'compact' | 'default' | 'wide'", 'Dialog width role.'),
		prop('modal', 'boolean', 'Whether to set aria-modal.'),
		prop('children', 'ReactNode', 'Dialog content, usually Panel.')
	]
} as const satisfies DialogSurfaceMeta
