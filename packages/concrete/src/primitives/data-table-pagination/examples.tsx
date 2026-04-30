import { defineExamples } from '../../factories/createExamples'
import { DataTablePager } from './component'

export const dataTablePaginationExamples = defineExamples({
	default: {
		description: 'Pagination footer with active selection count.',
		render: () => <DataTablePager page={2} pageCount={6} selectedCount={3} />
	},
	end: {
		description: 'Pagination footer at the final page.',
		render: () => <DataTablePager nextDisabled page={4} pageCount={4} selectedCount={0} />
	},
	start: {
		description: 'Pagination footer at the first page.',
		render: () => <DataTablePager page={1} pageCount={6} previousDisabled selectedCount={0} />
	}
})
