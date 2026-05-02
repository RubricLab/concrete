import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { TimePicker } from './component'
import { timePickerExamples } from './examples'
import { timePickerMeta } from './meta'
import { type TimePickerValue, timePickerComponentSchema } from './schema'

export type { TimePickerProps } from './component'
export { TimePicker } from './component'
export type { TimePickerInput, TimePickerValue } from './schema'
export { timePickerComponentSchema } from './schema'

export const timePickerComponentDefinition = createComponent({
	...timePickerMeta,
	component: TimePicker,
	kind: 'component',
	renderExample: (state?: string) => renderExample(timePickerExamples, state),
	renderInput: input => renderTimePickerInput(timePickerComponentSchema.parse(input)),
	schema: timePickerComponentSchema,
	slug: 'time-picker',
	states: exampleStates(timePickerExamples, ['default', 'open', 'dense', 'success'])
})

function renderTimePickerInput(input: TimePickerValue) {
	return <TimePicker {...input} />
}
