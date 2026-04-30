import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type FocusRingMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const focusRingMeta = {
	category: 'foundation',
	description: 'Single 3px sky ring standard applied to interactive atoms.',
	guidance:
		'Focus rings are a foundation token. Consume the shared token through Concrete primitives instead of restyling focus locally.',
	name: 'Focus ring',
	pressure: ['product'],
	props: [prop('token', '--concrete-ring-focus', 'Global token applied through :focus-visible.')]
} as const satisfies FocusRingMeta
