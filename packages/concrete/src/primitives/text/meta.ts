import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TextMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const textMeta = {
	category: 'typography',
	description: 'Body, lead, meta, caption, mono, numeric, and prose text primitive.',
	guidance:
		'Use Text before hard-coding font recipes. Purpose and intent map to typography and color foundations.',
	name: 'Text',
	pressure: ['product', 'editorial', 'generative', 'educational'],
	props: [
		prop(
			'purpose',
			"'body' | 'lead' | 'meta' | 'caption' | 'mono' | 'number' | 'prose'",
			'Text role.'
		),
		prop('intent', "'default' | 'muted' | 'soft' | signal", 'Text color intent.'),
		prop('as', "'span' | 'p' | 'div' | 'small' | 'strong' | 'code'", 'Rendered element.'),
		prop('children', 'ReactNode', 'Text content.')
	]
} as const satisfies TextMeta
