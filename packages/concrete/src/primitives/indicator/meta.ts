import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type IndicatorMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const indicatorMeta = {
	category: 'data',
	description: 'Dot, legend, and series key punctuation for data surfaces and live rows.',
	guidance:
		'Indicators punctuate status and legends. Keep the label nearby and avoid using the dot as the only carrier of meaning.',
	name: 'Indicator',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'intent',
			"'neutral' | 'muted' | 'sky' | 'terminal' | 'ultra' | 'danger'",
			'Dot semantic intent.',
			'neutral'
		),
		prop('children', 'ReactNode', 'Indicator label.')
	]
} as const satisfies IndicatorMeta
