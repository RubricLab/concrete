import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	DataTableBody,
	DataTableCell,
	DataTableElement,
	DataTableEmpty,
	DataTableHead,
	DataTableHeaderCell,
	DataTableScroll,
	DataTableSelectionCell,
	DataTableSelectionHeaderCell,
	DataTableSelectionInput,
	DataTableShell,
	DataTableSortButton,
	DataTableTableRow
} from './component'
import { dataTableShellExamples } from './examples'
import { dataTableShellMeta } from './meta'
import { type DataTableShellValue, dataTableShellSchema } from './schema'

export type {
	DataTableAlign,
	DataTableBodyProps,
	DataTableCellProps,
	DataTableElementProps,
	DataTableEmptyCellProps,
	DataTableEmptyProps,
	DataTableHeaderCellProps,
	DataTableHeadProps,
	DataTableScrollProps,
	DataTableSelectionCellProps,
	DataTableSelectionHeaderCellProps,
	DataTableSelectionInputProps,
	DataTableShellProps,
	DataTableSortButtonProps,
	DataTableSortDirection,
	DataTableTableRowProps
} from './component'
export {
	DataTableBody,
	DataTableCell,
	DataTableElement,
	DataTableEmpty,
	DataTableEmptyCell,
	DataTableHead,
	DataTableHeaderCell,
	DataTableScroll,
	DataTableSelectionCell,
	DataTableSelectionHeaderCell,
	DataTableSelectionInput,
	DataTableShell,
	DataTableSortButton,
	DataTableTableRow
} from './component'
export type { DataTableShellInput, DataTableShellValue } from './schema'
export { dataTableShellPropsSchema, dataTableShellSchema } from './schema'

export const dataTableShellPrimitiveDefinition = createPrimitive({
	...dataTableShellMeta,
	component: DataTableShell,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(dataTableShellExamples, state),
	renderInput: input => renderDataTableShellInput(dataTableShellSchema.parse(input)),
	schema: dataTableShellSchema,
	slug: 'data-table-shell',
	states: exampleStates(dataTableShellExamples, ['default', 'frozen', 'empty'])
})

function renderDataTableShellInput({ empty, frozen, selectable, sortable }: DataTableShellValue) {
	return (
		<DataTableShell>
			<DataTableScroll>
				<DataTableElement>
					<DataTableHead>
						<DataTableTableRow>
							{selectable ? <DataTableSelectionHeaderCell /> : null}
							<DataTableHeaderCell frozen={frozen}>
								<DataTableSortButton sortable={sortable}>Run</DataTableSortButton>
							</DataTableHeaderCell>
							<DataTableHeaderCell>Status</DataTableHeaderCell>
							<DataTableHeaderCell align="right">
								<DataTableSortButton sortDirection="descending" sortable={sortable}>
									Cost
								</DataTableSortButton>
							</DataTableHeaderCell>
						</DataTableTableRow>
					</DataTableHead>
					<DataTableBody>
						{empty ? (
							<DataTableTableRow>
								<DataTableCell colSpan={selectable ? 4 : 3}>
									<DataTableEmpty>No rows</DataTableEmpty>
								</DataTableCell>
							</DataTableTableRow>
						) : (
							<>
								<DataTableTableRow selected={selectable}>
									{selectable ? (
										<DataTableSelectionCell>
											<DataTableSelectionInput aria-label="Select row" checked readOnly />
										</DataTableSelectionCell>
									) : null}
									<DataTableCell frozen={frozen}>router-contract</DataTableCell>
									<DataTableCell>accepted</DataTableCell>
									<DataTableCell align="right">$0.42</DataTableCell>
								</DataTableTableRow>
								<DataTableTableRow>
									{selectable ? (
										<DataTableSelectionCell>
											<DataTableSelectionInput aria-label="Select row" readOnly />
										</DataTableSelectionCell>
									) : null}
									<DataTableCell frozen={frozen}>policy-review</DataTableCell>
									<DataTableCell>review</DataTableCell>
									<DataTableCell align="right">$0.31</DataTableCell>
								</DataTableTableRow>
							</>
						)}
					</DataTableBody>
				</DataTableElement>
			</DataTableScroll>
		</DataTableShell>
	)
}
