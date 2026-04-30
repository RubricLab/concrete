import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { FlowDiagramSvg } from '../diagram-viewport'
import { FlowNode } from './component'
import { flowNodeExamples } from './examples'
import { flowNodeMeta } from './meta'
import { type FlowNodeValue, flowNodeSchema } from './schema'

export type { FlowNodeProps, FlowNodeTone } from './component'
export { FlowNode } from './component'
export type { FlowNodeInput, FlowNodeValue } from './schema'
export { flowNodePropsSchema, flowNodeSchema, flowNodeToneValues } from './schema'

export const flowNodePrimitiveDefinition = createPrimitive({
	...flowNodeMeta,
	component: FlowNode,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(flowNodeExamples, state),
	renderInput: input => renderFlowNodeInput(flowNodeSchema.parse(input)),
	schema: flowNodeSchema,
	slug: 'flow-node',
	states: exampleStates(flowNodeExamples, ['default', 'inverse', 'tones'])
})

function renderFlowNodeInput({
	height,
	selected,
	subtitle,
	title,
	tone,
	width,
	x,
	y
}: FlowNodeValue) {
	return (
		<FlowDiagramSvg
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
				tone={tone}
				width={width}
				x={x}
				y={y}
			/>
		</FlowDiagramSvg>
	)
}
