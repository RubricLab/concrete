import { defineExamples } from '../../factories/createExamples'
import { Badge } from '../badge'
import { Inline } from '../inline'
import { Text } from '../text'
import { Section } from './component'

export const sectionExamples = defineExamples({
	default: {
		description: 'Titled group without a new surface.',
		render: () => (
			<Section description="Local grouping inside a panel." title="Inputs">
				<Text tone="muted">The section owns hierarchy, not chrome.</Text>
			</Section>
		)
	},
	separated: {
		description: 'Separated body for denser product settings.',
		render: () => (
			<Section separated title="Status">
				<Inline>
					<Badge signal="terminal">Ready</Badge>
					<Text purpose="meta">2 checks passed</Text>
				</Inline>
			</Section>
		)
	}
})
