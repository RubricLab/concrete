import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { DatePicker } from './component'

export const datePickerExamples = defineExamples({
	bounded: {
		description: 'Date picker with unavailable days.',
		render: () => renderDatePickerExample('bounded')
	},
	default: {
		description: 'Closed date field.',
		render: () => renderDatePickerExample('default')
	},
	open: {
		description: 'Calendar popdown with selected day.',
		render: () => renderDatePickerExample('open')
	}
})

function renderDatePickerExample(state: 'bounded' | 'default' | 'open'): ReactNode {
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
