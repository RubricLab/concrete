import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { DiagramSvg } from '../diagram-viewport'
import { FlowNode } from './component'
import { flowNodeExamples } from './examples'
import { flowNodeMeta } from './meta'
import { type FlowNodeValue, flowNodeSchema } from './schema'

export type { FlowNodeHierarchy, FlowNodeProps } from './component'
export { FlowNode } from './component'
export type { FlowNodeInput, FlowNodeValue } from './schema'
export { flowNodeHierarchyValues, flowNodePropsSchema, flowNodeSchema } from './schema'

export const flowNodePrimitiveDefinition = createPrimitive({
	...flowNodeMeta,
	component: FlowNode,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(flowNodeExamples, state),
	renderInput: input => renderFlowNodeInput(flowNodeSchema.parse(input)),
	schema: flowNodeSchema,
	slug: 'flow-node',
	states: exampleStates(flowNodeExamples, ['default', 'inverse', 'hierarchies'])
})

function renderFlowNodeInput({
	height,
	selected,
	subtitle,
	title,
	hierarchy,
	width,
	x,
	y
}: FlowNodeValue) {
	return (
		<DiagramSvg
			gridId="flow-node-input-grid"
			height={height + y * 2}
			panX={0}
			panY={0}
			title={title}
			viewBox={`0 0 ${width + x * 2} ${height + y * 2}`}
		>
			<FlowNode
				height={height}
				selected={selected}
				subtitle={subtitle}
				title={title}
				hierarchy={hierarchy}
				width={width}
				x={x}
				y={y}
			/>
		</DiagramSvg>
	)
}
