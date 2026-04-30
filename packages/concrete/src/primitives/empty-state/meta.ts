import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type EmptyStateMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const emptyStateMeta = {
	category: 'feedback',
	description: 'Blank-slate composition with dashed glyph tile and terse copy.',
	guidance:
		'Empty states should explain the absence and offer one next action when useful. Keep copy direct and avoid decorative illustration.',
	name: 'Empty state',
	pressure: ['product', 'educational'],
	props: [
		prop('title', 'ReactNode', 'Primary blank-state message.', '', true),
		prop('body', 'ReactNode', 'Muted explanation.'),
		prop('icon', 'IconName | ReactElement', 'Glyph inside the dashed mark tile.', 'search'),
		prop('size', "'small' | 'medium' | 'large'", 'Mark tile scale.', 'medium'),
		prop('tone', "'default' | 'sky'", 'Default ink or sky mark treatment.', 'default'),
		prop('action', 'ReactNode', 'Optional CTA row.')
	]
} as const satisfies EmptyStateMeta
