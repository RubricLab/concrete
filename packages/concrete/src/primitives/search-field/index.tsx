import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { SearchField } from './component'
import { searchFieldExamples } from './examples'
import { searchFieldMeta } from './meta'
import { type SearchFieldValue, searchFieldSchema } from './schema'

export type { SearchFieldMenuPlacement, SearchFieldProps } from './component'
export { SearchField } from './component'
export type { SearchFieldInput, SearchFieldValue } from './schema'
export { searchFieldPropsSchema, searchFieldSchema } from './schema'

export const searchFieldPrimitiveDefinition = createPrimitive({
	...searchFieldMeta,
	component: SearchField,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(searchFieldExamples, state),
	renderInput: input => renderSearchFieldInput(searchFieldSchema.parse(input)),
	schema: searchFieldSchema,
	slug: 'search-field',
	states: exampleStates(searchFieldExamples, ['default', 'tokens', 'menu'])
})

function renderSearchFieldInput({
	menuPlacement,
	placeholder,
	query,
	shortcut,
	wrap
}: SearchFieldValue) {
	return (
		<SearchField
			inputProps={{ 'aria-label': 'Search', defaultValue: query, placeholder }}
			menuPlacement={menuPlacement}
			shortcut={shortcut}
			wrap={wrap}
		/>
	)
}
