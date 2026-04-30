import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type MessageShellMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const messageShellMeta = {
	category: 'feedback',
	description: 'Message row anatomy for agent, tool, system, and user transcript surfaces.',
	guidance:
		'MessageShell owns transcript row DOM, avatar slot, stack, meta row, plain/bubble bridges, and action rail. Components own message data, role semantics, status mapping, and generated content.',
	name: 'Message shell',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'messageRole',
			"'assistant' | 'system' | 'tool' | 'user'",
			'Message direction and role.',
			'assistant'
		),
		prop('surface', "'bubble' | 'plain'", 'Content surface mode.', 'bubble'),
		prop('grouped', 'boolean', 'Compact spacing when grouped with nearby messages.', 'false'),
		prop('meta', 'ReactNode', 'Optional meta row content.'),
		prop('avatar', 'ReactNode', 'Optional avatar slot.'),
		prop('actions', 'ReactNode', 'Optional action rail.')
	]
} as const satisfies MessageShellMeta
