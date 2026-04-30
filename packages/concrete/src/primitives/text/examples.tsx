import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../stack'
import { Text } from './component'

export const textExamples = defineExamples({
	default: {
		description: 'Default body text.',
		render: () => <Text>Concrete text stays compact and readable.</Text>
	},
	meta: {
		description: 'Small metadata and caption roles.',
		render: () => (
			<Stack density="compact">
				<Text purpose="meta">Updated 2 minutes ago</Text>
				<Text purpose="caption" tone="soft">
					Generated interface output
				</Text>
			</Stack>
		)
	},
	numeric: {
		description: 'Numeric and mono text roles.',
		render: () => (
			<Stack density="compact">
				<Text purpose="number" tone="strong">
					98.4%
				</Text>
				<Text as="code" purpose="mono">
					bun run check
				</Text>
			</Stack>
		)
	}
})
