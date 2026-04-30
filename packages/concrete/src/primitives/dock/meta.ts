import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DockMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const dockMeta = {
	category: 'layout',
	description: 'Attached command dock for panel footers, composer actions, and overlay controls.',
	guidance:
		'Use Dock for attached action regions. It owns border placement and rhythm, not workflow behavior.',
	name: 'Dock',
	pressure: ['product', 'generative'],
	props: [
		prop('placement', "'top' | 'bottom' | 'inline'", 'Attachment edge or inline mode.'),
		prop('align', "'start' | 'center' | 'end' | 'between'", 'Action distribution.'),
		prop('density', "'compact' | 'comfortable' | 'editorial'", 'Dock rhythm density.'),
		prop('children', 'ReactNode', 'Dock commands or status content.')
	]
} as const satisfies DockMeta
