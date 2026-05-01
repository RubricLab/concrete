import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Divider } from '../divider'
import { OptionRow } from '../option-row'
import { Stack } from './component'

export const stackExamples = defineExamples({
	default: {
		description: 'Comfortable vertical rhythm for repeated content.',
		render: () => (
			<Stack>
				<OptionRow meta={<Badge purpose="count">3</Badge>}>Research queue</OptionRow>
				<OptionRow meta={<Badge intent="ultra">2 claims</Badge>}>Synthesis</OptionRow>
			</Stack>
		)
	},
	divided: {
		description: 'Dense separated rows without a new surface.',
		render: () => (
			<Stack density="compact" divided>
				<Badge intent="terminal">Ready</Badge>
				<Badge intent="ultra">Generated</Badge>
				<Badge intent="danger">Blocked</Badge>
			</Stack>
		)
	},
	editorial: {
		description: 'Looser rhythm for reading and explanation.',
		render: () => (
			<Stack density="editorial">
				<Divider label="Context" />
				<OptionRow meta={<Badge intent="terminal">System</Badge>}>Concrete</OptionRow>
			</Stack>
		)
	}
})
