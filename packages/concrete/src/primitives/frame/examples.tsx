import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Button } from '../button'
import { Stack } from '../stack'
import { Text } from '../text'
import { Frame } from './component'

export const frameExamples = defineExamples({
	compact: {
		description: 'Compact frame for tool panels and generated controls.',
		render: () => (
			<Frame
				align="start"
				footer={<Button density="small">Apply</Button>}
				header="Inspector"
				scale="compact"
			>
				<Text purpose="mono">props.status = "ready"</Text>
			</Frame>
		)
	},
	default: {
		description: 'Header, body, and footer chrome.',
		render: () => (
			<Frame footer="Preview" footerMeta="ready" header="Generated UI" headerMeta="compact">
				<Stack align="center" density="compact">
					<Badge intent="terminal">schema valid</Badge>
					<Text intent="muted">Dense preview frame.</Text>
				</Stack>
			</Frame>
		)
	},
	showcase: {
		description: 'Larger showcase canvas for generated or component previews.',
		render: () => (
			<Frame
				align="stretch"
				header="Preview"
				headerMeta="showcase"
				scale="showcase"
				texture="perspective"
			>
				<Badge intent="ultra">showcase</Badge>
			</Frame>
		)
	},
	texture: {
		description: 'Textured body ground.',
		render: () => (
			<Frame footer="Footer" footerMeta="meta" header="Eyebrow" headerMeta="meta" texture="field">
				<Text intent="strong">Textured body ground</Text>
			</Frame>
		)
	}
})
