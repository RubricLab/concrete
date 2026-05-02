import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import type { FlowDiagramProps } from '../../schemas'
import { flowDiagram } from '../../utilities/data-fixtures'
import { FlowDiagram } from './component'

const compactFlowDiagram = {
	edges: [
		{ from: 'prompt', id: 'edge-context', label: 'retrieve', relation: 'step', to: 'plan' },
		{ from: 'context', id: 'edge-plan', intent: 'sky', label: 'shape', to: 'plan' },
		{ from: 'plan', id: 'edge-tools', intent: 'terminal', label: 'execute', to: 'tools' },
		{ from: 'plan', id: 'edge-answer', intent: 'ultra', label: 'synthesize', to: 'answer' }
	],
	nodes: [
		{
			height: 50,
			hierarchy: 'inverse',
			id: 'prompt',
			subtitle: 'input',
			title: 'Prompt',
			width: 108,
			x: 18,
			y: 16
		},
		{ height: 50, id: 'context', subtitle: 'memory', title: 'Context', width: 108, x: 154, y: 16 },
		{
			height: 52,
			hierarchy: 'accent',
			id: 'plan',
			subtitle: 'typed steps',
			title: 'Plan',
			width: 112,
			x: 84,
			y: 122
		},
		{ height: 50, id: 'tools', subtitle: 'safe calls', title: 'Tools', width: 108, x: 18, y: 230 },
		{ height: 50, id: 'answer', subtitle: 'response', title: 'Answer', width: 108, x: 154, y: 230 }
	]
} satisfies FlowDiagramProps['flow']

const wideFlowDiagram = {
	edges: flowDiagram.edges,
	nodes: [
		{
			height: 64,
			hierarchy: 'inverse',
			id: 'prompt',
			subtitle: 'user input',
			title: 'Prompt',
			width: 116,
			x: 18,
			y: 88
		},
		{
			height: 64,
			id: 'context',
			subtitle: 'memory + files',
			title: 'Context',
			width: 116,
			x: 140,
			y: 28
		},
		{
			height: 64,
			hierarchy: 'accent',
			id: 'plan',
			subtitle: 'typed steps',
			title: 'Plan',
			width: 116,
			x: 262,
			y: 88
		},
		{
			height: 64,
			id: 'tools',
			subtitle: 'safe actions',
			title: 'Tools',
			width: 116,
			x: 384,
			y: 28
		},
		{
			height: 64,
			id: 'answer',
			subtitle: 'final response',
			title: 'Answer',
			width: 116,
			x: 506,
			y: 88
		}
	]
} satisfies FlowDiagramProps['flow']

export const flowDiagramExamples = defineExamples({
	default: {
		description: 'Routed node graph with muted edges.',
		render: () => renderFlowDiagramExample('default')
	},
	empty: {
		description: 'Empty graph state.',
		render: () => renderFlowDiagramExample('empty')
	},
	interactive: {
		description: 'Controls and draggable nodes enabled.',
		render: () => renderFlowDiagramExample('interactive')
	},
	selected: {
		description: 'Selected node and edge states.',
		render: () => renderFlowDiagramExample('selected')
	},
	wide: {
		description: 'Full-width graph for desktop inspectors.',
		render: () => renderFlowDiagramExample('wide')
	}
})

function renderFlowDiagramExample(state = 'default'): ReactNode {
	const isWide = state === 'wide'

	return (
		<FlowDiagram
			controls={state === 'interactive'}
			description="A compact map of context, planning, tool execution, and final synthesis."
			draggableNodes={state === 'interactive'}
			flow={
				state === 'empty' ? { edges: [], nodes: [] } : isWide ? wideFlowDiagram : compactFlowDiagram
			}
			height={isWide ? 260 : 300}
			legend={[
				{ intent: 'sky', label: 'context' },
				{ intent: 'terminal', label: 'tool path' },
				{ intent: 'ultra', label: 'selected' }
			]}
			selectedEdgeId={state === 'selected' ? 'edge-tools' : undefined}
			selectedNodeId={state === 'selected' ? 'plan' : undefined}
			title="Agent execution flow"
			width={isWide ? 640 : 280}
		/>
	)
}
