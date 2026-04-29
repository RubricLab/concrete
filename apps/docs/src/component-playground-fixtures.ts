import type {
	CommandMenuItem,
	DataPoint,
	DataSeries,
	DiagramCanvasProps,
	ReasoningMessageStep,
	SearchToken
} from '@rubriclab/concrete'

export const commandMenuItems = [
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

export const multiSelectOptions = [
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

export const scopedSearchTokens = [
	{ id: 'workspace', label: 'Rubric', leadingIcon: 'folder', tone: 'sky' },
	{ id: 'mode', label: 'agent runs', leadingIcon: 'activity', tone: 'ultra' }
] as const satisfies readonly SearchToken[]

export const playgroundDiagramGraph = {
	edges: [
		{ from: 'input', id: 'decide', label: 'decide', to: 'router', tone: 'ink' },
		{ from: 'router', id: 'synthesize', label: 'synthesize', to: 'model', tone: 'ultra' },
		{ from: 'tools', id: 'results', label: 'results', to: 'model', tone: 'sky' },
		{ from: 'model', id: 'stream', label: 'stream', to: 'stream', tone: 'terminal' },
		{
			from: 'model',
			fromAnchor: 'bottom',
			id: 'trace',
			label: 'trace',
			to: 'trace-item',
			toAnchor: 'right',
			variant: 'reference'
		}
	],
	items: [
		{
			id: 'trace-item',
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
		{ id: 'input', meta: 'HTTPS', role: 'external', title: 'User input', width: 182, x: 24, y: 50 },
		{ id: 'router', meta: 'intent', role: 'decision', title: 'Router', width: 190, x: 47, y: 32 },
		{ id: 'tools', meta: 'search', role: 'data', title: 'Tools', width: 190, x: 47, y: 68 },
		{ id: 'model', meta: 'policy', role: 'compute', title: 'Model', width: 170, x: 69, y: 50 },
		{ id: 'stream', meta: 'SSE', role: 'process', title: 'Stream', width: 116, x: 83, y: 50 }
	]
} satisfies DiagramCanvasProps['graph']

export const playgroundChartSeries: DataSeries[] = [
	{
		id: 'runs',
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

export const playgroundChartPoints: DataPoint[] = [
	{ label: 'Router', tone: 'sky', value: 52 },
	{ label: 'Memory', tone: 'terminal', value: 38 },
	{ label: 'Tools', tone: 'ultra', value: 44 },
	{ label: 'Eval', tone: 'muted', value: 31 },
	{ label: 'Policy', tone: 'error', value: 18 }
]

export const playgroundComparisonPoints: DataPoint[] = [
	{ label: 'Router', tone: 'muted', value: 42 },
	{ label: 'Memory', tone: 'muted', value: 31 },
	{ label: 'Tools', tone: 'muted', value: 39 },
	{ label: 'Eval', tone: 'muted', value: 28 },
	{ label: 'Policy', tone: 'muted', value: 22 }
]

export const playgroundStackedGroups: { label: string; segments: DataPoint[] }[] = [
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

export const playgroundHeatmapCells = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].flatMap((day, dayIndex) =>
	['AM', 'Mid', 'PM'].map((slot, slotIndex) => ({
		label: `${day} ${slot}`,
		value: 12 + dayIndex * 8 + slotIndex * 5 + (dayIndex === 3 && slotIndex === 2 ? 18 : 0),
		x: day,
		y: slot
	}))
)

export const uploadPreview =
	'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"%3E%3Crect width="80" height="80" fill="%23eef3fb"/%3E%3Cpath d="M18 56 34 36l10 12 8-10 10 18H18Z" fill="%231f6fd4"/%3E%3Ccircle cx="55" cy="25" r="6" fill="%23a9c6ef"/%3E%3C/svg%3E'

export const reasoningSteps = [
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
