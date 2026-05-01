import { defineExamples } from '../../factories/createExamples'
import { DiagramSvg } from '../diagram-viewport'
import { FlowNode } from './component'

export const flowNodeExamples = defineExamples({
	default: {
		description: 'Flow node inside an SVG viewport.',
		render: () => (
			<DiagramSvg
				gridId="flow-node-grid"
				height={120}
				panX={0}
				panY={0}
				title="Flow node"
				viewBox="0 0 220 120"
			>
				<FlowNode height={64} subtitle="Validation" title="Model step" width={160} x={30} y={28} />
			</DiagramSvg>
		)
	},
	hierarchies: {
		description: 'Flow node hierarchy and selection states.',
		render: () => (
			<DiagramSvg
				gridId="flow-node-hierarchies-grid"
				height={160}
				panX={0}
				panY={0}
				title="Flow node hierarchies"
				viewBox="0 0 380 160"
			>
				<FlowNode
					height={58}
					subtitle="Input"
					title="Route"
					hierarchy="surface"
					width={120}
					x={22}
					y={28}
				/>
				<FlowNode
					height={58}
					selected
					subtitle="Reasoning"
					title="Model"
					hierarchy="accent"
					width={120}
					x={132}
					y={72}
				/>
				<FlowNode
					height={58}
					subtitle="Runtime"
					title="Agent"
					hierarchy="inverse"
					width={120}
					x={240}
					y={28}
				/>
			</DiagramSvg>
		)
	},
	inverse: {
		description: 'Inverse selected flow node.',
		render: () => (
			<DiagramSvg
				gridId="flow-node-inverse-grid"
				height={120}
				panX={0}
				panY={0}
				title="Flow node"
				viewBox="0 0 220 120"
			>
				<FlowNode
					height={64}
					selected
					subtitle="Runtime"
					title="Agent"
					hierarchy="inverse"
					width={160}
					x={30}
					y={28}
				/>
			</DiagramSvg>
		)
	}
})
