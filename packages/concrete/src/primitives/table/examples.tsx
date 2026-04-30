import { defineExamples } from '../../factories/createExamples'
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

export const tableExamples = defineExamples({
	default: {
		description: 'Dense table anatomy with sortable columns and selected rows.',
		render: () => (
			<TableViewport>
				<Table>
					<TableHead>
						<TableRow>
							<TableSelectionHeaderCell />
							<TableHeaderCell>
								<TableSortButton sortable>Run</TableSortButton>
							</TableHeaderCell>
							<TableHeaderCell>Status</TableHeaderCell>
							<TableHeaderCell align="right">
								<TableSortButton sortDirection="descending" sortable>
									Cost
								</TableSortButton>
							</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow selected>
							<TableSelectionCell>
								<TableSelectionInput aria-label="Select row" checked readOnly />
							</TableSelectionCell>
							<TableCell>router-contract</TableCell>
							<TableCell>accepted</TableCell>
							<TableCell align="right">$0.42</TableCell>
						</TableRow>
						<TableRow>
							<TableSelectionCell>
								<TableSelectionInput aria-label="Select row" readOnly />
							</TableSelectionCell>
							<TableCell>policy-review</TableCell>
							<TableCell>review</TableCell>
							<TableCell align="right">$0.31</TableCell>
						</TableRow>
						<TableRow>
							<TableSelectionCell>
								<TableSelectionInput aria-label="Select row" readOnly />
							</TableSelectionCell>
							<TableCell>trace-summarizer</TableCell>
							<TableCell>blocked</TableCell>
							<TableCell align="right">$0.18</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableViewport>
		)
	},
	empty: {
		description: 'Empty state inside table anatomy.',
		render: () => (
			<TableViewport>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell colSpan={2}>
								<TableEmpty>No rows</TableEmpty>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableViewport>
		)
	},
	frozen: {
		description: 'Frozen first column with horizontal table anatomy.',
		render: () => (
			<TableViewport>
				<Table>
					<TableHead>
						<TableRow>
							<TableHeaderCell frozen>
								<TableSortButton sortDirection="ascending" sortable>
									Workspace
								</TableSortButton>
							</TableHeaderCell>
							<TableHeaderCell>Owner</TableHeaderCell>
							<TableHeaderCell>Mode</TableHeaderCell>
							<TableHeaderCell align="right">Runs</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell frozen>Research ops</TableCell>
							<TableCell>Ada</TableCell>
							<TableCell>supervised</TableCell>
							<TableCell align="right">1,284</TableCell>
						</TableRow>
						<TableRow>
							<TableCell frozen>Launch desk</TableCell>
							<TableCell>Noor</TableCell>
							<TableCell>autonomous</TableCell>
							<TableCell align="right">842</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableViewport>
		)
	}
})
