import { defineExamples } from '../../factories/createExamples'
import { DiagramCanvasControls, FlowDiagramControls } from './component'

export const diagramControlsExamples = defineExamples({
	canvas: {
		description: 'Canvas controls with percentage readout.',
		render: () => renderCanvasControls()
	},
	default: {
		description: 'Canvas controls with percentage readout.',
		render: () => renderCanvasControls()
	},
	disabled: {
		description: 'Disabled canvas zoom controls.',
		render: () => (
			<>
				<DiagramCanvasControls disabled zoom={0.75} />
			</>
		)
	},
	flow: {
		description: 'Compact flow diagram controls.',
		render: () => (
			<>
				<FlowDiagramControls zoomLabel="0.8x" />
			</>
		)
	}
})

function renderCanvasControls() {
	return <DiagramCanvasControls zoom={1} />
}
