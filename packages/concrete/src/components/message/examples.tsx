import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { Toolbar, ToolbarButton } from '../../primitives/internal/toolbar'
import { Message } from './component'

export const messageExamples = defineExamples({
	assistant: {
		description: 'Assistant response with metadata and actions.',
		render: () => (
			<MessageStage>
				<Message
					actions={
						<Toolbar compact label="Assistant message actions">
							<ToolbarButton icon="copy" label="Copy" showLabel={false} tooltipPlacement="bottom" />
							<ToolbarButton
								icon="refresh-ccw"
								label="Retry"
								showLabel={false}
								tooltipPlacement="bottom"
							/>
						</Toolbar>
					}
					author="Rubric"
					avatarInitials="RL"
					meta="now"
					messageRole="assistant"
					showAvatar
				>
					The eval runner is failing during schema hydration. I found one stale fixture and a missing
					tool permission edge.
				</Message>
			</MessageStage>
		)
	},
	system: {
		description: 'System note for constraints, memory, or run context.',
		render: () => (
			<MessageStage>
				<Message author="System" messageRole="system" surface="plain">
					Context window compacted. Latest workspace state and render routes are available.
				</Message>
			</MessageStage>
		)
	},
	user: {
		description: 'Outbound user message treatment.',
		render: () => (
			<MessageStage>
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
			</MessageStage>
		)
	}
})

function MessageStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 680, width: '100%' }}>{children}</div>
}
