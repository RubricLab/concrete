import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Button, FieldRow, Section, Select, Switch } from '../../primitives'
import type { UploadItemValue } from '../../schemas'
import { DatePicker } from '../date-picker'
import { FileUpload } from '../file-upload'
import { MultiSelect } from '../multi-select'
import { NumberStepper } from '../number-stepper'
import { ValidationSummary } from '../validation-summary'
import { FormDrawer } from './component'
import { formDrawerExamples } from './examples'
import { formDrawerMeta } from './meta'
import { type FormDrawerValue, formDrawerComponentSchema } from './schema'

export type { FormDrawerProps, FormDrawerSide } from './component'
export { FormDrawer } from './component'
export type { FormDrawerInput, FormDrawerValue } from './schema'
export { formDrawerComponentSchema } from './schema'

export const formDrawerComponentDefinition = createComponent({
	...formDrawerMeta,
	component: FormDrawer,
	kind: 'component',
	renderExample: (state?: string) => renderExample(formDrawerExamples, state),
	renderInput: input => renderFormDrawerInput(formDrawerComponentSchema.parse(input)),
	schema: formDrawerComponentSchema,
	seed: formDrawerComponentSchema.parse({
		compact: false,
		description: 'Contextual editing beside dense product surfaces.',
		title: 'Workspace policy'
	}),
	slug: 'form-drawer',
	states: exampleStates(formDrawerExamples, ['default', 'review', 'left', 'compact', 'success'])
})

const formDrawerOwnerOptions = [
	{ description: 'Design system maintainers', label: 'Concrete', meta: 'team', value: 'concrete' },
	{ description: 'Generated interface agents', label: 'Agents', meta: 'bot', value: 'agents' },
	{ description: 'Product review lane', label: 'Product', meta: 'ops', value: 'product' }
] as const

const formDrawerUploadQueue = [
	{
		id: 'policy-note',
		name: 'policy_note.md',
		progress: 100,
		size: 42000,
		status: 'success',
		type: 'text/markdown'
	}
] as const satisfies readonly UploadItemValue[]

function renderFormDrawerInput(input: FormDrawerValue) {
	const { compact, description, status, ...props } = input
	const isError = status === 'error'
	const isSuccess = status === 'success'

	return (
		<FormDrawer
			{...props}
			compact={compact}
			{...(description ? { description } : {})}
			footer={
				<>
					<Button density="small" hierarchy="secondary">
						Discard
					</Button>
					<Button density="small" hierarchy="primary" intent={isSuccess ? 'sky' : 'neutral'}>
						{isSuccess ? 'Applied' : 'Apply'}
					</Button>
				</>
			}
			status={status}
		>
			{isError ? (
				<ValidationSummary
					description="Review the owner and budget rules before applying."
					items={[
						{ id: 'owner', label: 'Owner', message: 'Assign a person or agent team.' },
						{ id: 'budget', label: 'Budget', message: 'A run budget is required.' }
					]}
				/>
			) : null}
			{isSuccess ? (
				<ValidationSummary
					description="Policy changes are valid and ready for the next workspace run."
					items={[
						{
							id: 'owner',
							label: 'Owner',
							message: 'Concrete maintainers are assigned.',
							status: 'success'
						},
						{
							id: 'budget',
							label: 'Budget',
							message: 'Daily limit is within the approved range.',
							status: 'success'
						}
					]}
					status="success"
				/>
			) : null}
			<Section separated title="Access">
				<FieldRow
					control={<Switch checked label="Enabled" readOnly />}
					description="Allow collaborators to inspect generated artifacts."
					label="Shared visibility"
				/>
				<FieldRow
					control={
						<Select
							defaultValue="team"
							options={[
								{ label: 'Team', value: 'team' },
								{ label: 'Private', value: 'private' }
							]}
						/>
					}
					description="Default visibility for new runs."
					label="Scope"
				/>
				{compact ? null : (
					<FieldRow
						align="start"
						control={
							<MultiSelect
								defaultValue={isSuccess ? ['concrete', 'agents'] : ['concrete']}
								maxSelected={2}
								options={formDrawerOwnerOptions}
								placeholder="Assign owners..."
							/>
						}
						description="Teams responsible for reviewing generated changes."
						label="Owners"
						status={isError ? 'error' : 'default'}
					/>
				)}
			</Section>
			<Section separated title="Limits">
				<FieldRow
					control={<NumberStepper defaultValue={isError ? 0 : isSuccess ? 40 : 25} max={100} min={0} />}
					description="Daily command executions for this workspace."
					label="Run budget"
					meta="daily"
					status={isError ? 'error' : 'default'}
				/>
				<FieldRow
					control={<DatePicker defaultValue="2026-05-01" label="" />}
					description="Policy review date."
					label="Review"
				/>
			</Section>
			{compact ? null : (
				<Section separated title="Evidence">
					<FileUpload
						defaultValue={isSuccess ? formDrawerUploadQueue : []}
						kind="file"
						label="Source note"
						multiple={false}
						title="Attach note"
					/>
				</Section>
			)}
		</FormDrawer>
	)
}
