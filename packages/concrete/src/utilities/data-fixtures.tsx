import type { DataPoint, DataSeries, DiagramCanvasProps, FlowDiagramProps } from '../schemas'
import { createDataTableColumns } from './data-table-columns'

type DataTone = DataPoint['tone']
type SeriesFixture = {
	id: string
	label: string
	tone: DataTone
	values: readonly number[]
}

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export const chartSeries: DataSeries[] = (
	[
		{ id: 'agents', label: 'Agent runs', tone: 'sky', values: [28, 34, 31, 47, 55, 52, 63] },
		{ id: 'accepted', label: 'Accepted', tone: 'terminal', values: [18, 22, 24, 32, 36, 35, 44] }
	] satisfies readonly SeriesFixture[]
).map(createSeries)

export const chartPoints: DataPoint[] = [
	{ label: 'Router', tone: 'sky', value: 52 },
	{ label: 'Memory', tone: 'terminal', value: 38 },
	{ label: 'Tools', tone: 'ultra', value: 44 },
	{ label: 'Eval', tone: 'muted', value: 31 },
	{ label: 'Policy', tone: 'error', value: 18 }
]

export const chartComparisonPoints: DataPoint[] = [
	{ label: 'Router', tone: 'muted', value: 42 },
	{ label: 'Memory', tone: 'muted', value: 31 },
	{ label: 'Tools', tone: 'muted', value: 39 },
	{ label: 'Eval', tone: 'muted', value: 28 },
	{ label: 'Policy', tone: 'muted', value: 22 }
]

type StackedGroupFixture = readonly [
	label: string,
	search: number,
	reasoning: number,
	tools: number
]
type FlowDiagramFlowInput = FlowDiagramProps['flow']
type FlowDiagramEdgeInput = NonNullable<FlowDiagramFlowInput['edges']>[number]
type FlowDiagramNodeInput = NonNullable<FlowDiagramFlowInput['nodes']>[number]
type FlowDiagramEdgeFixture = readonly [
	id: string,
	from: string,
	to: string,
	label: string,
	options?: Omit<FlowDiagramEdgeInput, 'from' | 'id' | 'label' | 'to'>
]
type FlowDiagramNodeFixture = readonly [
	id: string,
	title: string,
	subtitle: string,
	x: number,
	y: number,
	options?: Omit<FlowDiagramNodeInput, 'id' | 'subtitle' | 'title' | 'x' | 'y'>
]
type DiagramCanvasGraphInput = DiagramCanvasProps['graph']
type DiagramCanvasEdgeInput = NonNullable<DiagramCanvasGraphInput['edges']>[number]
type DiagramCanvasNodeInput = NonNullable<DiagramCanvasGraphInput['nodes']>[number]
type DiagramCanvasEdgeFixture = readonly [
	id: string,
	from: string,
	to: string,
	label: string,
	options?: Omit<DiagramCanvasEdgeInput, 'from' | 'id' | 'label' | 'to'>
]
type DiagramCanvasNodeFixture = readonly [
	id: string,
	title: string,
	meta: string,
	role: DiagramCanvasNodeInput['role'],
	width: number,
	x: number,
	y: number
]

export const stackedChartGroups: { label: string; segments: DataPoint[] }[] = (
	[
		['Mon', 22, 18, 9],
		['Tue', 26, 14, 13],
		['Wed', 18, 22, 16]
	] satisfies readonly StackedGroupFixture[]
).map(([label, search, reasoning, tools]) => ({
	label,
	segments: [
		{ label: 'Search', tone: 'sky', value: search },
		{ label: 'Reasoning', tone: 'terminal', value: reasoning },
		{ label: 'Tools', tone: 'ultra', value: tools }
	]
}))

export const heatmapCells = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].flatMap(
	function createDayCells(day, dayIndex) {
		return ['AM', 'Mid', 'PM'].map(function createSlotCell(slot, slotIndex) {
			return {
				label: `${day} ${slot}`,
				value: 12 + dayIndex * 8 + slotIndex * 5 + (dayIndex === 3 && slotIndex === 2 ? 18 : 0),
				x: day,
				y: slot
			}
		})
	}
)

export type DataTableFixtureRow = {
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

export const dataTableRows: DataTableFixtureRow[] = [
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

export const dataTableColumns = createDataTableColumns<DataTableFixtureRow>()([
	{ frozen: true, header: 'Run', key: 'run', sortable: true, width: '190px' },
	{ header: 'Status', key: 'status', sortable: true, width: '112px' },
	{ header: 'Owner', key: 'owner', sortable: true, width: '112px' },
	{ align: 'right', header: 'Score', key: 'score', sortable: true, width: '116px' },
	{ align: 'right', header: 'Change', key: 'change', width: '96px' },
	{ header: 'Trend', key: 'trend', width: '132px' },
	{ align: 'right', header: 'Cost', key: 'cost', sortable: true, width: '84px' }
])

export const flowDiagram: FlowDiagramProps['flow'] = {
	edges: (
		[
			['edge-context', 'prompt', 'context', 'retrieve', { variant: 'step' }],
			['edge-plan', 'context', 'plan', 'shape', { tone: 'sky' }],
			['edge-tools', 'plan', 'tools', 'execute', { tone: 'terminal' }],
			['edge-answer', 'tools', 'answer', 'synthesize', { tone: 'ultra', variant: 'pulse' }]
		] satisfies readonly FlowDiagramEdgeFixture[]
	).map(([id, from, to, label, options]) => ({ from, id, label, to, ...options })),
	nodes: (
		[
			['prompt', 'Prompt', 'user input', 24, 92, { tone: 'inverse' }],
			['context', 'Context', 'memory + files', 224, 28],
			['plan', 'Plan', 'typed steps', 424, 92, { tone: 'accent' }],
			['tools', 'Tools', 'safe actions', 624, 28],
			['answer', 'Answer', 'final response', 824, 92]
		] satisfies readonly FlowDiagramNodeFixture[]
	).map(([id, title, subtitle, x, y, options]) => ({ id, subtitle, title, x, y, ...options }))
}

export const diagramCanvasGraph = {
	edges: (
		[
			['edge-decide', 'input', 'router', 'decide', { tone: 'ink' }],
			['edge-fetch', 'input', 'tools', 'fetch', { toAnchor: 'left', variant: 'dashed' }],
			['edge-synthesize', 'router', 'model', 'synthesize', { tone: 'ultra' }],
			['edge-results', 'tools', 'model', 'results', { tone: 'sky' }],
			['edge-stream', 'model', 'stream', 'stream', { tone: 'terminal' }],
			[
				'edge-trace',
				'model',
				'trace',
				'trace',
				{ fromAnchor: 'bottom', toAnchor: 'right', variant: 'reference' }
			]
		] satisfies readonly DiagramCanvasEdgeFixture[]
	).map(([id, from, to, label, options]) => ({ from, id, label, to, ...options })),
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
	nodes: (
		[
			['input', 'User input', 'HTTPS / JSON', 'external', 190, 24, 50],
			['router', 'Router', 'intent / priority', 'decision', 206, 47, 31],
			['tools', 'Tools', 'search / db / mcp', 'data', 206, 47, 69],
			['model', 'Model', 'sonnet / policy', 'compute', 176, 69, 50],
			['stream', 'Stream', 'SSE', 'process', 118, 83, 50]
		] satisfies readonly DiagramCanvasNodeFixture[]
	).map(([id, title, meta, role, width, x, y]) => ({ id, meta, role, title, width, x, y }))
} satisfies DiagramCanvasProps['graph']

function createSeries({ id, label, tone, values }: SeriesFixture): DataSeries {
	return {
		id,
		label,
		points: values.map((value, index) => ({
			label: weekDays[index] ?? String(index + 1),
			tone,
			value
		})),
		tone
	}
}
