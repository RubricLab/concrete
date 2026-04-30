import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ClusterMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const clusterMeta = {
	category: 'layout',
	description: 'Wrapping inline group for chips, tags, actions, filters, and token sets.',
	guidance:
		'Use Cluster when horizontal children may wrap. Keep it for grouping, not for bespoke spacing overrides.',
	name: 'Cluster',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('density', "'compact' | 'comfortable' | 'editorial'", 'Wrap and row-gap density.'),
		prop('align', "'start' | 'center' | 'end' | 'stretch'", 'Cross-axis alignment.'),
		prop('justify', "'start' | 'center' | 'end' | 'between'", 'Main-axis distribution.'),
		prop('children', 'ReactNode', 'Cluster content.')
	]
} as const satisfies ClusterMeta
