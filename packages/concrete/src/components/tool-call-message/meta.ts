import { prop } from '../../registry/props'

export const toolCallMessageMeta = {
	category: 'feedback',
	description:
		'Collapsible tool execution artifact with status, duration, optional input code, and output.',
	guidance:
		'Tool call message makes agent work inspectable. The component renders status and artifacts; application code owns execution and permissions.',
	name: 'Tool call message',
	pressure: ['generative', 'product'],
	props: [
		prop('name', 'ReactNode', 'Tool or function name.', undefined, true),
		prop('status', "'queued' | 'running' | 'success' | 'error'", 'Tool execution status.', 'running'),
		prop('open', 'boolean', 'Initial disclosure state. Running calls open by default.'),
		prop('duration', 'ReactNode', 'Elapsed time or latency label.'),
		prop('input', 'string', 'Optional input code block.'),
		prop('output', 'ReactNode', 'Result or error output slot.'),
		prop('toolIcon', 'IconName', 'Leading tool glyph.', 'terminal')
	]
} as const
