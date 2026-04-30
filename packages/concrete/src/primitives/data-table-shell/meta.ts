import { prop } from '../../registry/props'
import type { ConcretePressure, PrimitiveCategory } from '../../schemas'

type DataTableShellMeta = {
	category: PrimitiveCategory
	description: string
	guidance: string
	name: string
	pressure: readonly ConcretePressure[]
	props: readonly ReturnType<typeof prop>[]
}

export const dataTableShellMeta = {
	category: 'data',
	description:
		'Dense table card, scroll region, table element, cells, selection, sort, and empty state.',
	guidance:
		'Use DataTableShell for product-grade grid anatomy. Keep filtering, sorting, pagination state, row ids, column definitions, and rich cell data mapping in the owning component.',
	name: 'Data Table Shell',
	pressure: ['product'],
	props: [
		prop('DataTableShell.children', 'ReactNode', 'Header, scroll/table, and pagination content.'),
		prop('DataTableScroll.maxHeight', 'string', 'Optional runtime max-height token or value.'),
		prop(
			'DataTableHeaderCell.align',
			"'left' | 'center' | 'right'",
			'Header cell alignment.',
			'left'
		),
		prop('DataTableHeaderCell.frozen', 'boolean', 'Pins the cell to the inline start.', 'false'),
		prop('DataTableHeaderCell.width', 'string', 'Runtime column width.'),
		prop('DataTableCell.align', "'left' | 'center' | 'right'", 'Body cell alignment.', 'left'),
		prop('DataTableSortButton.sortable', 'boolean', 'Enables sort affordance.', 'false'),
		prop('DataTableTableRow.selected', 'boolean', 'Marks a selected row.', 'false')
	]
} as const satisfies DataTableShellMeta
