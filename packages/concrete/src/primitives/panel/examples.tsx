import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Label } from '../label'
import { Text } from '../text'
import { Panel } from './component'

export const panelExamples = defineExamples({
	compact: {
		description: 'Compact product panel with action slot.',
		render: () => (
			<Panel
				actions={
					<Button density="small" hierarchy="secondary">
						Open
					</Button>
				}
				density="compact"
				meta={<Label marker>Live</Label>}
				title="Agent runtime"
			>
				<Text intent="muted">4 tools enabled.</Text>
			</Panel>
		)
	},
	default: {
		description: 'Grouped region with header, body, and compact copy.',
		render: () => (
			<Panel description="Connected workspace controls." title="Runtime">
				<Text intent="muted">Tools, memory, and model routing are available.</Text>
			</Panel>
		)
	},
	footer: {
		description: 'Footer dock for scoped actions.',
		render: () => (
			<Panel
				footer={<Button density="small">Save</Button>}
				meta={<Label marker>Ready</Label>}
				title="Settings"
			>
				<Text intent="muted">Changes are staged locally.</Text>
			</Panel>
		)
	},
	raised: {
		description: 'Raised panel for overlay-adjacent content.',
		render: () => (
			<Panel depth="raised" description="Generated output preview." title="Canvas">
				<Text purpose="mono">schema.valid = true</Text>
			</Panel>
		)
	}
})
