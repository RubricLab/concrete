import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Button, Grid, Input, Textarea } from '../../primitives'
import type { UploadItemValue } from '../../schemas'
import { DateRangePicker } from '../date-range-picker'
import { FileUpload } from '../file-upload'
import { MultiSelect } from '../multi-select'
import { ValidationSummary } from '../validation-summary'
import { FormDialog } from './component'
import { formDialogExamples } from './examples'
import { formDialogMeta } from './meta'
import { type FormDialogValue, formDialogComponentSchema } from './schema'

export type { FormDialogMeasure, FormDialogPresentation, FormDialogProps } from './component'
export { FormDialog } from './component'
export type { FormDialogInput, FormDialogValue } from './schema'
export { formDialogComponentSchema } from './schema'

export const formDialogComponentDefinition = createComponent({
	...formDialogMeta,
	component: FormDialog,
	kind: 'component',
	renderExample: (state?: string) => renderExample(formDialogExamples, state),
	renderInput: input => renderFormDialogInput(formDialogComponentSchema.parse(input)),
	schema: formDialogComponentSchema,
	seed: formDialogComponentSchema.parse({
		compact: false,
		description: 'Create a bounded experiment.',
		title: 'New experiment'
	}),
	slug: 'form-dialog',
	states: exampleStates(formDialogExamples, ['default', 'wide', 'error', 'compact', 'success'])
})

const formDialogOptions = [
	{
		description: 'Foundations and primitives',
		label: 'Design system',
		meta: 'core',
		value: 'design'
	},
	{ description: 'Agentic interaction layer', label: 'AI native', meta: 'lab', value: 'ai' },
	{ description: 'Dashboards and data flows', label: 'Product', meta: 'dense', value: 'product' }
] as const

const formDialogUploadQueue = [
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

function renderFormDialogInput(input: FormDialogValue) {
	const { compact, description, measure, status, ...props } = input
	const isError = status === 'error'
	const isSuccess = status === 'success'
	const isWide = measure === 'wide'

	return (
		<FormDialog
			{...props}
			compact={compact}
			{...(description ? { description } : {})}
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
			measure={measure}
			status={status}
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
			<Grid columns={isWide ? 'two' : 'one'} density={compact ? 'compact' : 'comfortable'}>
				<Input
					defaultValue={isError ? '' : 'Router contract check'}
					error={isError ? 'Add a short descriptive name.' : undefined}
					help={isSuccess ? 'Ready' : undefined}
					label="Run name"
					placeholder="Router contract check"
				/>
				<DateRangePicker
					defaultValue={{ end: '2026-05-07', start: '2026-04-28' }}
					error={isError ? 'Choose a start and end date.' : undefined}
					label="Window"
					success={isSuccess ? 'Window confirmed' : undefined}
				/>
				{compact ? null : (
					<MultiSelect
						defaultValue={isSuccess ? ['design', 'product'] : ['design']}
						label="Tags"
						maxSelected={3}
						options={formDialogOptions}
					/>
				)}
				{compact ? null : (
					<Textarea
						defaultValue="Compare tool-routing quality against the current production prompt."
						label="Objective"
						rows={3}
					/>
				)}
				{compact ? null : (
					<FileUpload
						defaultValue={isSuccess || isWide ? formDialogUploadQueue : []}
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
