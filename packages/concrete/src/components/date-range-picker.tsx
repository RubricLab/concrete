import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { dateRangeValueSchema, dateValueSchema } from '../schemas'
import { DateRangePicker } from './date-range-picker-view'

export { DateRangePicker, type DateRangePickerProps } from './date-range-picker-view'

export const dateRangePickerComponentSchema = z
	.object({
		defaultOpen: z.boolean().default(false),
		defaultValue: dateRangeValueSchema.default({ end: '2026-05-07', start: '2026-04-28' }),
		label: z.string().default('Experiment window'),
		max: dateValueSchema.optional(),
		min: dateValueSchema.optional()
	})
	.strict()

export const dateRangePickerComponentDefinition = defineConcreteComponent({
	category: 'form',
	component: DateRangePicker,
	controls: [
		textControl('label', 'Label', 'Experiment window'),
		textControl('start', 'Start', '2026-04-28'),
		textControl('end', 'End', '2026-05-07'),
		booleanControl('open', 'Open', 'false'),
		booleanControl('partial', 'Partial', 'false')
	],
	description:
		'Range picker for start/end ISO dates with calendar selection and in-range treatment.',
	guidance:
		'Date range picker returns a small object boundary and keeps range intent visible without introducing a date runtime dependency.',
	kind: 'component',
	name: 'Date range picker',
	pressure: ['product'],
	props: [
		prop('value', 'DateRangeValue', 'Controlled start/end ISO date object.'),
		prop('defaultValue', 'DateRangeValue', 'Uncontrolled initial range value.'),
		prop('defaultOpen', 'boolean', 'Initial calendar popdown state.', 'false'),
		prop('min', 'DateValue', 'Minimum selectable ISO date.'),
		prop('max', 'DateValue', 'Maximum selectable ISO date.'),
		prop('onValueChange', '(value: DateRangeValue) => void', 'Receives the selected range.'),
		prop('label', 'ReactNode', 'Field label.')
	],
	renderExample: renderDateRangePickerExample,
	schema: dateRangePickerComponentSchema,
	slug: 'date-range-picker',
	states: states([
		['default', 'Closed range field.'],
		['open', 'Open calendar with active range.'],
		['partial', 'Start date selected while waiting for an end date.']
	])
})

function renderDateRangePickerExample(state = 'default'): ReactNode {
	return (
		<FormStage>
			<DateRangePicker
				defaultOpen={state === 'open'}
				defaultValue={
					state === 'partial' ? { start: '2026-04-28' } : { end: '2026-05-07', start: '2026-04-28' }
				}
				label="Experiment window"
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 420, width: '100%' }}>{children}</div>
}
