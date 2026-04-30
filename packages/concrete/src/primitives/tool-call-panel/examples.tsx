import { defineExamples } from '../../factories/createExamples'
import { ToolCallPanel, ToolCodeBlock, ToolOutput } from './component'

export const toolCallPanelExamples = defineExamples({
	default: {
		description: 'Open running tool call with code input and output.',
		render: () => (
			<ToolCallPanel duration="1.2s" name="searchFiles" open status="running">
				<ToolCodeBlock
					code="await searchFiles({ query: 'trace-panel' })"
					language="ts"
					showLineNumbers={false}
				/>
				<ToolOutput>Found 4 matching files.</ToolOutput>
			</ToolCallPanel>
		)
	},
	error: {
		description: 'Failed tool call with diagnostic output.',
		render: () => (
			<ToolCallPanel duration="210ms" name="catalogAudit" open status="error" toolIcon="circle-alert">
				<ToolCodeBlock
					code="await renderRoute('/render/primitive/trace-panel')"
					language="ts"
					showLineNumbers={false}
				/>
				<ToolOutput>Route returned a server-rendered prop error.</ToolOutput>
			</ToolCallPanel>
		)
	},
	queued: {
		description: 'Queued collapsed tool call.',
		render: () => (
			<ToolCallPanel duration="queued" name="visualSmoke" status="queued" toolIcon="clock">
				<ToolOutput>Waiting for the docs server.</ToolOutput>
			</ToolCallPanel>
		)
	},
	success: {
		description: 'Successful collapsed tool call.',
		render: () => (
			<ToolCallPanel duration="840ms" name="typecheck" status="success">
				<ToolOutput>No errors.</ToolOutput>
			</ToolCallPanel>
		)
	}
})
