import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type OverlayMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const overlayMeta = {
	category: 'surface',
	description: 'Generic overlay stack for dialog, drawer, and popover presentation.',
	guidance:
		'Overlay owns stack placement and scrim policy. Dialog, drawer, and picker surfaces own the panel shape inside it.',
	name: 'Overlay',
	pressure: ['product'],
	props: [
		prop('presentation', "'inline' | 'fixed'", 'Overlay positioning context.'),
		prop('placement', "'center' | 'start' | 'end' | 'stretch'", 'Child placement inside the stack.'),
		prop('scrim', 'boolean', 'Whether to render scrim treatment.'),
		prop('children', 'ReactNode', 'Overlay content.')
	]
} as const satisfies OverlayMeta
