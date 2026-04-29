'use client'

import {
	Button,
	DatePicker,
	DateRangePicker,
	FileUpload,
	FormDialog,
	FormDrawer,
	FormGrid,
	FormRow,
	FormSection,
	FormShell,
	ImageUpload,
	Input,
	MultiSelect,
	NumberStepper,
	PasswordInput,
	RangeSlider,
	Select,
	SettingsPanel,
	Switch,
	TimePicker,
	ValidationSummary
} from '@rubriclab/concrete'
import type { ReactNode } from 'react'
import { getQueryBoolean, getQueryNumber, getQueryValue } from '@/playground-controls'
import { multiSelectOptions, uploadPreview } from './component-playground-fixtures'
import { FormFooter, FormStage, FormWideStage } from './component-playground-stages'

export function renderPasswordInputPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<FormStage>
			<PasswordInput
				defaultValue={getQueryValue(searchParams, 'value', 'concrete-secret')}
				error={getQueryValue(searchParams, 'error', '') || undefined}
				help={getQueryValue(searchParams, 'help', 'Use a passphrase or generated credential.')}
				label={getQueryValue(searchParams, 'label', 'Password')}
			/>
		</FormStage>
	)
}

export function renderTimePickerPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<FormStage>
			<TimePicker
				defaultOpen={getQueryBoolean(searchParams, 'open', false)}
				defaultValue={getQueryValue(searchParams, 'value', '14:30')}
				interval={getQueryNumber(searchParams, 'interval', 30)}
				label={getQueryValue(searchParams, 'label', 'Run time')}
			/>
		</FormStage>
	)
}

export function renderNumberStepperPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<FormStage>
			<NumberStepper
				defaultValue={getQueryNumber(searchParams, 'value', 42)}
				error={getQueryValue(searchParams, 'error', '') || undefined}
				label={getQueryValue(searchParams, 'label', 'Agents')}
				max={getQueryNumber(searchParams, 'max', 100)}
				min={getQueryNumber(searchParams, 'min', 1)}
				step={getQueryNumber(searchParams, 'step', 2)}
			/>
		</FormStage>
	)
}

export function renderFormShellPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<FormWideStage>
			<FormShell
				compact={getQueryBoolean(searchParams, 'compact', false)}
				description={getQueryValue(
					searchParams,
					'description',
					'Configure a reusable agent workspace.'
				)}
				footer={<FormFooter />}
				status={getQueryValue(searchParams, 'status', 'default') as 'default' | 'error' | 'success'}
				title={getQueryValue(searchParams, 'title', 'Runtime settings')}
			>
				<FormSection title="Identity">
					<FormGrid columns={2}>
						<Input defaultValue="Contract research" label="Name" />
						<Select
							defaultValue="router"
							label="Default model"
							options={[
								{ label: 'Router v2', value: 'router' },
								{ label: 'Reasoning agent', value: 'reasoning' }
							]}
						/>
					</FormGrid>
				</FormSection>
				<FormSection title="Runtime">
					<FormRow control={<Switch checked label="Enabled" readOnly />} label="Agent execution" />
				</FormSection>
			</FormShell>
		</FormWideStage>
	)
}

export function renderValidationSummaryPlayground(searchParams: URLSearchParams): ReactNode {
	const status = getQueryValue(searchParams, 'status', 'error') as 'default' | 'error' | 'success'

	return (
		<FormStage>
			<ValidationSummary
				action={
					getQueryBoolean(searchParams, 'action', false) ? (
						<Button size="small" variant="secondary">
							Review
						</Button>
					) : undefined
				}
				description={getQueryValue(
					searchParams,
					'description',
					'Resolve the listed fields before saving.'
				)}
				items={
					status === 'success'
						? [{ id: 'ready', label: 'Configuration', message: 'Ready to submit.', status: 'success' }]
						: [
								{ id: 'owner', label: 'Owner', message: 'Assign a responsible operator.' },
								{ id: 'budget', label: 'Budget limit', message: 'Enter a value between 1 and 100.' }
							]
				}
				status={status}
				title={getQueryValue(
					searchParams,
					'title',
					status === 'success' ? 'Ready to save' : 'Review required'
				)}
			/>
		</FormStage>
	)
}

export function renderSettingsPanelPlayground(searchParams: URLSearchParams): ReactNode {
	const status = getQueryValue(searchParams, 'status', 'default') as 'default' | 'error' | 'success'

	return (
		<FormWideStage>
			<SettingsPanel
				compact={getQueryBoolean(searchParams, 'compact', false)}
				description={getQueryValue(
					searchParams,
					'description',
					'Dense settings rows for product surfaces.'
				)}
				footer={<FormFooter />}
				status={status}
				title={getQueryValue(searchParams, 'title', 'Agent workspace')}
				sections={[
					{
						description: 'Core behavior for generated work and local tools.',
						id: 'runtime',
						rows: [
							{
								control: <Switch checked label="Enabled" readOnly />,
								description: 'Permit tool calls from approved command surfaces.',
								id: 'tools',
								label: 'Tools',
								meta: 'on'
							},
							{
								control: <NumberStepper defaultValue={6} max={12} min={1} />,
								description: 'Maximum active workers for one request.',
								id: 'workers',
								label: 'Parallel workers',
								meta: 'max 12',
								status
							}
						],
						title: 'Runtime'
					}
				]}
			/>
		</FormWideStage>
	)
}

export function renderFormDialogPlayground(searchParams: URLSearchParams): ReactNode {
	const status = getQueryValue(searchParams, 'status', 'default') as 'default' | 'error' | 'success'

	return (
		<FormWideStage>
			<FormDialog
				description={getQueryValue(searchParams, 'description', 'Create a bounded experiment.')}
				footer={<FormFooter submitLabel="Create run" />}
				size={getQueryValue(searchParams, 'size', 'default') as 'compact' | 'default' | 'wide'}
				status={status}
				title={getQueryValue(searchParams, 'title', 'New experiment')}
			>
				{status === 'error' ? (
					<ValidationSummary
						description="A run name and date window are required."
						items={[{ id: 'run-name', label: 'Run name', message: 'Add a short descriptive name.' }]}
					/>
				) : null}
				<FormGrid columns={2}>
					<Input label="Run name" placeholder="Router contract check" />
					<DatePicker defaultValue="2026-04-28" label="Start" />
					<MultiSelect defaultValue={['design']} label="Tags" options={multiSelectOptions} />
					<FileUpload defaultValue={[]} label="Artifacts" title="Attach packet" />
				</FormGrid>
			</FormDialog>
		</FormWideStage>
	)
}

export function renderFormDrawerPlayground(searchParams: URLSearchParams): ReactNode {
	const status = getQueryValue(searchParams, 'status', 'default') as 'default' | 'error' | 'success'

	return (
		<FormWideStage>
			<FormDrawer
				description={getQueryValue(
					searchParams,
					'description',
					'Contextual editing beside dense product surfaces.'
				)}
				footer={<FormFooter submitLabel="Apply" />}
				side={getQueryValue(searchParams, 'side', 'right') as 'left' | 'right'}
				status={status}
				title={getQueryValue(searchParams, 'title', 'Workspace policy')}
			>
				<FormSection title="Limits">
					<FormRow
						control={<NumberStepper defaultValue={status === 'error' ? 0 : 25} max={100} min={0} />}
						description="Daily command executions for this workspace."
						label="Run budget"
						meta="daily"
						status={status}
					/>
					<FormRow
						control={<Switch checked label="Enabled" readOnly />}
						description="Allow collaborators to inspect generated artifacts."
						label="Shared visibility"
					/>
				</FormSection>
			</FormDrawer>
		</FormWideStage>
	)
}

export function renderMultiSelectPlayground(searchParams: URLSearchParams): ReactNode {
	const selection = getQueryValue(searchParams, 'selection', 'default')
	const defaultValue =
		selection === 'empty' ? [] : selection === 'single' ? ['design'] : ['design', 'ai']

	return (
		<FormStage>
			<MultiSelect
				defaultOpen={getQueryBoolean(searchParams, 'open', false)}
				defaultValue={defaultValue}
				label={getQueryValue(searchParams, 'label', 'Project tags')}
				maxSelected={getQueryNumber(searchParams, 'maxSelected', 3)}
				options={multiSelectOptions}
			/>
		</FormStage>
	)
}

export function renderDatePickerPlayground(searchParams: URLSearchParams): ReactNode {
	const bounded = getQueryBoolean(searchParams, 'bounded', false)

	return (
		<FormStage>
			<DatePicker
				defaultOpen={getQueryBoolean(searchParams, 'open', false)}
				defaultValue={getQueryValue(searchParams, 'value', '2026-04-28')}
				help={bounded ? 'Only this sprint window is available.' : undefined}
				label={getQueryValue(searchParams, 'label', 'Start date')}
				max={bounded ? '2026-05-02' : undefined}
				min={bounded ? '2026-04-24' : undefined}
			/>
		</FormStage>
	)
}

export function renderDateRangePickerPlayground(searchParams: URLSearchParams): ReactNode {
	const partial = getQueryBoolean(searchParams, 'partial', false)

	return (
		<FormStage>
			<DateRangePicker
				defaultOpen={getQueryBoolean(searchParams, 'open', false)}
				defaultValue={{
					...(partial ? {} : { end: getQueryValue(searchParams, 'end', '2026-05-07') }),
					start: getQueryValue(searchParams, 'start', '2026-04-28')
				}}
				label={getQueryValue(searchParams, 'label', 'Experiment window')}
			/>
		</FormStage>
	)
}

export function renderRangeSliderPlayground(searchParams: URLSearchParams): ReactNode {
	const start = getQueryNumber(searchParams, 'start', 20)
	const end = getQueryNumber(searchParams, 'end', 80)

	return (
		<FormStage>
			<RangeSlider
				defaultValue={[start, end]}
				label={getQueryValue(searchParams, 'label', 'Confidence range')}
				max={getQueryNumber(searchParams, 'max', 100)}
				min={getQueryNumber(searchParams, 'min', 0)}
			/>
		</FormStage>
	)
}

export function renderFileUploadPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<FormStage>
			<FileUpload
				defaultValue={getUploadQueue(getQueryValue(searchParams, 'queue', 'uploading'), false)}
				label={getQueryValue(searchParams, 'label', 'Artifacts')}
				multiple={getQueryBoolean(searchParams, 'multiple', true)}
				title={getQueryValue(searchParams, 'title', 'Upload files')}
			/>
		</FormStage>
	)
}

export function renderImageUploadPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<FormStage>
			<ImageUpload
				defaultValue={getUploadQueue(getQueryValue(searchParams, 'queue', 'success'), true)}
				label={getQueryValue(searchParams, 'label', 'Reference image')}
				variant={getQueryValue(searchParams, 'variant', 'single') as 'avatar' | 'grid' | 'single'}
			/>
		</FormStage>
	)
}

function getUploadQueue(queue: string, image: boolean) {
	switch (queue) {
		case 'empty':
			return []
		case 'error':
			return [
				{
					error: image ? 'Image dimensions are too small.' : 'File type is not accepted.',
					id: 'rejected',
					name: image ? 'tiny-reference.png' : 'archive.zip',
					...(image ? { previewUrl: uploadPreview } : {}),
					size: image ? 42000 : 9240000,
					status: 'error' as const,
					type: image ? 'image/png' : 'application/zip'
				}
			]
		case 'success':
			return [
				{
					id: 'reference',
					name: image ? 'interface-reference.png' : 'research-packet.pdf',
					...(image ? { previewUrl: uploadPreview } : {}),
					progress: 100,
					size: image ? 840000 : 2400000,
					status: 'success' as const,
					type: image ? 'image/png' : 'application/pdf'
				}
			]
		default:
			return [
				{
					id: 'q2-report',
					name: 'Q2_report.pdf',
					progress: 72,
					size: 2400000,
					status: 'uploading' as const,
					type: 'application/pdf'
				}
			]
	}
}
