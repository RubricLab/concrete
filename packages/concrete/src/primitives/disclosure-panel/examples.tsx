import { defineExamples } from '../../factories/createExamples'
import { Text } from '../text'
import { DisclosurePanel } from './component'

export const disclosurePanelExamples = defineExamples({
	closed: {
		description: 'Closed disclosure state.',
		render: () => (
			<DisclosurePanel summary="Collapsed details">
				<Text tone="muted">Hidden content</Text>
			</DisclosurePanel>
		)
	},
	default: {
		description: 'Generic disclosure panel for trace and details content.',
		render: () => (
			<DisclosurePanel open summary="Trace details">
				<Text tone="muted">Loaded files, parsed registry metadata, and rendered examples.</Text>
			</DisclosurePanel>
		)
	},
	terminal: {
		description: 'Terminal-toned disclosure for agent traces.',
		render: () => (
			<DisclosurePanel open summary="Agent trace" tone="terminal">
				<Text tone="terminal">Tool call completed.</Text>
			</DisclosurePanel>
		)
	}
})
