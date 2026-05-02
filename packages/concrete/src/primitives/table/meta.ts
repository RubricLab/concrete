import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type TableMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const tableMeta = {
	category: 'data',
	description:
		'Dense table anatomy: viewport, table element, rows, cells, selection, sort, and empty state.',
	guidance:
		'Use Table for product-grade grid anatomy. Keep filtering, sorting, pagination state, row ids, column definitions, and rich cell data mapping in the owning component.',
	name: 'Table',
	pressure: ['product'],
	props: [
		prop('Table.children', 'ReactNode', 'Table sections and row content.'),
		prop('TableViewport.maxBlockSize', 'string', 'Optional runtime max-block-size token or value.'),
		prop('TableHeaderCell.align', "'left' | 'center' | 'right'", 'Header cell alignment.', 'left'),
		prop('TableHeaderCell.frozen', 'boolean', 'Pins the cell to the inline start.', 'false'),
		prop('TableHeaderCell.width', 'string', 'Runtime column width.'),
		prop('TableCell.align', "'left' | 'center' | 'right'", 'Body cell alignment.', 'left'),
		prop('TableSortButton.sortable', 'boolean', 'Enables sort affordance.', 'false'),
		prop('TableRow.selected', 'boolean', 'Marks a selected row.', 'false')
	]
} as const satisfies TableMeta
