import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type IconMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const iconMeta = {
	category: 'foundation',
	description: 'Lucide-compatible currentColor icon surface.',
	guidance:
		'Icons inherit currentColor and should stay subordinate to labels, buttons, and rows. Prefer the typed Concrete icon registry over inline SVG.',
	name: 'Icon',
	pressure: ['product'],
	props: [
		prop('name', 'IconName', 'Typed Concrete icon name.', '', true),
		prop('title', 'string', 'Optional accessible title.')
	]
} as const satisfies IconMeta
