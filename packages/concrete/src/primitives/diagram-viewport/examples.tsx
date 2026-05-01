import { defineExamples } from '../../factories/createExamples'
import { DiagramItem } from '../diagram-item'
import { DiagramNode } from '../diagram-node'
import {
	DiagramElement,
	DiagramHeader,
	DiagramShell,
	DiagramStage,
	DiagramViewport
} from './component'

export const diagramViewportExamples = defineExamples({
	canvas: {
		description: 'Canvas viewport with positioned workflow elements.',
		render: () => (
			<DiagramShell>
				<DiagramHeader
					description="Selected model step with supporting trace artifacts."
					title="Routing workflow"
				/>
				<DiagramViewport>
					<DiagramStage height={320} transform="translate(0px, 0px) scale(1)" width={720}>
						<DiagramElement height={72} width={180} x={10} y={22}>
							<DiagramNode meta="request" title="User input" />
						</DiagramElement>
						<DiagramElement height={72} width={180} x={38} y={16}>
							<DiagramNode meta="policy" selected title="Router" />
						</DiagramElement>
						<DiagramElement height={72} width={180} x={66} y={22}>
							<DiagramNode meta="reasoning" title="Model" />
						</DiagramElement>
						<DiagramElement height={96} width={160} x={42} y={56}>
							<DiagramItem kind="metric" meta="p95" title="Latency" value="184ms" />
						</DiagramElement>
					</DiagramStage>
				</DiagramViewport>
			</DiagramShell>
		)
	},
	default: {
		description: 'Diagram canvas shell with status header and viewport.',
		render: () => renderCanvasViewport()
	},
	flow: {
		description: 'Compact flow viewport shell.',
		render: () => (
			<DiagramShell display="flow">
				<DiagramViewport display="flow" />
			</DiagramShell>
		)
	}
})

function renderCanvasViewport() {
	return (
		<DiagramShell>
			<DiagramHeader description="Pan and zoom across agent workflow topology." title="Agent canvas" />
			<DiagramViewport />
		</DiagramShell>
	)
}
