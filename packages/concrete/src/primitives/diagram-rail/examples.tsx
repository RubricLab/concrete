import { defineExamples } from '../../factories/createExamples'
import { DiagramViewport } from '../diagram-viewport'
import { DiagramRail } from './component'

export const diagramRailExamples = defineExamples({
	active: {
		description: 'Diagram rail with a later active tool.',
		render: () => (
			<DiagramViewport>
				<DiagramRail activeIndex={3} />
			</DiagramViewport>
		)
	},
	default: {
		description: 'Diagram rail inside a viewport.',
		render: () => (
			<DiagramViewport>
				<DiagramRail />
			</DiagramViewport>
		)
	},
	tools: {
		description: 'Diagram rail with a focused authoring tool set.',
		render: () => (
			<DiagramViewport>
				<DiagramRail activeIndex={1} tools={['arrow-right', 'sparkles', 'bar-chart-3', 'file-text']} />
			</DiagramViewport>
		)
	}
})
