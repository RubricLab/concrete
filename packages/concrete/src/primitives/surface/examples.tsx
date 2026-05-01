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
					<Text intent="strong">Run summary</Text>
					<Text intent="muted">3 files changed.</Text>
				</Stack>
			</Surface>
		)
	},
	inverse: {
		description: 'Inverse surface for dark inspection regions.',
		render: () => (
			<Surface intent="inverse">
				<Stack density="compact">
					<Text intent="inverse">Agent trace</Text>
					<Badge hierarchy="ghost">live</Badge>
				</Stack>
			</Surface>
		)
	},
	raised: {
		description: 'Raised treatment for floating or emphasized regions.',
		render: () => (
			<Surface depth="raised" interactive>
				<Text intent="strong">Interactive surface</Text>
			</Surface>
		)
	},
	semantic: {
		description: 'Semantic landmark surface without changing treatment.',
		render: () => (
			<Surface as="nav" density="compact" intent="muted">
				<Text intent="strong">Navigation surface</Text>
			</Surface>
		)
	},
	sticky: {
		description: 'Sticky landmark surface for top-level chrome.',
		render: () => (
			<Surface as="nav" density="compact" placement="sticky">
				<Text intent="strong">Sticky navigation</Text>
			</Surface>
		)
	}
})
