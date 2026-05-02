import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ProgressRingMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const progressRingMeta = {
	category: 'data',
	description: 'Circular progress primitive for compact generated summaries and meters.',
	guidance:
		'ProgressRing shows one bounded value when a circular readout is more scannable than a linear rail. Keep labels in the surrounding surface.',
	name: 'ProgressRing',
	pressure: ['product', 'generative'],
	props: [
		prop('value', 'number', 'Clamped 0-100 progress value.', '0'),
		prop('intent', "'neutral' | 'sky' | 'terminal' | 'ultra' | 'danger'", 'Ring intent.', 'neutral'),
		prop('density', "'compact' | 'comfortable' | 'editorial'", 'Ring scale.', 'comfortable')
	]
} as const satisfies ProgressRingMeta
