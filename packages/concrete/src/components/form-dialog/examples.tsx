import { defineExamples } from '../../factories/createExamples'
import { Button, Input } from '../../primitives'
import { DateRangePicker } from '../date-range-picker'
import { FileUpload } from '../file-upload'
import { FormGrid } from '../form-shell'
import { MultiSelect } from '../multi-select'
import { ValidationSummary } from '../validation-summary'
import { FormDialog } from './component'

const multiSelectOptions = [
	{
		description: 'Foundations and primitives',
		label: 'Design system',
		meta: 'core',
		value: 'design'
	},
	{ description: 'Agentic interaction layer', label: 'AI native', meta: 'lab', value: 'ai' },
	{ description: 'Dashboards and data flows', label: 'Product', meta: 'dense', value: 'product' },
	{ disabled: true, label: 'Archived', meta: 'locked', value: 'archived' }
] as const

export const formDialogExamples = defineExamples({
	default: {
		description: 'Centered modal form with text, choice, and footer actions.',
		render: () => renderFormDialogExample('default')
	},
	error: {
		description: 'Dialog with validation feedback.',
		render: () => renderFormDialogExample('error')
	},
	wide: {
		description: 'Wider modal for picker and upload compositions.',
		render: () => renderFormDialogExample('wide')
	}
})

function renderFormDialogExample(state: 'default' | 'error' | 'wide') {
	return (
		<FormDialog
			description="Create a bounded experiment without leaving the current workspace."
			footer={
				<>
					<Button density="small" hierarchy="secondary">
						Cancel
					</Button>
					<Button density="small">Create run</Button>
				</>
			}
			measure={state === 'wide' ? 'wide' : 'default'}
			status={state === 'error' ? 'error' : 'default'}
			title="New experiment"
		>
			{state === 'error' ? (
				<ValidationSummary
					description="A run name and date window are required."
					items={[
						{ id: 'run-name', label: 'Run name', message: 'Add a short descriptive name.' },
						{ id: 'window', label: 'Date window', message: 'Choose a start and end date.' }
					]}
				/>
			) : null}
			<FormGrid columns={state === 'wide' ? 2 : 1}>
				<Input
					error={state === 'error' ? 'Add a short descriptive name.' : undefined}
					id="run-name"
					label="Run name"
					placeholder="Router contract check"
				/>
				<DateRangePicker
					defaultOpen={state === 'wide'}
					defaultValue={{ end: '2026-05-07', start: '2026-04-28' }}
					id="window"
					label="Window"
				/>
				<MultiSelect defaultValue={['design']} label="Tags" options={multiSelectOptions} />
				<FileUpload defaultValue={[]} label="Artifacts" title="Attach packet" />
			</FormGrid>
		</FormDialog>
	)
}
