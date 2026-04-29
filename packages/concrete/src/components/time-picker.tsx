import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, selectControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { TimePicker } from './time-picker-view'

export { TimePicker, type TimePickerProps } from './time-picker-view'

const timePickerIntervalValues = ['15', '30', '60'] as const

export const timePickerComponentSchema = z
	.object({
		defaultOpen: z.boolean().default(false),
		defaultValue: z
			.string()
			.regex(/^\d{2}:\d{2}$/)
			.default('14:30'),
		interval: z.number().int().positive().default(30),
		label: z.string().default('Run time')
	})
	.strict()

export const timePickerComponentDefinition = defineConcreteComponent({
	category: 'form',
	component: TimePicker,
	controls: [
		textControl('label', 'Label', 'Run time'),
		textControl('value', 'Value', '14:30'),
		booleanControl('open', 'Open', 'false'),
		selectControl('interval', 'Interval', '30', timePickerIntervalValues)
	],
	description: 'Compact HH:mm picker with interval-generated options and controlled value support.',
	guidance:
		'Time picker stays a focused menu primitive for time-of-day selection; timezone and scheduling rules belong to product code.',
	kind: 'component',
	name: 'Time picker',
	pressure: ['product'],
	props: [
		prop('value', 'TimeValue', 'Controlled HH:mm value.'),
		prop('defaultValue', 'TimeValue', 'Uncontrolled initial HH:mm value.', '14:30'),
		prop('defaultOpen', 'boolean', 'Initial time menu state.', 'false'),
		prop('interval', 'number', 'Minute interval for generated options.', '30'),
		prop('onValueChange', '(value: TimeValue) => void', 'Receives the selected HH:mm value.'),
		prop('label', 'ReactNode', 'Field label.')
	],
	renderExample: renderTimePickerExample,
	schema: timePickerComponentSchema,
	slug: 'time-picker',
	states: states([
		['default', 'Closed time field.'],
		['open', 'Scrollable time menu.'],
		['dense', 'Short interval list for detailed scheduling.']
	])
})

function renderTimePickerExample(state = 'default'): ReactNode {
	return (
		<FormStage>
			<TimePicker
				defaultOpen={state === 'open'}
				defaultValue={state === 'dense' ? '09:15' : '14:30'}
				interval={state === 'dense' ? 15 : 30}
				label="Run time"
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 420, width: '100%' }}>{children}</div>
}
