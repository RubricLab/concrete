import { defineExamples } from '../../factories/createExamples'
import { Pagination } from './component'

export const paginationExamples = defineExamples({
	default: {
		description: 'Pagination footer with active selection count.',
		render: () => <Pagination page={2} pageCount={6} selectedCount={3} />
	},
	end: {
		description: 'Pagination footer at the final page.',
		render: () => <Pagination nextDisabled page={4} pageCount={4} selectedCount={0} />
	},
	start: {
		description: 'Pagination footer at the first page.',
		render: () => <Pagination page={1} pageCount={6} previousDisabled selectedCount={0} />
	}
})
