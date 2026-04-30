import { defineExamples } from '../../factories/createExamples'
import { DiagramCanvasViewport } from '../diagram-viewport'
import { DiagramRail } from './component'

export const diagramRailExamples = defineExamples({
	active: {
		description: 'Diagram rail with a later active tool.',
		render: () => (
			<DiagramCanvasViewport>
				<DiagramRail activeIndex={3} />
			</DiagramCanvasViewport>
		)
	},
	default: {
		description: 'Diagram rail inside a viewport.',
		render: () => (
			<DiagramCanvasViewport>
				<DiagramRail />
			</DiagramCanvasViewport>
		)
	},
	tools: {
		description: 'Diagram rail with a focused authoring tool set.',
		render: () => (
			<DiagramCanvasViewport>
				<DiagramRail activeIndex={1} tools={['arrow-right', 'sparkles', 'bar-chart-3', 'file-text']} />
			</DiagramCanvasViewport>
		)
	}
})
