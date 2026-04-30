import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { ReasoningMessage } from './component'

export const reasoningMessageExamples = defineExamples({
	collapsed: {
		description: 'Collapsed summary-only state.',
		render: () => (
			<MessageStage>
				<ReasoningMessage
					open={false}
					summary="Mapped failing logs to the evaluation fixture, checked schema boundaries, and isolated the change needed before rerunning."
				/>
			</MessageStage>
		)
	},
	complete: {
		description: 'Completed reasoning summary.',
		render: () => (
			<MessageStage>
				<ReasoningMessage
					open
					status="complete"
					summary="Mapped failing logs to the evaluation fixture, checked schema boundaries, and isolated the change needed before rerunning."
				/>
			</MessageStage>
		)
	},
	streaming: {
		description: 'Open reasoning artifact with active step.',
		render: () => (
			<MessageStage>
				<ReasoningMessage
					open
					summary="Mapped failing logs to the evaluation fixture, checked schema boundaries, and isolated the change needed before rerunning."
				/>
			</MessageStage>
		)
	}
})

function MessageStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 680, width: '100%' }}>{children}</div>
}
