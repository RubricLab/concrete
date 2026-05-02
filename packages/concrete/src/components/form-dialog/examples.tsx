import { defineExamples } from '../../factories/createExamples'
import { Button, Grid, Input, Textarea } from '../../primitives'
import type { UploadItemValue } from '../../schemas'
import { DateRangePicker } from '../date-range-picker'
import { FileUpload } from '../file-upload'
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

const dialogUploadQueue = [
	{
		id: 'experiment-brief',
		name: 'experiment_brief.pdf',
		progress: 100,
		size: 1480000,
		status: 'success',
		type: 'application/pdf'
	},
	{
		id: 'eval-set',
		name: 'eval_set.csv',
		progress: 58,
		size: 820000,
		status: 'uploading',
		type: 'text/csv'
	}
] as const satisfies readonly UploadItemValue[]

export const formDialogExamples = defineExamples({
	compact: {
		description: 'Compact modal for a short bounded edit.',
		render: () => renderFormDialogExample('compact')
	},
	default: {
		description: 'Centered modal form with text, choice, and footer actions.',
		render: () => renderFormDialogExample('default')
	},
	error: {
		description: 'Dialog with validation feedback.',
		render: () => renderFormDialogExample('error')
	},
	success: {
		description: 'Dialog with success feedback and attached artifacts.',
		render: () => renderFormDialogExample('success')
	},
	wide: {
		description: 'Wider modal for picker and upload compositions.',
		render: () => renderFormDialogExample('wide')
	}
})

function renderFormDialogExample(state: 'compact' | 'default' | 'error' | 'success' | 'wide') {
	const isCompact = state === 'compact'
	const isError = state === 'error'
	const isSuccess = state === 'success'
	const isWide = state === 'wide'

	return (
		<FormDialog
			compact={isCompact}
			description="Create a bounded experiment without leaving the current workspace."
			footer={
				<>
					<Button density="small" hierarchy="secondary">
						Cancel
					</Button>
					<Button density="small" hierarchy="primary" intent={isSuccess ? 'sky' : 'neutral'}>
						{isSuccess ? 'Queue next' : 'Create run'}
					</Button>
				</>
			}
			measure={isWide ? 'wide' : isCompact ? 'compact' : 'default'}
			status={isError ? 'error' : isSuccess ? 'success' : 'default'}
			title={isCompact ? 'Run checkpoint' : 'New experiment'}
		>
			{isError ? (
				<ValidationSummary
					description="A run name and date window are required."
					items={[
						{ id: 'run-name', label: 'Run name', message: 'Add a short descriptive name.' },
						{ id: 'window', label: 'Date window', message: 'Choose a start and end date.' }
					]}
				/>
			) : null}
			{isSuccess ? (
				<ValidationSummary
					description="The run is configured and ready to enter the evaluation queue."
					items={[
						{
							id: 'packet',
							label: 'Packet',
							message: 'Two source artifacts are attached.',
							status: 'success'
						},
						{
							id: 'window',
							label: 'Window',
							message: 'The comparison window is valid.',
							status: 'success'
						}
					]}
					status="success"
				/>
			) : null}
			<Grid columns={isWide ? 'two' : 'one'} density={isCompact ? 'compact' : 'comfortable'}>
				<Input
					defaultValue={isError ? '' : 'Router contract check'}
					error={isError ? 'Add a short descriptive name.' : undefined}
					help={isSuccess ? 'Ready' : undefined}
					id="run-name"
					label="Run name"
					placeholder="Router contract check"
				/>
				<DateRangePicker
					defaultValue={{ end: '2026-05-07', start: '2026-04-28' }}
					error={isError ? 'Choose a start and end date.' : undefined}
					id="window"
					label="Window"
					success={isSuccess ? 'Window confirmed' : undefined}
				/>
				{isCompact ? null : (
					<MultiSelect
						defaultValue={isSuccess ? ['design', 'product'] : ['design']}
						label="Tags"
						maxSelected={3}
						options={multiSelectOptions}
					/>
				)}
				{isCompact ? null : (
					<Textarea
						defaultValue="Compare tool-routing quality against the current production prompt."
						label="Objective"
						rows={3}
					/>
				)}
				{isCompact ? null : (
					<FileUpload
						defaultValue={isSuccess || isWide ? dialogUploadQueue : []}
						display={isWide ? 'grid' : 'stack'}
						kind={isWide ? 'grid' : 'file'}
						label="Artifacts"
						title="Attach packet"
					/>
				)}
			</Grid>
		</FormDialog>
	)
}
