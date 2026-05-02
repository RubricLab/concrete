import { defineExamples } from '../../factories/createExamples'
import { DiagramShell, DiagramSvg, DiagramViewport } from '../diagram-viewport'
import { DiagramEdgePath, DiagramEdges } from './component'

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
			<DiagramSvg
				gridId="diagram-edge-flow-grid"
				height={120}
				panX={0}
				panY={0}
				title="Flow edge"
				viewBox="0 0 260 120"
			>
				<DiagramEdgePath
					display="flow"
					label="event"
					labelPoint={{ x: 130, y: 60 }}
					path="M20 72 C80 72 180 48 240 48"
					intent="terminal"
					relation="pulse"
				/>
			</DiagramSvg>
		)
	},
	relations: {
		description: 'Canvas edge relations and selected intent.',
		render: () => (
			<DiagramShell>
				<DiagramViewport>
					<DiagramEdges
						height={160}
						markerId="diagram-edge-relations"
						reverseMarkerId="diagram-edge-relations-reverse"
						width={300}
					>
						<DiagramEdgePath
							label="event"
							labelPoint={{ x: 150, y: 36 }}
							markerEnd="url(#diagram-edge-relations)"
							path="M24 48 C88 28 212 28 276 48"
							intent="terminal"
							relation="dashed"
						/>
						<DiagramEdgePath
							label="reference"
							labelPoint={{ x: 150, y: 104 }}
							markerEnd="url(#diagram-edge-relations)"
							path="M24 112 C88 132 212 132 276 112"
							selected
							intent="sky"
							relation="reference"
						/>
					</DiagramEdges>
				</DiagramViewport>
			</DiagramShell>
		)
	}
})

function renderCanvasEdge() {
	return (
		<DiagramShell>
			<DiagramViewport>
				<DiagramEdges
					height={120}
					markerId="diagram-edge-example"
					reverseMarkerId="diagram-edge-example-reverse"
					width={260}
				>
					<DiagramEdgePath
						label="routes"
						labelPoint={{ x: 130, y: 60 }}
						markerEnd="url(#diagram-edge-example)"
						path="M20 72 C80 72 180 48 240 48"
						intent="sky"
					/>
				</DiagramEdges>
			</DiagramViewport>
		</DiagramShell>
	)
}
