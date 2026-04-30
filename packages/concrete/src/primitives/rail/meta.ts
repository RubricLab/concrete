import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type RailMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const railMeta = {
	category: 'layout',
	description: 'Generic rail primitive for vertical tools, side navigation, and token strips.',
	guidance:
		'Use Rail before creating diagram-, composer-, or toolbar-specific rails. Domain behavior stays above it.',
	name: 'Rail',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('orientation', "'vertical' | 'horizontal'", 'Rail direction.'),
		prop('density', "'compact' | 'comfortable' | 'editorial'", 'Rail gap density.'),
		prop('align', "'start' | 'center' | 'end' | 'stretch'", 'Cross-axis alignment.'),
		prop('children', 'ReactNode', 'Rail content.')
	]
} as const satisfies RailMeta
