import { defineExamples } from '../../factories/createExamples'
import { Button, FieldRow, Section, Select, Switch } from '../../primitives'
import type { UploadItemValue } from '../../schemas'
import { DatePicker } from '../date-picker'
import { FileUpload } from '../file-upload'
import { MultiSelect } from '../multi-select'
import { NumberStepper } from '../number-stepper'
import { ValidationSummary } from '../validation-summary'
import { FormDrawer } from './component'

const ownerOptions = [
	{ description: 'Design system maintainers', label: 'Concrete', meta: 'team', value: 'concrete' },
	{ description: 'Generated interface agents', label: 'Agents', meta: 'bot', value: 'agents' },
	{ description: 'Product review lane', label: 'Product', meta: 'ops', value: 'product' }
] as const

const drawerUploadQueue = [
	{
		id: 'policy-note',
		name: 'policy_note.md',
		progress: 100,
		size: 42000,
		status: 'success',
		type: 'text/markdown'
	}
] as const satisfies readonly UploadItemValue[]

export const formDrawerExamples = defineExamples({
	compact: {
		description: 'Compact drawer for fast policy edits.',
		render: () => renderFormDrawerExample('compact')
	},
	default: {
		description: 'Right-side drawer with settings rows.',
		render: () => renderFormDrawerExample('default')
	},
	left: {
		description: 'Left-side drawer placement for navigation-adjacent forms.',
		render: () => renderFormDrawerExample('left')
	},
	review: {
		description: 'Drawer with validation and review actions.',
		render: () => renderFormDrawerExample('review')
	},
	success: {
		description: 'Drawer with successful policy validation.',
		render: () => renderFormDrawerExample('success')
	}
})

function renderFormDrawerExample(state: 'compact' | 'default' | 'left' | 'review' | 'success') {
	const isCompact = state === 'compact'
	const isReview = state === 'review'
	const isSuccess = state === 'success'

	return (
		<FormDrawer
			compact={isCompact}
			description="Contextual edit surface for dense product screens."
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
			side={state === 'left' ? 'left' : 'right'}
			status={isReview ? 'error' : isSuccess ? 'success' : 'default'}
			title={isCompact ? 'Policy' : 'Workspace policy'}
		>
			{isReview ? (
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
				{isCompact ? null : (
					<FieldRow
						align="start"
						control={
							<MultiSelect
								defaultValue={isSuccess ? ['concrete', 'agents'] : ['concrete']}
								maxSelected={2}
								options={ownerOptions}
								placeholder="Assign owners..."
							/>
						}
						description="Teams responsible for reviewing generated changes."
						label="Owners"
						status={isReview ? 'error' : 'default'}
					/>
				)}
			</Section>
			<Section separated title="Limits">
				<FieldRow
					control={<NumberStepper defaultValue={isReview ? 0 : isSuccess ? 40 : 25} max={100} min={0} />}
					description="Daily command executions for this workspace."
					label="Run budget"
					meta="daily"
					status={isReview ? 'error' : 'default'}
				/>
				<FieldRow
					control={<DatePicker defaultValue="2026-05-01" label="" />}
					description="Policy review date."
					label="Review"
				/>
			</Section>
			{isCompact ? null : (
				<Section separated title="Evidence">
					<FileUpload
						defaultValue={isSuccess ? drawerUploadQueue : []}
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
