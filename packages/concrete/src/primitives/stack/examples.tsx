import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Divider } from '../divider'
import { Row } from '../row'
import { Stack } from './component'

export const stackExamples = defineExamples({
	default: {
		description: 'Comfortable vertical rhythm for repeated content.',
		render: () => (
			<Stack>
				<Row meta={<Badge variant="count">3</Badge>}>Research queue</Row>
				<Row meta={<Badge signal="ultra">2 claims</Badge>}>Synthesis</Row>
			</Stack>
		)
	},
	divided: {
		description: 'Dense separated rows without a new surface.',
		render: () => (
			<Stack density="compact" divided>
				<Badge signal="terminal">Ready</Badge>
				<Badge signal="ultra">Generated</Badge>
				<Badge signal="error">Blocked</Badge>
			</Stack>
		)
	},
	editorial: {
		description: 'Looser rhythm for reading and explanation.',
		render: () => (
			<Stack density="editorial">
				<Divider label="Context" />
				<Row meta={<Badge signal="terminal">System</Badge>}>Concrete</Row>
			</Stack>
		)
	}
})
