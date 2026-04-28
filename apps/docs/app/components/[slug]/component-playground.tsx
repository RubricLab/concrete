'use client'

import {
	Button,
	CommandMenu,
	type CommandMenuItem,
	type ComponentRegistryEntry,
	type ComponentSlug,
	Composer,
	type ComposerValue,
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
	Message,
	MultiSelect,
	NumberStepper,
	PasswordInput,
	RangeSlider,
	ReasoningMessage,
	type ReasoningMessageStep,
	renderComponentExample,
	SearchBar,
	type SearchToken,
	Select,
	SettingsPanel,
	Switch,
	TimePicker,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarSeparator,
	ToolCallMessage,
	ValidationSummary
} from '@rubriclab/concrete'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'
import {
	booleanControl,
	type ControlDefinition,
	getIconName,
	getQueryBoolean,
	getQueryNumber,
	getQueryValue,
	numberControl,
	PropControl,
	selectControl,
	textControl
} from '@/playground-controls'

type ComponentPlaygroundProps = {
	entry: ComponentRegistryEntry
}

const commandMenuItems = [
	{
		group: 'Jump to',
		id: 'case-study',
		label: 'Case study: Sligo',
		leadingIcon: 'folder',
		shortcut: ['enter'],
		tone: 'ultra'
	},
	{
		group: 'Jump to',
		id: 'contract',
		label: 'Sligo - contract.json',
		leadingIcon: 'file-text',
		meta: '/agents/sligo'
	},
	{
		group: 'Jump to',
		id: 'runs',
		label: 'Sligo - live runs',
		leadingIcon: 'activity',
		meta: '12 active'
	},
	{
		group: 'Actions',
		id: 'new-agent',
		label: 'New agent',
		leadingIcon: 'plus',
		shortcut: ['cmd', 'N']
	},
	{
		group: 'Actions',
		id: 'ask-rubric',
		label: 'Ask Rubric...',
		leadingIcon: 'sparkles',
		shortcut: ['cmd', 'J'],
		tone: 'sky'
	}
] as const satisfies readonly CommandMenuItem[]

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

const scopedSearchTokens = [
	{ id: 'workspace', label: 'Rubric', leadingIcon: 'folder', tone: 'sky' },
	{ id: 'mode', label: 'agent runs', leadingIcon: 'activity', tone: 'ultra' }
] as const satisfies readonly SearchToken[]

const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23eef3fb"/%3E%3Cpath d="M18 56 34 36l10 12 8-10 10 18H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="55" cy="25" r="6" fill="%23a9c6ef"/%3E%3C/svg%3E'

const reasoningSteps = [
	{
		detail:
			'Loaded the component registry, render route, and local state before changing the interface.',
		id: 'context',
		label: 'Context loaded',
		status: 'complete'
	},
	{
		detail: 'Selected the smallest deterministic interaction boundary for the component.',
		id: 'boundary',
		label: 'Boundary selected',
		status: 'complete'
	},
	{
		detail: 'Running the focused component check against dense and mobile surfaces.',
		id: 'verify',
		label: 'Verification running',
		status: 'streaming'
	}
] as const satisfies readonly ReasoningMessageStep[]

export function ComponentPlayground({ entry }: ComponentPlaygroundProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const controls = getComponentPlaygroundControls(entry)
	const stateValue = getQueryValue(searchParams, 'state', 'default')

	function updateQueryParameter(name: string, value: string, defaultValue: string) {
		const nextSearchParams = new URLSearchParams(searchParams.toString())

		if (value === defaultValue || value.length === 0) {
			nextSearchParams.delete(name)
		} else {
			nextSearchParams.set(name, value)
		}

		const queryString = nextSearchParams.toString()
		router.replace(queryString.length > 0 ? `${pathname}?${queryString}` : pathname, {
			scroll: false
		})
	}

	return (
		<div className="playgroundShell componentPlaygroundShell">
			<div className="playgroundPreview componentPlaygroundPreview" key={searchParams.toString()}>
				{renderPlaygroundComponent(entry.slug, searchParams)}
			</div>
			<form className="playgroundControls">
				<PropControl
					control={{
						defaultValue: 'default',
						label: 'State',
						name: 'state',
						options: entry.states.map(state => ({
							label: state.name,
							value: state.query
						})),
						type: 'select'
					}}
					onChange={updateQueryParameter}
					value={stateValue}
				/>
				{controls.map(control => (
					<PropControl
						control={control}
						key={control.name}
						onChange={updateQueryParameter}
						value={getQueryValue(searchParams, control.name, control.defaultValue)}
					/>
				))}
			</form>
		</div>
	)
}

function getComponentPlaygroundControls(
	entry: ComponentRegistryEntry
): readonly ControlDefinition[] {
	switch (entry.slug) {
		case 'toolbar':
			return [
				booleanControl('compact', 'Compact', 'false'),
				selectControl('appearance', 'Appearance', 'icon', ['icon', 'subtle', 'chip']),
				textControl('label', 'Label', 'Search'),
				booleanControl('selected', 'Selected', 'false'),
				booleanControl('pressed', 'Pressed', 'false'),
				selectControl('shortcut', 'Shortcut', 'cmd-k', ['none', 'cmd-k', 'cmd-enter'])
			]
		case 'command-menu':
			return [
				textControl('query', 'Query', 'sligo'),
				booleanControl('searchable', 'Searchable', 'true'),
				booleanControl('loading', 'Loading', 'false')
			]
		case 'search-bar':
			return [
				textControl('query', 'Query', 'triage sligo'),
				textControl('placeholder', 'Placeholder', 'Search, ask, or command...'),
				booleanControl('tokens', 'Tokens', 'true'),
				booleanControl('menu', 'Menu', 'false'),
				booleanControl('wrap', 'Wrap', 'false')
			]
		case 'composer':
			return [
				textControl('text', 'Text', 'Hey @arihan - can we run /eval triage-v2 against this?'),
				textControl('placeholder', 'Placeholder', 'Write a message...'),
				selectControl('menuKind', 'Menu', '', ['', 'mention', 'command']),
				booleanControl('disabled', 'Disabled', 'false'),
				textControl('submitLabel', 'Submit label', 'Send')
			]
		case 'message':
			return [
				selectControl('messageRole', 'Role', 'assistant', ['assistant', 'user', 'system', 'tool']),
				selectControl('surface', 'Surface', 'bubble', ['bubble', 'plain']),
				selectControl('status', 'Status', 'complete', ['complete', 'pending', 'streaming', 'error']),
				textControl('author', 'Author', 'Rubric'),
				textControl('body', 'Body', 'The run is failing during schema hydration.'),
				booleanControl('showAvatar', 'Avatar', 'true')
			]
		case 'reasoning-message':
			return [
				textControl('title', 'Title', 'Thinking'),
				textControl(
					'summary',
					'Summary',
					'Checking context and selecting the next deterministic action.'
				),
				selectControl('status', 'Status', 'streaming', ['streaming', 'pending', 'complete', 'error']),
				booleanControl('open', 'Open', 'true')
			]
		case 'tool-call-message':
			return [
				textControl('name', 'Name', 'search workspace'),
				selectControl('status', 'Status', 'running', ['queued', 'running', 'success', 'error']),
				booleanControl('open', 'Open', 'true'),
				textControl('duration', 'Duration', '1.8s'),
				textControl('input', 'Input', 'rg -n "composer" @rubriclab/concrete'),
				textControl('output', 'Output', '7 tests passed. TypeScript clean.')
			]
		case 'form-shell':
			return [
				textControl('title', 'Title', 'Runtime settings'),
				textControl('description', 'Description', 'Configure a reusable agent workspace.'),
				selectControl('status', 'Status', 'default', ['default', 'error', 'success']),
				booleanControl('compact', 'Compact', 'false')
			]
		case 'validation-summary':
			return [
				textControl('title', 'Title', 'Review required'),
				textControl('description', 'Description', 'Resolve the listed fields before saving.'),
				selectControl('status', 'Status', 'error', ['default', 'error', 'success']),
				booleanControl('action', 'Action', 'false')
			]
		case 'settings-panel':
			return [
				textControl('title', 'Title', 'Agent workspace'),
				textControl('description', 'Description', 'Dense settings rows for product surfaces.'),
				selectControl('status', 'Status', 'default', ['default', 'error', 'success']),
				booleanControl('compact', 'Compact', 'false')
			]
		case 'form-dialog':
			return [
				textControl('title', 'Title', 'New experiment'),
				textControl('description', 'Description', 'Create a bounded experiment.'),
				selectControl('status', 'Status', 'default', ['default', 'error', 'success']),
				selectControl('size', 'Size', 'default', ['compact', 'default', 'wide'])
			]
		case 'form-drawer':
			return [
				textControl('title', 'Title', 'Workspace policy'),
				textControl('description', 'Description', 'Contextual editing beside dense product surfaces.'),
				selectControl('status', 'Status', 'default', ['default', 'error', 'success']),
				selectControl('side', 'Side', 'right', ['left', 'right'])
			]
		case 'password-input':
			return [
				textControl('label', 'Label', 'Password'),
				textControl('value', 'Value', 'concrete-secret'),
				textControl('help', 'Help', 'Use a passphrase or generated credential.'),
				textControl('error', 'Error', '')
			]
		case 'multi-select':
			return [
				textControl('label', 'Label', 'Project tags'),
				selectControl('selection', 'Selection', 'default', ['default', 'single', 'empty']),
				booleanControl('open', 'Open', 'false'),
				numberControl('maxSelected', 'Max', '3')
			]
		case 'date-picker':
			return [
				textControl('label', 'Label', 'Start date'),
				textControl('value', 'Value', '2026-04-28'),
				booleanControl('open', 'Open', 'false'),
				booleanControl('bounded', 'Bounded', 'false')
			]
		case 'date-range-picker':
			return [
				textControl('label', 'Label', 'Experiment window'),
				textControl('start', 'Start', '2026-04-28'),
				textControl('end', 'End', '2026-05-07'),
				booleanControl('open', 'Open', 'false'),
				booleanControl('partial', 'Partial', 'false')
			]
		case 'time-picker':
			return [
				textControl('label', 'Label', 'Run time'),
				textControl('value', 'Value', '14:30'),
				booleanControl('open', 'Open', 'false'),
				selectControl('interval', 'Interval', '30', ['15', '30', '60'])
			]
		case 'number-stepper':
			return [
				textControl('label', 'Label', 'Agents'),
				numberControl('value', 'Value', '42'),
				numberControl('min', 'Min', '1'),
				numberControl('max', 'Max', '100'),
				numberControl('step', 'Step', '2'),
				textControl('error', 'Error', '')
			]
		case 'range-slider':
			return [
				textControl('label', 'Label', 'Confidence range'),
				numberControl('start', 'Start', '20'),
				numberControl('end', 'End', '80'),
				numberControl('min', 'Min', '0'),
				numberControl('max', 'Max', '100')
			]
		case 'file-upload':
			return [
				textControl('label', 'Label', 'Artifacts'),
				textControl('title', 'Title', 'Upload files'),
				selectControl('queue', 'Queue', 'uploading', ['empty', 'uploading', 'success', 'error']),
				booleanControl('multiple', 'Multiple', 'true')
			]
		case 'image-upload':
			return [
				textControl('label', 'Label', 'Reference image'),
				selectControl('variant', 'Variant', 'single', ['single', 'avatar', 'grid']),
				selectControl('queue', 'Queue', 'success', ['empty', 'success', 'error'])
			]
		default:
			return []
	}
}

function renderPlaygroundComponent(slug: ComponentSlug, searchParams: URLSearchParams): ReactNode {
	const state = getQueryValue(searchParams, 'state', 'default')

	switch (slug) {
		case 'toolbar':
			return renderToolbarPlayground(searchParams)
		case 'command-menu':
			return renderCommandMenuPlayground(searchParams, state)
		case 'search-bar':
			return renderSearchBarPlayground(searchParams)
		case 'composer':
			return renderComposerPlayground(searchParams)
		case 'message':
			return renderMessagePlayground(searchParams)
		case 'reasoning-message':
			return renderReasoningPlayground(searchParams)
		case 'tool-call-message':
			return renderToolCallPlayground(searchParams)
		case 'form-shell':
			return renderFormShellPlayground(searchParams)
		case 'validation-summary':
			return renderValidationSummaryPlayground(searchParams)
		case 'settings-panel':
			return renderSettingsPanelPlayground(searchParams)
		case 'form-dialog':
			return renderFormDialogPlayground(searchParams)
		case 'form-drawer':
			return renderFormDrawerPlayground(searchParams)
		case 'password-input':
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
		case 'multi-select':
			return renderMultiSelectPlayground(searchParams)
		case 'date-picker':
			return renderDatePickerPlayground(searchParams)
		case 'date-range-picker':
			return renderDateRangePickerPlayground(searchParams)
		case 'time-picker':
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
		case 'number-stepper':
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
		case 'range-slider':
			return renderRangeSliderPlayground(searchParams)
		case 'file-upload':
			return renderFileUploadPlayground(searchParams)
		case 'image-upload':
			return renderImageUploadPlayground(searchParams)
		default:
			return renderComponentExample(slug, state)
	}
}

function renderToolbarPlayground(searchParams: URLSearchParams): ReactNode {
	const shortcut = getShortcut(searchParams)
	const appearance = getQueryValue(searchParams, 'appearance', 'icon') as 'chip' | 'icon' | 'subtle'
	const label = getQueryValue(searchParams, 'label', 'Search')
	const icon = getIconName(searchParams, 'icon') ?? 'search'

	return (
		<CommandStage>
			<Toolbar compact={getQueryBoolean(searchParams, 'compact', false)} label="Component toolbar">
				<ToolbarGroup>
					<ToolbarButton
						appearance={appearance}
						label={label}
						pressed={getQueryBoolean(searchParams, 'pressed', false)}
						selected={getQueryBoolean(searchParams, 'selected', false)}
						showShortcut="inline"
						toggleable
						{...(appearance === 'subtle' ? {} : { icon })}
						{...(shortcut ? { shortcut } : {})}
					>
						{appearance === 'subtle' ? label.slice(0, 1).toUpperCase() : undefined}
					</ToolbarButton>
					<ToolbarButton icon="filter" label="Filters" showLabel={false} />
					<ToolbarButton icon="settings" label="Settings" showLabel={false} />
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<ToolbarButton appearance="subtle" label="Bold" shortcut={['cmd', 'B']} showShortcut="inline">
						B
					</ToolbarButton>
				</ToolbarGroup>
			</Toolbar>
		</CommandStage>
	)
}

function renderCommandMenuPlayground(searchParams: URLSearchParams, state: string): ReactNode {
	return (
		<CommandStage>
			<CommandMenu
				items={state === 'empty' ? [] : commandMenuItems}
				loading={getQueryBoolean(searchParams, 'loading', state === 'loading')}
				query={getQueryValue(searchParams, 'query', state === 'empty' ? 'missing' : 'sligo')}
				searchable={getQueryBoolean(searchParams, 'searchable', true)}
			/>
		</CommandStage>
	)
}

function renderSearchBarPlayground(searchParams: URLSearchParams): ReactNode {
	const menu = getQueryBoolean(searchParams, 'menu', false)

	return (
		<CommandStage>
			<SearchBar
				actions={
					<Button shortcut={['enter']} size="small" variant="primary">
						Run
					</Button>
				}
				menu={
					menu ? <CommandMenu items={commandMenuItems} query="sligo" searchable={false} /> : undefined
				}
				menuPlacement={menu ? 'inline' : 'popdown'}
				placeholder={getQueryValue(searchParams, 'placeholder', 'Search, ask, or command...')}
				query={getQueryValue(searchParams, 'query', 'triage sligo')}
				tokens={getQueryBoolean(searchParams, 'tokens', true) ? scopedSearchTokens : []}
				wrap={getQueryBoolean(searchParams, 'wrap', false)}
			/>
		</CommandStage>
	)
}

function renderComposerPlayground(searchParams: URLSearchParams): ReactNode {
	const menuKind = getQueryValue(searchParams, 'menuKind', '')
	const text = getQueryValue(
		searchParams,
		'text',
		'Hey @arihan - can we run /eval triage-v2 against this?'
	)
	const defaultValue = createComposerValue({
		attachments: [{ id: 'router-v2', meta: '3.2 KB', name: 'router-v2.ts', type: 'file' }],
		commands: [{ id: 'eval-triage-v2', kind: 'command', label: '/eval triage-v2' }],
		mentions: [{ id: 'arihan', kind: 'mention', label: 'arihan' }],
		text
	})

	return (
		<ComposerStage>
			<Composer
				defaultMenuQuery={menuKind === 'mention' ? 'a' : ''}
				defaultValue={defaultValue}
				disabled={getQueryBoolean(searchParams, 'disabled', false)}
				placeholder={getQueryValue(searchParams, 'placeholder', 'Write a message...')}
				submitLabel={getQueryValue(searchParams, 'submitLabel', 'Send')}
				{...(menuKind === 'command' || menuKind === 'mention' ? { defaultMenuKind: menuKind } : {})}
			/>
		</ComposerStage>
	)
}

function renderMessagePlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<MessageStage>
			<Message
				actions={
					<Toolbar compact label="Message actions">
						<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
						<ToolbarButton icon="refresh-ccw" label="Retry" showLabel={false} tooltipPlacement="bottom" />
					</Toolbar>
				}
				author={getQueryValue(searchParams, 'author', 'Rubric')}
				avatarInitials="RL"
				messageRole={
					getQueryValue(searchParams, 'messageRole', 'assistant') as
						| 'assistant'
						| 'system'
						| 'tool'
						| 'user'
				}
				showAvatar={getQueryBoolean(searchParams, 'showAvatar', true)}
				status={
					getQueryValue(searchParams, 'status', 'complete') as
						| 'complete'
						| 'error'
						| 'pending'
						| 'streaming'
				}
				surface={getQueryValue(searchParams, 'surface', 'bubble') as 'bubble' | 'plain'}
			>
				{getQueryValue(searchParams, 'body', 'The run is failing during schema hydration.')}
			</Message>
		</MessageStage>
	)
}

function renderReasoningPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<MessageStage>
			<ReasoningMessage
				open={getQueryBoolean(searchParams, 'open', true)}
				status={
					getQueryValue(searchParams, 'status', 'streaming') as
						| 'complete'
						| 'error'
						| 'pending'
						| 'streaming'
				}
				steps={reasoningSteps}
				summary={getQueryValue(
					searchParams,
					'summary',
					'Checking context and selecting the next deterministic action.'
				)}
				title={getQueryValue(searchParams, 'title', 'Thinking')}
			/>
		</MessageStage>
	)
}

function renderToolCallPlayground(searchParams: URLSearchParams): ReactNode {
	return (
		<MessageStage>
			<ToolCallMessage
				duration={getQueryValue(searchParams, 'duration', '1.8s')}
				input={getQueryValue(searchParams, 'input', 'rg -n "composer" @rubriclab/concrete')}
				name={getQueryValue(searchParams, 'name', 'search workspace')}
				open={getQueryBoolean(searchParams, 'open', true)}
				output={getQueryValue(searchParams, 'output', '7 tests passed. TypeScript clean.')}
				status={
					getQueryValue(searchParams, 'status', 'running') as 'error' | 'queued' | 'running' | 'success'
				}
			/>
		</MessageStage>
	)
}

function renderFormShellPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderValidationSummaryPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderSettingsPanelPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderFormDialogPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderFormDrawerPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderMultiSelectPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderDatePickerPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderDateRangePickerPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderRangeSliderPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderFileUploadPlayground(searchParams: URLSearchParams): ReactNode {
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

function renderImageUploadPlayground(searchParams: URLSearchParams): ReactNode {
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

function getShortcut(searchParams: URLSearchParams): readonly string[] | undefined {
	switch (getQueryValue(searchParams, 'shortcut', 'cmd-k')) {
		case 'cmd-enter':
			return ['cmd', 'enter']
		case 'cmd-k':
			return ['cmd', 'K']
		default:
			return undefined
	}
}

function FormFooter({ submitLabel = 'Save changes' }: { submitLabel?: string }) {
	return (
		<>
			<Button size="small" variant="secondary">
				Cancel
			</Button>
			<Button size="small">{submitLabel}</Button>
		</>
	)
}

function ComposerStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageComposer">{children}</div>
}

function CommandStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageCommand">{children}</div>
}

function MessageStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageMessage">{children}</div>
}

function FormStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageForm">{children}</div>
}

function FormWideStage({ children }: { children: ReactNode }) {
	return <div className="componentPlaygroundStage componentPlaygroundStageWide">{children}</div>
}

function createComposerValue(value: Partial<ComposerValue>): ComposerValue {
	return {
		attachments: value.attachments ?? [],
		commands: value.commands ?? [],
		html: value.html ?? '',
		mentions: value.mentions ?? [],
		text: value.text ?? ''
	}
}
