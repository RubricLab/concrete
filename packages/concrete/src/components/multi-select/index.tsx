import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import type { MultiSelectOption } from '../../schemas'
import { MultiSelect } from './component'
import { multiSelectExamples } from './examples'
import { multiSelectMeta } from './meta'
import { type MultiSelectValue, multiSelectComponentSchema } from './schema'

export type { MultiSelectProps } from './component'
export { MultiSelect } from './component'
export type { MultiSelectInput, MultiSelectValue } from './schema'
export { multiSelectComponentSchema } from './schema'

export const multiSelectComponentDefinition = createComponent({
	...multiSelectMeta,
	component: MultiSelect,
	kind: 'component',
	renderExample: (state?: string) => renderExample(multiSelectExamples, state),
	renderInput: input => renderMultiSelectInput(multiSelectComponentSchema.parse(input)),
	schema: multiSelectComponentSchema,
	slug: 'multi-select',
	states: exampleStates(multiSelectExamples, ['default', 'open', 'empty'])
})

function renderMultiSelectInput(input: MultiSelectValue) {
	const { maxSelected, ...props } = input
	const options = input.options.map(option => {
		const { description, meta, ...requiredOption } = option

		return {
			...requiredOption,
			...(description ? { description } : {}),
			...(meta ? { meta } : {})
		} satisfies MultiSelectOption
	})

	return <MultiSelect {...props} options={options} {...(maxSelected ? { maxSelected } : {})} />
}
