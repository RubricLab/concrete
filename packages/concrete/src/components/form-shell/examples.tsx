import { defineExamples } from '../../factories/createExamples'
import { Button, Input, Select, Switch } from '../../primitives'
import { NumberStepper } from '../number-stepper'
import { ValidationSummary } from '../validation-summary'
import { FormGrid, FormRow, FormSection, FormShell } from './component'

export const formShellExamples = defineExamples({
	compact: {
		description: 'Dense settings surface rhythm.',
		render: () => renderFormShellExample('compact')
	},
	default: {
		description: 'Panel shell with sections and action footer.',
		render: () => renderFormShellExample('default')
	},
	validation: {
		description: 'Shell composed with validation summary.',
		render: () => renderFormShellExample('validation')
	}
})

function renderFormShellExample(state: 'compact' | 'default' | 'validation') {
	return (
		<FormShell
			compact={state === 'compact'}
			description="Configure a reusable agent workspace without leaving the local form contract."
			eyebrow="Workspace"
			footer={
				<>
					<Button density="small" hierarchy="secondary">
						Cancel
					</Button>
					<Button density="small">Save changes</Button>
				</>
			}
			status={state === 'validation' ? 'error' : 'default'}
			title="Runtime settings"
		>
			{state === 'validation' ? (
				<ValidationSummary
					description="Two fields need attention before this workspace can run."
					items={[
						{
							href: '#workspace-name',
							id: 'name',
							label: 'Workspace name',
							message: 'Names must be unique inside the organization.'
						},
						{
							href: '#default-model',
							id: 'model',
							label: 'Default model',
							message: 'Choose a model before saving.'
						}
					]}
				/>
			) : null}
			<FormSection
				description="Short identity fields stay compact and directly editable."
				title="Identity"
			>
				<FormGrid columns={2} compact={state === 'compact'}>
					<Input defaultValue="Contract research" id="workspace-name" label="Name" />
					<Select
						defaultValue={state === 'validation' ? '' : 'router'}
						error={state === 'validation' ? 'Choose a default model.' : undefined}
						id="default-model"
						label="Default model"
						options={[
							{ label: 'Select model...', value: '' },
							{ label: 'Router v2', value: 'router' },
							{ label: 'Reasoning agent', value: 'reasoning' }
						]}
					/>
				</FormGrid>
			</FormSection>
			<FormSection title="Runtime">
				<FormRow
					control={<Switch checked label="Enabled" readOnly />}
					description="Allow scheduled runs and manual tool execution."
					label="Agent execution"
				/>
				<FormRow
					control={<NumberStepper defaultValue={4} max={8} min={1} />}
					description="Parallel workers available to this workspace."
					label="Worker limit"
					meta="1-8"
				/>
			</FormSection>
		</FormShell>
	)
}
