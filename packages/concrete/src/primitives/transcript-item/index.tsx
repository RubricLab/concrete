import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Avatar } from '../avatar'
import { Badge } from '../badge'
import { MessageBubble } from '../message-bubble'
import { TranscriptItem, TranscriptMetaItem, TranscriptPlain } from './component'
import { transcriptItemExamples } from './examples'
import { transcriptItemMeta } from './meta'
import { type TranscriptItemValue, transcriptItemSchema } from './schema'

export type {
	TranscriptItemProps,
	TranscriptMetaItemProps,
	TranscriptPlainProps
} from './component'
export { TranscriptItem, TranscriptMetaItem, TranscriptPlain } from './component'
export type { TranscriptItemInput, TranscriptItemValue } from './schema'
export { transcriptItemPropsSchema, transcriptItemSchema } from './schema'

export const transcriptItemPrimitiveDefinition = createPrimitive({
	...transcriptItemMeta,
	component: TranscriptItem,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(transcriptItemExamples, state),
	renderInput: input => renderTranscriptItemInput(transcriptItemSchema.parse(input)),
	schema: transcriptItemSchema,
	slug: 'transcript-item',
	states: exampleStates(transcriptItemExamples, [
		'default',
		'assistant',
		'user',
		'grouped',
		'plain',
		'statuses'
	])
})

function renderTranscriptItemInput({
	author,
	grouped,
	messageRole,
	meta,
	status,
	surface,
	text
}: TranscriptItemValue) {
	const direction = messageRole === 'user' ? 'outbound' : 'inbound'

	return (
		<TranscriptItem
			avatar={messageRole === 'assistant' ? <Avatar density="compact" initials="A" /> : undefined}
			grouped={grouped}
			messageRole={messageRole}
			meta={
				<>
					<TranscriptMetaItem>{author}</TranscriptMetaItem>
					{meta ? <TranscriptMetaItem>{meta}</TranscriptMetaItem> : null}
					{status !== 'complete' ? <Badge intent="ultra">{status}</Badge> : null}
				</>
			}
			status={status}
			surface={surface}
		>
			{surface === 'bubble' ? (
				<MessageBubble direction={direction}>{text}</MessageBubble>
			) : (
				<TranscriptPlain>{text}</TranscriptPlain>
			)}
		</TranscriptItem>
	)
}
