import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TagMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const tagMeta = {
	category: 'status',
	description: 'Closeable filter or entity label.',
	guidance:
		'Tags identify entities, filters, and scoped state. Use dismissible tags only when removal is available in the surrounding workflow.',
	name: 'Tag',
	pressure: ['product'],
	props: [
		prop(
			'intent',
			"'neutral' | 'strong' | 'subtle' | 'sky' | 'terminal' | 'ultra' | 'danger'",
			'Inline label intent or signal wash.',
			'neutral'
		),
		prop('hierarchy', "'soft' | 'outline'", 'Tag hierarchy.', 'soft'),
		prop(
			'density',
			"'compact' | 'comfortable' | 'editorial'",
			'Tag height and type rhythm.',
			'comfortable'
		),
		prop('active', 'boolean', 'Promotes the tag as currently active.', 'false'),
		prop('selected', 'boolean', 'Shows selected state and default check glyph.', 'false'),
		prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
		prop('dismissible', 'boolean', 'Shows a passive dismiss affordance.', 'false'),
		prop('onDismiss', '() => void', 'Interactive dismiss action.'),
		prop('children', 'ReactNode', 'Tag label.')
	]
} as const satisfies TagMeta
