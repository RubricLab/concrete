import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { Message } from './component'
import { messageExamples } from './examples'
import { messageMeta } from './meta'
import { type MessageValue, messageComponentSchema } from './schema'

export type { MessageProps } from './component'
export { Message } from './component'
export type { MessageInput, MessageValue } from './schema'
export { messageComponentSchema } from './schema'

export const messageComponentDefinition = createComponent({
	...messageMeta,
	component: Message,
	kind: 'component',
	renderExample: (state?: string) => renderExample(messageExamples, state),
	renderInput: input => renderMessageInput(messageComponentSchema.parse(input)),
	schema: messageComponentSchema,
	seed: messageComponentSchema.parse({
		author: 'Rubric',
		avatarInitials: 'RL',
		meta: 'now',
		showAvatar: true
	}),
	slug: 'message',
	states: exampleStates(messageExamples, ['assistant', 'user', 'system'])
})

function renderMessageInput(input: MessageValue) {
	const { author, avatarInitials, avatarSrc, children, meta, ...props } = input

	return (
		<Message
			{...props}
			{...(author ? { author } : {})}
			{...(avatarInitials ? { avatarInitials } : {})}
			{...(avatarSrc ? { avatarSrc } : {})}
			{...(meta ? { meta } : {})}
		>
			{children}
		</Message>
	)
}
