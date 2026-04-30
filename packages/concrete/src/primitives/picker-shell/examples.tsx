import { defineExamples } from '../../factories/createExamples'
import { PickerControl } from '../picker-control'
import { PickerShell, type PickerShellKind } from './component'

export const pickerShellExamples = defineExamples({
	date: {
		description: 'Date picker root shell.',
		render: () => renderPickerShellExample('date')
	},
	default: {
		description: 'Date picker root shell.',
		render: () => renderPickerShellExample('date')
	},
	multi: {
		description: 'Multi-select picker root shell.',
		render: () => renderPickerShellExample('multi-select')
	},
	time: {
		description: 'Time picker root shell.',
		render: () => renderPickerShellExample('time')
	}
})

function renderPickerShellExample(kind: PickerShellKind) {
	return (
		<PickerShell kind={kind}>
			<PickerControl icon={kind === 'time' ? 'clock' : 'calendar'}>
				{getPickerShellLabel(kind)}
			</PickerControl>
		</PickerShell>
	)
}

function getPickerShellLabel(kind: PickerShellKind): string {
	switch (kind) {
		case 'multi-select':
			return '2 workspaces selected'
		case 'time':
			return '2:30 PM'
		case 'date':
			return 'Apr 29, 2026'
	}
}
