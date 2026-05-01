import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type StatMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const statMeta = {
	category: 'data',
	description: 'KPI number lockup for dense dashboards.',
	guidance:
		'Stats are scan targets. Keep labels short, pair deltas sparingly, and use display scale only for editorial emphasis.',
	name: 'Stat',
	pressure: ['product', 'generative'],
	props: [
		prop('label', 'ReactNode', 'Optional metric label for lockups.'),
		prop('value', 'ReactNode', 'Large numeric value.', '', true),
		prop('unit', 'ReactNode', 'Baseline unit suffix.'),
		prop(
			'purpose',
			"'lockup' | 'numeric' | 'display'",
			'Dashboard or editorial numeric treatment.',
			'lockup'
		),
		prop(
			'density',
			"'micro' | 'compact' | 'comfortable' | 'editorial' | 'display'",
			'Numeric rhythm.',
			'comfortable'
		),
		prop('intent', "'neutral' | 'muted' | 'sky'", 'Numeric semantic intent.', 'neutral'),
		prop('delta', 'ReactNode', 'Optional Delta slot.'),
		prop('meta', 'ReactNode', 'Optional muted suffix.')
	]
} as const satisfies StatMeta
