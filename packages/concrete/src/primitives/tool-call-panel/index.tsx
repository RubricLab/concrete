import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { ToolCallPanel, ToolCodeBlock, ToolOutput } from './component'
import { toolCallPanelExamples } from './examples'
import { toolCallPanelMeta } from './meta'
import { type ToolCallPanelValue, toolCallPanelSchema } from './schema'

export type {
	ToolCallBodyProps,
	ToolCallPanelProps,
	ToolCallStatusChipProps,
	ToolCodeBlockProps,
	ToolOutputProps
} from './component'
export {
	ToolCallBody,
	ToolCallPanel,
	ToolCallStatusChip,
	ToolCodeBlock,
	ToolOutput
} from './component'
export type { ToolCallPanelInput, ToolCallPanelValue } from './schema'
export { toolCallPanelPropsSchema, toolCallPanelSchema } from './schema'

export const toolCallPanelPrimitiveDefinition = createPrimitive({
	...toolCallPanelMeta,
	component: ToolCallPanel,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(toolCallPanelExamples, state),
	renderInput: input => renderToolCallPanelInput(toolCallPanelSchema.parse(input)),
	schema: toolCallPanelSchema,
	slug: 'tool-call-panel',
	states: exampleStates(toolCallPanelExamples, ['default', 'queued', 'success', 'error'])
})

function renderToolCallPanelInput({
	duration,
	input,
	name,
	open,
	output,
	status,
	toolIcon
}: ToolCallPanelValue) {
	return (
		<ToolCallPanel duration={duration} name={name} open={open} status={status} toolIcon={toolIcon}>
			<ToolCodeBlock code={input} language="ts" showLineNumbers={false} />
			<ToolOutput>{output}</ToolOutput>
		</ToolCallPanel>
	)
}
