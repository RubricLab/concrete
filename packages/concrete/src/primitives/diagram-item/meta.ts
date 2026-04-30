import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DiagramItemMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const diagramItemMeta = {
	category: 'diagram',
	description:
		'Supporting evidence item for metrics, notes, code, documents, charts, tables, and status.',
	guidance:
		'Diagram items are secondary evidence inside a graph; they should not compete with the main nodes.',
	name: 'Diagram item',
	pressure: ['educational', 'editorial', 'generative'],
	props: [
		prop('title', 'ReactNode', 'Primary item label.', '', true),
		prop('value', 'ReactNode', 'Optional prominent value.'),
		prop('body', 'ReactNode', 'Optional supporting copy.'),
		prop('meta', 'ReactNode', 'Optional small metadata.'),
		prop(
			'kind',
			"'card' | 'chart' | 'code' | 'document' | 'metric' | 'note' | 'status' | 'table'",
			'Item evidence type.',
			'note'
		),
		prop(
			'tone',
			"'ink' | 'muted' | 'sky' | 'terminal' | 'ultra' | 'error'",
			'Concrete-native item tone.',
			'ink'
		),
		prop('selected', 'boolean', 'Selected canvas state.', 'false'),
		prop('muted', 'boolean', 'Background canvas state.', 'false')
	]
} as const satisfies DiagramItemMeta
