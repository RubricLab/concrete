import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { MessageBubble } from './component'
import { messageBubbleExamples } from './examples'
import { messageBubbleMeta } from './meta'
import { type MessageBubbleValue, messageBubbleSchema } from './schema'

export type { MessageBubbleDirection, MessageBubbleProps } from './component'
export { MessageBubble } from './component'
export type { MessageBubbleInput, MessageBubbleValue } from './schema'
export {
	messageBubbleDirectionValues,
	messageBubblePropsSchema,
	messageBubbleSchema
} from './schema'

export const messageBubblePrimitiveDefinition = createPrimitive({
	...messageBubbleMeta,
	component: MessageBubble,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(messageBubbleExamples, state),
	renderInput: input => renderMessageBubbleInput(messageBubbleSchema.parse(input)),
	schema: messageBubbleSchema,
	slug: 'message-bubble',
	states: exampleStates(messageBubbleExamples, ['default', 'outbound'])
})

function renderMessageBubbleInput({ text, ...input }: MessageBubbleValue) {
	return <MessageBubble {...input}>{text}</MessageBubble>
}
