import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type BubbleMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const bubbleMeta = {
	category: 'surface',
	description: 'Compact conversational message surface.',
	guidance:
		'Bubbles are message atoms. Use them for transcript content and let higher-level message components own avatars, actions, and tool state.',
	name: 'Bubble',
	pressure: ['generative', 'product'],
	props: [
		prop(
			'direction',
			"'inbound' | 'outbound'",
			'Controls neutral or ink-filled message treatment.',
			'inbound'
		),
		prop('children', 'ReactNode', 'Bubble content.')
	]
} as const satisfies BubbleMeta
