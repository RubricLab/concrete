import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type PillMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const pillMeta = {
	category: 'status',
	description: 'Quiet inline metadata label.',
	guidance:
		'Pills are passive metadata. Use them for short labels and status context, not for commands or high-emphasis alerts.',
	name: 'Pill',
	pressure: ['product', 'editorial'],
	props: [
		prop(
			'intent',
			"'neutral' | 'strong' | 'subtle' | 'sky' | 'terminal' | 'ultra' | 'danger'",
			'Inline label intent or quiet signal wash.',
			'neutral'
		),
		prop('leadingIcon', 'IconName | ReactElement', 'Optional leading glyph.'),
		prop('children', 'ReactNode', 'Pill label.')
	]
} as const satisfies PillMeta
