import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DistributionMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const distributionMeta = {
	category: 'data',
	description: 'Part-to-whole bar list for dense summary data.',
	guidance:
		'Distribution is for small labeled shares. Use it when comparison matters more than exact chart reading.',
	name: 'Distribution',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'data',
			'readonly { label: string; value: number; tone?: ProgressTone }[]',
			'Part-to-whole rows.',
			'',
			true
		)
	]
} as const satisfies DistributionMeta
