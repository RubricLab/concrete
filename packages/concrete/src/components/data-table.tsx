import type { ReactNode } from 'react'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { dataTableSchema } from '../schemas'
import { DataTable } from './data-table-view'

export * from './data-table-view'

import { DataWideStage, dataTableColumns, dataTableRows } from './data-fixtures'

export const dataTableComponentDefinition = defineConcreteComponent({
	category: 'data',
	component: DataTable,
	controls: [
		selectControl('fixture', 'Fixture', 'default', ['default', 'selected', 'filtered', 'empty']),
		textControl('title', 'Title', 'Evaluation runs'),
		textControl('searchPlaceholder', 'Search', 'Search runs'),
		booleanControl('selectable', 'Selectable', 'false')
	],
	description:
		'Dense typed table with sortable columns, selection, search, filters, pagination, and rich cells.',
	guidance:
		'Data table is the canonical product grid for Concrete. Use createDataTableColumns<Row>() to keep columns aligned to row data.',
	kind: 'component',
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
	],
	renderExample: renderDataTableExample,
	schema: dataTableSchema,
	slug: 'data-table',
	states: states([
		['default', 'Dense table with status, delta, sparkline, and meter cells.'],
		['selected', 'Selectable rows with toolbar actions.'],
		['filtered', 'Search and filter controls with pagination.'],
		['empty', 'No-row state inside the same table shell.']
	])
})

function renderDataTableExample(state = 'default'): ReactNode {
	return (
		<DataWideStage>
			<DataTable
				caption="Typed cells stay compact while still supporting signals and microvisuals."
				columns={dataTableColumns}
				filters={
					state === 'filtered'
						? [
								{
									id: 'status',
									label: 'Status',
									options: [
										{ count: 1, label: 'Shipping', value: 'shipping' },
										{ count: 1, label: 'Review', value: 'review' },
										{ count: 1, label: 'Blocked', value: 'blocked' }
									],
									value: 'shipping'
								}
							]
						: []
				}
				pagination={{ page: 1, pageSize: 4, totalRows: state === 'empty' ? 0 : dataTableRows.length }}
				rows={state === 'empty' ? [] : dataTableRows}
				searchPlaceholder="Search runs"
				selectable={state === 'selected'}
				selectedRowIds={state === 'selected' ? ['router-contract', 'tool-router'] : []}
				sort={state === 'default' ? { direction: 'descending', key: 'cost' } : undefined}
				title="Evaluation runs"
				toolbarActions={
					state === 'selected'
						? [
								{ icon: 'download', id: 'export', label: 'Export', tone: 'sky' },
								{ icon: 'more', id: 'more', label: 'More' }
							]
						: [{ icon: 'inspect', id: 'inspect', label: 'Inspect' }]
				}
			/>
		</DataWideStage>
	)
}
