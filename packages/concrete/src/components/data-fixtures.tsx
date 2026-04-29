import type { ReactNode } from 'react'
import type { DataPoint, DataSeries, DiagramCanvasProps, FlowDiagramProps } from '../schemas'
import { createDataTableColumns } from './data-table-columns'

export const chartSeries: DataSeries[] = [
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

export const stackedChartGroups: { label: string; segments: DataPoint[] }[] = [
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

export const diagramCanvasGraph = {
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
			meta: 'HTTPS / JSON',
			role: 'external',
			title: 'User input',
			width: 190,
			x: 24,
			y: 50
		},
		{
			id: 'router',
			meta: 'intent / priority',
			role: 'decision',
			title: 'Router',
			width: 206,
			x: 47,
			y: 31
		},
		{
			id: 'tools',
			meta: 'search / db / mcp',
			role: 'data',
			title: 'Tools',
			width: 206,
			x: 47,
			y: 69
		},
		{
			id: 'model',
			meta: 'sonnet / policy',
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

export function DataGridStage({ children }: { children: ReactNode }) {
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

export function DataWideStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 860, width: '100%' }}>{children}</div>
}
