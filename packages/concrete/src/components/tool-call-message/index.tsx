import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { ToolCallMessage } from './component'
import { toolCallMessageExamples } from './examples'
import { toolCallMessageMeta } from './meta'
import { type ToolCallMessageValue, toolCallMessageComponentSchema } from './schema'

export type { ToolCallMessageProps } from './component'
export { ToolCallMessage } from './component'
export type { ToolCallMessageInput, ToolCallMessageValue } from './schema'
export { toolCallMessageComponentSchema } from './schema'

export const toolCallMessageComponentDefinition = createComponent({
	...toolCallMessageMeta,
	component: ToolCallMessage,
	kind: 'component',
	renderExample: (state?: string) => renderExample(toolCallMessageExamples, state),
	renderInput: input => renderToolCallMessageInput(toolCallMessageComponentSchema.parse(input)),
	schema: toolCallMessageComponentSchema,
	seed: toolCallMessageComponentSchema.parse({
		input: 'rg -n "composer" @rubriclab/concrete',
		name: 'search workspace'
	}),
	slug: 'tool-call-message',
	states: exampleStates(toolCallMessageExamples, [
		'default',
		'queued',
		'running',
		'success',
		'error'
	])
})

function renderToolCallMessageInput(input: ToolCallMessageValue) {
	const { duration, input: commandInput, open, output, ...props } = input

	return (
		<ToolCallMessage
			{...props}
			{...(duration ? { duration } : {})}
			{...(commandInput ? { input: commandInput } : {})}
			{...(open === undefined ? {} : { open })}
			{...(output ? { output } : {})}
		/>
	)
}
