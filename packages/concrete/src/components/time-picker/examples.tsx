import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { TimePicker } from './component'

export const timePickerExamples = defineExamples({
	default: {
		description: 'Closed time field.',
		render: () => renderTimePickerExample('default')
	},
	dense: {
		description: 'Short interval list for detailed scheduling.',
		render: () => renderTimePickerExample('dense')
	},
	open: {
		description: 'Scrollable time menu.',
		render: () => renderTimePickerExample('open')
	}
})

function renderTimePickerExample(state: 'default' | 'dense' | 'open'): ReactNode {
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
