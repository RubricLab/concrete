import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type ReasoningPanelMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const reasoningPanelMeta = {
	category: 'feedback',
	description: 'Disclosure panel for agent reasoning summaries and step traces.',
	guidance:
		'ReasoningPanel owns disclosure DOM, status mark, summary layout, step list, and step disclosure styling. Components own the step data, labels, and whether reasoning is shown.',
	name: 'Reasoning panel',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Primary reasoning label.', '', true),
		prop('summary', 'ReactNode', 'Compact reasoning summary.', '', true),
		prop('stepCount', 'number', 'Displayed step count.', '', true),
		prop(
			'status',
			"'complete' | 'error' | 'pending' | 'streaming'",
			'Reasoning status.',
			'streaming'
		),
		prop('open', 'boolean', 'Initial disclosure state.', 'false')
	]
} as const satisfies ReasoningPanelMeta
