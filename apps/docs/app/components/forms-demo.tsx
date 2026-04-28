import {
	Button,
	Checkbox,
	DatePicker,
	DateRangePicker,
	Field,
	FileUpload,
	FormDialog,
	FormDrawer,
	FormGrid,
	FormRow,
	FormSection,
	ImageUpload,
	Input,
	MultiSelect,
	NumberStepper,
	PasswordInput,
	Radio,
	RangeSlider,
	Select,
	SettingsPanel,
	Switch,
	Textarea,
	TimePicker,
	ValidationSummary
} from '@rubriclab/concrete'

const projectOptions = [
	{ description: 'Primitive architecture', label: 'Design system', meta: 'core', value: 'design' },
	{ description: 'Agent interfaces', label: 'AI native', meta: 'lab', value: 'ai' },
	{ description: 'Dense product surfaces', label: 'Dashboards', meta: 'data', value: 'dashboard' },
	{ disabled: true, label: 'Archived experiments', meta: 'locked', value: 'archived' }
] as const

const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96"%3E%3Crect width="96" height="96" fill="%23eef3fb"/%3E%3Cpath d="M18 68 40 42l14 15 9-12 15 23H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="66" cy="29" r="7" fill="%23a9c6ef"/%3E%3C/svg%3E'

export function FormsDemo() {
	return (
		<div className="formsDemo">
			<section className="formsPanel formsPanelComposition formsPanelWide">
				<div className="formsPanelHead">
					<div>
						<span className="eyebrow">Form composition</span>
						<h2>Shell, rows, validation, constrained surfaces.</h2>
					</div>
				</div>
				<div className="formsCompositionGrid">
					<SettingsPanel
						description="A dense product form assembled from rows and slotted primitives."
						footer={
							<>
								<Button size="small" variant="secondary">
									Reset
								</Button>
								<Button size="small">Save</Button>
							</>
						}
						title="Agent defaults"
						sections={[
							{
								description: 'Default behavior for new run surfaces.',
								id: 'runtime',
								rows: [
									{
										control: <Switch checked label="Enabled" readOnly />,
										description: 'Allow agent tools in approved workspaces.',
										id: 'tools',
										label: 'Tool execution',
										meta: 'on'
									},
									{
										control: <NumberStepper defaultValue={6} max={12} min={1} />,
										description: 'Maximum parallel workers for one request.',
										id: 'workers',
										label: 'Workers',
										meta: 'max 12'
									},
									{
										control: (
											<Select
												defaultValue="router"
												options={[
													{ label: 'Router v2', value: 'router' },
													{ label: 'Research agent', value: 'research' }
												]}
											/>
										),
										description: 'Fallback route when prompts do not pin a model.',
										id: 'model',
										label: 'Default model'
									},
									{
										control: (
											<Button leadingIcon="paperclip" size="small" variant="secondary">
												Attach
											</Button>
										),
										description: 'Optional packet attached to every run.',
										id: 'packet',
										label: 'Reference packet'
									}
								],
								title: 'Runtime'
							}
						]}
					/>
					<FormDialog
						description="Modal form language with the same shell and field rhythm."
						footer={
							<>
								<Button size="small" variant="secondary">
									Cancel
								</Button>
								<Button size="small">Create run</Button>
							</>
						}
						title="New experiment"
					>
						<FormGrid columns={2}>
							<Input label="Run name" placeholder="Router contract check" />
							<DatePicker defaultValue="2026-04-28" label="Start" />
							<MultiSelect defaultValue={['design']} label="Tags" options={projectOptions} />
							<FileUpload defaultValue={[]} label="Artifacts" title="Attach packet" />
						</FormGrid>
					</FormDialog>
					<FormDrawer
						description="Contextual edit surface for dense dashboards."
						footer={
							<>
								<Button size="small" variant="secondary">
									Discard
								</Button>
								<Button size="small">Apply</Button>
							</>
						}
						title="Workspace policy"
					>
						<ValidationSummary
							description="Two fields need attention before applying policy."
							items={[
								{ id: 'owner', label: 'Owner', message: 'Assign a responsible operator.' },
								{ id: 'budget', label: 'Budget', message: 'Enter a non-zero run budget.' }
							]}
						/>
						<FormSection title="Limits">
							<FormRow
								control={<NumberStepper defaultValue={0} max={100} min={0} />}
								description="Daily command executions for this workspace."
								label="Run budget"
								meta="daily"
								status="error"
							/>
							<FormRow
								control={<Switch checked label="Enabled" readOnly />}
								description="Allow collaborators to inspect generated artifacts."
								label="Shared visibility"
							/>
						</FormSection>
					</FormDrawer>
				</div>
			</section>

			<section className="formsPanel formsPanelPickers formsPanelWide">
				<div className="formsPanelHead">
					<div>
						<span className="eyebrow">Text input</span>
						<h2>Short, long, secret, validated.</h2>
					</div>
				</div>
				<div className="formsGrid formsGridFive">
					<Input label="Default" placeholder="Enter value..." />
					<Input defaultValue="Acme Inc." label="Focused" />
					<Input label="With icon" leadingIcon="search" placeholder="Search..." />
					<Input
						defaultValue="name@acme.com"
						help="This will be your unique handle."
						label="Help text"
					/>
					<PasswordInput defaultValue="concrete-secret" label="Password" />
					<Textarea
						defaultValue="This textarea grows with product context and keeps the same field rhythm."
						label="Textarea"
					/>
					<Field count={18} label="Character count" limit={160}>
						<Textarea defaultValue="Building the future." />
					</Field>
					<Input disabled label="Disabled" placeholder="Locked input" />
					<Input error="Enter a valid email address." label="Error" defaultValue="not-an-email" />
					<Field label="Success" success="Looks good.">
						<Input defaultValue="ari@rubric.bot" />
					</Field>
				</div>
			</section>

			<section className="formsPanel formsPanelWide">
				<div className="formsPanelHead">
					<div>
						<span className="eyebrow">Choice inputs</span>
						<h2>Selection without ceremony.</h2>
					</div>
				</div>
				<div className="formsGrid formsGridFive">
					<Select
						defaultValue="us"
						label="Select"
						options={[
							{ label: 'United States', value: 'us' },
							{ label: 'Canada', value: 'ca' },
							{ label: 'United Kingdom', value: 'uk' }
						]}
					/>
					<MultiSelect defaultValue={['design', 'ai']} label="Multi-select" options={projectOptions} />
					<div className="formsChoiceStack">
						<span>Checkbox</span>
						<Checkbox checked label="Agree to the terms" readOnly />
						<Checkbox label="Subscribe to updates" readOnly />
					</div>
					<div className="formsChoiceStack">
						<span>Radio</span>
						<Radio checked label="Personal" name="demo-radio" readOnly />
						<Radio label="Team" name="demo-radio" readOnly />
					</div>
					<div className="formsChoiceStack">
						<span>Switch</span>
						<Switch checked label="Enable feature" readOnly />
						<Switch disabled label="Locked" readOnly />
					</div>
				</div>
			</section>

			<section className="formsPanel formsPanelWide">
				<div className="formsPanelHead">
					<div>
						<span className="eyebrow">Date, time, files</span>
						<h2>Scheduling and upload boundaries.</h2>
					</div>
				</div>
				<div className="formsGrid formsGridFour">
					<DatePicker defaultOpen defaultValue="2026-04-28" label="Date picker" />
					<DateRangePicker
						defaultOpen
						defaultValue={{ end: '2026-05-07', start: '2026-04-28' }}
						label="Date range"
					/>
					<TimePicker defaultOpen defaultValue="14:30" label="Time picker" />
					<FileUpload
						defaultValue={[
							{
								id: 'report',
								name: 'Q2_report.pdf',
								progress: 72,
								size: 2400000,
								status: 'uploading',
								type: 'application/pdf'
							}
						]}
						label="File upload"
					/>
				</div>
			</section>

			<section className="formsPanel formsPanelWide">
				<div className="formsPanelHead">
					<div>
						<span className="eyebrow">Adjustments</span>
						<h2>Fine-tune with native behavior.</h2>
					</div>
				</div>
				<div className="formsGrid formsGridThree">
					<RangeSlider defaultValue={[20, 80]} label="Range slider" />
					<NumberStepper defaultValue={42} label="Number input" max={100} min={0} />
					<ImageUpload
						defaultValue={[
							{
								id: 'reference',
								name: 'interface-reference.png',
								previewUrl: uploadPreview,
								progress: 100,
								size: 840000,
								status: 'success',
								type: 'image/png'
							}
						]}
						label="Image upload"
					/>
				</div>
			</section>
		</div>
	)
}
