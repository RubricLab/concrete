import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Section } from './component'
import { sectionExamples } from './examples'
import { sectionMeta } from './meta'
import { type SectionValue, sectionSchema } from './schema'

export type { SectionProps } from './component'
export { Section } from './component'
export type { SectionInput, SectionValue } from './schema'
export { sectionPropsSchema, sectionSchema } from './schema'

export const sectionPrimitiveDefinition = createPrimitive({
	...sectionMeta,
	component: Section,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(sectionExamples, state),
	renderInput: input => renderSectionInput(sectionSchema.parse(input)),
	schema: sectionSchema,
	slug: 'section',
	states: exampleStates(sectionExamples, ['default', 'separated'])
})

function renderSectionInput({ content, density, description, separated, title }: SectionValue) {
	return (
		<Section density={density} description={description} separated={separated} title={title}>
			{content}
		</Section>
	)
}
