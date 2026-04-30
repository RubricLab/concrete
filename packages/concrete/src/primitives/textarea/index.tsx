import { exampleStates, renderExample } from '../../factories/createExamples'
import { createPrimitive } from '../../factories/createItems'
import { Textarea } from './component'
import { textareaExamples } from './examples'
import { textareaMeta } from './meta'
import { type TextareaValue, textareaSchema } from './schema'

export type { TextareaProps } from './component'
export { Textarea } from './component'
export type { TextareaInput, TextareaValue } from './schema'
export { textareaPropsSchema, textareaSchema } from './schema'

export const textareaPrimitiveDefinition = createPrimitive({
	...textareaMeta,
	component: Textarea,
	kind: 'primitive',
	renderExample: (state?: string) => renderExample(textareaExamples, state),
	renderInput: input => renderTextareaInput(textareaSchema.parse(input)),
	schema: textareaSchema,
	slug: 'textarea',
	states: exampleStates(textareaExamples, ['default', 'filled', 'error', 'disabled'])
})

function renderTextareaInput({ value, ...input }: TextareaValue) {
	return <Textarea {...input} defaultValue={value} />
}
