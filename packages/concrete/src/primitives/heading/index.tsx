import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Heading } from './component'
import { headingExamples } from './examples'
import { headingMeta } from './meta'
import { type HeadingValue, headingSchema } from './schema'

export type { HeadingProps } from './component'
export { Heading } from './component'
export type {
	HeadingInput,
	HeadingLevel,
	HeadingSize,
	HeadingTone,
	HeadingValue
} from './schema'
export {
	headingLevelSchema,
	headingPropsSchema,
	headingSchema,
	headingSizeSchema,
	headingToneSchema
} from './schema'

export const headingPrimitiveDefinition = createPrimitive({
	...headingMeta,
	component: Heading,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(headingExamples, state),
	renderInput: input => renderHeadingInput(headingSchema.parse(input)),
	schema: headingSchema,
	slug: 'heading',
	states: exampleStates(headingExamples, ['default', 'display', 'scale'])
})

function renderHeadingInput({ content, level, size, tone }: HeadingValue) {
	return (
		<Heading level={level} size={size} tone={tone}>
			{content}
		</Heading>
	)
}
