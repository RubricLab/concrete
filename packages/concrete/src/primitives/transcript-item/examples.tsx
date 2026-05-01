import { defineExamples } from '../../factories/createExamples'
import { Avatar } from '../avatar'
import { Badge } from '../badge'
import { Button } from '../button'
import { MessageBubble } from '../message-bubble'
import { TranscriptItem, TranscriptMetaItem, TranscriptPlain } from './component'

export const transcriptItemExamples = defineExamples({
	assistant: {
		description: 'Assistant message with action rail.',
		render: () => (
			<TranscriptItem
				actions={
					<>
						<Button density="tiny" hierarchy="secondary">
							Copy
						</Button>
						<Button density="tiny" hierarchy="secondary">
							Retry
						</Button>
					</>
				}
				avatar={<Avatar density="compact" initials="A" />}
				meta={
					<>
						<TranscriptMetaItem>Assistant</TranscriptMetaItem>
						<Badge intent="terminal">complete</Badge>
					</>
				}
			>
				<MessageBubble direction="inbound">Here is the compact result.</MessageBubble>
			</TranscriptItem>
		)
	},
	default: {
		description: 'Assistant message with avatar, meta, and bubble surface.',
		render: () => (
			<TranscriptItem
				avatar={<Avatar density="compact" initials="A" />}
				meta={
					<>
						<TranscriptMetaItem>Assistant</TranscriptMetaItem>
						<Badge intent="terminal">complete</Badge>
					</>
				}
			>
				<MessageBubble direction="inbound">Here is the compact result.</MessageBubble>
			</TranscriptItem>
		)
	},
	grouped: {
		description: 'Grouped assistant follow-up messages.',
		render: () => (
			<>
				<TranscriptItem
					avatar={<Avatar density="compact" initials="A" />}
					meta={
						<>
							<TranscriptMetaItem>Assistant</TranscriptMetaItem>
							<TranscriptMetaItem>1:42 PM</TranscriptMetaItem>
						</>
					}
				>
					<MessageBubble direction="inbound">I found the stale table fixture.</MessageBubble>
				</TranscriptItem>
				<TranscriptItem grouped>
					<MessageBubble direction="inbound">Next I will patch the render input.</MessageBubble>
				</TranscriptItem>
			</>
		)
	},
	plain: {
		description: 'Plain content surface for tool or reasoning output.',
		render: () => (
			<TranscriptItem messageRole="tool" surface="plain">
				<TranscriptPlain>
					Loaded files, classified selectors, and selected the next primitive.
				</TranscriptPlain>
			</TranscriptItem>
		)
	},
	statuses: {
		description: 'Message status states for streaming and errors.',
		render: () => (
			<>
				<TranscriptItem
					meta={
						<>
							<TranscriptMetaItem>Assistant</TranscriptMetaItem>
							<Badge intent="ultra">streaming</Badge>
						</>
					}
					status="streaming"
				>
					<MessageBubble direction="inbound">Reviewing the primitive boundary...</MessageBubble>
				</TranscriptItem>
				<TranscriptItem
					meta={
						<>
							<TranscriptMetaItem>Tool</TranscriptMetaItem>
							<Badge intent="danger">error</Badge>
						</>
					}
					messageRole="tool"
					status="error"
					surface="plain"
				>
					<TranscriptPlain>Catalog route returned a render error.</TranscriptPlain>
				</TranscriptItem>
			</>
		)
	},
	user: {
		description: 'Outbound user message.',
		render: () => (
			<TranscriptItem messageRole="user">
				<MessageBubble direction="outbound">Tighten the component boundary.</MessageBubble>
			</TranscriptItem>
		)
	}
})
