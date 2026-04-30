import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Stack } from '../stack'
import { Text } from '../text'
import { Surface } from './component'

export const surfaceExamples = defineExamples({
	default: {
		description: 'Base surface treatment for contained UI.',
		render: () => (
			<Surface>
				<Stack density="compact">
					<Text tone="strong">Run summary</Text>
					<Text tone="muted">3 files changed.</Text>
				</Stack>
			</Surface>
		)
	},
	inverse: {
		description: 'Inverse surface for dark inspection regions.',
		render: () => (
			<Surface tone="inverse">
				<Stack density="compact">
					<Text tone="inverse">Agent trace</Text>
					<Badge variant="ghost">live</Badge>
				</Stack>
			</Surface>
		)
	},
	raised: {
		description: 'Raised treatment for floating or emphasized regions.',
		render: () => (
			<Surface depth="raised" interactive>
				<Text tone="strong">Interactive surface</Text>
			</Surface>
		)
	}
})
