import { defineExamples } from '../../factories/createExamples'
import { DiagramCanvasShell, DiagramCanvasViewport, FlowDiagramSvg } from '../diagram-viewport'
import { DiagramCanvasEdgePath, DiagramCanvasEdges, FlowDiagramEdgePath } from './component'

export const diagramEdgeExamples = defineExamples({
	canvas: {
		description: 'Canvas edge with markers and label.',
		render: () => renderCanvasEdge()
	},
	default: {
		description: 'Canvas edge with markers and label.',
		render: () => renderCanvasEdge()
	},
	flow: {
		description: 'Flow graph edge inside an SVG viewport.',
		render: () => (
			<FlowDiagramSvg
				gridId="diagram-edge-flow-grid"
				height={120}
				panX={0}
				panY={0}
				title="Flow edge"
				viewBox="0 0 260 120"
			>
				<FlowDiagramEdgePath
					label="event"
					labelPoint={{ x: 130, y: 60 }}
					path="M20 72 C80 72 180 48 240 48"
					tone="terminal"
					variant="pulse"
				/>
			</FlowDiagramSvg>
		)
	},
	variants: {
		description: 'Canvas edge variants and selected tone.',
		render: () => (
			<DiagramCanvasShell>
				<DiagramCanvasViewport>
					<DiagramCanvasEdges
						height={160}
						markerId="diagram-edge-variants"
						reverseMarkerId="diagram-edge-variants-reverse"
						width={300}
					>
						<DiagramCanvasEdgePath
							label="event"
							labelPoint={{ x: 150, y: 36 }}
							markerEnd="url(#diagram-edge-variants)"
							path="M24 48 C88 28 212 28 276 48"
							tone="terminal"
							variant="dashed"
						/>
						<DiagramCanvasEdgePath
							label="reference"
							labelPoint={{ x: 150, y: 104 }}
							markerEnd="url(#diagram-edge-variants)"
							path="M24 112 C88 132 212 132 276 112"
							selected
							tone="sky"
							variant="reference"
						/>
					</DiagramCanvasEdges>
				</DiagramCanvasViewport>
			</DiagramCanvasShell>
		)
	}
})

function renderCanvasEdge() {
	return (
		<DiagramCanvasShell>
			<DiagramCanvasViewport>
				<DiagramCanvasEdges
					height={120}
					markerId="diagram-edge-example"
					reverseMarkerId="diagram-edge-example-reverse"
					width={260}
				>
					<DiagramCanvasEdgePath
						label="routes"
						labelPoint={{ x: 130, y: 60 }}
						markerEnd="url(#diagram-edge-example)"
						path="M20 72 C80 72 180 48 240 48"
						tone="sky"
					/>
				</DiagramCanvasEdges>
			</DiagramCanvasViewport>
		</DiagramCanvasShell>
	)
}
