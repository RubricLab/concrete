import type { ReactNode } from 'react'
import { z } from 'zod/v4'
import { booleanControl, textControl } from '../registry/controls'
import { defineConcreteComponent } from '../registry/definition'
import { prop, states } from '../registry/props'
import { dateValueSchema } from '../schemas'
import { DatePicker } from './date-picker-view'

export { DatePicker, type DatePickerProps } from './date-picker-view'

export const datePickerComponentSchema = z
	.object({
		defaultOpen: z.boolean().default(false),
		defaultValue: dateValueSchema.default('2026-04-28'),
		label: z.string().default('Start date'),
		max: dateValueSchema.optional(),
		min: dateValueSchema.optional()
	})
	.strict()

export const datePickerComponentDefinition = defineConcreteComponent({
	category: 'form',
	component: DatePicker,
	controls: [
		textControl('label', 'Label', 'Start date'),
		textControl('value', 'Value', '2026-04-28'),
		booleanControl('open', 'Open', 'false'),
		booleanControl('bounded', 'Bounded', 'false')
	],
	description:
		'Single-date picker with calendar panel, month navigation, min/max bounds, and controlled value support.',
	guidance:
		'Date picker is intentionally dependency-free for v1: ISO date strings at the boundary, product-local formatting outside the component when needed.',
	kind: 'component',
	name: 'Date picker',
	pressure: ['product'],
	props: [
		prop('value', 'DateValue', 'Controlled ISO date string.'),
		prop('defaultValue', 'DateValue', 'Uncontrolled initial ISO date string.', 'today'),
		prop('defaultOpen', 'boolean', 'Initial calendar popdown state.', 'false'),
		prop('min', 'DateValue', 'Minimum selectable ISO date.'),
		prop('max', 'DateValue', 'Maximum selectable ISO date.'),
		prop('onValueChange', '(value: DateValue) => void', 'Receives the selected ISO date.'),
		prop('label', 'ReactNode', 'Field label.')
	],
	renderExample: renderDatePickerExample,
	schema: datePickerComponentSchema,
	slug: 'date-picker',
	states: states([
		['default', 'Closed date field.'],
		['open', 'Calendar popdown with selected day.'],
		['bounded', 'Date picker with unavailable days.']
	])
})

function renderDatePickerExample(state = 'default'): ReactNode {
	return (
		<FormStage>
			<DatePicker
				defaultOpen={state === 'open'}
				defaultValue="2026-04-28"
				help={state === 'bounded' ? 'Only this sprint window is available.' : undefined}
				label="Start date"
				max={state === 'bounded' ? '2026-05-02' : undefined}
				min={state === 'bounded' ? '2026-04-24' : undefined}
			/>
		</FormStage>
	)
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 420, width: '100%' }}>{children}</div>
}
