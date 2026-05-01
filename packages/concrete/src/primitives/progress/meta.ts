import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ProgressMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const progressMeta = {
	category: 'data',
	description: 'Linear completion primitive with bounded and indeterminate states.',
	guidance:
		'Progress shows bounded completion. Use ProgressRing for circular summaries and SegmentedProgress for step completion.',
	name: 'Progress',
	pressure: ['product', 'generative'],
	props: [
		prop('value', 'number', 'Clamped 0-100 progress value. Optional for indeterminate states.', '0'),
		prop('intent', "'neutral' | 'sky' | 'terminal' | 'ultra' | 'danger'", 'Fill intent.', 'neutral'),
		prop(
			'density',
			"'compact' | 'comfortable' | 'editorial'",
			'Linear rail thickness.',
			'comfortable'
		),
		prop('indeterminate', "'shuttle' | 'lined'", 'Unknown-duration progress treatment.')
	]
} as const satisfies ProgressMeta
