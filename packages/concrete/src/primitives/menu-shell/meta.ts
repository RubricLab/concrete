import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type MenuShellMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const menuShellMeta = {
	category: 'control',
	description: 'Panel, search rail, grouping, empty state, and footer chrome for dense menus.',
	guidance:
		'MenuShell owns command-menu surface anatomy and static slots. Components own filtering, keyboard movement, loading state, and item selection.',
	name: 'Menu shell',
	pressure: ['product', 'generative'],
	props: [
		prop(
			'children',
			'ReactNode',
			'Menu search, body, groups, rows, empty states, and footer.',
			'',
			true
		),
		prop('searchable', 'boolean', 'Example search slot visibility.', 'true'),
		prop('heading', 'string', 'Footer heading used by generated examples.', 'Commands'),
		prop(
			'showEmpty',
			'boolean',
			'Render generated examples with the empty state instead of rows.',
			'false'
		),
		prop('empty', 'string', 'Empty state copy used by generated examples.', 'No matches')
	]
} as const satisfies MenuShellMeta
