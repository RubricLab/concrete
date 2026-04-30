import { exampleStates, renderExample } from '../../factories/createExamples'
import { createComponent } from '../../factories/createItems'
import { ReasoningMessage } from './component'
import { reasoningMessageExamples } from './examples'
import { reasoningMessageMeta } from './meta'
import { type ReasoningMessageValue, reasoningMessageComponentSchema } from './schema'

export type { ReasoningMessageProps, ReasoningMessageStep } from './component'
export { ReasoningMessage } from './component'
export type { ReasoningMessageInput, ReasoningMessageValue } from './schema'
export { reasoningMessageComponentSchema } from './schema'

export const reasoningMessageComponentDefinition = createComponent({
	...reasoningMessageMeta,
	component: ReasoningMessage,
	kind: 'component',
	renderExample: (state?: string) => renderExample(reasoningMessageExamples, state),
	renderInput: input => renderReasoningMessageInput(reasoningMessageComponentSchema.parse(input)),
	schema: reasoningMessageComponentSchema,
	seed: reasoningMessageComponentSchema.parse({ open: true }),
	slug: 'reasoning-message',
	states: exampleStates(reasoningMessageExamples, ['streaming', 'complete', 'collapsed'])
})

function renderReasoningMessageInput(input: ReasoningMessageValue) {
	const { steps, ...props } = input

	return <ReasoningMessage {...props} {...(steps.length > 0 ? { steps } : {})} />
}
