import { defineExamples } from '../../factories/createExamples'
import { DiagramCanvasViewport } from '../diagram-viewport'
import { DiagramMiniMap } from './component'

export const diagramMiniMapExamples = defineExamples({
	default: {
		description: 'Minimap overlay inside a diagram viewport.',
		render: () => (
			<DiagramCanvasViewport>
				<DiagramMiniMap
					nodes={[
						{ id: 'input', x: 18, y: 44 },
						{ id: 'model', selected: true, x: 48, y: 30 },
						{ id: 'output', x: 78, y: 58 }
					]}
				/>
			</DiagramCanvasViewport>
		)
	},
	selected: {
		description: 'Minimap selected-id state across a larger graph.',
		render: () => (
			<DiagramCanvasViewport>
				<DiagramMiniMap
					nodes={[
						{ id: 'input', x: 12, y: 42 },
						{ id: 'router', x: 34, y: 28 },
						{ id: 'model', x: 58, y: 34 },
						{ id: 'memory', x: 74, y: 58 },
						{ id: 'output', x: 88, y: 46 }
					]}
					selectedId="model"
				/>
			</DiagramCanvasViewport>
		)
	}
})
