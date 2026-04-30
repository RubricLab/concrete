import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Inline } from './component'
import { inlineExamples } from './examples'
import { inlineMeta } from './meta'
import { type InlineValue, inlineSchema } from './schema'

export type { InlineProps } from './component'
export { Inline } from './component'
export type { InlineAlign, InlineInput, InlineJustify, InlineValue } from './schema'
export { inlineAlignSchema, inlineJustifySchema, inlinePropsSchema, inlineSchema } from './schema'

export const inlinePrimitiveDefinition = createPrimitive({
	...inlineMeta,
	component: Inline,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(inlineExamples, state),
	renderInput: input => renderInlineInput(inlineSchema.parse(input)),
	schema: inlineSchema,
	slug: 'inline',
	states: exampleStates(inlineExamples, ['default', 'between', 'baseline'])
})

function renderInlineInput({ align, content, density, justify }: InlineValue) {
	return (
		<Inline align={align} density={density} justify={justify}>
			{content}
		</Inline>
	)
}
