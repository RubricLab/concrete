import type { ReactNode } from 'react'
import { defineExamples } from '../../factories/createExamples'
import { ToolCallMessage } from './component'

export const toolCallMessageExamples = defineExamples({
	error: {
		description: 'Failed call with error output.',
		render: () => (
			<MessageStage>
				<ToolCallMessage
					duration="420ms"
					name="bun test"
					output="Schema fixture is missing commandOptions[0].id."
					status="error"
				/>
			</MessageStage>
		)
	},
	running: {
		description: 'Active tool call with indeterminate progress.',
		render: () => (
			<MessageStage>
				<ToolCallMessage input={'rg -n "composer" @rubriclab/concrete'} name="search workspace" />
			</MessageStage>
		)
	},
	success: {
		description: 'Completed call with output.',
		render: () => (
			<MessageStage>
				<ToolCallMessage
					duration="1.8s"
					input="bun run check"
					name="workspace check"
					open
					output="7 tests passed. TypeScript clean."
					status="success"
				/>
			</MessageStage>
		)
	}
})

function MessageStage({ children }: { children: ReactNode }) {
	return <div style={{ display: 'grid', gap: 12, maxWidth: 680, width: '100%' }}>{children}</div>
}
