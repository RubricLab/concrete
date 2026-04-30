import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { SearchInput } from './component'
import { searchInputExamples } from './examples'
import { searchInputMeta } from './meta'
import { type SearchInputValue, searchInputSchema } from './schema'

export type { SearchInputProps } from './component'
export { SearchInput } from './component'
export type { SearchInputInput, SearchInputValue } from './schema'
export { searchInputPropsSchema, searchInputSchema } from './schema'

export const searchInputPrimitiveDefinition = createPrimitive({
	...searchInputMeta,
	component: SearchInput,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(searchInputExamples, state),
	renderInput: input => renderSearchInputInput(searchInputSchema.parse(input)),
	schema: searchInputSchema,
	slug: 'search-input',
	states: exampleStates(searchInputExamples, ['default', 'tokens', 'value'])
})

function renderSearchInputInput({ placeholder, query, shortcut, wrap }: SearchInputValue) {
	return (
		<SearchInput inputProps={{ defaultValue: query, placeholder }} shortcut={shortcut} wrap={wrap} />
	)
}
