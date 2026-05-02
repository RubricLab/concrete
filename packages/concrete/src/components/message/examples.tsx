import { defineExamples } from '../../factories/createExamples'
import { ToolbarControl as Toolbar, ToolbarControlButton as ToolbarButton } from '../../primitives'
import { Message } from './component'

export const messageExamples = defineExamples({
	assistant: {
		description: 'Assistant response with metadata and actions.',
		render: () => renderAssistantMessage()
	},
	default: {
		description: 'Assistant response with metadata and actions.',
		render: () => renderAssistantMessage()
	},
	grouped: {
		description: 'Stacked assistant replies with grouped follow-up treatment.',
		render: () => (
			<>
				<Message author="Rubric" avatarInitials="RL" meta="now" messageRole="assistant" showAvatar>
					The failing catalog route is narrowed to the generated toolbar example.
				</Message>
				<Message author="Rubric" grouped meta="now" messageRole="assistant">
					I am checking the serialized input next so the fix lands in the example instead of the
					renderer.
				</Message>
			</>
		)
	},
	statuses: {
		description: 'Pending, streaming, and error status metadata.',
		render: () => (
			<>
				<Message author="Rubric" messageRole="assistant" status="pending" surface="plain">
					Queued behind the current package build.
				</Message>
				<Message author="Rubric" messageRole="assistant" status="streaming" surface="plain">
					Reading render traces and updating the catalog fixture.
				</Message>
				<Message author="Rubric" messageRole="assistant" status="error" surface="plain">
					Catalog route failed because a server example included a callback prop.
				</Message>
			</>
		)
	},
	system: {
		description: 'System note for constraints, memory, or run context.',
		render: () => (
			<>
				<Message author="System" messageRole="system" surface="plain">
					Context window compacted. Latest workspace state and render routes are available.
				</Message>
			</>
		)
	},
	user: {
		description: 'Outbound user message treatment.',
		render: () => (
			<>
				<Message
					actions={
						<Toolbar compact label="User message actions">
							<ToolbarButton icon="pencil" label="Edit" showLabel={false} tooltipPlacement="bottom" />
							<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
						</Toolbar>
					}
					author="Dexter"
					avatarInitials="DS"
					messageRole="user"
					showAvatar
				>
					Can you inspect the failing run and summarize the blocker?
				</Message>
			</>
		)
	}
})

function renderAssistantMessage() {
	return (
		<Message
			actions={
				<Toolbar compact label="Assistant message actions">
					<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
					<ToolbarButton icon="refresh-ccw" label="Retry" showLabel={false} tooltipPlacement="bottom" />
				</Toolbar>
			}
			author="Rubric"
			avatarInitials="RL"
			meta="now"
			messageRole="assistant"
			showAvatar
		>
			I found the stale fixture and the missing tool permission edge.
		</Message>
	)
}
