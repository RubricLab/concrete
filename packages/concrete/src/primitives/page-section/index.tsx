import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { PageSection } from './component'
import { pageSectionExamples } from './examples'
import { pageSectionMeta } from './meta'
import { type PageSectionValue, pageSectionSchema } from './schema'

export type { PageSectionProps } from './component'
export { PageSection } from './component'
export type {
	PageSectionGround,
	PageSectionInput,
	PageSectionIntent,
	PageSectionRhythm,
	PageSectionValue
} from './schema'
export {
	pageSectionGroundSchema,
	pageSectionIntentSchema,
	pageSectionPropsSchema,
	pageSectionRhythmSchema,
	pageSectionSchema
} from './schema'

export const pageSectionPrimitiveDefinition = createPrimitive({
	...pageSectionMeta,
	component: PageSection,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(pageSectionExamples, state),
	renderInput: input => renderPageSectionInput(pageSectionSchema.parse(input)),
	schema: pageSectionSchema,
	slug: 'page-section',
	states: exampleStates(pageSectionExamples, ['default', 'hero', 'inverse'])
})

function renderPageSectionInput({
	content,
	density,
	ground,
	rhythm,
	separated,
	intent
}: PageSectionValue) {
	return (
		<PageSection
			density={density}
			ground={ground}
			rhythm={rhythm}
			separated={separated}
			intent={intent}
		>
			{content}
		</PageSection>
	)
}
