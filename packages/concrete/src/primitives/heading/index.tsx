import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Heading } from './component'
import { headingExamples } from './examples'
import { headingMeta } from './meta'
import { type HeadingValue, headingSchema } from './schema'

export type { HeadingProps } from './component'
export { Heading } from './component'
export type {
	HeadingHierarchy,
	HeadingInput,
	HeadingIntent,
	HeadingLevel,
	HeadingValue
} from './schema'
export {
	headingHierarchySchema,
	headingIntentSchema,
	headingLevelSchema,
	headingPropsSchema,
	headingSchema
} from './schema'

export const headingPrimitiveDefinition = createPrimitive({
	...headingMeta,
	component: Heading,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(headingExamples, state),
	renderInput: input => renderHeadingInput(headingSchema.parse(input)),
	schema: headingSchema,
	slug: 'heading',
	states: exampleStates(headingExamples, ['default', 'hero', 'display', 'scale'])
})

function renderHeadingInput({ content, level, hierarchy, intent }: HeadingValue) {
	return (
		<Heading level={level} hierarchy={hierarchy} intent={intent}>
			{content}
		</Heading>
	)
}
