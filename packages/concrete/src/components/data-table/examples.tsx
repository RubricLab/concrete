import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import {
	dataTableColumns,
	dataTablePreviewColumns,
	dataTableRows
} from '../../utilities/data-fixtures'
import { DataTable } from './component'

export const dataTableExamples = defineExamples({
	default: {
		description: 'Readable preview table with status, delta, and meter cells.',
		render: () => renderDataTableExample('default')
	},
	empty: {
		description: 'No-row state inside the same table shell.',
		render: () => renderDataTableExample('empty')
	},
	filtered: {
		description: 'Search and filter controls with pagination.',
		render: () => renderDataTableExample('filtered')
	},
	paginated: {
		description: 'Second page with pager boundary controls visible.',
		render: () => renderDataTableExample('paginated')
	},
	selected: {
		description: 'Selectable rows with toolbar actions.',
		render: () => renderDataTableExample('selected')
	},
	wide: {
		description: 'Full-width table with owner, trend, and cost cells.',
		render: () => renderDataTableExample('wide')
	}
})

function renderDataTableExample(state = 'default'): ReactNode {
	return (
		<DataTable
			caption="Typed cells stay compact while still supporting signals and microvisuals."
			columns={state === 'wide' ? dataTableColumns : dataTablePreviewColumns}
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
			pagination={{
				page: state === 'paginated' ? 2 : 1,
				pageSize: state === 'paginated' ? 2 : 4,
				totalRows: state === 'empty' ? 0 : dataTableRows.length
			}}
			rows={state === 'empty' ? [] : dataTableRows}
			searchPlaceholder="Search runs"
			selectable={state === 'selected'}
			selectedRowIds={state === 'selected' ? ['router-contract', 'tool-router'] : []}
			sort={state === 'default' ? { direction: 'descending', key: 'score' } : undefined}
			title="Evaluation runs"
			toolbarActions={
				state === 'selected'
					? [
							{ icon: 'download', id: 'export', intent: 'sky', label: 'Export' },
							{ icon: 'more', id: 'more', label: 'More' }
						]
					: [{ icon: 'inspect', id: 'inspect', label: 'Inspect' }]
			}
		/>
	)
}
