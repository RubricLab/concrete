import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ValidationList, type ValidationListItem } from './component'
import { validationListExamples } from './examples'
import { validationListMeta } from './meta'
import { type ValidationListValue, validationListSchema } from './schema'

export type { ValidationListItem, ValidationListProps } from './component'
export { ValidationList } from './component'
export type { ValidationListInput, ValidationListValue } from './schema'
export { validationListPropsSchema, validationListSchema } from './schema'

export const validationListPrimitiveDefinition = createPrimitive({
	...validationListMeta,
	component: ValidationList,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(validationListExamples, state),
	renderInput: input => renderValidationListInput(validationListSchema.parse(input)),
	schema: validationListSchema,
	slug: 'validation-list',
	states: exampleStates(validationListExamples, ['default', 'linked', 'success'])
})

function renderValidationListInput({ issueCount, status }: ValidationListValue) {
	const items: readonly ValidationListItem[] = [
		{ id: 'email', label: 'Email', message: 'Enter a work email.' },
		{ id: 'role', label: 'Role', message: 'Choose at least one role.' },
		{ id: 'workspace', label: 'Workspace', message: 'Choose a workspace.' },
		{ id: 'tools', label: 'Tools', message: 'Enable at least one tool.' }
	]

	return <ValidationList items={items.slice(0, issueCount)} status={status} />
}
