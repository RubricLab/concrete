import { prop } from '../../registry/props'

export const dataTableMeta = {
	category: 'data',
	description:
		'Dense typed table with sortable columns, selection, search, filters, pagination, and rich cells.',
	guidance:
		'Data table is the canonical product grid for Concrete. Use createDataTableColumns<Row>() to keep columns aligned to row data.',
	name: 'Data table',
	pressure: ['product'],
	props: [
		prop(
			'columns',
			'readonly DataTableColumn<Row>[]',
			'Typed column definitions. Use createDataTableColumns<Row>() for best DX.',
			undefined,
			true
		),
		prop(
			'rows',
			'readonly Row[]',
			'Typed row data with primitive or rich cell values.',
			undefined,
			true
		),
		prop('title', 'string', 'Optional table title.'),
		prop('caption', 'string', 'Muted supporting copy.'),
		prop('selectable', 'boolean', 'Adds a checkbox selection column.', 'false'),
		prop('selectedRowIds', 'readonly string[]', 'Controlled selected row ids.', '[]'),
		prop('sort', 'DataTableSort', 'Controlled sort state.'),
		prop('filters', 'readonly DataTableFilter[]', 'Compact toolbar filter controls.', '[]'),
		prop('searchValue', 'string', 'Controlled search query.', "''"),
		prop('searchPlaceholder', 'string', 'Search input placeholder.', 'Search rows'),
		prop('pagination', 'DataTablePagination', 'Optional page status and controls.'),
		prop('toolbarActions', 'readonly DataTableToolbarAction[]', 'Right-side table toolbar actions.'),
		prop('getRowId', '(row: Row, rowIndex: number) => string', 'Custom stable row id resolver.'),
		prop('onSortChange', '(sort: DataTableSort | null) => void', 'Receives local sort changes.'),
		prop(
			'onFilterChange',
			'(filterId: string, value: string) => void',
			'Receives filter selection changes.'
		),
		prop('onPageChange', '(page: number, pageSize: number) => void', 'Receives pagination clicks.'),
		prop(
			'onRowSelectionChange',
			'(selectedRowIds: readonly string[]) => void',
			'Receives row selection changes.'
		),
		prop(
			'onToolbarAction',
			'(actionId: string, selectedRowIds: readonly string[]) => void',
			'Receives table toolbar action clicks.'
		)
	]
} as const
