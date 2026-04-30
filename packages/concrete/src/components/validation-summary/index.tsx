import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { ValidationSummary } from './component'
import { validationSummaryExamples } from './examples'
import { validationSummaryMeta } from './meta'
import { type ValidationSummaryValue, validationSummaryComponentSchema } from './schema'

export type { ValidationSummaryItem, ValidationSummaryProps } from './component'
export { ValidationSummary } from './component'
export type { ValidationSummaryInput, ValidationSummaryValue } from './schema'
export { validationSummaryComponentSchema } from './schema'

export const validationSummaryComponentDefinition = createComponent({
	...validationSummaryMeta,
	component: ValidationSummary,
	kind: 'component',
	renderExample: (state?: string) => renderExample(validationSummaryExamples, state),
	renderInput: input => renderValidationSummaryInput(validationSummaryComponentSchema.parse(input)),
	schema: validationSummaryComponentSchema,
	seed: validationSummaryComponentSchema.parse({
		description: 'Resolve the listed fields before saving the workflow.',
		items: [
			{
				href: '#owner',
				id: 'owner',
				label: 'Owner',
				message: 'Assign a responsible operator.'
			},
			{
				href: '#budget',
				id: 'budget',
				label: 'Budget limit',
				message: 'Enter a value between 1 and 100.'
			}
		]
	}),
	slug: 'validation-summary',
	states: exampleStates(validationSummaryExamples, ['error', 'success', 'mixed'])
})

function renderValidationSummaryInput(input: ValidationSummaryValue) {
	return <ValidationSummary {...input} />
}
