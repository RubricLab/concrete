import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type RowMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const rowMeta = {
	category: 'layout',
	description: 'Compact scan-line primitive for lists, menus, and dense product panes.',
	guidance:
		'Rows are the base unit of product density. Keep metadata right-aligned, truncate labels, and use one leading affordance.',
	name: 'Row',
	pressure: ['product', 'generative'],
	props: [
		prop('leadingIcon', 'IconName | ReactElement', 'Icon tile at the row start.'),
		prop('meta', 'ReactNode', 'Right-aligned mono metadata.'),
		prop('interactive', 'boolean', 'Adds hover surface treatment.', 'false'),
		prop('children', 'ReactNode', 'Row label.')
	]
} as const satisfies RowMeta
