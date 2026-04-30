import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TracePanelMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const tracePanelMeta = {
	category: 'feedback',
	description: 'Disclosure panel for agent trace summaries and step traces.',
	guidance:
		'TracePanel owns disclosure DOM, status mark, summary layout, step list, and step disclosure styling. Components own the step data, labels, and whether trace is shown.',
	name: 'Trace panel',
	pressure: ['product', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Primary trace label.', '', true),
		prop('summary', 'ReactNode', 'Compact trace summary.', '', true),
		prop('stepCount', 'number', 'Displayed step count.', '', true),
		prop('status', "'complete' | 'error' | 'pending' | 'streaming'", 'Trace status.', 'streaming'),
		prop('open', 'boolean', 'Initial disclosure state.', 'false')
	]
} as const satisfies TracePanelMeta
