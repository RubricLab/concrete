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
					name="test"
					open
					output="Missing commandOptions[0].id."
					status="error"
				/>
			</>
		)
	},
	queued: {
		description: 'Queued call waiting for the active shell slot.',
		render: () => (
			<>
				<ToolCallMessage input="bun run typecheck" name="tsc" status="queued" toolIcon="clock" />
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
					input="bun run check"
					name="check"
					open
					output="Clean. 7 suites passed."
					status="success"
				/>
			</>
		)
	}
})

function renderRunningToolCall() {
	return <ToolCallMessage input={'rg -n "composer" src'} name="rg" />
}
