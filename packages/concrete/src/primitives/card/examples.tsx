import { defineExamples } from '../../factories/createExamples'
import { Grid } from '../grid'
import { Stack } from '../stack'
import { Card } from './component'

export const cardExamples = defineExamples({
	default: {
		description: 'Repeated item cards with depth and compact body copy.',
		render: () => (
			<Grid columns="two" density="compact">
				<Card description="Border only. The canonical surface." title="Default" />
				<Card description="One step of elevation over canvas." title="Raised" depth="raised" />
				<Card description="Recessed. Code, quotes, wells." title="Sunken" depth="sunken" />
			</Grid>
		)
	},
	interactive: {
		description: 'Interactive repeated item cards.',
		render: () => (
			<Stack density="compact">
				<Card description="Open run detail" interactive title="Run 1048" />
				<Card description="Inspect schema drift" depth="raised" interactive title="Schema audit" />
			</Stack>
		)
	},
	raised: {
		description: 'One step of elevation above canvas.',
		render: () => (
			<>
				<Card description="One step of elevation over canvas." title="Raised" depth="raised" />
			</>
		)
	},
	sunken: {
		description: 'Recessed surface for code, quotes, and wells.',
		render: () => (
			<>
				<Card description="Recessed. Code, quotes, wells." title="Sunken" depth="sunken" />
			</>
		)
	}
})
