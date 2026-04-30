import { defineExamples } from '../../factories/createExamples'
import { Avatar } from '../avatar'
import { Badge } from '../badge'
import { Button } from '../button'
import { MessageBubble, MessageMetaItem, MessagePlain, MessageShell } from './component'

export const messageShellExamples = defineExamples({
	assistant: {
		description: 'Assistant message with action rail.',
		render: () => (
			<MessageShell
				actions={
					<>
						<Button size="tiny" variant="secondary">
							Copy
						</Button>
						<Button size="tiny" variant="secondary">
							Retry
						</Button>
					</>
				}
				avatar={<Avatar initials="A" size="small" />}
				meta={
					<>
						<MessageMetaItem>Assistant</MessageMetaItem>
						<Badge signal="terminal">complete</Badge>
					</>
				}
			>
				<MessageBubble direction="inbound">Here is the compact result.</MessageBubble>
			</MessageShell>
		)
	},
	default: {
		description: 'Assistant message with avatar, meta, and bubble surface.',
		render: () => (
			<MessageShell
				avatar={<Avatar initials="A" size="small" />}
				meta={
					<>
						<MessageMetaItem>Assistant</MessageMetaItem>
						<Badge signal="terminal">complete</Badge>
					</>
				}
			>
				<MessageBubble direction="inbound">Here is the compact result.</MessageBubble>
			</MessageShell>
		)
	},
	grouped: {
		description: 'Grouped assistant follow-up messages.',
		render: () => (
			<>
				<MessageShell
					avatar={<Avatar initials="A" size="small" />}
					meta={
						<>
							<MessageMetaItem>Assistant</MessageMetaItem>
							<MessageMetaItem>1:42 PM</MessageMetaItem>
						</>
					}
				>
					<MessageBubble direction="inbound">I found the stale table fixture.</MessageBubble>
				</MessageShell>
				<MessageShell grouped>
					<MessageBubble direction="inbound">Next I will patch the render input.</MessageBubble>
				</MessageShell>
			</>
		)
	},
	plain: {
		description: 'Plain content surface for tool or reasoning output.',
		render: () => (
			<MessageShell messageRole="tool" surface="plain">
				<MessagePlain>
					Loaded files, classified selectors, and selected the next primitive.
				</MessagePlain>
			</MessageShell>
		)
	},
	statuses: {
		description: 'Message status states for streaming and errors.',
		render: () => (
			<>
				<MessageShell
					meta={
						<>
							<MessageMetaItem>Assistant</MessageMetaItem>
							<Badge signal="ultra">streaming</Badge>
						</>
					}
					status="streaming"
				>
					<MessageBubble direction="inbound">Reviewing the primitive boundary...</MessageBubble>
				</MessageShell>
				<MessageShell
					meta={
						<>
							<MessageMetaItem>Tool</MessageMetaItem>
							<Badge signal="error">error</Badge>
						</>
					}
					messageRole="tool"
					status="error"
					surface="plain"
				>
					<MessagePlain>Catalog route returned a render error.</MessagePlain>
				</MessageShell>
			</>
		)
	},
	user: {
		description: 'Outbound user message.',
		render: () => (
			<MessageShell messageRole="user">
				<MessageBubble direction="outbound">Tighten the component boundary.</MessageBubble>
			</MessageShell>
		)
	}
})
