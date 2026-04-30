import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DataTablePager } from './component'
import { dataTablePaginationExamples } from './examples'
import { dataTablePaginationMeta } from './meta'
import { type DataTablePaginationValue, dataTablePaginationPrimitiveSchema } from './schema'

export type {
	DataTablePagerButtonProps,
	DataTablePagerDirection,
	DataTablePagerProps
} from './component'
export { DataTablePager, DataTablePagerButton } from './component'
export type { DataTablePaginationInput, DataTablePaginationValue } from './schema'
export {
	dataTablePaginationPrimitivePropsSchema,
	dataTablePaginationPrimitiveSchema
} from './schema'

export const dataTablePaginationPrimitiveDefinition = createPrimitive({
	...dataTablePaginationMeta,
	component: DataTablePager,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(dataTablePaginationExamples, state),
	renderInput: input =>
		renderDataTablePaginationInput(dataTablePaginationPrimitiveSchema.parse(input)),
	schema: dataTablePaginationPrimitiveSchema,
	slug: 'data-table-pagination',
	states: exampleStates(dataTablePaginationExamples, ['default', 'start', 'end'])
})

function renderDataTablePaginationInput({
	page,
	pageCount,
	selectedCount
}: DataTablePaginationValue) {
	return (
		<DataTablePager
			nextDisabled={page >= pageCount}
			page={page}
			pageCount={pageCount}
			previousDisabled={page <= 1}
			selectedCount={selectedCount}
		/>
	)
}
