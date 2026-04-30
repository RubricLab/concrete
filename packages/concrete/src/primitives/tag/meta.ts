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
			'tone',
			"'default' | 'ink' | 'sky' | 'sunken' | 'terminal' | 'ultra' | 'error'",
			'Inline label tone or signal wash.',
			'default'
		),
		prop('variant', "'default' | 'outline' | 'active' | 'selected'", 'Tag emphasis.', 'default'),
		prop('size', "'small' | 'medium' | 'large'", 'Tag height and type rhythm.', 'medium'),
		prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
		prop('dismissible', 'boolean', 'Shows a passive dismiss affordance.', 'false'),
		prop('onDismiss', '() => void', 'Interactive dismiss action.'),
		prop('children', 'ReactNode', 'Tag label.')
	]
} as const satisfies TagMeta
