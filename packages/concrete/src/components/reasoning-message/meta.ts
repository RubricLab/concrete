import { prop } from '../../registry/props'

export const reasoningMessageMeta = {
	category: 'feedback',
	description:
		'Subdued expandable reasoning line for visible agent progress, scoped steps, and streaming state.',
	guidance:
		'Reasoning message communicates process as a collapsible progress artifact. It stays visually below final answers and generated UI.',
	name: 'Reasoning message',
	pressure: ['generative', 'product'],
	props: [
		prop('title', 'ReactNode', 'Reasoning artifact title.', 'Reasoning'),
		prop('summary', 'ReactNode', 'Visible process summary without private chain-of-thought.'),
		prop(
			'steps',
			'readonly ReasoningMessageStep[]',
			'Structured collapsible progress steps validated by reasoningStepSchema, with optional render detail.'
		),
		prop('open', 'boolean', 'Initial details disclosure state.', 'false'),
		prop('status', "'complete' | 'error' | 'pending' | 'streaming'", 'Reasoning status.', 'streaming')
	]
} as const
