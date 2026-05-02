import { defineExamples } from '../../factories/createExamples'
import { OptionRow } from '../option-row'
import { Stack } from '../stack'
import { ScrollArea } from './component'

export const scrollAreaExamples = defineExamples({
	default: {
		description: 'Bounded compact list.',
		render: () => (
			<ScrollArea extent="small">
				<Stack density="compact">
					<OptionRow meta="12ms">Parse prompt</OptionRow>
					<OptionRow meta="41ms">Fetch sources</OptionRow>
					<OptionRow meta="88ms">Rank passages</OptionRow>
					<OptionRow meta="126ms">Draft answer</OptionRow>
					<OptionRow meta="154ms">Validate citations</OptionRow>
				</Stack>
			</ScrollArea>
		)
	},
	large: {
		description: 'Larger trace or table scroll region.',
		render: () => (
			<ScrollArea extent="large">
				<Stack density="compact">
					<OptionRow meta="01">Collect</OptionRow>
					<OptionRow meta="02">Normalize</OptionRow>
					<OptionRow meta="03">Embed</OptionRow>
					<OptionRow meta="04">Retrieve</OptionRow>
					<OptionRow meta="05">Synthesize</OptionRow>
					<OptionRow meta="06">Verify</OptionRow>
					<OptionRow meta="07">Publish</OptionRow>
				</Stack>
			</ScrollArea>
		)
	}
})
