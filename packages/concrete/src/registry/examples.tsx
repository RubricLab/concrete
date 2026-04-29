import type { ReactNode } from 'react'
import {
	AreaChart,
	BarChart,
	Chart,
	CommandMenu,
	type CommandMenuItem,
	Composer,
	type ComposerValue,
	ContextFrame,
	createDataTableColumns,
	DataTable,
	DatePicker,
	DateRangePicker,
	DiagramCanvas,
	DonutChart,
	FileUpload,
	FlowDiagram,
	FormDialog,
	FormDrawer,
	FormGrid,
	FormRow,
	FormSection,
	FormShell,
	Heatmap,
	ImageUpload,
	LineChart,
	Message,
	Meter,
	MetricCard,
	MultiSelect,
	NumberStepper,
	PasswordInput,
	RangeSlider,
	ReasoningMessage,
	SearchBar,
	SettingsPanel,
	StackedBarChart,
	TimePicker,
	Toolbar,
	ToolbarButton,
	ToolbarGroup,
	ToolbarSeparator,
	ToolCallMessage,
	ValidationSummary
} from '../components'
import {
	Avatar,
	Badge,
	BrandMark,
	Bubble,
	Button,
	Card,
	Caret,
	Checkbox,
	Chip,
	CodeBlock,
	ConceptConnector,
	ConceptFrame,
	Delta,
	DiagramItem,
	DiagramNode,
	Distribution,
	Divider,
	Dropzone,
	EmptyState,
	Field,
	Frame,
	Indicator,
	InlineCode,
	Input,
	Kbd,
	Pill,
	Progress,
	ProgressRing,
	Radio,
	Row,
	SegmentedProgress,
	Select,
	Skeleton,
	Slider,
	Sparkline,
	Spinner,
	Stat,
	Switch,
	Tag,
	Textarea,
	TextLink,
	Texture,
	Tooltip,
	UploadItem,
	Wordmark
} from '../primitives'
import type { DataPoint, DataSeries, DiagramCanvasProps, FlowDiagramProps } from '../schemas'
import { composerExampleValue } from './entries'

export function renderPrimitiveExample(slug: string, state = 'default'): ReactNode {
	switch (slug) {
		case 'avatar':
			return (
				<Frame>
					<Avatar initials="AK" /> <Avatar initials="RL" size="large" />{' '}
					<Avatar initials="C" size="small" />
				</Frame>
			)
		case 'badge':
			return renderBadgeState(state)
		case 'brand-mark':
			return (
				<Frame>
					<BrandMark /> <BrandMark inverse />
				</Frame>
			)
		case 'bubble':
			return (
				<Frame>
					<Bubble>Concrete keeps conversational UI crisp.</Bubble>
					<Bubble direction="outbound">Ship the primitive set.</Bubble>
				</Frame>
			)
		case 'button':
			return renderButtonState(state)
		case 'caret':
			return (
				<Frame>
					<Row leadingIcon={<Caret />} meta="closed">
						Environment variables
					</Row>
					<Row leadingIcon={<Caret open />} meta="open">
						Advanced settings
					</Row>
					<Row leadingIcon={<Caret direction="up" />} meta="up">
						Tree branch
					</Row>
				</Frame>
			)
		case 'card':
			return (
				<Frame>
					<Card description="Border only. The canonical surface." title="Default" />
					<Card description="One step of elevation over canvas." title="Raised" variant="raised" />
					<Card description="Recessed. Code, quotes, wells." title="Sunken" variant="sunken" />
				</Frame>
			)
		case 'checkbox':
			return (
				<Frame>
					<Checkbox checked label="Use strict schemas" readOnly />{' '}
					<Checkbox label="Optional path" readOnly />
				</Frame>
			)
		case 'chip':
			return (
				<Frame>
					<Chip selected>Product</Chip> <Chip>Generative</Chip> <Chip tone="sky">Editorial</Chip>
				</Frame>
			)
		case 'code':
			return (
				<Frame>
					<InlineCode>ConcretePressure</InlineCode>
					<CodeBlock code={'const signal = concreteSignalSchema.parse("terminal")'} />
				</Frame>
			)
		case 'concept-frame':
			return renderConceptFrameState(state)
		case 'concept-connector':
			return renderConceptConnectorState(state)
		case 'diagram-node':
			return renderDiagramNodeState(state)
		case 'diagram-item':
			return renderDiagramItemState(state)
		case 'delta':
			return (
				<Frame>
					<Delta intent="positive" value="18.6%" /> <Delta intent="negative" value="-2.4%" />{' '}
					<Delta value="0.0%" />
				</Frame>
			)
		case 'distribution':
			return (
				<Frame>
					<Distribution
						data={[
							{ label: 'Direct', value: 47 },
							{ label: 'Referral', tone: 'sky', value: 28 },
							{ label: 'Agentic', tone: 'terminal', value: 18 }
						]}
					/>
				</Frame>
			)
		case 'divider':
			return (
				<Frame>
					<Divider label="Signals" />
				</Frame>
			)
		case 'dropzone':
			return (
				<Frame>
					<Dropzone
						active={state === 'active'}
						description={
							state === 'disabled' ? 'File input is locked.' : 'Drag or choose a research artifact.'
						}
						disabled={state === 'disabled'}
						icon={state === 'image' ? 'image' : 'upload'}
						title={state === 'image' ? 'Upload images' : 'Upload files'}
					/>
				</Frame>
			)
		case 'empty-state':
			return (
				<Frame>
					<EmptyState
						action={<Button variant="primary">New search</Button>}
						body="Try a broader keyword, or clear the filters applied to this view."
						title="No matches"
					/>
				</Frame>
			)
		case 'field':
			return (
				<Frame>
					<Field
						count={state === 'count' ? 42 : undefined}
						description="Canonical field hierarchy for dense product forms."
						error={state === 'error' ? 'The workspace handle is already taken.' : undefined}
						help={state === 'default' ? 'Use lowercase letters and hyphens.' : undefined}
						label="Workspace handle"
						limit={state === 'count' ? 64 : undefined}
						success={state === 'success' ? 'Looks available.' : undefined}
					>
						<Input placeholder="rubric-labs" />
					</Field>
				</Frame>
			)
		case 'focus-ring':
			return (
				<Frame>
					<Button
						style={{ outline: '3px solid var(--concrete-focus-ring)', outlineOffset: 2 }}
						variant="secondary"
					>
						Focused
					</Button>
				</Frame>
			)
		case 'frame':
			return (
				<Frame footer="Footer" footerMeta="meta" header="Eyebrow" headerMeta="meta" texture="lattice">
					body
				</Frame>
			)
		case 'icon':
			return (
				<Frame>
					<Button iconOnly leadingIcon="search" variant="secondary" />{' '}
					<Button iconOnly leadingIcon="settings" />
					<Button iconOnly leadingIcon="sparkles" variant="ultra" />
				</Frame>
			)
		case 'indicator':
			return (
				<Frame>
					<Indicator tone="terminal">Running</Indicator> <Indicator tone="sky">Queued</Indicator>{' '}
					<Indicator tone="error">Failed</Indicator>
				</Frame>
			)
		case 'input':
			return (
				<Frame>
					<Input
						error={state === 'error' ? 'Enter a valid email address.' : undefined}
						label="Email"
						leadingIcon="at-sign"
						placeholder="you@rubric.bot"
					/>
				</Frame>
			)
		case 'kbd':
			return (
				<Frame>
					<Kbd>⌘</Kbd> <Kbd>K</Kbd> <Kbd tone="dark">↵</Kbd>
					<Button shortcut={['cmd', 'k']}>Search</Button>
				</Frame>
			)
		case 'link':
			return (
				<Frame>
					<TextLink href="#">Open research note</TextLink>
				</Frame>
			)
		case 'pill':
			return (
				<Frame>
					<Pill>ink</Pill> <Pill tone="sunken">queued</Pill> <Pill tone="sky">pointer</Pill>
				</Frame>
			)
		case 'progress':
			return renderProgressState(state)
		case 'radio':
			return (
				<Frame>
					<Radio checked label="Tight" name="rhythm" readOnly />{' '}
					<Radio label="Loose" name="rhythm" readOnly />
				</Frame>
			)
		case 'row':
			return (
				<Frame>
					<Row interactive leadingIcon="file-text" meta="12m">
						Agent memory architecture
					</Row>
					<Row interactive leadingIcon="git-branch" meta="live">
						Context structuring experiment
					</Row>
					<Row leadingIcon="lock" meta="private">
						Evaluation dataset
					</Row>
				</Frame>
			)
		case 'select':
			return (
				<Frame>
					<Select
						label="Workspace"
						options={[
							{ label: 'Rubric Labs', value: 'rubric' },
							{ label: 'Concrete', value: 'concrete' }
						]}
						defaultValue="rubric"
					/>
				</Frame>
			)
		case 'skeleton':
			return (
				<Frame>
					<Skeleton width="70%" /> <Skeleton height={28} width="100%" />{' '}
					<Skeleton height={36} width={36} />
				</Frame>
			)
		case 'slider':
			return (
				<Frame>
					<Slider defaultValue={62} />
				</Frame>
			)
		case 'sparkline':
			return renderSparklineState(state)
		case 'spinner':
			return (
				<Frame>
					<Spinner size={14} /> <Spinner size={18} tone="sky" />{' '}
					<span style={{ background: 'var(--concrete-ink-9)', borderRadius: 999, padding: '6px 10px' }}>
						<Spinner size={12} tone="inverse" />
					</span>
				</Frame>
			)
		case 'stat':
			return (
				<Frame>
					<Stat
						delta={<Delta intent="positive" value="18.6%" />}
						label="Runs"
						meta=" last 7d"
						value="14.8k"
					/>
				</Frame>
			)
		case 'switch':
			return (
				<Frame>
					<Switch checked label="Agent memory" readOnly /> <Switch label="Draft mode" readOnly />
				</Frame>
			)
		case 'tag':
			return (
				<Frame>
					<Tag leadingIcon="filter" tone="sky">
						Agents
					</Tag>
				</Frame>
			)
		case 'textarea':
			return (
				<Frame>
					<Textarea label="Prompt" placeholder="Describe the experiment..." />
				</Frame>
			)
		case 'texture':
			return (
				<Frame>
					<Texture style={{ height: 96 }} variant="dots" />
					<Texture style={{ height: 96 }} variant="lines" />
				</Frame>
			)
		case 'tooltip':
			return (
				<Frame>
					<Tooltip content="Use one short sentence." forceOpen>
						<Button variant="secondary">Anchor</Button>
					</Tooltip>
				</Frame>
			)
		case 'upload-item':
			return (
				<Frame>
					<UploadItem
						error={state === 'error' ? 'File type is not accepted.' : undefined}
						icon={state === 'image' ? 'image' : 'file'}
						meta={state === 'uploading' ? '2.4 MB - 64%' : '2.4 MB'}
						name={state === 'image' ? 'interface-reference.png' : 'Q2_report.pdf'}
						progress={state === 'uploading' ? 64 : state === 'default' ? 100 : undefined}
						status={state === 'error' ? 'error' : state === 'uploading' ? 'uploading' : 'success'}
					/>
				</Frame>
			)
		case 'wordmark':
			return (
				<Frame>
					<Wordmark />
				</Frame>
			)
		default:
			return null
	}
}

export function renderComponentExample(slug: string, state = 'default'): ReactNode {
	switch (slug) {
		case 'area-chart':
			return renderAreaChartState(state)
		case 'bar-chart':
			return renderBarChartState(state)
		case 'chart':
			return renderChartState(state)
		case 'command-menu':
			return renderCommandMenuState(state)
		case 'composer':
			return renderComposerState(state)
		case 'context-frame':
			return renderContextFrameState(state)
		case 'data-table':
			return renderDataTableState(state)
		case 'date-picker':
			return renderDatePickerState(state)
		case 'date-range-picker':
			return renderDateRangePickerState(state)
		case 'diagram-canvas':
			return renderDiagramCanvasState(state)
		case 'donut-chart':
			return renderDonutChartState(state)
		case 'file-upload':
			return renderFileUploadState(state)
		case 'flow-diagram':
			return renderFlowDiagramState(state)
		case 'form-dialog':
			return renderFormDialogState(state)
		case 'form-drawer':
			return renderFormDrawerState(state)
		case 'form-shell':
			return renderFormShellState(state)
		case 'heatmap':
			return renderHeatmapState(state)
		case 'image-upload':
			return renderImageUploadState(state)
		case 'line-chart':
			return renderLineChartState(state)
		case 'meter':
			return renderMeterState(state)
		case 'message':
			return renderMessageState(state)
		case 'metric-card':
			return renderMetricCardState(state)
		case 'multi-select':
			return renderMultiSelectState(state)
		case 'number-stepper':
			return renderNumberStepperState(state)
		case 'password-input':
			return renderPasswordInputState(state)
		case 'range-slider':
			return renderRangeSliderState(state)
		case 'reasoning-message':
			return renderReasoningMessageState(state)
		case 'search-bar':
			return renderSearchBarState(state)
		case 'settings-panel':
			return renderSettingsPanelState(state)
		case 'stacked-bar-chart':
			return renderStackedBarChartState(state)
		case 'time-picker':
			return renderTimePickerState(state)
		case 'toolbar':
			return renderToolbarState(state)
		case 'tool-call-message':
			return renderToolCallMessageState(state)
		case 'validation-summary':
			return renderValidationSummaryState(state)
		default:
			return null
	}
}

const metricTrend = [42, 48, 45, 53, 58, 57, 64, 72, 76, 83]

const chartSeries: DataSeries[] = [
	{
		id: 'agents',
		label: 'Agent runs',
		points: [
			{ label: 'Mon', tone: 'sky', value: 28 },
			{ label: 'Tue', tone: 'sky', value: 34 },
			{ label: 'Wed', tone: 'sky', value: 31 },
			{ label: 'Thu', tone: 'sky', value: 47 },
			{ label: 'Fri', tone: 'sky', value: 55 },
			{ label: 'Sat', tone: 'sky', value: 52 },
			{ label: 'Sun', tone: 'sky', value: 63 }
		],
		tone: 'sky'
	},
	{
		id: 'accepted',
		label: 'Accepted',
		points: [
			{ label: 'Mon', tone: 'terminal', value: 18 },
			{ label: 'Tue', tone: 'terminal', value: 22 },
			{ label: 'Wed', tone: 'terminal', value: 24 },
			{ label: 'Thu', tone: 'terminal', value: 32 },
			{ label: 'Fri', tone: 'terminal', value: 36 },
			{ label: 'Sat', tone: 'terminal', value: 35 },
			{ label: 'Sun', tone: 'terminal', value: 44 }
		],
		tone: 'terminal'
	}
]

const chartPoints: DataPoint[] = [
	{ label: 'Router', tone: 'sky', value: 52 },
	{ label: 'Memory', tone: 'terminal', value: 38 },
	{ label: 'Tools', tone: 'ultra', value: 44 },
	{ label: 'Eval', tone: 'muted', value: 31 },
	{ label: 'Policy', tone: 'error', value: 18 }
]

const stackedChartGroups: { label: string; segments: DataPoint[] }[] = [
	{
		label: 'Mon',
		segments: [
			{ label: 'Search', tone: 'sky', value: 22 },
			{ label: 'Reasoning', tone: 'terminal', value: 18 },
			{ label: 'Tools', tone: 'ultra', value: 9 }
		]
	},
	{
		label: 'Tue',
		segments: [
			{ label: 'Search', tone: 'sky', value: 26 },
			{ label: 'Reasoning', tone: 'terminal', value: 14 },
			{ label: 'Tools', tone: 'ultra', value: 13 }
		]
	},
	{
		label: 'Wed',
		segments: [
			{ label: 'Search', tone: 'sky', value: 18 },
			{ label: 'Reasoning', tone: 'terminal', value: 22 },
			{ label: 'Tools', tone: 'ultra', value: 16 }
		]
	}
]

const heatmapCells = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].flatMap((day, dayIndex) =>
	['AM', 'Mid', 'PM'].map((slot, slotIndex) => ({
		label: `${day} ${slot}`,
		value: 12 + dayIndex * 8 + slotIndex * 5 + (dayIndex === 3 && slotIndex === 2 ? 18 : 0),
		x: day,
		y: slot
	}))
)

type DataTableFixtureRow = {
	change: {
		delta: { basis: string; intent: 'negative' | 'neutral' | 'positive'; value: string }
		kind: 'delta'
	}
	cost: number
	id: string
	owner: string
	run: string
	score: {
		kind: 'meter'
		tone: 'error' | 'sky' | 'terminal' | 'ultra'
		value: { max: number; min: number; value: number }
	}
	status: {
		kind: 'status'
		label: string
		tone: 'error' | 'muted' | 'sky' | 'terminal' | 'ultra'
	}
	trend: {
		kind: 'sparkline'
		tone: 'error' | 'muted' | 'sky' | 'terminal'
		values: number[]
	}
}

const dataTableRows: DataTableFixtureRow[] = [
	{
		change: { delta: { basis: '7d', intent: 'positive', value: '+18.6%' }, kind: 'delta' },
		cost: 184,
		id: 'router-contract',
		owner: 'Arihan',
		run: 'Router contract',
		score: { kind: 'meter', tone: 'terminal', value: { max: 100, min: 0, value: 86 } },
		status: { kind: 'status', label: 'Shipping', tone: 'terminal' },
		trend: { kind: 'sparkline', tone: 'sky', values: [32, 38, 35, 44, 52, 49, 61] }
	},
	{
		change: { delta: { basis: '7d', intent: 'neutral', value: '+0.8%' }, kind: 'delta' },
		cost: 92,
		id: 'memory-recall',
		owner: 'Jordan',
		run: 'Memory recall',
		score: { kind: 'meter', tone: 'sky', value: { max: 100, min: 0, value: 71 } },
		status: { kind: 'status', label: 'Review', tone: 'sky' },
		trend: { kind: 'sparkline', tone: 'terminal', values: [20, 24, 28, 25, 29, 31, 34] }
	},
	{
		change: { delta: { basis: '7d', intent: 'positive', value: '+9.2%' }, kind: 'delta' },
		cost: 138,
		id: 'tool-router',
		owner: 'Tom',
		run: 'Tool router',
		score: { kind: 'meter', tone: 'ultra', value: { max: 100, min: 0, value: 78 } },
		status: { kind: 'status', label: 'Featured', tone: 'ultra' },
		trend: { kind: 'sparkline', tone: 'sky', values: [18, 21, 19, 30, 33, 38, 42] }
	},
	{
		change: { delta: { basis: '7d', intent: 'negative', value: '-4.4%' }, kind: 'delta' },
		cost: 211,
		id: 'policy-eval',
		owner: 'Dexter',
		run: 'Policy eval',
		score: { kind: 'meter', tone: 'error', value: { max: 100, min: 0, value: 42 } },
		status: { kind: 'status', label: 'Blocked', tone: 'error' },
		trend: { kind: 'sparkline', tone: 'error', values: [48, 44, 41, 39, 37, 31, 29] }
	}
]

const dataTableColumns = createDataTableColumns<DataTableFixtureRow>()([
	{ frozen: true, header: 'Run', key: 'run', sortable: true, width: '190px' },
	{ header: 'Status', key: 'status', sortable: true, width: '112px' },
	{ header: 'Owner', key: 'owner', sortable: true, width: '112px' },
	{ align: 'right', header: 'Score', key: 'score', sortable: true, width: '116px' },
	{ align: 'right', header: 'Change', key: 'change', width: '96px' },
	{ header: 'Trend', key: 'trend', width: '132px' },
	{ align: 'right', header: 'Cost', key: 'cost', sortable: true, width: '84px' }
])

const flowDiagram: FlowDiagramProps['flow'] = {
	edges: [
		{ from: 'prompt', id: 'edge-context', label: 'retrieve', to: 'context', variant: 'step' },
		{ from: 'context', id: 'edge-plan', label: 'shape', to: 'plan', tone: 'sky' },
		{
			from: 'plan',
			id: 'edge-tools',
			label: 'execute',
			selected: true,
			to: 'tools',
			tone: 'terminal'
		},
		{
			from: 'tools',
			id: 'edge-answer',
			label: 'synthesize',
			to: 'answer',
			tone: 'ultra',
			variant: 'pulse'
		}
	],
	nodes: [
		{ id: 'prompt', subtitle: 'user input', title: 'Prompt', tone: 'inverse', x: 24, y: 92 },
		{ id: 'context', subtitle: 'memory + files', title: 'Context', x: 224, y: 28 },
		{
			id: 'plan',
			selected: true,
			subtitle: 'typed steps',
			title: 'Plan',
			tone: 'accent',
			x: 424,
			y: 92
		},
		{ id: 'tools', subtitle: 'safe actions', title: 'Tools', x: 624, y: 28 },
		{ id: 'answer', subtitle: 'final response', title: 'Answer', x: 824, y: 92 }
	]
}

const diagramCanvasGraph = {
	edges: [
		{
			from: 'input',
			id: 'edge-decide',
			label: 'decide',
			to: 'router',
			tone: 'ink'
		},
		{
			from: 'input',
			id: 'edge-fetch',
			label: 'fetch',
			to: 'tools',
			toAnchor: 'left',
			variant: 'dashed'
		},
		{
			from: 'router',
			id: 'edge-synthesize',
			label: 'synthesize',
			to: 'model',
			tone: 'ultra'
		},
		{
			from: 'tools',
			id: 'edge-results',
			label: 'results',
			to: 'model',
			tone: 'sky'
		},
		{
			from: 'model',
			id: 'edge-stream',
			label: 'stream',
			to: 'stream',
			tone: 'terminal'
		},
		{
			from: 'model',
			fromAnchor: 'bottom',
			id: 'edge-trace',
			label: 'trace',
			to: 'trace',
			toAnchor: 'right',
			variant: 'reference'
		}
	],
	items: [
		{
			id: 'trace',
			kind: 'metric',
			meta: 'p95',
			title: 'Trace',
			tone: 'sky',
			value: '184ms',
			width: 122,
			x: 63,
			y: 82
		}
	],
	nodes: [
		{
			id: 'input',
			meta: 'HTTPS · JSON',
			role: 'external',
			title: 'User input',
			width: 190,
			x: 24,
			y: 50
		},
		{
			id: 'router',
			meta: 'intent · priority',
			role: 'decision',
			title: 'Router',
			width: 206,
			x: 47,
			y: 31
		},
		{
			id: 'tools',
			meta: 'search · db · mcp',
			role: 'data',
			title: 'Tools',
			width: 206,
			x: 47,
			y: 69
		},
		{
			id: 'model',
			meta: 'sonnet · policy',
			role: 'compute',
			title: 'Model',
			width: 176,
			x: 69,
			y: 50
		},
		{
			id: 'stream',
			meta: 'SSE',
			role: 'process',
			title: 'Stream',
			width: 118,
			x: 83,
			y: 50
		}
	]
} satisfies DiagramCanvasProps['graph']

const connectorTones = ['ink', 'sky', 'terminal', 'ultra', 'error'] as const
const itemTones = ['sky', 'ink', 'terminal', 'ultra'] as const

function renderConceptFrameState(state: string): ReactNode {
	const frames = [
		'browser-window',
		'model-card',
		'database-panel',
		'code-editor',
		'chart-frame',
		'assistant-response',
		'workflow-canvas',
		'mobile-screen'
	] as const

	return (
		<Frame>
			{frames.map(kind => (
				<ConceptFrame
					key={kind}
					kind={kind}
					muted={state === 'muted'}
					selected={state === 'selected' && kind === 'model-card'}
				/>
			))}
		</Frame>
	)
}

function renderConceptConnectorState(state: string): ReactNode {
	const connectors = [
		'straight',
		'elbow',
		'curved',
		'dashed-relation',
		'bidirectional',
		'branch',
		'feedback-loop',
		'annotation-leader'
	] as const

	return (
		<Frame>
			{connectors.map((kind, index) => (
				<ConceptConnector
					key={kind}
					kind={kind}
					selected={state === 'selected' && index === 1}
					tone={state === 'tones' ? (connectorTones[index % connectorTones.length] ?? 'ink') : 'muted'}
				/>
			))}
		</Frame>
	)
}

function renderDiagramNodeState(state: string): ReactNode {
	const nodes = [
		['external', 'User input', 'HTTPS'],
		['decision', 'Router', 'intent'],
		['data', 'Context', 'memory'],
		['compute', 'Model', 'reasoning'],
		['process', 'Stream', 'SSE'],
		['error', 'Reject', 'policy']
	] as const

	return (
		<Frame>
			<div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
				{nodes.map(([role, title, meta]) => (
					<DiagramNode
						key={role}
						meta={meta}
						muted={state === 'muted' && role !== 'compute'}
						role={role}
						selected={state === 'selected' && role === 'compute'}
						title={title}
					/>
				))}
			</div>
		</Frame>
	)
}

function renderDiagramItemState(state: string): ReactNode {
	const items = [
		['metric', 'Trace', '184ms', 'p95'],
		['code', 'Hydrate', undefined, 'ts'],
		['status', 'Ready', undefined, 'live'],
		['note', 'Constraint', undefined, 'policy']
	] as const

	return (
		<Frame>
			<div style={{ display: 'grid', gap: 8, gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
				{items.map(([kind, title, value, meta], index) => (
					<DiagramItem
						key={kind}
						kind={kind}
						meta={meta}
						selected={state === 'selected' && index === 0}
						title={title}
						tone={state === 'tones' ? (itemTones[index] ?? 'ink') : 'ink'}
						value={value}
					/>
				))}
			</div>
		</Frame>
	)
}

function renderMetricCardState(state: string): ReactNode {
	return (
		<DataGridStage>
			<MetricCard
				compact={state === 'compact'}
				delta={{
					basis: 'vs last week',
					intent: state === 'status' ? 'neutral' : 'positive',
					value: state === 'status' ? '+0.8%' : '+18.6%'
				}}
				description={
					state === 'compact' ? undefined : 'Accepted agent runs across production workspaces.'
				}
				label={state === 'status' ? 'Eval health' : 'Agent runs'}
				status={state === 'status' ? { label: 'Live', tone: 'terminal' } : undefined}
				trend={metricTrend}
				value={state === 'compact' ? '14.8k' : '14,842'}
			/>
			<MetricCard
				compact={state === 'compact'}
				delta={{ basis: 'blocked', intent: 'negative', value: '-2.4%' }}
				label="Intervention rate"
				status={state === 'status' ? { label: 'Watch', tone: 'ultra' } : undefined}
				trend={[48, 44, 41, 39, 35, 32, 29]}
				trendTone="error"
				value="4.2%"
			/>
		</DataGridStage>
	)
}

function renderMeterState(state: string): ReactNode {
	return (
		<DataGridStage>
			<Meter
				description="Workspace command budget"
				label="Usage"
				target={80}
				tone={state === 'signal' ? 'terminal' : 'sky'}
				value={{ max: 100, min: 0, value: 72 }}
				variant={state === 'ring' ? 'ring' : 'bar'}
			/>
			<Meter
				description="Policy confidence"
				label="Review"
				tone={state === 'signal' ? 'error' : 'ultra'}
				value={{ max: 100, min: 0, value: state === 'signal' ? 34 : 58 }}
				variant="ring"
			/>
		</DataGridStage>
	)
}

function renderLineChartState(state: string): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<DataWideStage>
				<LineChart
					height={220}
					message={state === 'error' ? 'Could not load the run summary.' : undefined}
					series={[]}
					state={state}
					title="Agent runs"
				/>
			</DataWideStage>
		)
	}

	return (
		<DataWideStage>
			<LineChart
				description="Agent run volume with accepted output overlay."
				series={chartSeries}
				showDots={state === 'inspect'}
				target={state === 'target' ? 58 : undefined}
				title="Agent runs"
			/>
		</DataWideStage>
	)
}

function renderAreaChartState(state: string): ReactNode {
	return (
		<DataWideStage>
			<AreaChart
				description={state === 'quiet' ? undefined : 'Accepted runs and total executions.'}
				series={chartSeries}
				showDots={state === 'dots'}
				showEndLabels={state !== 'quiet'}
				showGrid={state !== 'quiet'}
				showXAxis={state !== 'quiet'}
				showYAxis={state !== 'quiet'}
				surface={state === 'quiet' ? 'transparent' : 'raised'}
				target={state === 'quiet' ? undefined : 58}
				title="Execution trend"
			/>
		</DataWideStage>
	)
}

function renderBarChartState(state: string): ReactNode {
	return (
		<DataWideStage>
			<BarChart
				comparisonPoints={
					state === 'comparison'
						? [
								{ label: 'Router', value: 42 },
								{ label: 'Memory', value: 31 },
								{ label: 'Tools', value: 39 },
								{ label: 'Eval', value: 28 },
								{ label: 'Policy', value: 22 }
							]
						: []
				}
				orientation={state === 'horizontal' ? 'horizontal' : 'vertical'}
				points={chartPoints}
				showValues={state !== 'quiet'}
				title="Capability score"
			/>
		</DataWideStage>
	)
}

function renderStackedBarChartState(state: string): ReactNode {
	return (
		<DataWideStage>
			<StackedBarChart
				groups={stackedChartGroups}
				normalized={state === 'normalized'}
				orientation={state === 'horizontal' ? 'horizontal' : 'vertical'}
				title="Run composition"
			/>
		</DataWideStage>
	)
}

function renderDonutChartState(state: string): ReactNode {
	return (
		<DataWideStage>
			<DonutChart
				centerLabel="64%"
				segments={chartPoints.slice(0, 4)}
				showCenterLabel={state !== 'plain'}
				thickness={state === 'thin' ? 'thin' : state === 'thick' ? 'thick' : 'medium'}
				title="Workload split"
			/>
		</DataWideStage>
	)
}

function renderHeatmapState(state: string): ReactNode {
	return (
		<DataWideStage>
			<Heatmap
				cells={heatmapCells}
				showValues={state !== 'quiet'}
				surface={state === 'sunken' ? 'sunken' : 'raised'}
				title="Run intensity"
			/>
		</DataWideStage>
	)
}

function renderChartState(state: string): ReactNode {
	if (state === 'loading' || state === 'empty' || state === 'error') {
		return (
			<DataWideStage>
				<Chart
					height={220}
					message={state === 'error' ? 'Could not load the run summary.' : undefined}
					series={[]}
					state={state}
					title="Agent runs"
					variant="line"
				/>
			</DataWideStage>
		)
	}

	switch (state) {
		case 'area':
			return (
				<DataWideStage>
					<Chart
						description="Accepted runs and total executions."
						height={230}
						series={chartSeries}
						target={58}
						title="Execution trend"
						variant="area"
					/>
				</DataWideStage>
			)
		case 'bar':
			return (
				<DataWideStage>
					<Chart
						comparisonPoints={[
							{ label: 'Router', value: 42 },
							{ label: 'Memory', value: 31 },
							{ label: 'Tools', value: 39 },
							{ label: 'Eval', value: 28 },
							{ label: 'Policy', value: 22 }
						]}
						points={chartPoints}
						title="Capability score"
						variant="bar"
					/>
				</DataWideStage>
			)
		case 'stacked':
			return (
				<DataWideStage>
					<Chart groups={stackedChartGroups} title="Run composition" variant="stacked-bar" />
				</DataWideStage>
			)
		case 'donut':
			return (
				<DataWideStage>
					<Chart
						centerLabel="64%"
						segments={chartPoints.slice(0, 4)}
						title="Workload split"
						variant="donut"
					/>
				</DataWideStage>
			)
		case 'heatmap':
			return (
				<DataWideStage>
					<Chart cells={heatmapCells} title="Run intensity" variant="heatmap" />
				</DataWideStage>
			)
		default:
			return (
				<DataWideStage>
					<Chart
						description="Agent run volume with accepted output overlay."
						series={chartSeries}
						target={58}
						title="Agent runs"
						variant="line"
					/>
				</DataWideStage>
			)
	}
}

function renderDataTableState(state: string): ReactNode {
	return (
		<DataWideStage>
			<DataTable
				caption="Typed cells stay compact while still supporting signals and microvisuals."
				columns={dataTableColumns}
				filters={
					state === 'filtered'
						? [
								{
									id: 'status',
									label: 'Status',
									options: [
										{ count: 1, label: 'Shipping', value: 'shipping' },
										{ count: 1, label: 'Review', value: 'review' },
										{ count: 1, label: 'Blocked', value: 'blocked' }
									],
									value: 'shipping'
								}
							]
						: []
				}
				pagination={{ page: 1, pageSize: 4, totalRows: state === 'empty' ? 0 : dataTableRows.length }}
				rows={state === 'empty' ? [] : dataTableRows}
				searchPlaceholder="Search runs"
				selectable={state === 'selected'}
				selectedRowIds={state === 'selected' ? ['router-contract', 'tool-router'] : []}
				sort={state === 'default' ? { direction: 'descending', key: 'cost' } : undefined}
				title="Evaluation runs"
				toolbarActions={
					state === 'selected'
						? [
								{ icon: 'download', id: 'export', label: 'Export', tone: 'sky' },
								{ icon: 'more', id: 'more', label: 'More' }
							]
						: [{ icon: 'inspect', id: 'inspect', label: 'Inspect' }]
				}
			/>
		</DataWideStage>
	)
}

function renderFlowDiagramState(state: string): ReactNode {
	return (
		<DataWideStage>
			<FlowDiagram
				controls={state === 'interactive'}
				description="A compact map of context, planning, tool execution, and final synthesis."
				draggableNodes={state === 'interactive'}
				flow={state === 'empty' ? { edges: [], nodes: [] } : flowDiagram}
				legend={[
					{ label: 'context', tone: 'sky' },
					{ label: 'tool path', tone: 'terminal' },
					{ label: 'selected', tone: 'ultra' }
				]}
				selectedEdgeId={state === 'selected' ? 'edge-tools' : undefined}
				selectedNodeId={state === 'selected' ? 'plan' : undefined}
				title="Agent execution flow"
				width={1020}
			/>
		</DataWideStage>
	)
}

function renderContextFrameState(state: string): ReactNode {
	const kind = state === 'default' ? 'browser' : state

	return (
		<DataWideStage>
			<ContextFrame
				kind={
					['application', 'browser', 'ide', 'laptop', 'mobile', 'terminal'].includes(kind)
						? (kind as 'application' | 'browser' | 'ide' | 'laptop' | 'mobile' | 'terminal')
						: 'browser'
				}
				meta={kind === 'terminal' ? 'zsh' : kind === 'ide' ? 'TypeScript' : 'Concrete'}
				title={kind === 'terminal' ? 'run context' : kind === 'ide' ? 'agent.ts' : 'Research frame'}
				url="rubric.local/research/context"
			/>
		</DataWideStage>
	)
}

function renderDiagramCanvasState(state: string): ReactNode {
	const graph =
		state === 'compact'
			? {
					edges: diagramCanvasGraph.edges.slice(0, 2),
					items: [],
					nodes: diagramCanvasGraph.nodes.slice(0, 3)
				}
			: diagramCanvasGraph

	return (
		<DataWideStage>
			<DiagramCanvas
				controls={state !== 'compact'}
				description="Editorial explainer graph for request routing, context, model synthesis, and streamed output."
				graph={graph}
				height={state === 'compact' ? 260 : 360}
				minimap={state === 'interactive'}
				selectedId={
					state === 'selected' ? 'model' : state === 'interactive' ? 'edge-synthesize' : undefined
				}
				title="Request flow"
				width={state === 'compact' ? 720 : 820}
				zoomable={state !== 'compact'}
			/>
		</DataWideStage>
	)
}

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

const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23eef3fb"/%3E%3Cpath d="M18 56 34 36l10 12 8-10 10 18H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="55" cy="25" r="6" fill="%23a9c6ef"/%3E%3C/svg%3E'

function renderFormShellState(state: string): ReactNode {
	return (
		<FormWideStage>
			<FormShell
				compact={state === 'compact'}
				description="Configure a reusable agent workspace without leaving the local form contract."
				eyebrow="Workspace"
				footer={
					<>
						<Button size="small" variant="secondary">
							Cancel
						</Button>
						<Button size="small">Save changes</Button>
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
		</FormWideStage>
	)
}

function renderValidationSummaryState(state: string): ReactNode {
	return (
		<FormStage>
			<ValidationSummary
				action={
					state === 'success' ? (
						<Button size="small" variant="secondary">
							Review
						</Button>
					) : undefined
				}
				description={
					state === 'success'
						? 'All required fields are complete and ready to submit.'
						: 'Resolve the listed fields before saving the workflow.'
				}
				items={
					state === 'success'
						? [
								{
									id: 'ready',
									label: 'Configuration',
									message: 'No blocking validation remains.',
									status: 'success'
								}
							]
						: [
								{
									href: '#owner',
									id: 'owner',
									label: 'Owner',
									message: 'Assign a responsible operator.'
								},
								{
									href: '#budget',
									id: 'budget',
									label: 'Budget limit',
									message: 'Enter a value between 1 and 100.'
								},
								...(state === 'mixed'
									? [
											{
												id: 'uploads',
												label: 'Reference packet',
												message: 'Two files are attached.',
												status: 'success' as const
											}
										]
									: [])
							]
				}
				status={state === 'success' ? 'success' : 'error'}
			/>
		</FormStage>
	)
}

function renderSettingsPanelState(state: string): ReactNode {
	return (
		<FormWideStage>
			<SettingsPanel
				description="Dense settings rows keep labels, explanatory copy, metadata, and controls aligned."
				footer={
					<>
						<Button size="small" variant="secondary">
							Reset
						</Button>
						<Button size="small">Save</Button>
					</>
				}
				status={state === 'error' ? 'error' : 'default'}
				title={state === 'compact' ? 'Run defaults' : 'Agent workspace'}
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
								control: <NumberStepper defaultValue={state === 'compact' ? 2 : 6} max={12} min={1} />,
								description: 'Maximum active workers for one request.',
								id: 'workers',
								label: 'Parallel workers',
								meta: 'max 12'
							},
							{
								control: (
									<Select
										defaultValue={state === 'error' ? '' : 'router'}
										options={[
											{ label: 'Select model...', value: '' },
											{ label: 'Router v2', value: 'router' },
											{ label: 'Research agent', value: 'research' }
										]}
									/>
								),
								description: 'Fallback model used when a prompt does not pin a route.',
								id: 'model',
								label: 'Default model',
								status: state === 'error' ? 'error' : 'default'
							}
						],
						title: 'Runtime'
					},
					...(state === 'compact'
						? []
						: [
								{
									description: 'Optional local context attached to every run.',
									id: 'context',
									rows: [
										{
											control: (
												<Button leadingIcon="paperclip" size="small" variant="secondary">
													Attach
												</Button>
											),
											description: 'Research packet, spec, or evaluation fixture.',
											id: 'packet',
											label: 'Reference packet'
										}
									],
									title: 'Context'
								}
							])
				]}
			/>
		</FormWideStage>
	)
}

function renderFormDialogState(state: string): ReactNode {
	return (
		<FormWideStage>
			<FormDialog
				description="Create a bounded experiment without leaving the current workspace."
				footer={
					<>
						<Button size="small" variant="secondary">
							Cancel
						</Button>
						<Button size="small">Create run</Button>
					</>
				}
				size={state === 'wide' ? 'wide' : 'default'}
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
		</FormWideStage>
	)
}

function renderFormDrawerState(state: string): ReactNode {
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

function renderPasswordInputState(state: string): ReactNode {
	return (
		<FormStage>
			<PasswordInput
				defaultValue={state === 'default' ? 'concrete-secret' : 'router-v2'}
				error={state === 'error' ? 'Password must be at least 12 characters.' : undefined}
				help={state === 'default' ? 'Use a passphrase or generated credential.' : undefined}
				label="Password"
			/>
		</FormStage>
	)
}

function renderMultiSelectState(state: string): ReactNode {
	return (
		<FormStage>
			<MultiSelect
				defaultValue={state === 'empty' ? [] : ['design', 'ai']}
				defaultOpen={state === 'open'}
				help="Tags are removable and options stay source-of-truth controlled by value."
				label="Project tags"
				options={multiSelectOptions}
			/>
		</FormStage>
	)
}

function renderDatePickerState(state: string): ReactNode {
	return (
		<FormStage>
			<DatePicker
				defaultOpen={state === 'open'}
				defaultValue="2026-04-28"
				help={state === 'bounded' ? 'Only this sprint window is available.' : undefined}
				label="Start date"
				max={state === 'bounded' ? '2026-05-02' : undefined}
				min={state === 'bounded' ? '2026-04-24' : undefined}
			/>
		</FormStage>
	)
}

function renderDateRangePickerState(state: string): ReactNode {
	return (
		<FormStage>
			<DateRangePicker
				defaultOpen={state === 'open'}
				defaultValue={
					state === 'partial' ? { start: '2026-04-28' } : { end: '2026-05-07', start: '2026-04-28' }
				}
				label="Experiment window"
			/>
		</FormStage>
	)
}

function renderTimePickerState(state: string): ReactNode {
	return (
		<FormStage>
			<TimePicker
				defaultOpen={state === 'open'}
				defaultValue={state === 'dense' ? '09:15' : '14:30'}
				interval={state === 'dense' ? 15 : 30}
				label="Run time"
			/>
		</FormStage>
	)
}

function renderNumberStepperState(state: string): ReactNode {
	return (
		<FormStage>
			<NumberStepper
				defaultValue={state === 'small' ? 3 : 42}
				error={state === 'error' ? 'Choose a value between 1 and 10.' : undefined}
				label="Agents"
				max={state === 'error' ? 10 : 100}
				min={1}
				step={state === 'small' ? 1 : 2}
			/>
		</FormStage>
	)
}

function renderRangeSliderState(state: string): ReactNode {
	return (
		<FormStage>
			<RangeSlider
				defaultValue={state === 'narrow' ? [42, 58] : state === 'wide' ? [5, 95] : [20, 80]}
				label="Confidence range"
			/>
		</FormStage>
	)
}

function renderFileUploadState(state: string): ReactNode {
	return (
		<FormStage>
			<FileUpload
				defaultValue={
					state === 'empty'
						? []
						: [
								{
									...(state === 'error' ? { error: 'File type is not accepted.' } : {}),
									id: 'q2-report',
									name: state === 'error' ? 'archive.zip' : 'Q2_report.pdf',
									...(state === 'error' ? {} : { progress: 72 }),
									size: state === 'error' ? 9240000 : 2400000,
									status: state === 'error' ? 'error' : 'uploading',
									type: state === 'error' ? 'application/zip' : 'application/pdf'
								}
							]
				}
				descriptionText="Drop PDFs, images, or source packets."
				label="Artifacts"
			/>
		</FormStage>
	)
}

function renderImageUploadState(state: string): ReactNode {
	return (
		<FormStage>
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
				label="Reference image"
				variant={state === 'avatar' ? 'avatar' : state === 'grid' ? 'grid' : 'single'}
			/>
		</FormStage>
	)
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

function renderToolbarState(state: string): ReactNode {
	const compact = state === 'compact'

	return (
		<Frame>
			<Toolbar compact={compact} label="Editor toolbar">
				<ToolbarGroup>
					<ToolbarButton icon="paperclip" label="Attach" showLabel={false} />
					<ToolbarButton icon="at-sign" label="Mention" shortcut={['@']} showLabel={false} />
					<ToolbarButton icon="slash" label="Command" shortcut={['/']} showLabel={false} />
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<ToolbarButton
						appearance="subtle"
						label="Bold"
						pressed={state === 'selected'}
						shortcut={['cmd', 'B']}
						showShortcut={compact ? 'tooltip' : 'inline'}
					>
						B
					</ToolbarButton>
					<ToolbarButton
						appearance="subtle"
						label="Italic"
						shortcut={['cmd', 'I']}
						showShortcut={compact ? 'tooltip' : 'inline'}
					>
						<IText />
					</ToolbarButton>
					<ToolbarButton
						appearance="subtle"
						label="Underline"
						selected={state === 'selected'}
						shortcut={['cmd', 'U']}
						showShortcut={compact ? 'tooltip' : 'inline'}
					>
						<UText />
					</ToolbarButton>
				</ToolbarGroup>
				<ToolbarSeparator />
				<ToolbarGroup>
					<ToolbarButton icon="settings" label="Settings" showLabel={false} />
				</ToolbarGroup>
			</Toolbar>
		</Frame>
	)
}

function renderCommandMenuState(state: string): ReactNode {
	return (
		<CommandStage>
			<CommandMenu
				items={state === 'empty' ? [] : commandMenuItems}
				loading={state === 'loading'}
				query={state === 'empty' ? 'missing' : 'sligo'}
			/>
		</CommandStage>
	)
}

function renderSearchBarState(state: string): ReactNode {
	return (
		<CommandStage>
			<SearchBar
				actions={
					<Button shortcut={['enter']} size="small" variant="primary">
						Run
					</Button>
				}
				placeholder="Search, ask, or command..."
				query={state === 'default' ? '' : 'triage sligo'}
				tokens={
					state === 'scoped' || state === 'menu'
						? [
								{ id: 'workspace', label: 'Rubric', leadingIcon: 'folder', tone: 'sky' },
								{ id: 'mode', label: 'agent runs', leadingIcon: 'activity', tone: 'ultra' }
							]
						: []
				}
				{...(state === 'menu'
					? { menu: <CommandMenu items={commandMenuItems} query="sligo" searchable={false} /> }
					: {})}
			/>
		</CommandStage>
	)
}

function renderMessageState(state: string): ReactNode {
	switch (state) {
		case 'system':
			return (
				<MessageStage>
					<Message author="System" messageRole="system" surface="plain">
						Context window compacted. Latest workspace state and render routes are available.
					</Message>
				</MessageStage>
			)
		case 'user':
			return (
				<MessageStage>
					<Message
						actions={
							<Toolbar compact label="User message actions">
								<ToolbarButton icon="pencil" label="Edit" showLabel={false} tooltipPlacement="bottom" />
								<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
							</Toolbar>
						}
						author="Dexter"
						avatarInitials="DS"
						messageRole="user"
						showAvatar
					>
						Can you inspect the failing run and summarize the blocker?
					</Message>
				</MessageStage>
			)
		default:
			return (
				<MessageStage>
					<Message
						actions={
							<Toolbar compact label="Assistant message actions">
								<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
								<ToolbarButton
									icon="refresh-ccw"
									label="Retry"
									showLabel={false}
									tooltipPlacement="bottom"
								/>
							</Toolbar>
						}
						author="Rubric"
						avatarInitials="RL"
						meta="now"
						messageRole="assistant"
						showAvatar
					>
						The eval runner is failing during schema hydration. I found one stale fixture and a missing
						tool permission edge.
					</Message>
				</MessageStage>
			)
	}
}

function renderReasoningMessageState(state: string): ReactNode {
	return (
		<MessageStage>
			<ReasoningMessage
				open={state !== 'collapsed'}
				status={state === 'complete' ? 'complete' : 'streaming'}
				summary="Mapped failing logs to the evaluation fixture, checked schema boundaries, and isolated the change needed before rerunning."
			/>
		</MessageStage>
	)
}

function renderToolCallMessageState(state: string): ReactNode {
	switch (state) {
		case 'error':
			return (
				<MessageStage>
					<ToolCallMessage
						duration="420ms"
						name="bun test"
						output="Schema fixture is missing commandOptions[0].id."
						status="error"
					/>
				</MessageStage>
			)
		case 'success':
			return (
				<MessageStage>
					<ToolCallMessage
						duration="1.8s"
						input="bun run check"
						name="workspace check"
						open
						output="7 tests passed. TypeScript clean."
						status="success"
					/>
				</MessageStage>
			)
		default:
			return (
				<MessageStage>
					<ToolCallMessage input={'rg -n "composer" @rubriclab/concrete'} name="search workspace" />
				</MessageStage>
			)
	}
}

function renderComposerState(state: string): ReactNode {
	switch (state) {
		case 'command':
			return (
				<ComposerStage>
					<Composer
						defaultMenuKind="command"
						defaultValue={createComposerValue({ text: 'Can you /' })}
					/>
				</ComposerStage>
			)
		case 'disabled':
			return (
				<ComposerStage>
					<Composer defaultValue={composerExampleValue} disabled />
				</ComposerStage>
			)
		case 'empty':
			return (
				<ComposerStage>
					<Composer placeholder="Ask the agent to inspect, summarize, or ship..." />
				</ComposerStage>
			)
		case 'formatting':
			return (
				<ComposerStage>
					<Composer
						defaultValue={createComposerValue({
							html:
								'Drafting <strong>agent handoff</strong> with <em>formatted</em> notes, <u>clear owners</u>, and <s>stale context</s> removed.',
							text: 'Drafting agent handoff with formatted notes, clear owners, and stale context removed.'
						})}
					/>
				</ComposerStage>
			)
		case 'mention':
			return (
				<ComposerStage>
					<Composer
						defaultMenuKind="mention"
						defaultMenuQuery="a"
						defaultValue={createComposerValue({ text: 'Loop in @a' })}
					/>
				</ComposerStage>
			)
		default:
			return (
				<ComposerStage>
					<Composer defaultValue={composerExampleValue} />
				</ComposerStage>
			)
	}
}

function ComposerStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 860, width: '100%' }}>{children}</div>
}

function CommandStage({ children }: { children: ReactNode }) {
	return <div style={{ maxWidth: 720, width: '100%' }}>{children}</div>
}

function MessageStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 680, width: '100%' }}>{children}</div>
}

function FormStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 420, width: '100%' }}>{children}</div>
}

function FormWideStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 720, width: '100%' }}>{children}</div>
}

function DataGridStage({ children }: { children: ReactNode }) {
	return (
		<div
			style={{
				display: 'grid',
				gap: 12,
				gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
				maxWidth: 720,
				width: '100%'
			}}
		>
			{children}
		</div>
	)
}

function DataWideStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 860, width: '100%' }}>{children}</div>
}

function IText() {
	return <span style={{ fontStyle: 'italic' }}>I</span>
}

function UText() {
	return <span style={{ textDecoration: 'underline', textUnderlineOffset: 2 }}>U</span>
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

function renderButtonState(state: string): ReactNode {
	switch (state) {
		case 'loading':
			return (
				<Frame>
					<Button loading variant="primary">
						Saving
					</Button>
				</Frame>
			)
		case 'signal':
			return (
				<Frame>
					<Button leadingIcon="sparkles" variant="ultra">
						Upgrade
					</Button>
					<Button leadingIcon="trash-2" variant="danger">
						Delete
					</Button>
				</Frame>
			)
		case 'pressed':
			return (
				<Frame>
					<Button pressed shortcut={['cmd', 'enter']} variant="primary">
						Send
					</Button>
					<Button pressed shortcut={['cmd', 'K']} variant="secondary">
						Search
					</Button>
					<Button pressed iconOnly leadingIcon="search" variant="soft" />
				</Frame>
			)
		default:
			return (
				<Frame>
					<Button leadingIcon="plus" variant="primary">
						New
					</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="soft">Soft</Button>
					<Button variant="ghost">Ghost</Button>
					<Button variant="sky-soft">Sky soft</Button>
					<Button shortcut={['cmd', 'enter']} variant="sky">
						Ship
					</Button>
				</Frame>
			)
	}
}

function renderBadgeState(state: string): ReactNode {
	switch (state) {
		case 'count':
			return (
				<Frame>
					<Badge signal="terminal" variant="count">
						24
					</Badge>
					<Badge signal="error" variant="count">
						3
					</Badge>
					<Badge signal="ultra" variant="ghost">
						v2.4.1
					</Badge>
				</Frame>
			)
		case 'solid':
			return (
				<Frame>
					<Badge signal="terminal" variant="solid">
						Live
					</Badge>
					<Badge signal="ultra" variant="solid">
						Pro
					</Badge>
					<Badge signal="error" variant="solid">
						Delete
					</Badge>
				</Frame>
			)
		default:
			return (
				<Frame>
					<Badge signal="terminal">Live</Badge> <Badge signal="ultra">Featured</Badge>{' '}
					<Badge signal="error">Blocked</Badge>
				</Frame>
			)
	}
}

function renderProgressState(state: string): ReactNode {
	switch (state) {
		case 'ring':
			return (
				<Frame>
					<ProgressRing tone="sky" value={68} />
					<ProgressRing size={72} tone="terminal" value={42} />
					<ProgressRing size={72} value={81} />
				</Frame>
			)
		case 'segmented':
			return (
				<Frame>
					<SegmentedProgress segments={8} value={5} />
					<SegmentedProgress segments={12} value={2} />
				</Frame>
			)
		case 'signals':
			return (
				<Frame>
					<Progress tone="sky" value={68} />
					<Progress tone="terminal" value={42} />
					<Progress tone="ultra" value={58} />
					<Progress tone="error" value={22} />
				</Frame>
			)
		case 'indeterminate':
			return (
				<Frame>
					<Progress indeterminate="shuttle" />
					<Progress indeterminate="shuttle" tone="sky" />
					<Progress indeterminate="lined" />
				</Frame>
			)
		default:
			return (
				<Frame>
					<Progress size="thin" value={62} />
					<Progress value={62} />
					<Progress size="thick" tone="sky" value={68} />
				</Frame>
			)
	}
}

function renderSparklineState(state: string): ReactNode {
	switch (state) {
		case 'area':
			return (
				<Frame>
					<Sparkline area values={[12, 18, 16, 24, 22, 31, 28, 36]} />
					<Sparkline area tone="terminal" values={[6, 10, 8, 14, 21, 18, 24]} />
					<Sparkline area tone="neutral" values={[14, 13, 15, 14, 13, 15, 14]} />
				</Frame>
			)
		case 'bar':
			return (
				<Frame>
					<Sparkline values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
					<Sparkline tone="neutral" values={[24, 18, 21, 14, 8, 10, 6]} variant="bar" />
				</Frame>
			)
		case 'dot':
			return (
				<Frame>
					<Sparkline values={[8, 12, 18, 16, 22, 24, 28]} variant="dot" />
					<Sparkline tone="neutral" values={[28, 24, 22, 18, 16, 12, 8]} variant="dot" />
				</Frame>
			)
		case 'volatile':
			return (
				<Frame>
					<Sparkline tone="error" values={[14, 5, 28, 9, 32, 11, 26, 7, 22]} />
				</Frame>
			)
		default:
			return (
				<Frame>
					<Sparkline values={[12, 18, 16, 24, 22, 31, 28, 36]} />
					<Sparkline values={[6, 10, 8, 14, 21, 18, 24]} variant="bar" />
				</Frame>
			)
	}
}
