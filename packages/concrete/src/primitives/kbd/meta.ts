import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type KbdMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const kbdMeta = {
	category: 'typography',
	description: 'Keyboard shortcut keycap.',
	guidance:
		'Use Kbd for short command hints only. Prefer grouped keycaps inside commands and tooltips over explanatory keyboard copy.',
	name: 'Kbd',
	pressure: ['product'],
	props: [
		prop('intent', "'default' | 'inverse'", 'Keycap surface intent.', 'default'),
		prop('children', 'ReactNode', 'Visible key label.')
	]
} as const satisfies KbdMeta
