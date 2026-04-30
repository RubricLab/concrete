import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { DateRangePicker } from './component'

export const dateRangePickerExamples = defineExamples({
	default: {
		description: 'Closed range field.',
		render: () => renderDateRangePickerExample('default')
	},
	open: {
		description: 'Open calendar with active range.',
		render: () => renderDateRangePickerExample('open')
	},
	partial: {
		description: 'Start date selected while waiting for an end date.',
		render: () => renderDateRangePickerExample('partial')
	}
})

function renderDateRangePickerExample(state: 'default' | 'open' | 'partial'): ReactNode {
	return (
		<DateRangePicker
			defaultOpen={state === 'open'}
			defaultValue={
				state === 'partial' ? { start: '2026-04-28' } : { end: '2026-05-07', start: '2026-04-28' }
			}
			label="Experiment window"
		/>
	)
}
