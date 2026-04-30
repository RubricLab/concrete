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
	description: 'Linear completion primitive with neutral, sky, and signal fills.',
	guidance:
		'Progress shows bounded completion. Use indeterminate only when the duration is unknowable, and keep labels outside the bar.',
	name: 'Progress',
	pressure: ['product', 'generative'],
	props: [
		prop('value', 'number', 'Clamped 0-100 progress value. Optional for indeterminate states.', '0'),
		prop('tone', "'default' | 'sky' | 'terminal' | 'ultra' | 'error'", 'Fill tone.', 'default'),
		prop('size', "'thin' | 'medium' | 'thick'", 'Linear rail thickness.', 'medium'),
		prop('indeterminate', "'shuttle' | 'lined'", 'Unknown-duration progress treatment.'),
		prop('segments', 'number', 'SegmentedProgress segment count.'),
		prop('ProgressRing.size', 'number', 'ProgressRing diameter.'),
		prop('ProgressRing.strokeWidth', 'number', 'ProgressRing stroke width.')
	]
} as const satisfies ProgressMeta
