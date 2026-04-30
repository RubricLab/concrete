import { defineExamples } from '../../factories/createExamples'
import { Button } from '../button'
import { Label } from '../label'
import { Text } from '../text'
import { Panel } from './component'

export const panelExamples = defineExamples({
	default: {
		description: 'Grouped region with header and body.',
		render: () => (
			<Panel description="Connected workspace controls." title="Runtime">
				<Text tone="muted">Tools, memory, and model routing are available.</Text>
			</Panel>
		)
	},
	footer: {
		description: 'Footer dock for scoped actions.',
		render: () => (
			<Panel
				footer={<Button size="small">Save</Button>}
				meta={<Label marker>Ready</Label>}
				title="Settings"
			>
				<Text tone="muted">Changes are staged locally.</Text>
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
