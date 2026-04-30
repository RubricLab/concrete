import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Pagination } from './component'
import { paginationExamples } from './examples'
import { paginationMeta } from './meta'
import { type PaginationValue, paginationSchema } from './schema'

export type { PaginationButtonProps, PaginationDirection, PaginationProps } from './component'
export { Pagination, PaginationButton } from './component'
export type { PaginationInput, PaginationValue } from './schema'
export { paginationPropsSchema, paginationSchema } from './schema'

export const paginationPrimitiveDefinition = createPrimitive({
	...paginationMeta,
	component: Pagination,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(paginationExamples, state),
	renderInput: input => renderPaginationInput(paginationSchema.parse(input)),
	schema: paginationSchema,
	slug: 'pagination',
	states: exampleStates(paginationExamples, ['default', 'start', 'end'])
})

function renderPaginationInput({ page, pageCount, selectedCount }: PaginationValue) {
	return (
		<Pagination
			nextDisabled={page >= pageCount}
			page={page}
			pageCount={pageCount}
			previousDisabled={page <= 1}
			selectedCount={selectedCount}
		/>
	)
}
