import { defineExamples } from '../../factories/createExamples'
import { Stack } from '../stack'
import { Heading } from './component'

export const headingExamples = defineExamples({
	default: {
		description: 'Section-level heading.',
		render: () => <Heading>Workspace</Heading>
	},
	display: {
		description: 'Display heading for editorial or hero-scale moments.',
		render: () => (
			<Heading level="1" size="display">
				Concrete
			</Heading>
		)
	},
	scale: {
		description: 'Title and subsection sizing together.',
		render: () => (
			<Stack density="compact">
				<Heading level="2" size="title">
					Agent workflow
				</Heading>
				<Heading level="3" size="subsection" tone="muted">
					Tool trace
				</Heading>
			</Stack>
		)
	}
})
