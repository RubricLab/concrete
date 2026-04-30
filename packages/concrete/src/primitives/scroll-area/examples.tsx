import { defineExamples } from '../../factories/createExamples'
import { Row } from '../row'
import { Stack } from '../stack'
import { ScrollArea } from './component'

export const scrollAreaExamples = defineExamples({
	default: {
		description: 'Bounded compact list.',
		render: () => (
			<ScrollArea size="small">
				<Stack density="compact">
					<Row meta="12ms">Parse prompt</Row>
					<Row meta="41ms">Fetch sources</Row>
					<Row meta="88ms">Rank passages</Row>
					<Row meta="126ms">Draft answer</Row>
					<Row meta="154ms">Validate citations</Row>
				</Stack>
			</ScrollArea>
		)
	},
	large: {
		description: 'Larger trace or table scroll region.',
		render: () => (
			<ScrollArea size="large">
				<Stack density="compact">
					<Row meta="01">Collect</Row>
					<Row meta="02">Normalize</Row>
					<Row meta="03">Embed</Row>
					<Row meta="04">Retrieve</Row>
					<Row meta="05">Synthesize</Row>
					<Row meta="06">Verify</Row>
					<Row meta="07">Publish</Row>
				</Stack>
			</ScrollArea>
		)
	}
})
