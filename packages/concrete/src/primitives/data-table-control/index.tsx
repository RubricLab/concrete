import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import {
	DataTableAction,
	DataTableFilterControl,
	DataTableSearch,
	DataTableToolbar
} from './component'
import { dataTableControlExamples } from './examples'
import { dataTableControlMeta } from './meta'
import { type DataTableControlValue, dataTableControlSchema } from './schema'

export type {
	DataTableActionIconName,
	DataTableActionProps,
	DataTableFilterControlProps,
	DataTableSearchProps,
	DataTableToolbarProps
} from './component'
export {
	DataTableAction,
	DataTableActionIcon,
	DataTableFilterControl,
	DataTableSearch,
	DataTableToolbar
} from './component'
export type { DataTableControlInput, DataTableControlValue } from './schema'
export {
	dataTableActionIconValues,
	dataTableControlPropsSchema,
	dataTableControlSchema
} from './schema'

export const dataTableControlPrimitiveDefinition = createPrimitive({
	...dataTableControlMeta,
	component: DataTableToolbar,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(dataTableControlExamples, state),
	renderInput: input => renderDataTableControlInput(dataTableControlSchema.parse(input)),
	schema: dataTableControlSchema,
	slug: 'data-table-control',
	states: exampleStates(dataTableControlExamples, ['default', 'filters', 'actions'])
})

function renderDataTableControlInput({
	actionIcon,
	actionLabel,
	filterLabel,
	searchPlaceholder
}: DataTableControlValue) {
	return (
		<DataTableToolbar>
			<DataTableSearch inputProps={{ placeholder: searchPlaceholder }} />
			<DataTableFilterControl label={filterLabel} selectProps={{ defaultValue: '' }}>
				<option value="">All</option>
				<option value="accepted">Accepted</option>
				<option value="review">Review</option>
				<option value="blocked">Blocked</option>
			</DataTableFilterControl>
			<DataTableAction icon={actionIcon}>{actionLabel}</DataTableAction>
		</DataTableToolbar>
	)
}
