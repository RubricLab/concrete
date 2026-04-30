import { defineExamples } from '../../factories/createExamples'
import {
	DataTableAction,
	DataTableFilterControl,
	DataTableSearch,
	DataTableToolbar
} from './component'

export const dataTableControlExamples = defineExamples({
	actions: {
		description: 'Table action controls with data tones.',
		render: () => (
			<DataTableToolbar>
				<DataTableAction icon="download" tone="sky">
					Export
				</DataTableAction>
				<DataTableAction icon="more">More</DataTableAction>
			</DataTableToolbar>
		)
	},
	default: {
		description: 'Table toolbar with search, filter, and action controls.',
		render: () => (
			<DataTableToolbar>
				<DataTableSearch inputProps={{ placeholder: 'Search runs' }} />
				<DataTableFilterControl label="Status" selectProps={{ defaultValue: 'review' }}>
					<option value="">All</option>
					<option value="accepted">Accepted</option>
					<option value="review">Review</option>
					<option value="blocked">Blocked</option>
				</DataTableFilterControl>
				<DataTableAction icon="inspect">Inspect</DataTableAction>
			</DataTableToolbar>
		)
	},
	filters: {
		description: 'Search and filter controls without row actions.',
		render: () => (
			<DataTableToolbar>
				<DataTableSearch inputProps={{ defaultValue: 'policy', placeholder: 'Search runs' }} />
				<DataTableFilterControl label="Mode" selectProps={{ defaultValue: 'autonomous' }}>
					<option value="">All modes</option>
					<option value="supervised">Supervised</option>
					<option value="autonomous">Autonomous</option>
				</DataTableFilterControl>
			</DataTableToolbar>
		)
	}
})
