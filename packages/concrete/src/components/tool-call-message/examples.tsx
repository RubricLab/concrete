import { defineExamples } from '../../factories/createExamples'
import { ToolCallMessage } from './component'

export const toolCallMessageExamples = defineExamples({
	default: {
		description: 'Active tool call with indeterminate progress.',
		render: () => renderRunningToolCall()
	},
	error: {
		description: 'Failed call with error output.',
		render: () => (
			<>
				<ToolCallMessage
					duration="420ms"
					name="bun test"
					open
					output="Schema fixture is missing commandOptions[0].id."
					status="error"
				/>
			</>
		)
	},
	queued: {
		description: 'Queued call waiting for the active shell slot.',
		render: () => (
			<>
				<ToolCallMessage
					input="bun run typecheck"
					name="package typecheck"
					status="queued"
					toolIcon="clock"
				/>
			</>
		)
	},
	running: {
		description: 'Active tool call with indeterminate progress.',
		render: () => renderRunningToolCall()
	},
	success: {
		description: 'Completed call with output.',
		render: () => (
			<>
				<ToolCallMessage
					duration="1.8s"
					input="bun run check"
					name="workspace check"
					open
					output="7 tests passed. TypeScript clean."
					status="success"
				/>
			</>
		)
	}
})

function renderRunningToolCall() {
	return <ToolCallMessage input={'rg -n "composer" @rubriclab/concrete'} name="search workspace" />
}
