import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type LabelMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const labelMeta = {
	category: 'typography',
	description: 'Passive label primitive for compact metadata, field labels, and status text.',
	guidance:
		'Use Label as the base label grammar before reaching for Badge, Pill, Tag, or item-local label styles.',
	name: 'Label',
	pressure: ['product', 'generative', 'educational'],
	props: [
		prop('purpose', "'compact' | 'field' | 'meta' | 'status'", 'Label role.'),
		prop(
			'intent',
			"'neutral' | 'strong' | 'subtle' | 'sky' | 'terminal' | 'ultra' | 'danger'",
			'Semantic label intent.',
			'neutral'
		),
		prop('marker', 'boolean', 'Shows a passive tone marker.'),
		prop('children', 'ReactNode', 'Label content.')
	]
} as const satisfies LabelMeta
