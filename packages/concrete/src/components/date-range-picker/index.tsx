import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { DateRangePicker } from './component'
import { dateRangePickerExamples } from './examples'
import { dateRangePickerMeta } from './meta'
import { type DateRangePickerValue, dateRangePickerComponentSchema } from './schema'

export type { DateRangePickerProps } from './component'
export { DateRangePicker } from './component'
export type { DateRangePickerInput, DateRangePickerValue } from './schema'
export { dateRangePickerComponentSchema } from './schema'

export const dateRangePickerComponentDefinition = createComponent({
	...dateRangePickerMeta,
	component: DateRangePicker,
	kind: 'component',
	renderExample: (state?: string) => renderExample(dateRangePickerExamples, state),
	renderInput: input => renderDateRangePickerInput(dateRangePickerComponentSchema.parse(input)),
	schema: dateRangePickerComponentSchema,
	slug: 'date-range-picker',
	states: exampleStates(dateRangePickerExamples, ['default', 'open', 'partial'])
})

function renderDateRangePickerInput(input: DateRangePickerValue) {
	const { max, min, ...props } = input

	return <DateRangePicker {...props} {...(max ? { max } : {})} {...(min ? { min } : {})} />
}
