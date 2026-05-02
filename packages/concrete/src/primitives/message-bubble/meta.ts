import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type MessageBubbleMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const messageBubbleMeta = {
	category: 'surface',
	description: 'Compact conversational message surface.',
	guidance:
		'Message bubbles are transcript content atoms. Let higher-level message components own avatars, actions, status, and tool state.',
	name: 'Message Bubble',
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
} as const satisfies MessageBubbleMeta
