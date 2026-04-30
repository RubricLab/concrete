import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Bubble } from './component'
import { bubbleExamples } from './examples'
import { bubbleMeta } from './meta'
import { type BubbleValue, bubbleSchema } from './schema'

export type { BubbleDirection, BubbleProps } from './component'
export { Bubble } from './component'
export type { BubbleInput, BubbleValue } from './schema'
export { bubbleDirectionValues, bubblePropsSchema, bubbleSchema } from './schema'

export const bubblePrimitiveDefinition = createPrimitive({
	...bubbleMeta,
	component: Bubble,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(bubbleExamples, state),
	renderInput: input => renderBubbleInput(bubbleSchema.parse(input)),
	schema: bubbleSchema,
	slug: 'bubble',
	states: exampleStates(bubbleExamples, ['default', 'outbound'])
})

function renderBubbleInput({ text, ...input }: BubbleValue) {
	return <Bubble {...input}>{text}</Bubble>
}
