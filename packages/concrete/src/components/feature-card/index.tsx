import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { FeatureCard } from './component'
import { featureCardExamples } from './examples'
import { featureCardMeta } from './meta'
import { type FeatureCardValue, featureCardSchema } from './schema'

export type { FeatureCardAccent, FeatureCardProps } from './component'
export { FeatureCard } from './component'
export type { FeatureCardInput, FeatureCardValue } from './schema'
export { featureCardPropsSchema, featureCardSchema } from './schema'

export const featureCardComponentDefinition = createComponent({
	...featureCardMeta,
	component: FeatureCard,
	kind: 'component',
	renderExample: (state?: string) => renderExample(featureCardExamples, state),
	renderInput: input => renderFeatureCardInput(featureCardSchema.parse(input)),
	schema: featureCardSchema,
	slug: 'feature-card',
	states: exampleStates(featureCardExamples, ['default', 'set'])
})

function renderFeatureCardInput({
	accent,
	description,
	icon,
	interactive,
	title
}: FeatureCardValue) {
	return (
		<FeatureCard
			accent={accent}
			description={description}
			icon={icon}
			interactive={interactive}
			title={title}
		/>
	)
}
