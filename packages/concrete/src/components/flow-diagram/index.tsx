import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { flowDiagram } from '../../utilities/data-fixtures'
import { FlowDiagram } from './component'
import { flowDiagramExamples } from './examples'
import { flowDiagramMeta } from './meta'
import { type FlowDiagramValue, flowDiagramComponentSchema } from './schema'

export type { FlowDiagramProps } from '../../schemas'
export { FlowDiagram } from './component'
export type { FlowDiagramInput, FlowDiagramValue } from './schema'
export { flowDiagramComponentSchema } from './schema'

export const flowDiagramComponentDefinition = createComponent({
	...flowDiagramMeta,
	component: FlowDiagram,
	kind: 'component',
	renderExample: (state?: string) => renderExample(flowDiagramExamples, state),
	renderInput: input => renderFlowDiagramInput(flowDiagramComponentSchema.parse(input)),
	schema: flowDiagramComponentSchema,
	seed: flowDiagramComponentSchema.parse({
		description: 'A compact map of context, planning, tool execution, and final synthesis.',
		flow: flowDiagram,
		legend: [
			{ intent: 'sky', label: 'context' },
			{ intent: 'terminal', label: 'tool path' },
			{ intent: 'ultra', label: 'selected' }
		],
		title: 'Agent execution flow',
		width: 1020
	}),
	slug: 'flow-diagram',
	states: exampleStates(flowDiagramExamples, ['default', 'selected', 'interactive', 'empty'])
})

function renderFlowDiagramInput(input: FlowDiagramValue) {
	return <FlowDiagram {...input} />
}
