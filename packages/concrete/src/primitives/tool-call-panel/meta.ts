import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ToolCallPanelMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const toolCallPanelMeta = {
	category: 'feedback',
	description: 'Disclosure panel for agent tool-call status, input code, and output.',
	guidance:
		'ToolCallPanel owns tool disclosure DOM, status chip, code-block bridge, body stack, and output surface. Components own tool status mapping, execution data, and message composition.',
	name: 'Tool-call panel',
	pressure: ['product', 'generative'],
	props: [
		prop('name', 'ReactNode', 'Tool name.', '', true),
		prop('status', "'queued' | 'running' | 'success' | 'error'", 'Tool-call status.', 'running'),
		prop('duration', 'ReactNode', 'Optional duration label.'),
		prop('toolIcon', 'IconName', 'Leading tool glyph.', 'terminal'),
		prop('children', 'ReactNode', 'Code and output content.')
	]
} as const satisfies ToolCallPanelMeta
