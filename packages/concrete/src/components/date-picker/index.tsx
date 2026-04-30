import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { DatePicker } from './component'
import { datePickerExamples } from './examples'
import { datePickerMeta } from './meta'
import { type DatePickerValue, datePickerComponentSchema } from './schema'

export type { DatePickerProps } from './component'
export { DatePicker } from './component'
export type { DatePickerInput, DatePickerValue } from './schema'
export { datePickerComponentSchema } from './schema'

export const datePickerComponentDefinition = createComponent({
	...datePickerMeta,
	component: DatePicker,
	kind: 'component',
	renderExample: (state?: string) => renderExample(datePickerExamples, state),
	renderInput: input => renderDatePickerInput(datePickerComponentSchema.parse(input)),
	schema: datePickerComponentSchema,
	slug: 'date-picker',
	states: exampleStates(datePickerExamples, ['default', 'open', 'bounded'])
})

function renderDatePickerInput(input: DatePickerValue) {
	const { max, min, ...props } = input

	return <DatePicker {...props} {...(max ? { max } : {})} {...(min ? { min } : {})} />
}
