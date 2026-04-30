import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PanelMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const panelMeta = {
	category: 'surface',
	description: 'Grouped surface with header, body, and footer anatomy.',
	guidance:
		'Use Panel for complete grouped regions. Keep behavior in components and keep repeated-item cards as Card.',
	name: 'Panel',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('title', 'ReactNode', 'Panel title slot.'),
		prop('description', 'ReactNode', 'Panel supporting copy.'),
		prop('footer', 'ReactNode', 'Footer or action dock content.'),
		prop('children', 'ReactNode', 'Panel body content.')
	]
} as const satisfies PanelMeta
