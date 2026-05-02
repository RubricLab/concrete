import { defineExamples } from '../../factories/createExamples'
import { DiagramControls } from './component'

export const diagramControlsExamples = defineExamples({
	compact: {
		description: 'Compact zoom controls with a scale label.',
		render: () => <DiagramControls zoomLabel="0.8x" />
	},
	default: {
		description: 'Diagram viewport controls with percentage readout.',
		render: () => <DiagramControls zoom={1} />
	},
	disabled: {
		description: 'Disabled diagram zoom controls.',
		render: () => <DiagramControls disabled zoom={0.75} />
	}
})
