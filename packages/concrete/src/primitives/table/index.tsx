import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	Table,
	TableBody,
	TableCell,
	TableEmpty,
	TableHead,
	TableHeaderCell,
	TableRow,
	TableSelectionCell,
	TableSelectionHeaderCell,
	TableSelectionInput,
	TableSortButton,
	TableViewport
} from './component'
import { tableExamples } from './examples'
import { tableMeta } from './meta'
import { type TableValue, tableSchema } from './schema'

export type {
	TableAlign,
	TableBodyProps,
	TableCellProps,
	TableEmptyCellProps,
	TableEmptyProps,
	TableHeaderCellProps,
	TableHeadProps,
	TableProps,
	TableRowProps,
	TableSelectionCellProps,
	TableSelectionHeaderCellProps,
	TableSelectionInputProps,
	TableSortButtonProps,
	TableSortDirection,
	TableViewportProps
} from './component'
export {
	Table,
	TableBody,
	TableCell,
	TableEmpty,
	TableEmptyCell,
	TableHead,
	TableHeaderCell,
	TableRow,
	TableSelectionCell,
	TableSelectionHeaderCell,
	TableSelectionInput,
	TableSortButton,
	TableViewport
} from './component'
export type { TableInput, TableValue } from './schema'
export { tablePropsSchema, tableSchema } from './schema'

export const tablePrimitiveDefinition = createPrimitive({
	...tableMeta,
	component: Table,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(tableExamples, state),
	renderInput: input => renderTableInput(tableSchema.parse(input)),
	schema: tableSchema,
	slug: 'table',
	states: exampleStates(tableExamples, ['default', 'frozen', 'empty'])
})

function renderTableInput({ empty, frozen, selectable, sortable }: TableValue) {
	return (
		<TableViewport>
			<Table>
				<TableHead>
					<TableRow>
						{selectable ? <TableSelectionHeaderCell /> : null}
						<TableHeaderCell frozen={frozen}>
							<TableSortButton sortable={sortable}>Run</TableSortButton>
						</TableHeaderCell>
						<TableHeaderCell>Status</TableHeaderCell>
						<TableHeaderCell align="right">
							<TableSortButton sortDirection="descending" sortable={sortable}>
								Cost
							</TableSortButton>
						</TableHeaderCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{empty ? (
						<TableRow>
							<TableCell colSpan={selectable ? 4 : 3}>
								<TableEmpty>No rows</TableEmpty>
							</TableCell>
						</TableRow>
					) : (
						<>
							<TableRow selected={selectable}>
								{selectable ? (
									<TableSelectionCell>
										<TableSelectionInput aria-label="Select row" checked readOnly />
									</TableSelectionCell>
								) : null}
								<TableCell frozen={frozen}>router-contract</TableCell>
								<TableCell>accepted</TableCell>
								<TableCell align="right">$0.42</TableCell>
							</TableRow>
							<TableRow>
								{selectable ? (
									<TableSelectionCell>
										<TableSelectionInput aria-label="Select row" readOnly />
									</TableSelectionCell>
								) : null}
								<TableCell frozen={frozen}>policy-review</TableCell>
								<TableCell>review</TableCell>
								<TableCell align="right">$0.31</TableCell>
							</TableRow>
						</>
					)}
				</TableBody>
			</Table>
		</TableViewport>
	)
}
