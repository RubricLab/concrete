import { defineExamples } from '../../factories/createExamples'
import { DiagramItem } from '../diagram-item'
import { DiagramNode } from '../diagram-node'
import {
	DiagramCanvasElement,
	DiagramCanvasHeader,
	DiagramCanvasShell,
	DiagramCanvasStage,
	DiagramCanvasViewport
} from './component'

export const diagramViewportExamples = defineExamples({
	canvas: {
		description: 'Canvas viewport with positioned workflow elements.',
		render: () => (
			<DiagramCanvasShell>
				<DiagramCanvasHeader
					description="Selected model step with supporting trace artifacts."
					title="Routing workflow"
				/>
				<DiagramCanvasViewport>
					<DiagramCanvasStage height={320} transform="translate(0px, 0px) scale(1)" width={720}>
						<DiagramCanvasElement height={72} width={180} x={10} y={22}>
							<DiagramNode meta="request" title="User input" />
						</DiagramCanvasElement>
						<DiagramCanvasElement height={72} width={180} x={38} y={16}>
							<DiagramNode meta="policy" selected title="Router" />
						</DiagramCanvasElement>
						<DiagramCanvasElement height={72} width={180} x={66} y={22}>
							<DiagramNode meta="reasoning" title="Model" />
						</DiagramCanvasElement>
						<DiagramCanvasElement height={96} width={160} x={42} y={56}>
							<DiagramItem kind="metric" meta="p95" title="Latency" value="184ms" />
						</DiagramCanvasElement>
					</DiagramCanvasStage>
				</DiagramCanvasViewport>
			</DiagramCanvasShell>
		)
	},
	default: {
		description: 'Diagram canvas shell with status header and viewport.',
		render: () => renderCanvasViewport()
	},
	flow: {
		description: 'Compact flow viewport shell.',
		render: () => (
			<DiagramCanvasShell>
				<DiagramCanvasViewport />
			</DiagramCanvasShell>
		)
	}
})

function renderCanvasViewport() {
	return (
		<DiagramCanvasShell>
			<DiagramCanvasHeader
				description="Pan and zoom across agent workflow topology."
				title="Agent canvas"
			/>
			<DiagramCanvasViewport />
		</DiagramCanvasShell>
	)
}
