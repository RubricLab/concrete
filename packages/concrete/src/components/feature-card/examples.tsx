import { defineExamples } from '../../factories/createExamples'
import { FeatureCard } from './component'

export const featureCardExamples = defineExamples({
	default: {
		description: 'Compact system feature callout with subtle depth.',
		render: () => (
			<FeatureCard
				accent="sky"
				description="Schemas, usage guidance, and render routes stay package-native."
				icon="sparkles"
				title="Agent-native by default"
			/>
		)
	},
	set: {
		description: 'A connected set for hero or footer summaries.',
		render: () => (
			<>
				<FeatureCard
					description="Every token has a narrow job."
					icon="sliders-horizontal"
					title="Rigid foundations"
				/>
				<FeatureCard
					accent="sky"
					description="Small pieces compose across densities."
					icon="panel-left"
					title="Composable primitives"
				/>
			</>
		)
	}
})
