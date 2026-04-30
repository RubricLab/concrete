import { defineExamples } from '../../factories/createExamples'
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

export const dataTableShellExamples = defineExamples({
	default: {
		description: 'Dense table shell with sortable columns and selected rows.',
		render: () => (
			<DataTableShell>
				<DataTableScroll>
					<DataTableElement>
						<DataTableHead>
							<DataTableTableRow>
								<DataTableSelectionHeaderCell />
								<DataTableHeaderCell>
									<DataTableSortButton sortable>Run</DataTableSortButton>
								</DataTableHeaderCell>
								<DataTableHeaderCell>Status</DataTableHeaderCell>
								<DataTableHeaderCell align="right">
									<DataTableSortButton sortDirection="descending" sortable>
										Cost
									</DataTableSortButton>
								</DataTableHeaderCell>
							</DataTableTableRow>
						</DataTableHead>
						<DataTableBody>
							<DataTableTableRow selected>
								<DataTableSelectionCell>
									<DataTableSelectionInput aria-label="Select row" checked readOnly />
								</DataTableSelectionCell>
								<DataTableCell>router-contract</DataTableCell>
								<DataTableCell>accepted</DataTableCell>
								<DataTableCell align="right">$0.42</DataTableCell>
							</DataTableTableRow>
							<DataTableTableRow>
								<DataTableSelectionCell>
									<DataTableSelectionInput aria-label="Select row" readOnly />
								</DataTableSelectionCell>
								<DataTableCell>policy-review</DataTableCell>
								<DataTableCell>review</DataTableCell>
								<DataTableCell align="right">$0.31</DataTableCell>
							</DataTableTableRow>
							<DataTableTableRow>
								<DataTableSelectionCell>
									<DataTableSelectionInput aria-label="Select row" readOnly />
								</DataTableSelectionCell>
								<DataTableCell>trace-summarizer</DataTableCell>
								<DataTableCell>blocked</DataTableCell>
								<DataTableCell align="right">$0.18</DataTableCell>
							</DataTableTableRow>
						</DataTableBody>
					</DataTableElement>
				</DataTableScroll>
			</DataTableShell>
		)
	},
	empty: {
		description: 'Empty state inside the table shell.',
		render: () => (
			<DataTableShell>
				<DataTableScroll>
					<DataTableElement>
						<DataTableBody>
							<DataTableTableRow>
								<DataTableCell colSpan={2}>
									<DataTableEmpty>No rows</DataTableEmpty>
								</DataTableCell>
							</DataTableTableRow>
						</DataTableBody>
					</DataTableElement>
				</DataTableScroll>
			</DataTableShell>
		)
	},
	frozen: {
		description: 'Frozen first column with horizontal table anatomy.',
		render: () => (
			<DataTableShell>
				<DataTableScroll>
					<DataTableElement>
						<DataTableHead>
							<DataTableTableRow>
								<DataTableHeaderCell frozen>
									<DataTableSortButton sortDirection="ascending" sortable>
										Workspace
									</DataTableSortButton>
								</DataTableHeaderCell>
								<DataTableHeaderCell>Owner</DataTableHeaderCell>
								<DataTableHeaderCell>Mode</DataTableHeaderCell>
								<DataTableHeaderCell align="right">Runs</DataTableHeaderCell>
							</DataTableTableRow>
						</DataTableHead>
						<DataTableBody>
							<DataTableTableRow>
								<DataTableCell frozen>Research ops</DataTableCell>
								<DataTableCell>Ada</DataTableCell>
								<DataTableCell>supervised</DataTableCell>
								<DataTableCell align="right">1,284</DataTableCell>
							</DataTableTableRow>
							<DataTableTableRow>
								<DataTableCell frozen>Launch desk</DataTableCell>
								<DataTableCell>Noor</DataTableCell>
								<DataTableCell>autonomous</DataTableCell>
								<DataTableCell align="right">842</DataTableCell>
							</DataTableTableRow>
						</DataTableBody>
					</DataTableElement>
				</DataTableScroll>
			</DataTableShell>
		)
	}
})
