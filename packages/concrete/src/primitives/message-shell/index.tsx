import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Avatar } from '../avatar'
import { Badge } from '../badge'
import { MessageBubble, MessageMetaItem, MessagePlain, MessageShell } from './component'
import { messageShellExamples } from './examples'
import { messageShellMeta } from './meta'
import { type MessageShellValue, messageShellSchema } from './schema'

export type {
	MessageBubbleProps,
	MessageMetaItemProps,
	MessagePlainProps,
	MessageShellProps
} from './component'
export { MessageBubble, MessageMetaItem, MessagePlain, MessageShell } from './component'
export type { MessageShellInput, MessageShellValue } from './schema'
export { messageShellPropsSchema, messageShellSchema } from './schema'

export const messageShellPrimitiveDefinition = createPrimitive({
	...messageShellMeta,
	component: MessageShell,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(messageShellExamples, state),
	renderInput: input => renderMessageShellInput(messageShellSchema.parse(input)),
	schema: messageShellSchema,
	slug: 'message-shell',
	states: exampleStates(messageShellExamples, [
		'default',
		'assistant',
		'user',
		'grouped',
		'plain',
		'statuses'
	])
})

function renderMessageShellInput({
	author,
	grouped,
	messageRole,
	meta,
	status,
	surface,
	text
}: MessageShellValue) {
	const direction = messageRole === 'user' ? 'outbound' : 'inbound'

	return (
		<MessageShell
			avatar={messageRole === 'assistant' ? <Avatar initials="A" size="small" /> : undefined}
			grouped={grouped}
			messageRole={messageRole}
			meta={
				<>
					<MessageMetaItem>{author}</MessageMetaItem>
					{meta ? <MessageMetaItem>{meta}</MessageMetaItem> : null}
					{status !== 'complete' ? <Badge signal="ultra">{status}</Badge> : null}
				</>
			}
			status={status}
			surface={surface}
		>
			{surface === 'bubble' ? (
				<MessageBubble direction={direction}>{text}</MessageBubble>
			) : (
				<MessagePlain>{text}</MessagePlain>
			)}
		</MessageShell>
	)
}
