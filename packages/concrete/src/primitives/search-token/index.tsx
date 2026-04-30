import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { SearchTokenPrimitive } from './component'
import { searchTokenExamples } from './examples'
import { searchTokenMeta } from './meta'
import { type SearchTokenPrimitiveValue, searchTokenPrimitiveSchema } from './schema'

export type { SearchTokenPrimitiveProps } from './component'
export { SearchTokenPrimitive } from './component'
export type { SearchTokenPrimitiveInput, SearchTokenPrimitiveValue } from './schema'
export { searchTokenPrimitivePropsSchema, searchTokenPrimitiveSchema } from './schema'

export const searchTokenPrimitiveDefinition = createPrimitive({
	...searchTokenMeta,
	component: SearchTokenPrimitive,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(searchTokenExamples, state),
	renderInput: input => renderSearchTokenPrimitiveInput(searchTokenPrimitiveSchema.parse(input)),
	schema: searchTokenPrimitiveSchema,
	slug: 'search-token',
	states: exampleStates(searchTokenExamples, ['default', 'icon', 'locked'])
})

function renderSearchTokenPrimitiveInput({
	label,
	removable,
	...input
}: SearchTokenPrimitiveValue) {
	return (
		<SearchTokenPrimitive {...input} removable={removable} removeLabel={`Remove ${label}`}>
			{label}
		</SearchTokenPrimitive>
	)
}
