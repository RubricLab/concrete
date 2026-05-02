import { defineExamples } from '../../factories/createExamples'
import { Heading } from '../heading'
import { Stack } from '../stack'
import { Text } from '../text'
import { PageSection } from './component'

export const pageSectionExamples = defineExamples({
	default: {
		description: 'Standard page band for registry and catalog content.',
		render: () => (
			<PageSection>
				<Stack density="compact">
					<Heading hierarchy="section" level="3">
						Registry band
					</Heading>
					<Text intent="muted">PageSection owns rhythm before content chooses its own layout.</Text>
				</Stack>
			</PageSection>
		)
	},
	hero: {
		description: 'Hero rhythm with a quiet field ground.',
		render: () => (
			<PageSection ground="field" rhythm="hero">
				<Stack density="compact">
					<Heading hierarchy="display" level="3">
						Concrete ships AI-native software.
					</Heading>
					<Text intent="muted">The texture is structural and token-backed.</Text>
				</Stack>
			</PageSection>
		)
	},
	inverse: {
		description: 'Inverse depth band for agent and developer chapters.',
		render: () => (
			<PageSection ground="depth" rhythm="chapter" intent="inverse">
				<Stack density="compact">
					<Heading hierarchy="section" intent="inverse" level="3">
						Interface contract
					</Heading>
					<Text intent="inverse">Use inverse page sections sparingly for high-signal chapters.</Text>
				</Stack>
			</PageSection>
		)
	}
})
