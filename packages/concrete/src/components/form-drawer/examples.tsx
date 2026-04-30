import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Button, Select, Switch } from '../../primitives'
import { DatePicker } from '../date-picker'
import { FormRow, FormSection } from '../form-shell'
import { NumberStepper } from '../number-stepper'
import { ValidationSummary } from '../validation-summary'
import { FormDrawer } from './component'

export const formDrawerExamples = defineExamples({
	default: {
		description: 'Right-side drawer with settings rows.',
		render: () => renderFormDrawerExample('default')
	},
	left: {
		description: 'Left-side drawer variant for navigation-adjacent forms.',
		render: () => renderFormDrawerExample('left')
	},
	review: {
		description: 'Drawer with validation and review actions.',
		render: () => renderFormDrawerExample('review')
	}
})

function renderFormDrawerExample(state: 'default' | 'left' | 'review') {
	return (
		<FormWideStage>
			<FormDrawer
				description="Contextual edit surface for dense product screens."
				footer={
					<>
						<Button size="small" variant="secondary">
							Discard
						</Button>
						<Button size="small">Apply</Button>
					</>
				}
				side={state === 'left' ? 'left' : 'right'}
				status={state === 'review' ? 'error' : 'default'}
				title="Workspace policy"
			>
				{state === 'review' ? (
					<ValidationSummary
						description="Review the owner and budget rules before applying."
						items={[
							{ id: 'owner', label: 'Owner', message: 'Assign a person or agent team.' },
							{ id: 'budget', label: 'Budget', message: 'A run budget is required.' }
						]}
					/>
				) : null}
				<FormSection title="Access">
					<FormRow
						control={<Switch checked label="Enabled" readOnly />}
						description="Allow collaborators to inspect generated artifacts."
						label="Shared visibility"
					/>
					<FormRow
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
				</FormSection>
				<FormSection title="Limits">
					<FormRow
						control={<NumberStepper defaultValue={state === 'review' ? 0 : 25} max={100} min={0} />}
						description="Daily command executions for this workspace."
						label="Run budget"
						meta="daily"
						status={state === 'review' ? 'error' : 'default'}
					/>
					<FormRow
						control={<DatePicker defaultValue="2026-05-01" label="" />}
						description="Policy review date."
						label="Review"
					/>
				</FormSection>
			</FormDrawer>
		</FormWideStage>
	)
}

function FormWideStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 760, width: '100%' }}>{children}</div>
}
