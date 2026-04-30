import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { dataTableColumns, dataTableRows } from '../../utilities/data-fixtures'
import { DataTable } from './component'
import { dataTableExamples } from './examples'
import { dataTableMeta } from './meta'
import { type DataTableValue, dataTableComponentSchema } from './schema'

export type { DataTableProps } from '../../schemas'
export { DataTable } from './component'
export type { DataTableInput, DataTableValue } from './schema'
export { dataTableComponentSchema } from './schema'

export const dataTableComponentDefinition = createComponent({
	...dataTableMeta,
	component: DataTable,
	kind: 'component',
	renderExample: (state?: string) => renderExample(dataTableExamples, state),
	renderInput: input => renderDataTableInput(dataTableComponentSchema.parse(input)),
	schema: dataTableComponentSchema,
	seed: dataTableComponentSchema.parse({
		caption: 'Typed cells stay compact while still supporting signals and microvisuals.',
		columns: dataTableColumns,
		pagination: { page: 1, pageSize: 4, totalRows: dataTableRows.length },
		rows: dataTableRows,
		searchPlaceholder: 'Search runs',
		title: 'Evaluation runs',
		toolbarActions: [{ icon: 'inspect', id: 'inspect', label: 'Inspect' }]
	}),
	slug: 'data-table',
	states: exampleStates(dataTableExamples, ['default', 'selected', 'filtered', 'paginated', 'empty'])
})

function renderDataTableInput(input: DataTableValue) {
	return <DataTable {...input} />
}
