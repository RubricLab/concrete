import { defineExamples } from '../../factories/createExamples'
import { Grid } from '../grid'
import { Panel } from '../panel'
import { Stack } from '../stack'
import { Text } from '../text'
import { Container } from './component'

export const containerExamples = defineExamples({
	content: {
		description: 'Reading measure for editorial content.',
		render: () => (
			<Container measure="content">
				<Panel title="Content measure">
					<Text>
						Research copy stays centered and readable without each route inventing a local width class.
					</Text>
				</Panel>
			</Container>
		)
	},
	default: {
		description: 'Wide product measure with standard inline padding.',
		render: () => (
			<Container>
				<Grid columns="two">
					<Panel title="Registry">Foundations, primitives, components.</Panel>
					<Panel title="Render">DOM, JPEG, and deterministic states.</Panel>
				</Grid>
			</Container>
		)
	},
	full: {
		description: 'Full-width measure that still owns edge padding.',
		render: () => (
			<Container measure="full">
				<Stack density="compact">
					<Text intent="strong">Full measure</Text>
					<Text intent="muted">Useful for tool stages and wide generated UI.</Text>
				</Stack>
			</Container>
		)
	}
})
