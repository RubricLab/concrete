import { defineExamples } from '../../factories/createExamples'
import { Panel } from '../panel'
import { DialogSurface } from './component'

export const dialogSurfaceExamples = defineExamples({
	compact: {
		description: 'Compact dialog width.',
		render: () => (
			<DialogSurface measure="compact">
				<Panel title="Confirm">Compact confirmation</Panel>
			</DialogSurface>
		)
	},
	default: {
		description: 'Dialog surface sized for focused workflows.',
		render: () => (
			<DialogSurface>
				<Panel description="The panel owns title, body, and footer anatomy." title="Invite member">
					Dialog body
				</Panel>
			</DialogSurface>
		)
	},
	wide: {
		description: 'Wide dialog width for complex generated interfaces.',
		render: () => (
			<DialogSurface measure="wide">
				<Panel title="Generated form">Wide workflow surface</Panel>
			</DialogSurface>
		)
	}
})
