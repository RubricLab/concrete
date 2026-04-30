import { defineExamples } from '../../factories/createExamples'
import { FlowDiagramSvg } from '../diagram-viewport'
import { FlowNode } from './component'

export const flowNodeExamples = defineExamples({
	default: {
		description: 'Flow node inside an SVG viewport.',
		render: () => (
			<FlowDiagramSvg
				gridId="flow-node-grid"
				height={120}
				panX={0}
				panY={0}
				title="Flow node"
				viewBox="0 0 220 120"
			>
				<FlowNode height={64} subtitle="Validation" title="Model step" width={160} x={30} y={28} />
			</FlowDiagramSvg>
		)
	},
	inverse: {
		description: 'Inverse selected flow node.',
		render: () => (
			<FlowDiagramSvg
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
					tone="inverse"
					width={160}
					x={30}
					y={28}
				/>
			</FlowDiagramSvg>
		)
	},
	tones: {
		description: 'Flow node tone and selection states.',
		render: () => (
			<FlowDiagramSvg
				gridId="flow-node-tones-grid"
				height={160}
				panX={0}
				panY={0}
				title="Flow node tones"
				viewBox="0 0 380 160"
			>
				<FlowNode height={58} subtitle="Input" title="Route" tone="surface" width={120} x={22} y={28} />
				<FlowNode
					height={58}
					selected
					subtitle="Reasoning"
					title="Model"
					tone="accent"
					width={120}
					x={132}
					y={72}
				/>
				<FlowNode
					height={58}
					subtitle="Runtime"
					title="Agent"
					tone="inverse"
					width={120}
					x={240}
					y={28}
				/>
			</FlowDiagramSvg>
		)
	}
})
